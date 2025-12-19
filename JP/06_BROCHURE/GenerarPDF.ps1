param(
    [string]$HtmlFile = "C:\Users\Equipo\Desktop\Valderrama International School\06_BROCHURE\BROCHURE_VALDERRAMA_CON_IMAGENES.html",
    [string]$PdfFile = "C:\Users\Equipo\Desktop\Valderrama International School\06_BROCHURE\BROCHURE_VALDERRAMA_2025.pdf"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Generador de PDF - Brochure Valderrama" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si el archivo HTML existe
if (-not (Test-Path $HtmlFile)) {
    Write-Host "ERROR: No se encontró el archivo HTML" -ForegroundColor Red
    Write-Host "Ruta esperada: $HtmlFile" -ForegroundColor Red
    exit 1
}

Write-Host "[✓] Archivo HTML encontrado" -ForegroundColor Green

try {
    # Intentar usar Microsoft Print to PDF
    Write-Host "[*] Intentando generar PDF..." -ForegroundColor Yellow
    
    # Crear objeto COM de Internet Explorer
    $ie = New-Object -ComObject InternetExplorer.Application
    $ie.Visible = $false
    
    # Navegar al archivo HTML
    $ie.Navigate((Get-Item $HtmlFile).FullName)
    
    # Esperar a que cargue
    Write-Host "[*] Cargando HTML..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    while ($ie.Busy) {
        Start-Sleep -Milliseconds 500
    }
    
    Write-Host "[✓] HTML cargado exitosamente" -ForegroundColor Green
    
    # Imprimir a PDF
    Write-Host "[*] Imprimiendo a PDF..." -ForegroundColor Yellow
    
    $shell = New-Object -ComObject Shell.Application
    $files = $shell.CreateShortcut($PdfFile)
    
    # Usar PrintHTML
    $ie.ExecWB(6, 2) # OLECMDID_PRINT (6), OLECMDEXECOPT_DONTPROMPTUSER (2)
    
    Write-Host "[✓] PDF generado correctamente" -ForegroundColor Green
    Write-Host "Ubicación: $PdfFile" -ForegroundColor Green
    
    $ie.Quit()
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Alternativamente, abre manualmente el HTML y usa Ctrl+P para guardar como PDF" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Proceso Completado" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
