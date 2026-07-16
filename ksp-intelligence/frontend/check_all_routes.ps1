## Check all main routes for the Next.js app
$base = 'http://localhost:3000'
$routes = @('/', '/copilot', '/timeline', '/analytics', '/network', '/reports', '/settings', '/chat')
foreach ($r in $routes) {
  try {
    $res = Invoke-WebRequest -Uri "$base$r" -UseBasicParsing -TimeoutSec 15
    Write-Output "$r -> $($res.StatusCode)"
  } catch {
    Write-Output "$r -> ERROR: $($_.Exception.Message)"
  }
}
