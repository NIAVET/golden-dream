/* ===========================
   CONFIG — à adapter si besoin
   =========================== */

/**
 * Base de l’API (santé OK chez toi)
 */
const API_BASE = "http://127.0.0.1:8080";

/**
 * Mapping des endpoints pour “dernier tirage” et “prédiction”.
 * 👉 Renseigne les vrais chemins dès qu’ils sont prêts.
 *
 * Exemple possible côté API :
 *   - GET /v1/loto/latest         → { numbers: [..], chance: X }  (ou { draw: "…" })
 *   - GET /v1/loto/prediction     → { numbers: [..], chance: X }
 *
 * Si la route est vide (""), la carte affichera "—".
 */
const ENDPOINTS = {
  loto:        { last: "/v1/loto/latest",        pred: "/v1/loto/prediction" },
  euromillions:{ last: "/v1/euromillions/latest",pred: "/v1/euromillions/prediction" },
  eurodreams:  { last: "/v1/eurodreams/latest",  pred: "/v1/eurodreams/prediction" },
  keno:        { last: "/v1/keno/latest",        pred: "/v1/keno/prediction" },
  specials:    { last: "/v1/specials/latest",    pred: "/v1/specials/prediction" },
  cressendo:   { last: "/v1/cressendo/latest",   pred: "/v1/cressendo/prediction" }
};

/* ================
   Sélecteurs & UI
   ================ */

const $apiBadge = document.getElementById("apiBadge");
const $logs = document.getElementById("logs");
const $btnRefresh = document.getElementById("btnRefresh");
const $btnReset = document.getElementById("btnReset");

/* ============
   Utilitaires
   ============ */

const log = (line) => {
  const ts = new Date().toLocaleTimeString("fr-FR", { hour12: false });
  $logs.textContent += `[${ts}] ${line}\n`;
  $logs.scrollTop = $logs.scrollHeight;
};

const setApiBadge = (status) => {
  if (status === "ok") {
    $apiBadge.textContent = "API : OK";
    $apiBadge.classList.remove("api-badge--ko");
    $apiBadge.classList.add("api-badge--ok");
  } else if (status === "ko") {
    $apiBadge.textContent = "API : KO";
    $apiBadge.classList.remove("api-badge--ok");
    $apiBadge.classList.add("api-badge--ko");
  } else {
    $apiBadge.textContent = "API : —";
    $apiBadge.classList.remove("api-badge--ok", "api-badge--ko");
  }
};

const asDisplay = (payload) => {
  // Essaie de deviner les numéros selon quelques structures usuelles
  if (!payload || typeof payload !== "object") return "—";
  if (Array.isArray(payload.numbers)) {
    const base = payload.numbers.join(" ");
    if (payload.chance !== undefined) return `${base}  |  Chance: ${payload.chance}`;
    if (payload.star   !== undefined) return `${base}  |  Étoiles: ${payload.star}`;
    return base;
  }
  if (payload.draw) return String(payload.draw);
  if (payload.result) return String(payload.result);
  // fallback lisible
  try { return JSON.stringify(payload); } catch { return "—"; }
};

const fetchJson = async (url, timeoutMs = 6000) => {
  const ctrl = new AbortController();
  const timer = setTimeout(()=>ctrl.abort(), timeoutMs);
  try{
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }catch(err){
    throw err;
  }
};

/* =====================
   Santé API + Récup data
   ===================== */

const healthUrl = `${API_BASE}/v1/health`;
let pollTimer = null;

const checkHealth = async () => {
  try{
    const j = await fetchJson(healthUrl, 4000);
    if (j && (j.status === "ok" || j.status === "OK")) {
      setApiBadge("ok");
      log("API OK");
      return true;
    }
    setApiBadge("ko");
    log("API KO (réponse santé)");
    return false;
  }catch(e){
    setApiBadge("ko");
    log("API KO (réseau/santé)");
    return false;
  }
};

const updateCard = async (gameKey) => {
  const cfg = ENDPOINTS[gameKey] || {};
  const lastSel = document.querySelector(`[data-last="${gameKey}"]`);
  const predSel = document.querySelector(`[data-pred="${gameKey}"]`);
  if (!lastSel || !predSel) return;

  // Si les routes ne sont pas encore définies → affichage neutre
  if (!cfg.last || !cfg.pred) {
    lastSel.textContent = "—";
    predSel.textContent = "—";
    return;
  }

  try{
    const [last, pred] = await Promise.all([
      fetchJson(`${API_BASE}${cfg.last}`, 6000).catch(()=>null),
      fetchJson(`${API_BASE}${cfg.pred}`, 6000).catch(()=>null),
    ]);
    lastSel.textContent = last ? asDisplay(last) : "—";
    predSel.textContent = pred ? asDisplay(pred) : "—";
  }catch(e){
    lastSel.textContent = "—";
    predSel.textContent = "—";
  }
};

const refreshAll = async () => {
  const ok = await checkHealth();
  const games = Object.keys(ENDPOINTS);
  if (ok){
    // Met à jour toutes les cartes en parallèle
    await Promise.all(games.map(updateCard));
  } else {
    // En KO, on met juste des tirets propres
    games.forEach(g=>{
      const l = document.querySelector(`[data-last="${g}"]`);
      const p = document.querySelector(`[data-pred="${g}"]`);
      if (l) l.textContent = "—";
      if (p) p.textContent = "—";
    });
  }
};

const startPolling = () => {
  stopPolling();
  pollTimer = setInterval(()=> {
    checkHealth();
  }, 15000); // toutes les 15s
};
const stopPolling = () => {
  if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
};

/* ==========
   Actions UI
   ========== */

$btnRefresh.addEventListener("click", refreshAll);

$btnReset.addEventListener("click", () => {
  stopPolling();
  $logs.textContent = "";
  setApiBadge(); // état neutre
  log("Réinitialisation affichage/Logs effectuée.");
  startPolling();
});

/* ==============
   Démarrage page
   ============== */

window.addEventListener("DOMContentLoaded", async () => {
  log("Ready");
  await refreshAll();
  startPolling();
});
