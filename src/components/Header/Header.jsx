import React, { useState } from 'react'
import './Header.css'

const Header = ({ language, setLanguage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">RAKSHAK</div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#features">Why Rakshak?</a>
          <a href="#premium-tools">Premium Tools</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Right Section */}
        <div className="nav-right">
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">ENGLISH</option>
            <option value="hi">HINDI (हिन्दी)</option>
          </select>
          <button className="btn-login">ALREADY REGISTERED?</button>
        </div>
      </div>
    </header>
  )
}

export default Header
