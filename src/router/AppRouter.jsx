import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import UserDashboard from '../components/Dashboard/UserDashboard'
import ScannerPage from '../components/Scanner/ScannerPage'

const AppRouter = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/scan" element={<ScannerPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {children}
    </BrowserRouter>
  )
}

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAppContext()

  if (!currentUser) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AppRouter
