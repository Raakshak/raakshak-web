# Rakshak - Vehicle Protection Service

A modern React application built with Vite, Ant Design, Tailwind CSS, and Firebase for vehicle protection and QR-based owner communication.

## 🚀 Project Structure

```
rakshak/
├── src/
│   ├── components/
│   │   ├── Header/           # Navigation header component
│   │   ├── Hero/             # Hero banner section
│   │   ├── Features/         # Features, Premium Tools, Services
│   │   ├── Reviews/          # Customer testimonials
│   │   ├── Modal/            # Modal dialogs
│   │   ├── Footer/           # Contact and footer sections
│   │   └── Common/           # Reusable UI components
│   ├── pages/                # Page components (future)
│   ├── config/
│   │   └── firebase.js       # Firebase initialization
│   ├── hooks/
│   │   └── useModal.js       # Custom React hooks
│   ├── utils/
│   │   ├── constants.js      # App constants and config
│   │   └── helpers.js        # Utility functions
│   ├── styles/
│   │   ├── globals.css       # Global styles
│   │   ├── tailwind.css      # Tailwind configuration
│   │   └── variables.css     # CSS variables
│   ├── assets/
│   │   ├── images/           # Image assets
│   │   └── icons/            # Icon files
│   ├── App.jsx               # Main App component
│   ├── App.css               # App styles
│   └── main.jsx              # React entry point
├── public/                   # Static files
├── index.html                # HTML entry point
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── .env.example              # Environment variables template
└── .gitignore                # Git ignore rules
```

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Firebase project credentials
- Razorpay account (for payments)

## 🔧 Installation

1. **Clone/Navigate to project**
```bash
cd "c:\Users\ankit\OneDrive\Desktop\Rakshak\publick"
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase and Razorpay credentials:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
# ... other variables
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🛠️ Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Ant Design (antd)** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Firebase** - Real-time database and authentication
- **Razorpay** - Payment processing
- **CSS3** - Custom styling

## 📁 Component Organization

### Header Component
- Navigation menu
- Language switcher
- Login button
- Mobile responsive toggle

### Hero Section
- Call-to-action button
- Vehicle protection counter
- Tagline and title

### Features Section
- Feature cards with icons
- Badges and descriptions
- Grid layout

### Reviews Section
- Customer testimonials
- Rating display
- Verified user indicators

### Premium Tools & Services
- Tool cards (Challan Checker, Expiry Alerts, SOS, Vault)
- Service listings (Fastag, EV Station)
- Status indicators

### Contact & Footer
- Contact information
- Social media links
- Footer links

## 🔌 Firebase Integration

The project uses Firebase for:
- Real-time database (vehicle data)
- Authentication (user login)
- Storage (image uploads)

Configure Firebase in `src/config/firebase.js`

## 🎨 Styling

- **Tailwind CSS** for utility classes
- **CSS modules** for component-specific styles
- **CSS-in-JS** for dynamic styles
- **Dark theme** with orange (#F28C38) accent color

## 🪝 Custom Hooks

Available hooks in `src/hooks/`:

- `useModal()` - Modal state management
- `useForm()` - Form handling and validation
- `useLocalStorage()` - Browser local storage
- `useAsync()` - Async operations
- `useFirebaseData()` - Firebase real-time listeners

## 📝 Utility Functions

Available helpers in `src/utils/helpers.js`:

- `formatPhoneNumber()` - Format Indian phone numbers
- `validateVehicleNumber()` - Validate number plate
- `generateQRCodeUrl()` - Generate QR codes
- `formatCurrency()` - Format currency to INR
- `debounce()` / `throttle()` - Performance optimization
- And more...

## 🚗 Features

- **Vehicle Registration** - Register vehicles with QR tags
- **Real-time Updates** - Firebase real-time database integration
- **Privacy First** - Anonymous communication via QR codes
- **Emergency Profiles** - Blood group and emergency contact info
- **Dashboard** - Manage vehicles and settings
- **Premium Tools** - Challan checker, expiry alerts, SOS network
- **Multiple Services** - Fastag and EV charger services

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

## 🔐 Security

- Firebase authentication
- Environment variable protection
- Input validation
- HTTPS support
- Encrypted communication

## 📞 Contact Information

- Email: support@rakshak.com
- Phone: +91 8700730344
- WhatsApp: +918700730344

## 📄 License

© 2026 Abhishek Technology India Private Limited. All Rights Reserved.

## 🚀 Future Enhancements

- [ ] User dashboard with vehicle management
- [ ] Admin panel
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)
- [ ] API integration
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] SMS/Email notifications

## 🤝 Contributing

Follow these guidelines:
1. Create feature branches
2. Follow naming conventions
3. Write clean, documented code
4. Test before pushing
5. Create meaningful commit messages

## 💡 Notes

- Ensure Firebase credentials are secure
- Keep dependencies updated
- Monitor bundle size
- Test on multiple devices
- Follow accessibility standards
