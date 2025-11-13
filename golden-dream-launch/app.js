// ================= Golden Dream Front =================
const API_BASE = "http://127.0.0.1:8080/v1";

const $ = (sel) => document.querySelector(sel);

function log(msg) {
  const box = $("#logbox");
  const ts = new Date().toTimeString().slice(0, 8);
  box.textContent += `\n[${ts}] ${msg}`;
  box.scrollTop = box.scrollHeight;
}

function setApiBadge(ok) {
  const badge = $("#api-badge");
  if (!badge) return;
  if (ok) {
    badge.classList.remove("api-ko");
    badge.classList.add("api-ok");
    badge.textContent = "API : OK";
  } else {
    badge.classList.remove("api-ok");
    badge.classList.add("api-ko");
    badge.textContent = "API : KO";
  }
}

async function apiGet(path) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function pingApi() {
  try {
    const j = await apiGet("/health");
    const ok = j && (j.status === "ok" || j.statut === "ok");
    setApiBadge(ok);
    log(`API OK (${API_BASE})`);
    return ok;
  } catch (e) {
    setApiBadge(false);
    log(`API KO : ${e.message}`);
    return false;
  }
}

function fill(id, val) {
  const el = $(`#${id}`);
  if (el) el.textContent = val ?? "—";
}

function formatNums(obj) {
  if (!obj || !Array.isArray(obj.nums)) return "—";
  return obj.nums.join(" ");
}

function formatEm(obj) {
  if (!obj || !Array.isArray(obj.nums)) return "—";
  const nums = obj.nums.join(" ");
  const etoiles = Array.isArray(obj.etoiles) ? obj.etoiles.join(" ") : "";
  return etoiles ? `${nums} | ⭐ ${etoiles}` : nums;
}

function formatEd(obj) {
  if (!obj || !Array.isArray(obj.nums)) return "—";
  const nums = obj.nums.join(" ");
  const dream = obj.dream ?? "";
  return dream ? `${nums} | 🌙 ${dream}` : nums;
}

// Keno : choisir midi/soir selon horodatage
function formatKeno(lastKeno) {
  if (!lastKeno) return "—";
  const midiTs = lastKeno.midi?.timestamp ? new Date(lastKeno.midi.timestamp).getTime() : -1;
  const soirTs = lastKeno.soir?.timestamp ? new Date(lastKeno.soir.timestamp).getTime() : -1;
  const useSoir = soirTs >= midiTs;
  const pick = useSoir ? lastKeno.soir : lastKeno.midi;
  if (!pick || !Array.isArray(pick.nums)) return "—";
  return pick.nums.join(" ");
}

async function loadAll() {
  const ok = await pingApi();
  if (!ok) return;

  try {
    const [
      lastLoto, predLoto,
      lastEm, predEm,
      lastEd, predEd,
      lastKeno, predKeno,
      lastSpec, predSpec,
      lastCres, predCres
    ] = await Promise.all([
      apiGet("/last/loto").catch(()=>null),
      apiGet("/pred/loto").catch(()=>null),
      apiGet("/last/euromillions").catch(()=>null),
      apiGet("/pred/euromillions").catch(()=>null),
      apiGet("/last/eurodreams").catch(()=>null),
      apiGet("/pred/eurodreams").catch(()=>null),
      apiGet("/last/keno").catch(()=>null),
      apiGet("/pred/keno").catch(()=>null),
      apiGet("/last/specials").catch(()=>null),
      apiGet("/pred/specials").catch(()=>null),
      apiGet("/last/cressendo").catch(()=>null),
      apiGet("/pred/cressendo").catch(()=>null)
    ]);

    fill("last-loto",        formatNums(lastLoto));
    fill("pred-loto",        formatNums(predLoto));

    fill("last-euromillions",formatEm(lastEm));
    fill("pred-euromillions",formatEm(predEm));

    fill("last-eurodreams",  formatEd(lastEd));
    fill("pred-eurodreams",  formatEd(predEd));

    fill("last-keno",        formatKeno(lastKeno));
    fill("pred-keno",        formatNums(predKeno));

    fill("last-specials",    formatNums(lastSpec));
    fill("pred-specials",    formatNums(predSpec));

    fill("last-cressendo",   formatNums(lastCres));
    fill("pred-cressendo",   formatNums(predCres));

  } catch (e) {
    log(`Erreur chargement : ${e.message}`);
  }
}

function wireUi() {
  $("#btn-refresh")?.addEventListener("click", loadAll);
  $("#btn-reset")?.addEventListener("click", async () => {
    try {
      await apiGet("/reset").catch(()=>null);
      $("#logbox").textContent = "[00:00:00] Ready";
      log("Reset demandé.");
      await loadAll();
    } catch (e) {
      log(`Erreur reset : ${e.message}`);
    }
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  wireUi();
  await loadAll();
});
