@echo off
echo ========================================
echo Firefox Extension Self-Signing Tool
echo ========================================
echo.

REM Check if .env file exists
if not exist .env (
    echo Error: .env file not found!
    echo.
    echo Please create a .env file with your Mozilla API credentials:
    echo   AMO_JWT_ISSUER=your-api-key
    echo   AMO_JWT_SECRET=your-api-secret
    echo.
    echo To get these credentials:
    echo 1. Go to https://addons.mozilla.org/developers/addon/api/key/
    echo 2. Generate API credentials
    echo 3. Copy them to .env file
    echo.
    pause
    exit /b 1
)

REM Load environment variables from .env
for /f "delims== tokens=1,2" %%a in (.env) do (
    set %%a=%%b
)

REM Check if credentials are set
if "%AMO_JWT_ISSUER%"=="" (
    echo Error: AMO_JWT_ISSUER not found in .env file!
    pause
    exit /b 1
)

if "%AMO_JWT_SECRET%"=="" (
    echo Error: AMO_JWT_SECRET not found in .env file!
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: npm is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist node_modules\web-ext (
    echo Installing web-ext...
    call npm install
    echo.
)

REM Clean previous builds
if exist web-ext-artifacts (
    echo Cleaning previous builds...
    rmdir /s /q web-ext-artifacts
    echo.
)

echo Starting signing process...
echo This may take a few minutes...
echo.

REM Sign the extension (unlisted - not published to store)
call npx web-ext sign ^
    --source-dir=. ^
    --artifacts-dir=./web-ext-artifacts ^
    --api-key=%AMO_JWT_ISSUER% ^
    --api-secret=%AMO_JWT_SECRET% ^
    --channel=unlisted

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Extension signed successfully!
    echo ========================================
    echo.
    echo The signed .xpi file is in: web-ext-artifacts\
    echo.
    echo To install:
    echo 1. Open Firefox
    echo 2. Go to about:addons
    echo 3. Click the gear icon
    echo 4. Select "Install Add-on From File"
    echo 5. Choose the .xpi file from web-ext-artifacts folder
    echo.
    echo Your extension is now permanently installed!
    echo It will NOT appear on the public Add-ons store.
    echo.
) else (
    echo.
    echo ========================================
    echo Signing failed!
    echo ========================================
    echo.
    echo Common issues:
    echo - Invalid API credentials
    echo - Extension ID already taken
    echo - Validation errors in manifest
    echo.
    echo Check the error messages above for details.
    echo.
)

pause