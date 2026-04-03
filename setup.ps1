#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Rakshak Project Setup Script
.DESCRIPTION
    Automated setup for Node.js and project dependencies on Windows
.NOTES
    Run with: .\setup.ps1
    Or open PowerShell, navigate to project folder, and run: .\setup.ps1
#>

Write-Host "`n" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host " Rakshak Project Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "`n"

# Step 1: Check Node.js Installation
Write-Host "[1/4] Checking Node.js installation..." -ForegroundColor Yellow

$nodeExists = $null -ne (Get-Command node -ErrorAction SilentlyContinue)

if (-not $nodeExists) {
    Write-Host "✗ Node.js not found!" -ForegroundColor Red
    Write-Host "`nPlease download and install Node.js LTS from:" -ForegroundColor Yellow
    Write-Host "  https://nodejs.org/" -ForegroundColor Cyan
    Write-Host "`nAfter installation, restart this script.`n" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ Node.js found!" -ForegroundColor Green

$nodeVersion = & node --version
$npmVersion = & npm --version

Write-Host "  Node version: $nodeVersion" -ForegroundColor Green
Write-Host "  npm version: $npmVersion" -ForegroundColor Green
Write-Host "`n"

# Step 2: Verify Node Version
Write-Host "[2/4] Verifying Node.js version..." -ForegroundColor Yellow
Write-Host "  Current: $nodeVersion" -ForegroundColor Cyan
Write-Host "  Recommended: v16+ (prefer v18 or v20 LTS)" -ForegroundColor Cyan

# Extract version number
$versionMatch = $nodeVersion -match 'v(\d+)'
if ($matches) {
    $majorVersion = [int]$matches[1]
    if ($majorVersion -lt 16) {
        Write-Host "`n  ⚠ WARNING: Your Node version is older than recommended!" -ForegroundColor Yellow
        Write-Host "  Please update from: https://nodejs.org/`n" -ForegroundColor Yellow
    } else {
        Write-Host "  ✓ Node version is suitable`n" -ForegroundColor Green
    }
}

# Step 3: Install Dependencies
Write-Host "[3/4] Installing project dependencies..." -ForegroundColor Yellow
Write-Host "  This may take a few minutes...`n" -ForegroundColor Gray

& npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n✗ npm install failed!`n" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n✓ Dependencies installed successfully!`n" -ForegroundColor Green

# Step 4: Success
Write-Host "[4/4] Setup Complete!`n" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host " Next Steps" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "`n"
Write-Host "To start the development server:" -ForegroundColor Cyan
Write-Host "  npm run dev`n" -ForegroundColor Green

Write-Host "To build for production:" -ForegroundColor Cyan
Write-Host "  npm run build`n" -ForegroundColor Green

Write-Host "Configuration required:" -ForegroundColor Yellow
Write-Host "  1. Copy .env.example to .env.local" -ForegroundColor Gray
Write-Host "  2. Add your Firebase credentials" -ForegroundColor Gray
Write-Host "  3. Add your Razorpay API key`n" -ForegroundColor Gray

Write-Host "Project is ready! 🚀`n" -ForegroundColor Green

Read-Host "Press Enter to exit"
