@echo off
REM GitHub Setup Script for Rakshak Project

echo.
echo ====================================
echo  GitHub Repository Setup
echo ====================================
echo.

REM Check git installation
echo [1/5] Checking git installation...
git --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed!
    echo Please download from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo Git is installed!
echo.

REM Navigate to project
cd /d "%~dp0"
echo [2/5] Project folder: %cd%
echo.

REM Check if git repo exists
echo [3/5] Checking git repository...
git rev-parse --git-dir >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Repository not initialized. Running: git init
    git init
    git config user.name "Your Name"
    git config user.email "your-email@github.com"
    echo ✓ Repository initialized
) else (
    echo ✓ Repository already initialized
)
echo.

REM Check and fix remote
echo [4/5] Configuring GitHub remote...
git remote -v | findstr "origin" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo No remote found. Adding origin...
    git remote add origin https://github.com/abhi1996-gif/publick.git
    echo ✓ Remote added
) else (
    echo ✓ Remote already configured:
    git remote -v
)
echo.

REM Add and commit
echo [5/5] Staging files and making initial commit...
git add .
git commit -m "Initial commit: Rakshak React project" ^
 -m "- Professional folder structure" ^
 -m "- Firebase integration" ^
 -m "- Tailwind CSS & Ant Design setup" ^
 -m "- Component library" ^
 -m "- Custom hooks and utilities"

if %ERRORLEVEL% EQU 0 (
    echo ✓ Commit successful
) else (
    echo ERROR: Commit failed
    pause
    exit /b 1
)
echo.

echo ====================================
echo  Setup Complete!
echo ====================================
echo.
echo Next steps:
echo.
echo 1. Create repository on GitHub:
echo    https://github.com/new
echo    (Name: publick)
echo.
echo 2. Push to GitHub with:
echo    git push -u origin main
echo.
echo 3. You'll be asked for:
echo    - Username: abhi1996-gif
echo    - Password: Your GitHub Personal Access Token
echo.
echo To create a token:
echo    https://github.com/settings/tokens
echo.
echo Current git status:
git status
echo.
pause
