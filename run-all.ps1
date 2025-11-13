#Requires -Version 7
$ErrorActionPreference = "Stop"

$root = Join-Path $env:USERPROFILE "golden-dream"
$api  = Join-Path $root "api"
$ui   = Join-Path $root "golden-dream-launch"    # dossier du front (index.html, styles.css, app.js)
$venv = Join-Path $api ".venv-gd"

$apiPort = 8080
$frontPort = 5173

# -- STOP propre (si restes en mémoire)
try {
  Get-Process -Name "uvicorn","python" -ErrorAction SilentlyContinue | Where-Object {
    $_.Path -like "*\.venv-gd\Scripts\python.exe"
  } | Stop-Process -Force -ErrorAction SilentlyContinue
} catch {}

# -- VENV (crée si absent)
if (!(Test-Path $venv)) {
  Write-Host "• Création venv…" -ForegroundColor Yellow
  py -3 -m venv $venv
}

$py  = Join-Path $venv "Scripts\python.exe"
$pip = Join-Path $venv "Scripts\pip.exe"

# -- Dépendances API
Write-Host "• Installation dépendances API…" -ForegroundColor Yellow
& $pip install --disable-pip-version-check -r (Join-Path $api "requirements.txt") | Out-Null

# -- Lancer API (uvicorn)
Write-Host "• Démarrage API http://127.0.0.1:$apiPort/v1/health" -ForegroundColor Cyan
$apiArgs = @(
  "-m","uvicorn",
  "main:app",
  "--host","127.0.0.1",
  "--port",$apiPort,
  "--reload",
  "--log-level","info"
)
$apiProc = Start-Process -FilePath $py -ArgumentList $apiArgs -WorkingDirectory $api -PassThru -WindowStyle Hidden

Start-Sleep -Seconds 2

# -- Serveur front (http.server) et ouverture navigateur
if (!(Test-Path $ui)) {
  New-Item -ItemType Directory -Path $ui | Out-Null
}

Write-Host "• Démarrage Front http://127.0.0.1:$frontPort" -ForegroundColor Cyan
$frontArgs = @("-m","http.server",$frontPort)
$frontProc = Start-Process -FilePath $py -ArgumentList $frontArgs -WorkingDirectory $ui -PassThru -WindowStyle Hidden

Start-Sleep -Milliseconds 800
Start-Process "http://127.0.0.1:$frontPort"

Write-Host "`n✓ Golden-Dream lancé. (API PID=$($apiProc.Id), Front PID=$($frontProc.Id))" -ForegroundColor Green
