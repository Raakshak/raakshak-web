import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, ref, get, query, orderByChild, equalTo } from '../../config/firebase'
import { useAppContext } from '../../context/AppContext'
import './LoginModal.css'

const LoginModal = ({ open, onClose }) => {
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { loginUser } = useAppContext()

  const handleClose = useCallback(() => {
    setMobile('')
    setLoading(false)
    setError('')
    onClose()
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Query Firebase customers by mobile number
      const customersRef = ref(db, 'customers')
      const mobileQuery = query(customersRef, orderByChild('mobile'), equalTo(mobile))
      const snapshot = await get(mobileQuery)

      if (snapshot.exists()) {
        // User found — get first matching record
        const data = snapshot.val()
        const customerKey = Object.keys(data)[0]
        const customer = data[customerKey]

        // Save user to context + session
        loginUser({
          key: customerKey,
          ...customer,
        })

        handleClose()
        navigate('/dashboard')
      } else {
        setError('Mobile number not registered. Please register first.')
      }
    } catch (err) {
      console.error('Login Error:', err)
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="login-modal-content glass-effect" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={handleClose}>&times;</span>
        <div className="login-icon">🔐</div>
        <h2 className="login-title">Welcome <span className="text-orange">Back</span></h2>
        <p className="login-subtitle">HAR GAADI KA GUARDIAN</p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="login-input-container">
            <input
              type="text"
              placeholder="REGISTERED MOBILE"
              maxLength={10}
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value.replace(/\D/g, ''))
                setError('')
              }}
              inputMode="numeric"
              required
              className="login-input"
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button
            type="submit"
            className="btn-login-submit"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Sign In To Dashboard ➔'}
          </button>
          <p className="login-footer-text">Protected by Rakshak Encryption</p>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
