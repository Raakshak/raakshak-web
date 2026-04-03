import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'

const AppRouter = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Protected route example — extend with auth context */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPlaceholder /></ProtectedRoute>} />
        {/* Catch-all: redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* Global modals rendered outside routes */}
      {children}
    </BrowserRouter>
  )
}

// Protected Route wrapper — checks auth state
const ProtectedRoute = ({ children }) => {
  // TODO: Replace with real auth context check
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

// Placeholder for future dashboard
const DashboardPlaceholder = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
    <h1 style={{ color: '#F28C38', fontSize: '32px', fontWeight: 900 }}>Dashboard</h1>
    <p style={{ color: '#888' }}>Coming Soon — Login to access your Rakshak Dashboard</p>
  </div>
)

export default AppRouter
