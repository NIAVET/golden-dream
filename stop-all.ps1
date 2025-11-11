# stop-all.ps1
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root   = Join-Path $env:USERPROFILE 'golden-dream'
$apiPid = Join-Path $root '.uvicorn.pid'
$frontPidFile = Join-Path $root 'golden-dream-launch\.front.pid'

Write-Host "→ Arrêt des services…"

# Arrêt API (via PID enregistré)
if (Test-Path $apiPid) {
    try {
        $gdPid = (Get-Content $apiPid | ForEach-Object { $_.Trim() } | Select-Object -First 1)
        if ($gdPid -match '^\d+$') {
            Write-Host "  - Stop API (PID $gdPid)…"
            Stop-Process -Id [int]$gdPid -ErrorAction SilentlyContinue
        }
    } catch { }
    Remove-Item $apiPid -Force -ErrorAction SilentlyContinue
}

# Arrêt Front (via PID enregistré)
if (Test-Path $frontPidFile) {
    try {
        $frontPid = (Get-Content $frontPidFile | ForEach-Object { $_.Trim() } | Select-Object -First 1)
        if ($frontPid -match '^\d+$') {
            Write-Host "  - Stop Front (PID $frontPid)…"
            Stop-Process -Id [int]$frontPid -ErrorAction SilentlyContinue
        }
    } catch { }
    Remove-Item $frontPidFile -Force -ErrorAction SilentlyContinue
}

Write-Host "✓ Services arrêtés."
