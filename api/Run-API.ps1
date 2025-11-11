#requires -Version 7.2
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Join-Path $env:USERPROFILE 'golden-dream'
$api  = Join-Path $root 'api'
$venv = Join-Path $api  '.venv-gd'
$req  = Join-Path $api  'requirements.txt'

if (-not (Test-Path $api)) { throw "Dossier API introuvable: $api" }

# 1️⃣ Environnement virtuel
if (-not (Test-Path $venv)) {
    Write-Host "Création de l'environnement virtuel..." -ForegroundColor Yellow
    python -m venv $venv
}

$pip = Join-Path $venv 'Scripts\pip.exe'
$py  = Join-Path $venv 'Scripts\python.exe'
$uv  = Join-Path $venv 'Scripts\uvicorn.exe'

# 2️⃣ Installation silencieuse
if (Test-Path $req) {
    & $pip install --disable-pip-version-check --no-input -r $req | Out-Null
}

# 3️⃣ Lancement propre d’Uvicorn
Push-Location $api
try {
    $hostAddr = '127.0.0.1'
    $portNum = 8080
    Write-Host ("=> API sur http://{0}:{1} (app.main:app)" -f $hostAddr, $portNum) -ForegroundColor Green
    & $uv app.main:app --host $hostAddr --port $portNum --reload
}
finally {
    Pop-Location
}
