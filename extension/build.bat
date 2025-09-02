@echo off
echo Building Firefox Extension...
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: npm is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if web-ext is installed
if not exist node_modules\web-ext (
    echo Installing web-ext...
    call npm install
    echo.
)

REM Lint the extension
echo Checking extension for errors...
call npx web-ext lint --source-dir=.
if %errorlevel% neq 0 (
    echo.
    echo Warning: Linting found issues. Please review above.
    echo.
)

REM Build the extension
echo Building extension package...
call npx web-ext build --source-dir=. --artifacts-dir=./web-ext-artifacts --overwrite-dest

if %errorlevel% equ 0 (
    echo.
    echo ===================================
    echo Extension built successfully!
    echo ===================================
    echo.
    echo The unsigned .xpi file is in: web-ext-artifacts\
    echo.
    echo What would you like to do next?
    echo.
    echo 1. Sign the extension for permanent installation (recommended)
    echo    Run: sign.bat
    echo.
    echo 2. Install unsigned in Firefox Developer/Nightly:
    echo    - Set xpinstall.signatures.required to false in about:config
    echo    - Drag the .xpi file to Firefox
    echo.
    echo 3. Submit to addons.mozilla.org for public distribution
    echo.
    set /p choice="Enter your choice (1-3) or press Enter to exit: "
    
    if "%choice%"=="1" (
        echo.
        echo Starting signing process...
        call sign.bat
    )
) else (
    echo.
    echo Build failed! Please check the errors above.
)

pause