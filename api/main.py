# -*- coding: utf-8 -*-
"""
Golden-Dream API — état des jeux + prédictions + tirages spéciaux
CSV attendus dans data/history :
- loto.csv           : date,n1,n2,n3,n4,n5,chance
- euromillions.csv   : date,n1,n2,n3,n4,n5,etoile1,etoile2
- eurodreams.csv     : date,n1,n2,n3,n4,n5,n6,dream
- keno.csv           : date,moment,time,n1,n2,...,n20[,multiplicateur]   (moment = midi|soir)  # 'split' accepté
- specials.csv       : date,game,event,tag,jackpot_eur,note
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import csv
from collections import Counter
from typing import List, Dict, Any, Tuple

APP_ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = APP_ROOT / "data" / "history"

app = FastAPI(title="Golden-Dream API", version="1.0.2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Tirages spéciaux (registre)
# ----------------------------
SPECIALS: Dict[Tuple[str, str], Dict[str, str]] = {}

def load_specials() -> None:
    SPECIALS.clear()
    specials_path = DATA_DIR / "specials.csv"
    if specials_path.exists():
        with specials_path.open("r", encoding="utf-8") as f:
            rdr = csv.DictReader(f)
            for r in rdr:
                date = (r.get("date") or "").strip()
                game = (r.get("game") or "").strip().lower()
                if not date or not game:
                    continue
                SPECIALS[(date, game)] = {
                    "event": (r.get("event") or "").strip(),
                    "tag": (r.get("tag") or "").strip(),
                    "jackpot_eur": (r.get("jackpot_eur") or "").strip(),
                    "note": (r.get("note") or "").strip(),
                }

load_specials()

# ----------------------------
# Helpers CSV génériques
# ----------------------------
def read_csv_rows(path: Path) -> List[Dict[str, str]]:
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as f:
        rdr = csv.DictReader(f)
        return [dict((k.strip(), (v or "").strip()) for k, v in row.items()) for row in rdr]

def nums_from_row(row: Dict[str, str], keys: List[str]) -> List[int]:
    out = []
    for k in keys:
        v = row.get(k, "")
        try:
            out.append(int(v))
        except Exception:
            pass
    return out

def frequency_pick(rows: List[Dict[str, str]], number_keys: List[str], how_many: int) -> List[int]:
    c = Counter()
    for r in rows:
        c.update(nums_from_row(r, number_keys))
    if not c:
        return []
    ordered = sorted(c.items(), key=lambda x: (-x[1], x[0]))
    return [n for n, _ in ordered[:how_many]]

def attach_special(date_str: str, game: str) -> Any:
    return SPECIALS.get((date_str, game.lower()))

# ----------------------------
# Loaders par jeu
# ----------------------------
def state_loto() -> Dict[str, Any]:
    path = DATA_DIR / "loto.csv"
    rows = read_csv_rows(path)
    result = {"date": "", "dernier": [], "pred": [], "special": None}
    if not rows:
        return result
    last = rows[-1]
    result["date"] = last.get("date", "")
    result["dernier"] = nums_from_row(last, ["n1","n2","n3","n4","n5","chance"])
    pred_main = frequency_pick(rows, ["n1","n2","n3","n4","n5"], 5)
    pred_chance = frequency_pick(rows, ["chance"], 1)
    result["pred"] = pred_main + pred_chance
    result["special"] = attach_special(result["date"], "loto")
    return result

def state_euromillions() -> Dict[str, Any]:
    path = DATA_DIR / "euromillions.csv"
    rows = read_csv_rows(path)
    result = {"date": "", "dernier": [], "pred": [], "special": None}
    if not rows:
        return result
    last = rows[-1]
    result["date"] = last.get("date","")
    result["dernier"] = nums_from_row(last, ["n1","n2","n3","n4","n5","etoile1","etoile2"])
    pred_main = frequency_pick(rows, ["n1","n2","n3","n4","n5"], 5)
    pred_stars = frequency_pick(rows, ["etoile1","etoile2"], 2)
    result["pred"] = pred_main + pred_stars
    result["special"] = attach_special(result["date"], "euromillions")
    return result

def state_eurodreams() -> Dict[str, Any]:
    path = DATA_DIR / "eurodreams.csv"
    rows = read_csv_rows(path)
    result = {"date": "", "dernier": [], "pred": [], "special": None}
    if not rows:
        return result
    last = rows[-1]
    result["date"] = last.get("date","")
    result["dernier"] = nums_from_row(last, ["n1","n2","n3","n4","n5","n6","dream"])
    pred_main = frequency_pick(rows, ["n1","n2","n3","n4","n5","n6"], 6)
    pred_dream = frequency_pick(rows, ["dream"], 1)
    result["pred"] = pred_main + pred_dream
    result["special"] = attach_special(result["date"], "eurodreams")
    return result

def state_keno() -> Dict[str, Any]:
    """
    Renvoie uniquement le DERNIER Keno (midi OU soir) via l’horodatage :
    - on trie par (date, time) si 'time' existe (HH:MM)
    - à défaut, on tombe en repli sur la dernière ligne
    """
    path = DATA_DIR / "keno.csv"
    rows = read_csv_rows(path)
    result = {"date": "", "moment": "", "time": "", "dernier": [], "pred": [], "special": None}
    if not rows:
        return result

    def sort_key(r: Dict[str, str]):
        d = r.get("date", "")
        t = r.get("time", "")
        return (d, t)

    rows_sorted = sorted(rows, key=sort_key) if rows and rows[0].get("time") is not None else rows
    last = rows_sorted[-1] if rows_sorted else rows[-1]

    result["date"] = last.get("date", "")
    result["moment"] = (last.get("moment") or last.get("split") or "").lower()
    result["time"] = last.get("time", "")
    result["dernier"] = nums_from_row(last, [f"n{i}" for i in range(1,21)])

    all_keys = [f"n{i}" for i in range(1,21)]
    result["pred"] = frequency_pick(rows, all_keys, 20)

    if result["date"]:
        result["special"] = attach_special(result["date"], "keno")

    return result

# ----------------------------
# Endpoints
# ----------------------------
@app.get("/v1/health")
def health():
    return {"status": "ok"}

@app.get("/v1/specials")
def specials():
    items = []
    for (date, game), meta in SPECIALS.items():
        items.append({"date": date, "game": game, **meta})
    return {"specials": items}

@app.get("/v1/state")
def state():
    return {
        "loto": state_loto(),
        "euromillions": state_euromillions(),
        "eurodreams": state_eurodreams(),
        "keno": state_keno(),  # dernier unique via horodatage
    }
