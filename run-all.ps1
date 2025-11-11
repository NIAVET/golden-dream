#requires -version 7.2
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# --- Chemins
$root   = Join-Path $env:USERPROFILE 'golden-dream'
$api    = Join-Path $root 'api'
$front  = Join-Path $root 'golden-dream-launch'
$pids   = Join-Path $root '.pids'
$null = New-Item -ItemType Directory -Path $pids -Force

$apiPidFile   = Join-Path $pids 'api.pid'
$frontPidFile = Join-Path $pids 'front.pid'

# --- Utilitaires
function Wait-Port($port, $timeoutSec=15) {
  $deadline = (Get-Date).AddSeconds($timeoutSec)
  while ((Get-Date) -lt $deadline) {
    try {
      $tcp = New-Object System.Net.Sockets.TcpClient
      $iar = $tcp.BeginConnect('127.0.0.1', [int]$port, $null, $null)
      if ($iar.AsyncWaitHandle.WaitOne(400)) {
        $tcp.EndConnect($iar) ; $tcp.Close() ; return $true
      }
      $tcp.Close()
    } catch { }
    Start-Sleep -Milliseconds 250
  }
  return $false
}

Write-Host "→ Démarrage API sur http://127.0.0.1:8080 ..." -ForegroundColor Cyan

# --- VENV + dépendances (silencieux)
Push-Location $api
if (-not (Test-Path '.venv-gd')) { python -m venv '.venv-gd' }
$py  = Join-Path '.venv-gd' 'Scripts\python.exe'
$pip = Join-Path '.venv-gd' 'Scripts\pip.exe'
& $pip install -q --disable-pip-version-check --no-input -r requirements.txt | Out-Null

# --- Lancer uvicorn (API) en arrière-plan
$apiProc = Start-Process -FilePath $py `
  -ArgumentList '-m','uvicorn','app.main:app','--host','127.0.0.1','--port','8080','--reload' `
  -WorkingDirectory $api -PassThru -WindowStyle Hidden
$apiProc.Id | Set-Content -Path $apiPidFile -Encoding ascii

# --- Attendre l’ouverture du port 8080 (max 15s)
if (Wait-Port 8080 15) {
  Write-Host "√ API prête." -ForegroundColor Green
} else {
  throw "L'API n'a pas ouvert le port 8080 dans le délai imparti."
}
Pop-Location

Write-Host "→ Démarrage Front sur http://127.0.0.1:5173 ..." -ForegroundColor Cyan

# --- Lancer le serveur statique (Front)
$frontProc = Start-Process -FilePath (Get-Command python).Source `
  -ArgumentList '-m','http.server','5173' `
  -WorkingDirectory $front -PassThru -WindowStyle Hidden
$frontProc.Id | Set-Content -Path $frontPidFile -Encoding ascii

# --- Attendre l’ouverture du port 5173 puis ouvrir le navigateur
if (Wait-Port 5173 10) {
  Start-Process 'http://127.0.0.1:5173'
  Write-Host ("√ Golden–Dream lancé. (API PID={0}, Front PID={1})" -f $apiProc.Id,$frontProc.Id) -ForegroundColor Green
} else {
  Write-Warning "Le port 5173 n'est pas encore ouvert, mais le serveur a été lancé (PID $($frontProc.Id))."
}
