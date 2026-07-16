$routes = @('/', '/copilot', '/timeline', '/analytics', '/network', '/reports', '/settings', '/chat')
foreach ($r in $routes) {
    try {
        $res = Invoke-WebRequest -Uri "http://localhost:3000$r" -TimeoutSec 15
        Write-Output "$r -> $($res.StatusCode)"
    } catch {
        Write-Output "$r -> ERROR: $($_.Exception.Message)"
    }
}
