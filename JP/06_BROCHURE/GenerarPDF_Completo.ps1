Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   GENERADOR DE PDF - BROCHURE VALDERRAMA      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$HtmlFile = "C:\Users\Equipo\Desktop\Valderrama International School\06_BROCHURE\BROCHURE_VALDERRAMA_CON_IMAGENES.html"
$PdfFile = "C:\Users\Equipo\Desktop\Valderrama International School\06_BROCHURE\BROCHURE_VALDERRAMA_2025.pdf"

if (-not (Test-Path $HtmlFile)) {
    Write-Host "ERROR: No se encontró el archivo HTML" -ForegroundColor Red
    exit 1
}

Write-Host "Archivo HTML encontrado" -ForegroundColor Green

$EdgePaths = @(
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)

$EdgePath = $null
foreach ($path in $EdgePaths) {
    if (Test-Path $path) {
        $EdgePath = $path
        break
    }
}

if (-not $EdgePath) {
    Write-Host "ERROR: Microsoft Edge no encontrado" -ForegroundColor Red
    exit 1
}

Write-Host "Microsoft Edge encontrado" -ForegroundColor Green
Write-Host ""
Write-Host "Generando PDF..." -ForegroundColor Yellow

$HtmlUrl = "file:///$($HtmlFile.Replace('\', '/'))"

& $EdgePath --headless --disable-gpu --print-to-pdf="$PdfFile" "$HtmlUrl" 2>$null

Start-Sleep -Seconds 3

if (Test-Path $PdfFile) {
    $FileSize = (Get-Item $PdfFile).Length / 1MB
    Write-Host ""
    Write-Host "✓ PDF generado exitosamente" -ForegroundColor Green
    Write-Host "  Tamaño: $([math]::Round($FileSize, 2)) MB" -ForegroundColor Green
    Write-Host ""
    Write-Host "Ubicación: $PdfFile" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Nota: Abre manualmente el HTML y usa Ctrl+P para guardar como PDF" -ForegroundColor Yellow
}

Write-Host ""
