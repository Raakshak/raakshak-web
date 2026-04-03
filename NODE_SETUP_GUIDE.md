# Node.js Setup Guide for Rakshak Project

## 📋 Requirements

Your Rakshak project requires:
- **Node.js**: 16.x or higher (LTS recommended: 18.x or 20.x)
- **npm**: 7.x or higher (usually comes with Node.js)

## 🔍 Check Current Installation

### Option 1: Using Command Prompt/PowerShell
```powershell
node --version
npm --version
```

If you see version numbers, Node.js is installed. Otherwise, proceed to installation.

## 💾 Installation Methods for Windows

### Method 1: Using Official Installer (RECOMMENDED)

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Click "LTS" (Long Term Support) - Currently 20.x
   - Choose the Windows Installer (.msi)

2. **Run the Installer**
   - Double-click the downloaded `.msi` file
   - Follow the installation wizard
   - Keep default options
   - Click "Install"

3. **Add to PATH** (Usually automatic)
   - The installer automatically adds Node.js to your system PATH
   - **Restart your terminal/command prompt** after installation

4. **Verify Installation**
   ```powershell
   node --version
   npm --version
   ```

### Method 2: Using Chocolatey (Package Manager)

If you have Chocolatey installed:

```powershell
choco install nodejs-lts
```

### Method 3: Using nvm-windows (Version Manager)

1. Download nvm-windows: https://github.com/coreybutler/nvm-windows/releases
2. Install the `.exe` file
3. Open PowerShell as Administrator and run:
   ```powershell
   nvm install 20.10.0
   nvm use 20.10.0
   ```

## ⚙️ Recommended Version

For this project, install:
- **Node.js 20.x LTS** (Latest stable)
- **npm 10.x** (comes with Node.js 20.x)

## 🔄 Update Node.js

If you already have Node.js but need to update:

### Using Official Installer
1. Download the latest version from https://nodejs.org/
2. Run the new installer - it will upgrade automatically
3. Restart your terminal

### Using Chocolatey
```powershell
choco upgrade nodejs-lts
```

### Using nvm-windows
```powershell
nvm list
nvm install latest
nvm use <version>
```

## ✅ Verify Your Setup

After installation, open **PowerShell** (or Command Prompt) and run:

```powershell
node --version
npm --version
```

You should see output like:
```
v20.10.0
10.2.0
```

## 🚀 Then Install Project Dependencies

Once Node.js is installed, navigate to your project and run:

```powershell
cd "c:\Users\ankit\OneDrive\Desktop\Rakshak\publick"
npm install
npm run dev
```

## 🛠️ Troubleshooting

### Issue: "node" command not found

**Solution 1: Restart Terminal**
- Close and reopen PowerShell or Command Prompt
- The PATH changes require a terminal restart

**Solution 2: Check Installation Path**
```powershell
Get-Command node
```

**Solution 3: Manual PATH Addition**
- Right-click "This PC" or "My Computer"
- Click "Properties"
- Click "Advanced system settings"
- Click "Environment Variables"
- Under "System variables", find "Path" and click "Edit"
- Add: `C:\Program Files\nodejs\`
- Click OK and restart terminal

### Issue: npm install fails

**Solution:**
```powershell
npm cache clean --force
npm install
```

## 📦 After Installation

With Node.js installed, you can now:

1. **Install dependencies:**
   ```powershell
   npm install
   ```

2. **Start development server:**
   ```powershell
   npm run dev
   ```

3. **Build for production:**
   ```powershell
   npm run build
   ```

## 🔗 Useful Links

- Node.js Official: https://nodejs.org/
- npm Documentation: https://docs.npmjs.com/
- nvm-windows: https://github.com/coreybutler/nvm-windows
- Vite Documentation: https://vitejs.dev/

## 📝 Notes

- Always use the **LTS version** for production projects
- Keep Node.js updated for security patches
- npm automatically updates with Node.js
- Some packages may require specific Node.js versions
