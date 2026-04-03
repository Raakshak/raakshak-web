import React from 'react'
import { WHY_INDIA_NEEDS, GOVT_REPORTS } from '../../utils/constants'
import './WhyIndia.css'

const WhyIndia = ({ onCardClick }) => {
  return (
    <section className="why-india-section" id="about">
      <div className="section-container">
        <h2 className="section-title">
          Why India <span className="highlight">Needs Rakshak?</span>
        </h2>
        <p className="section-subtitle">REAL NUMBERS. REAL PROBLEMS. OFFICIAL DATA.</p>

        <div className="needs-grid">
          {WHY_INDIA_NEEDS.map((item, index) => (
            <div
              key={item.id}
              className={`needs-card ${item.isAlert ? 'alert-card' : ''}`}
              onClick={() => onCardClick && onCardClick(index, 'needs')}
            >
              <span className={`needs-badge ${item.isAlert ? 'badge-alert' : ''}`}>
                {item.badge}
              </span>
              <h4 className={item.isAlert ? 'alert-title' : ''}>{item.title}</h4>
              <p className="needs-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Government Reports */}
        <div className="report-link-box">
          <p className="report-heading">📊 VERIFIED GOVT. REPORTS (2024-25):</p>
          <ul className="report-list">
            {GOVT_REPORTS.map((report, i) => (
              <li key={i}>
                <a href={report.url} target="_blank" rel="noopener noreferrer">
                  {report.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* About Box */}
        <div className="about-box">
          <div className="about-content">
            <h3>RAKSHAK: India's Digital Road Shield</h3>
            <p>
              Hum sirf stickers nahi bech rahe, hum India ke <em>Road Rage aur Towing tension</em> ko khatam kar rahe hain.{' '}
              <strong>Abhishek Technology India Private Limited</strong> ka vision hai ki har Indian driver ke paas ek aisi taqat ho jisse wo bina apna mobile number leak kiye kisi se bhi communicate kar sake.
            </p>
            <p className="about-quote">
              "Emergency mein aapka mobile lock ho sakta hai, par aapki gaadi ka <em>Rakshak Tag</em> hamesha bolta hai."
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-num">2,400+</span>
                <span className="stat-label">Saved Families</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-label">Privacy Shield</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">24/7</span>
                <span className="stat-label">Emergency Active</span>
              </div>
            </div>
          </div>
          <div className="about-shield">🛡️</div>
        </div>
      </div>
    </section>
  )
}

export default WhyIndia
