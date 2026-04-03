import React from 'react'
import './Reviews.css'

const Reviews = ({ language }) => {
  const reviews = [
    {
      name: 'Rajnish Singh',
      location: 'New Delhi ✅ Verified',
      text: 'Delhi ki tight parking mein ye tag bohot kaam aata hai. Privacy safe rehti hai aur kaam bhi ho jata hai.',
      rating: 5
    },
    {
      name: 'Suresh Absule',
      location: 'Mumbai ✅ Verified',
      text: 'Radium quality top class hai. Raat ko chamakta hai toh dur se hi dikh jata hai. Best investment.',
      rating: 5
    },
    {
      name: 'Vikash Singh',
      location: 'Chandigarh ✅ Verified',
      text: 'Police towing se bachne ka best tarika. Ek baar scan karke call aa gaya, meri gaadi bach gayi!',
      rating: 5
    }
  ]

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-container">
        <h2 className="section-title">
          What Our <span className="highlight">Guardians</span> Say
        </h2>
        <p className="section-subtitle">TRUSTED BY 2,400+ VEHICLE OWNERS ACROSS INDIA</p>

        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <div className="review-stars">{'⭐'.repeat(review.rating)}</div>
              <p className="review-text">"{review.text}"</p>
              <p className="review-name">{review.name}</p>
              <p className="review-location">{review.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
