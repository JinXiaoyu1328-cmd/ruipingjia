$ErrorActionPreference = "Continue"

$root = Split-Path -Parent $PSScriptRoot
$logDir = Join-Path $root "logs"
$logFile = Join-Path $logDir "vite-5174.log"

if (!(Test-Path $logDir)) {
  New-Item -ItemType Directory -Path $logDir | Out-Null
}

Set-Location $root

"[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] watchdog started" | Out-File -FilePath $logFile -Append -Encoding utf8

while ($true) {
  try {
    "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] starting vite on http://127.0.0.1:5174" | Out-File -FilePath $logFile -Append -Encoding utf8
    & npm.cmd run dev:5174 2>&1 | Out-File -FilePath $logFile -Append -Encoding utf8
  } catch {
    "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] vite crashed: $($_.Exception.Message)" | Out-File -FilePath $logFile -Append -Encoding utf8
  }

  "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] vite exited, restarting in 2s" | Out-File -FilePath $logFile -Append -Encoding utf8
  Start-Sleep -Seconds 2
}
