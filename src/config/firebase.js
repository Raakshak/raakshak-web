import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAs2Gz0ofXnCmePl50-tGHqGTsBvOgj7o0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rakshak-official-8e6b1.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL || "https://rakshak-official-8e6b1-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rakshak-official-8e6b1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rakshak-official-8e6b1.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "406498340217",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:406498340217:web:0b0e588b6f6ae73ca4d3a8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QQH7B37KSZ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Services
export const db = getDatabase(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

console.log('✅ Firebase Initialized')

export default app
