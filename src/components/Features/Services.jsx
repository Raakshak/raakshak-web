import { SERVICES } from '../../utils/constants'
import './Services.css'

const Services = ({ onServiceClick }) => {
  return (
    <section className="services-section" id="services">
      <div className="section-container">
        <h2 className="section-title section-title-lg">
          Rakshak <span className="highlight">Extra Services</span>
        </h2>
        <p className="section-subtitle">ONE STOP SOLUTION FOR ALL YOUR VEHICLE ESSENTIALS</p>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => onServiceClick && onServiceClick(service.id)}
            >
              <span className="service-badge">{service.badge}</span>
              <div className="service-icon" aria-hidden="true">{service.icon}</div>
              <h3 className="service-title">
                {service.id === 'fastag-repair' ? (
                  <>Fastag <span className="highlight">Repair</span></>
                ) : service.id === 'fastag-new' ? (
                  <>New <span className="highlight">Fastag</span></>
                ) : (
                  <>EV <span className="highlight">Station</span></>
                )}
              </h3>
              <p className="service-desc">{service.description}</p>
              <button className="btn-service" aria-label={service.buttonText}>
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
