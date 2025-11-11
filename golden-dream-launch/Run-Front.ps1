#requires -Version 7.2
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Join-Path $env:USERPROFILE 'golden-dream'
$api  = Join-Path $root 'api'
$venv = Join-Path $api  '.venv-gd'
$req  = Join-Path $api  'requirements.txt'

if (-not (Test-Path $api)) { throw "Dossier API introuvable: $api" }

# 1) Venv
if (-not (Test-Path $venv)) {
  Write-Host "Création de l'environnement virtuel..." -ForegroundColor Yellow
  python -m venv $venv
}

$pip = Join-Path $venv 'Scripts\pip.exe'
$py  = Join-Path $venv 'Scripts\python.exe'
$uv  = Join-Path $venv 'Scripts\uvicorn.exe'

# 2) Dépendances (silencieux et rapide)
if (Test-Path $req) {
  & $pip install --disable-pip-version-check --no-input -r $req | Out-Null
}

# 3) Démarrage uvicorn (app.main:app)
Push-Location $api
try {
  $host = '127.0.0.1'
  $port = 8080
  Write-Host "=> API sur http://$host:$port (app.main:app)" -ForegroundColor Green
  & $uv app.main:app --host $host --port $port --reload
}
finally {
  Pop-Location
}
