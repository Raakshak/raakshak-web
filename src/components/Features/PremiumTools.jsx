import React from 'react'
import { PREMIUM_TOOLS } from '../../utils/constants'
import './PremiumTools.css'

const PremiumTools = ({ language, onLoginClick }) => {
  return (
    <section className="premium-tools-section" id="premium-tools">
      <div className="section-container">
        <h2 className="section-title section-title-lg">
          Rakshak <span className="highlight">Premium Tools</span>
        </h2>
        <p className="section-subtitle">ADVANCED DIGITAL SHIELD FOR A SMARTER DRIVING EXPERIENCE</p>

        <div className="tools-grid">
          {PREMIUM_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className={`tool-card ${tool.status}`}
              onClick={() => onLoginClick && onLoginClick()}
              style={{ cursor: 'pointer' }}
            >
              <span className="tool-badge">{tool.badge}</span>
              <div className="tool-icon">{tool.icon}</div>
              <h3 className="tool-title">
                {tool.id === 1 ? (
                  <>Challan <span className="highlight">Checker</span></>
                ) : (
                  tool.name
                )}
              </h3>
              <p className="tool-desc">{tool.description}</p>
              <button
                className={`btn-tool ${tool.status}`}
                aria-label={`${tool.name} - ${tool.buttonText}`}
              >
                {tool.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PremiumTools
