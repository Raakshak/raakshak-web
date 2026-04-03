import React, { useState, useCallback } from 'react'
import { BENEFIT_SLIDES } from '../../utils/constants'
import './BenefitsSlider.css'

const BenefitsSlider = ({ open, onClose, initialIndex = 0, category = 'love' }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const slides = BENEFIT_SLIDES[category] || BENEFIT_SLIDES.love

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  // Reset index when opening
  React.useEffect(() => {
    if (open) setCurrentIndex(initialIndex)
  }, [open, initialIndex])

  if (!open) return null

  const slide = slides[currentIndex]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="slider-container-main" onClick={(e) => e.stopPropagation()}>
        <span className="slider-close-x" onClick={onClose}>&times;</span>

        <div className="slider-image-side">
          {slide.image ? (
            <img src={slide.image} alt={slide.title} />
          ) : (
            <div className="slider-placeholder-img">
              <span>{BENEFIT_SLIDES[category]?.[currentIndex]?.title?.charAt(0) || '🛡️'}</span>
            </div>
          )}
        </div>

        <div className="slider-content-side">
          <h2 className="slider-title">{slide.title}</h2>
          <p className="slider-desc">{slide.desc}</p>

          <div className="slider-nav-container">
            <button className="slider-nav-arrow" onClick={prevSlide}>❮</button>
            <span className="slider-counter">{currentIndex + 1} / {slides.length}</span>
            <button className="slider-nav-arrow" onClick={nextSlide}>❯</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BenefitsSlider
