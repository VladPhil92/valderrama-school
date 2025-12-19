# Script PowerShell para generar PDF usando Microsoft Edge
# Soporta Windows 10/11

$HtmlFile = "C:\Users\Equipo\Desktop\Valderrama International School\06_BROCHURE\BROCHURE_VALDERRAMA_CON_IMAGENES.html"
$PdfFile = "C:\Users\Equipo\Desktop\Valderrama International School\06_BROCHURE\BROCHURE_VALDERRAMA_2025.pdf"

Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   GENERADOR DE PDF - BROCHURE VALDERRAMA      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar si el archivo HTML existe
if (-not (Test-Path $HtmlFile)) {
    Write-Host "❌ ERROR: No se encontró el archivo HTML" -ForegroundColor Red
    Write-Host "   Ruta: $HtmlFile" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Archivo HTML encontrado" -ForegroundColor Green
Write-Host ""

# Buscar Microsoft Edge
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
    Write-Host "❌ ERROR: Microsoft Edge no encontrado" -ForegroundColor Red
    Write-Host "   Por favor, instala Microsoft Edge o usa Chrome" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Microsoft Edge encontrado" -ForegroundColor Green
Write-Host ""

# Convertir rutas a formato URL
$HtmlUrl = "file:///$($HtmlFile.Replace('\', '/'))"

Write-Host "📄 Generando PDF..." -ForegroundColor Yellow
Write-Host "   Entrada: $HtmlFile" -ForegroundColor Gray
Write-Host "   Salida:  $PdfFile" -ForegroundColor Gray
Write-Host ""

# Usar Edge para imprimir a PDF
$cmd = "$EdgePath --headless --disable-gpu --print-to-pdf=`"$PdfFile`" `"$HtmlUrl`""
Write-Host "Ejecutando: $cmd" -ForegroundColor Gray
Invoke-Expression $cmd 2>$null

# Esperar a que se cree el archivo
Start-Sleep -Seconds 3

if (Test-Path $PdfFile) {
    $FileSize = (Get-Item $PdfFile).Length / 1MB
    Write-Host "✓ PDF generado exitosamente" -ForegroundColor Green
    Write-Host "  Tamaño: $([math]::Round($FileSize, 2)) MB" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Ubicación del archivo:" -ForegroundColor Cyan
    Write-Host "   $PdfFile" -ForegroundColor Green
    Write-Host ""
    Write-Host "✓ ¡Listo para usar!" -ForegroundColor Green
} else {
    Write-Host "⚠ El archivo PDF no se creó correctamente" -ForegroundColor Yellow
    Write-Host "  Intenta abriendo manualmente el HTML y usando Ctrl+P" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
