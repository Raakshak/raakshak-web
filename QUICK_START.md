# 🚀 Quick Start Guide - Rakshak Project

## ⚡ 5-Minute Setup

### Step 1: Install Node.js (if not already installed)

**Check if Node.js is installed:**
```powershell
node --version
npm --version
```

**If not installed:**
1. Go to https://nodejs.org/
2. Download **LTS version** (v20.x recommended)
3. Run the installer (.msi file)
4. Follow the installation wizard
5. **Restart your terminal** after installation

---

### Step 2: Automated Setup (EASIEST)

Double-click one of these files in your project folder:

**Option A - Command Prompt:**
```
setup.bat
```
Just double-click and let it run!

**Option B - PowerShell:**
Right-click `setup.ps1` → "Run with PowerShell"

Or run from PowerShell:
```powershell
.\setup.ps1
```

---

### Step 3: Manual Setup (If automated scripts don't work)

Open PowerShell in the project folder and run:

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📍 Development Server

After setup, your app will be available at:
```
http://localhost:5173
```

The browser will auto-open when you run `npm run dev`

---

## 🔧 Available Commands

```powershell
# Start development server (HOT RELOAD)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

---

## ⚙️ Configuration

### Before running the app:

1. **Create `.env.local`** from template:
   ```powershell
   copy .env.example .env.local
   ```

2. **Edit `.env.local`** and add:
   - Firebase credentials (already filled)
   - Your Razorpay API key: `VITE_RAZORPAY_KEY_ID=your_key`

3. Optional: Configure API base URL
   ```
   VITE_API_BASE_URL=http://localhost:3001
   ```

---

## 📁 Project Structure

```
src/
├── components/      # React components (Header, Hero, Features, etc)
├── config/         # Firebase configuration
├── hooks/          # Custom React hooks
├── utils/          # Helper functions & constants
├── styles/         # Global and component styles
├── assets/         # Images and icons
├── App.jsx         # Main app component
└── main.jsx        # React entry point
```

---

## 🐛 Troubleshooting

### Node.js not found after installation?
- **Solution:** Close and reopen PowerShell/Command Prompt
- The PATH changes need a terminal restart

### npm install fails?
```powershell
npm cache clean --force
npm install
```

### Port 5173 already in use?
The dev server will automatically try another port (5174, 5175, etc.)

### Module not found errors?
```powershell
rm -r node_modules
npm install
```

---

## 📊 System Requirements

- **Operating System:** Windows 10/11
- **Node.js:** v16+ (recommend v18 LTS or v20 LTS)
- **npm:** v7+ (auto-installed with Node.js)
- **Disk Space:** ~1GB for node_modules
- **RAM:** 2GB minimum, 4GB+ recommended

---

## 🚀 First Run Checklist

✅ Node.js installed (`node --version` shows v16+)
✅ npm working (`npm --version` shows v7+)
✅ Dependencies installed (`npm install` completed)
✅ `.env.local` created with your credentials
✅ Development server running (`npm run dev`)
✅ Browser opens at http://localhost:5173

---

## 📚 Learn More

- **Vite Documentation:** https://vitejs.dev/
- **React Documentation:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Firebase:** https://firebase.google.com/

---

## 💡 Tips

- **Hot Module Replacement (HMR):** Your app reloads automatically when you save files
- **Responsive Design:** Test on different screen sizes - press F12 for DevTools
- **Console Errors:** Check browser console (F12 → Console tab) for debugging
- **Network Issues:** Firebase requires internet connection

---

## 🆘 Need Help?

1. Check `NODE_SETUP_GUIDE.md` for detailed Node.js setup
2. Review error messages in terminal
3. Check browser console (F12)
4. Look at component files in `src/components/`

---

**Ready to start? Run:**
```powershell
npm run dev
```

Your Rakshak app will launch in a few seconds! 🎉
