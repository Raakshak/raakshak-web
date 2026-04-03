import React from 'react'
import { PROCESS_STEPS } from '../../utils/constants'
import './ProcessFlow.css'

const ProcessFlow = () => {
  return (
    <section className="process-section" id="process-flow">
      <div className="section-container">
        <h2 className="section-title">
          Order to <span className="highlight">Protection</span> Flow
        </h2>
        <p className="section-subtitle">YOUR JOURNEY FROM CLICK TO PROTECTED VEHICLE</p>

        <div className="process-wrapper">
          <div className="process-line"></div>
          <div className="process-grid">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="process-item">
                <div className="process-circle">{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessFlow
