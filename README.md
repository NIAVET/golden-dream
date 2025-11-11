# Golden‑Dream — Base propre
Ce paquet contient le trio UI (`index.html`, `styles.css`, `app.js`) + les JSON d'exemple dans `/data/`.
Placez tout à la racine de votre projet (ou servez-le via un serveur statique).

## Arborescence
/
  index.html
  styles.css
  app.js
  manifest.webmanifest
  /assets/logo.png
  /icons/icon-192.png, icon-512.png
  /data/*.json

## Démarrage rapide (serveur statique Python)
python -m http.server 5173
# Ouvrir http://127.0.0.1:5173

Remplacez les JSON par vos données réelles ou par le scraper.
