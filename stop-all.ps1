#Requires -Version 7
$ErrorActionPreference = "SilentlyContinue"

$apiPort = 8080
$frontPort = 5173

# Stop par port
(Get-NetTCPConnection -LocalPort $apiPort -State Listen).OwningProcess | % { Get-Process -Id $_ } | Stop-Process -Force
(Get-NetTCPConnection -LocalPort $frontPort -State Listen).OwningProcess | % { Get-Process -Id $_ } | Stop-Process -Force

# Stop par binaire du venv
$root = Join-Path $env:USERPROFILE "golden-dream"
$api  = Join-Path $root "api"
$venv = Join-Path $api ".venv-gd"
$py   = Join-Path $venv "Scripts\python.exe"

Get-Process -Name "uvicorn","python" | Where-Object { $_.Path -eq $py } | Stop-Process -Force
Write-Host "✓ Processus arrêtés." -ForegroundColor Yellow
