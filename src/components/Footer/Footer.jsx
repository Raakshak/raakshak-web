import React from 'react'
import './Footer.css'

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            © {currentYear} Abhishek Technology India Private Limited. All Rights Reserved.
          </p>
          <div className="footer-links">
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
