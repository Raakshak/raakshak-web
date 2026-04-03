import React, { useRef, useEffect } from 'react'
import { REVIEWS } from '../../utils/constants'
import './Reviews.css'

const StarRating = ({ rating }) => (
  <div className="review-stars" role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i}>⭐</span>
    ))}
  </div>
)

const Reviews = ({ language }) => {
  const trackRef = useRef(null)

  // Auto-scroll animation
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationId
    let scrollPos = 0
    const speed = 0.5

    const animate = () => {
      scrollPos += speed
      if (scrollPos >= track.scrollWidth / 2) {
        scrollPos = 0
      }
      track.style.transform = `translateX(-${scrollPos}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => { animationId = requestAnimationFrame(animate) }

    track.addEventListener('mouseenter', handleMouseEnter)
    track.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      track.removeEventListener('mouseenter', handleMouseEnter)
      track.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Double the reviews for seamless scroll
  const doubledReviews = [...REVIEWS, ...REVIEWS]

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-container">
        <h2 className="section-title">
          What Our <span className="highlight">Guardians</span> Say
        </h2>
        <p className="section-subtitle">TRUSTED BY 2,400+ VEHICLE OWNERS ACROSS INDIA</p>

        <div className="reviews-slider-container">
          <div className="reviews-track" ref={trackRef}>
            {doubledReviews.map((review, index) => (
              <div key={`${review.id}-${index}`} className="review-card">
                <StarRating rating={review.rating} />
                <p className="review-text">"{review.text}"</p>
                <span className="review-name">{review.name}</span>
                <span className="review-location">
                  {review.location} {review.verified && '✅ Verified'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews
