#requires -version 7.2
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Join-Path $env:USERPROFILE 'golden-dream'
$desk = [Environment]::GetFolderPath('Desktop')
$pwsh = (Get-Command pwsh).Source   # PowerShell 7

$WshShell = New-Object -ComObject WScript.Shell
function New-Link($ps1, $name) {
  $lnk  = $WshShell.CreateShortcut( (Join-Path $desk $name) )
  $lnk.TargetPath = $pwsh
  $lnk.Arguments  = "-NoProfile -ExecutionPolicy Bypass -File `"$ps1`""
  $lnk.WorkingDirectory = Split-Path $ps1
  $lnk.Save()
}

New-Link (Join-Path $root 'run-all.ps1')  'Golden–Dream — Lancer.lnk'
New-Link (Join-Path $root 'stop-all.ps1') 'Golden–Dream — Arrêter.lnk'
Write-Host "√ Raccourcis mis à jour pour PowerShell 7." -ForegroundColor Green

