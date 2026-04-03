import React from 'react'
import { FEATURES } from '../../utils/constants'
import './Features.css'

const Features = ({ language, onCardClick }) => {
  return (
    <section className="features-section" id="features">
      <div className="section-container">
        <h2 className="section-title">
          Why You'll <span className="highlight">Love Rakshak Tag</span>
        </h2>
        <p className="section-subtitle">A SMARTER, SAFER WAY TO HANDLE EVERYDAY PARKING SITUATIONS</p>

        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-card"
              onClick={() => onCardClick && onCardClick(index, 'love')}
              style={{ cursor: 'pointer' }}
            >
              <span className="feature-badge">{feature.badge}</span>
              <div className="feature-icon" aria-hidden="true">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
