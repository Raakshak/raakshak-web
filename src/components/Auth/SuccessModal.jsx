import React from 'react'
import './SuccessModal.css'

const SuccessModal = ({ open, onClose, data }) => {
  if (!open || !data) return null

  const { generatedId, vehicleNum, qrUrl } = data

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="success-modal-content glass-effect" onClick={(e) => e.stopPropagation()}>
        <h2 className="success-title">Registration Successful!</h2>

        {/* Sticker Preview */}
        <div className="final-sticker-preview">
          <div className="sticker-top">
            <div className="sticker-logo">
              <img
                src="https://i.postimg.cc/yYyX0Mt7/Chat-GPT-Image-Feb-27-2026-11-52-07-PM.png"
                alt="Rakshak Logo"
              />
            </div>
            <div className="sticker-title">
              <h3>SCAN TO<br />INFORM OWNER</h3>
            </div>
            <div className="sticker-qr">
              <img src={qrUrl} alt="QR Code" />
            </div>
          </div>
          <div className="sticker-bottom">
            <div className="vnum-display">{vehicleNum}</div>
          </div>
        </div>

        {/* User ID */}
        <div className="user-id-box">
          <p className="user-id-label">YOUR UNIQUE RAKSHAK ID</p>
          <h2 className="user-id-value">{generatedId}</h2>
        </div>

        <p className="success-msg">Aapka QR code link ho chuka hai.</p>

        <button className="btn-done" onClick={onClose}>DONE</button>
      </div>
    </div>
  )
}

export default SuccessModal
