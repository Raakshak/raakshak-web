import React, { useState, useRef, useCallback } from 'react'
import './PremiumStudioModal.css'

const PremiumStudioModal = ({ open, onClose, vehicleNum }) => {
  const [previewImg, setPreviewImg] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef(null)

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setPreviewImg(ev.target.result)
      reader.readAsDataURL(file)
    }
  }, [])

  const moveImg = useCallback((direction) => {
    const step = 10
    setPosition((prev) => {
      switch (direction) {
        case 'up': return { ...prev, y: prev.y - step }
        case 'down': return { ...prev, y: prev.y + step }
        case 'left': return { ...prev, x: prev.x - step }
        case 'right': return { ...prev, x: prev.x + step }
        default: return prev
      }
    })
  }, [])

  const handleConfirm = useCallback(() => {
    onClose()
  }, [onClose])

  const handleModalClose = useCallback(() => {
    setPreviewImg(null)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    onClose()
  }, [onClose])

  if (!open) return null

  const displayVehicle = vehicleNum || 'MH XX XX 0000'

  return (
    <div className="modal-overlay" onClick={handleModalClose}>
      <div className="studio-modal-content glass-effect" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={handleModalClose}>&times;</span>
        <h2 className="studio-title">
          Premium <span className="text-white">Studio</span>
        </h2>

        <div className="studio-body">
          {/* Step 1: Upload */}
          <div className="studio-step">
            <label className="step-label">STEP 1: UPLOAD YOUR PICTURE</label>
            <div
              className="upload-area"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <span className="upload-text">Tap to Choose Photo 📸</span>
            </div>
          </div>

          {/* Step 2: Preview */}
          <div className="studio-step">
            <label className="step-label">STEP 2: PREMIUM CARD PREVIEW</label>
            <div className="premium-card-preview radium-border">
              <div className="photo-frame">
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt="Preview"
                    className="preview-img"
                    style={{
                      transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                    }}
                  />
                ) : (
                  <span className="placeholder-text">PHOTO AREA</span>
                )}
              </div>
              <div className="qr-side">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=RakshakPreview"
                  alt="QR Preview"
                  className="studio-qr"
                />
                <div className="vnum-box">
                  <span>{displayVehicle}</span>
                </div>
                <span className="scan-text">SCAN TO INFORM</span>
              </div>
            </div>
          </div>

          {/* Image Controls */}
          {previewImg && (
            <div className="image-controls">
              <div className="zoom-control">
                <label className="control-label">ZOOM PHOTO</label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="zoom-slider"
                />
              </div>
              <div className="position-control">
                <label className="control-label">ADJUST POSITION</label>
                <div className="direction-grid">
                  <div className="grid-top">
                    <button type="button" onClick={() => moveImg('up')}>▲</button>
                  </div>
                  <div className="grid-mid">
                    <button type="button" onClick={() => moveImg('left')}>◀</button>
                    <button type="button" onClick={() => moveImg('down')}>▼</button>
                    <button type="button" onClick={() => moveImg('right')}>▶</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button type="button" className="btn-confirm-studio" onClick={handleConfirm}>
            CONFIRM & SAVE DESIGN
          </button>
        </div>
      </div>
    </div>
  )
}

export default PremiumStudioModal
