import React from 'react'
import { SERVICES } from '../../utils/constants'
import './Services.css'

const Services = ({ language }) => {
  return (
    <section className="services-section" id="services">
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
              <p className="service-price">
                {typeof service.price === 'number' ? `₹${service.price}` : service.price}
              </p>
              <button className="btn-service">REQUEST NOW</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
