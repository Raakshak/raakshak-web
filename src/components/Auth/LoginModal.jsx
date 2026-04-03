import React, { useState, useCallback } from 'react'
import './LoginModal.css'

const LoginModal = ({ open, onClose }) => {
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClose = useCallback(() => {
    setMobile('')
    setLoading(false)
    onClose()
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (mobile.length !== 10) return
    setLoading(true)
    // TODO: Integrate with Firebase Auth - lookup user by mobile
    alert('Dashboard feature coming soon!')
    setLoading(false)
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
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
              inputMode="numeric"
              required
              className="login-input"
            />
          </div>
          <button
            type="submit"
            className="btn-login-submit"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In To Dashboard ➔'}
          </button>
          <p className="login-footer-text">Protected by Rakshak Encryption</p>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
