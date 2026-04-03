import React from 'react'
import { PREMIUM_TOOLS, SERVICES } from '../../utils/constants'
import './PremiumTools.css'

const PremiumTools = ({ language }) => {
  return (
    <section className="premium-tools-section" id="premium-tools">
      <div className="section-container">
        <h2 className="section-title">
          Rakshak <span className="highlight">Premium Tools</span>
        </h2>
        <p className="section-subtitle">ADVANCED DIGITAL SHIELD FOR A SMARTER DRIVING EXPERIENCE</p>

        <div className="tools-grid">
          {PREMIUM_TOOLS.map((tool) => (
            <div key={tool.id} className={`tool-card ${tool.status}`}>
              <span className="tool-badge">{tool.badge}</span>
              <div className="tool-icon">{tool.icon}</div>
              <h3 className="tool-title">{tool.name}</h3>
              <p className="tool-desc">{tool.description}</p>
              <button className={`btn-tool ${tool.status}`}>
                {tool.status === 'live' ? 'SCAN FOR FINES' : 'ACTIVATE PRO'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Services = ({ language }) => {
  return (
    <section className="services-section">
      <div className="section-container">
        <h2 className="section-title">
          Rakshak <span className="highlight">Extra Services</span>
        </h2>
        <p className="section-subtitle">ONE STOP SOLUTION FOR ALL YOUR VEHICLE ESSENTIALS</p>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.name}</h3>
              <p className="service-price">₹{service.price}</p>
              <button className="btn-service">REQUEST NOW</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { PremiumTools, Services }
export default PremiumTools
