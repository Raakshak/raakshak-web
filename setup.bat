@echo off
REM Quick Node.js and Project Setup Script for Windows

echo.
echo ====================================
echo  Rakshak Project Setup
echo ====================================
echo.

REM Check if Node.js is installed
echo [1/4] Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Node.js not found!
    echo.
    echo Please download and install Node.js LTS from:
    echo https://nodejs.org/
    echo.
    echo After installation, restart this script.
    pause
    exit /b 1
) else (
    echo ✓ Node.js found!
    node --version
    npm --version
    echo.
)

REM Check Node version
echo [2/4] Checking Node.js version...
for /f "tokens=1" %%i in ('node --version') do set NODE_VERSION=%%i
echo Current version: %NODE_VERSION%
echo (Recommended: v16.0.0 or higher, preferably v18 or v20)
echo.

REM Navigate to project directory
echo [3/4] Installing dependencies...
cd /d "%~dp0"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to navigate to project directory
    pause
    exit /b 1
)

REM Install dependencies
npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo ✓ Dependencies installed!
echo.

REM Success message
echo [4/4] Setup Complete!
echo.
echo ====================================
echo  Next Steps:
echo ====================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo To build for production, run:
echo   npm run build
echo.
echo Open the .env.local file and add your:
echo   - Firebase credentials
echo   - Razorpay API key
echo.
pause
