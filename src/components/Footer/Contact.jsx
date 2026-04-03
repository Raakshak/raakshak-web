import React from 'react'
import { CONTACT_INFO } from '../../utils/constants'
import './Contact.css'

const Contact = ({ language }) => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="section-title">CONTACT US</h2>
        <div className="contact-info">
          <p>📧 {CONTACT_INFO.email} | 📞 {CONTACT_INFO.phone}</p>
          <p>📍 Office: {CONTACT_INFO.office}</p>
          <div className="contact-buttons">
            <a href={`tel:${CONTACT_INFO.phone}`} className="btn-contact">
              📞 CALL NOW
            </a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="btn-contact btn-whatsapp">
              💬 WHATSAPP NOW
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
