# Script PowerShell para convertir HTML a PDF
$htmlFile = "C:\Users\Equipo\Desktop\Valderrama International School\06_BROCHURE\BROCHURE_VALDERRAMA_CON_IMAGENES.html"
$pdfFile = "C:\Users\Equipo\Desktop\Valderrama International School\06_BROCHURE\BROCHURE_VALDERRAMA_2025.pdf"

# Crear objeto COM para Internet Explorer
$ie = New-Object -ComObject InternetExplorer.Application
$ie.Visible = $false

# Abrir el archivo HTML
$ie.Navigate($htmlFile)

# Esperar a que cargue
while ($ie.Busy -eq $true) {
    Start-Sleep -Milliseconds 100
}

Start-Sleep -Seconds 2

# Crear objeto PrintSettings
$PrintSettings = $ie.document.parentWindow.print()

Write-Host "HTML cargado. Por favor, usa la función de impresión del navegador."
Write-Host "Guarda como PDF en: $pdfFile"

# Cerrar Internet Explorer
# $ie.Quit()
