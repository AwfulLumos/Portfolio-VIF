# VIF.Dev Portfolio - Local Development Server
# Run this script to start the development server

Write-Host "🚀 Starting VIF.Dev Portfolio Development Server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📁 Server will run from: $PWD" -ForegroundColor Yellow
Write-Host "🌐 Open your browser to: http://localhost:8000/index-modular.html" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

# Check if Python is installed
$pythonCheck = Get-Command python -ErrorAction SilentlyContinue

if ($pythonCheck) {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python found: $pythonVersion" -ForegroundColor Green
    Write-Host ""
    
    # Start Python HTTP server
    python -m http.server 8000
} else {
    Write-Host "❌ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Python from: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "Or use Node.js instead:" -ForegroundColor Yellow
    Write-Host "  npm install -g http-server" -ForegroundColor Cyan
    Write-Host "  http-server -p 8000" -ForegroundColor Cyan
    Write-Host ""
    pause
}
