@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ════════════════════════════════════════════════
echo    GENERADOR DE PDF - BROCHURE VALDERRAMA
echo ════════════════════════════════════════════════
echo.

set "HtmlFile=C:\Users\Equipo\Desktop\Valderrama International School\06_BROCHURE\BROCHURE_VALDERRAMA_CON_IMAGENES.html"
set "PdfFile=C:\Users\Equipo\Desktop\Valderrama International School\06_BROCHURE\BROCHURE_VALDERRAMA_2025.pdf"

if not exist "!HtmlFile!" (
    echo ❌ ERROR: No se encontró el archivo HTML
    exit /b 1
)

echo ✓ Archivo HTML encontrado
echo.

REM Buscar Microsoft Edge
set "EdgePath="
if exist "C:\Program Files\Microsoft\Edge\Application\msedge.exe" (
    set "EdgePath=C:\Program Files\Microsoft\Edge\Application\msedge.exe"
) else if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    set "EdgePath=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)

if "!EdgePath!"=="" (
    echo ❌ ERROR: Microsoft Edge no encontrado
    echo.
    echo Solución alternativa:
    echo 1. Abre manualmente: BROCHURE_VALDERRAMA_CON_IMAGENES.html
    echo 2. Presiona Ctrl + P
    echo 3. Selecciona "Guardar como PDF"
    echo 4. Guarda como: BROCHURE_VALDERRAMA_2025.pdf
    exit /b 1
)

echo ✓ Microsoft Edge encontrado
echo.
echo Generando PDF...
echo.

REM Generar PDF
"!EdgePath!" --headless --disable-gpu --print-to-pdf="!PdfFile!" "file:///!HtmlFile:\=/!" 2>nul

timeout /t 3 /nobreak

if exist "!PdfFile!" (
    echo.
    echo ✓ PDF generado exitosamente
    echo.
    echo 📍 Ubicación: !PdfFile!
    echo.
    echo ✓ ¡Listo para usar!
) else (
    echo.
    echo ⚠ El PDF no se generó correctamente.
    echo.
    echo Solución alternativa:
    echo 1. Abre manualmente: BROCHURE_VALDERRAMA_CON_IMAGENES.html
    echo 2. Presiona Ctrl + P
    echo 3. Selecciona "Guardar como PDF"
    echo 4. Guarda como: BROCHURE_VALDERRAMA_2025.pdf
)

echo.
echo ════════════════════════════════════════════════
echo.
pause
