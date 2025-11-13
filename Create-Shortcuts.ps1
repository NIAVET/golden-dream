#Requires -Version 5.1
$root = Join-Path $env:USERPROFILE "golden-dream"
$pwsh = (Get-Command pwsh.exe -ErrorAction SilentlyContinue)?.Source
if (-not $pwsh) { $pwsh = (Get-Command powershell.exe).Source }

$run = Join-Path $root "run-all.ps1"
$stop = Join-Path $root "stop-all.ps1"

$desktop = [Environment]::GetFolderPath('Desktop')
$sc1 = Join-Path $desktop "Golden-Dream - Lancer.lnk"
$sc2 = Join-Path $desktop "Golden-Dream - Arrêter.lnk"

$Wsh = New-Object -ComObject WScript.Shell

# Lancer
$lnk = $Wsh.CreateShortcut($sc1)
$lnk.TargetPath = $pwsh
$lnk.Arguments  = "-NoProfile -ExecutionPolicy Bypass -File `"$run`""
$lnk.WorkingDirectory = $root
$lnk.IconLocation = "$env:SystemRoot\System32\shell32.dll,167"
$lnk.Description = "Démarre API + Front, puis ouvre http://127.0.0.1:5173"
$lnk.Save()

# Arrêter
$lnk = $Wsh.CreateShortcut($sc2)
$lnk.TargetPath = $pwsh
$lnk.Arguments  = "-NoProfile -ExecutionPolicy Bypass -File `"$stop`""
$lnk.WorkingDirectory = $root
$lnk.IconLocation = "$env:SystemRoot\System32\shell32.dll,131"
$lnk.Description = "Arrête API + Front Golden-Dream"
$lnk.Save()

Write-Host "√ Raccourcis créés sur le Bureau." -ForegroundColor Green
