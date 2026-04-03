import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import './Header.css'

const Header = ({ language, setLanguage, onLoginClick, onPartnerLogin, onSupportTicket, onAdminLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [partnerDropdownOpen, setPartnerDropdownOpen] = useState(false)

  const closeMenu = useCallback(() => setMobileMenuOpen(false), [])

  const handleNavClick = useCallback(() => {
    closeMenu()
  }, [closeMenu])

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">RAKSHAK</div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        <nav
          className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <a href="#features" onClick={handleNavClick}>Why Rakshak?</a>
          <a href="#premium-tools" onClick={handleNavClick}>Premium Tools</a>
          <a href="#services" onClick={handleNavClick}>Rakshak Services</a>
          <Link to="/about" onClick={handleNavClick}>About Us</Link>
          <a href="#contact" onClick={handleNavClick}>Contact Us</a>

          {/* Mobile Only Links */}
          <div className="mobile-auth-section">
            <button className="mobile-link highlight-link" onClick={() => { closeMenu(); onLoginClick() }}>
              ALREADY REGISTERED?
            </button>
            <button className="mobile-link" onClick={() => { closeMenu(); onPartnerLogin() }}>
              Partner Login
            </button>
            <button className="mobile-link" onClick={() => { closeMenu(); onSupportTicket() }}>
              Support & Ticket
            </button>
            <button className="mobile-link" onClick={() => { closeMenu(); onAdminLogin() }}>
              Admin Login
            </button>
          </div>
        </nav>

        {/* Desktop Right */}
        <div className="nav-right">
          <button className="btn-login" onClick={onLoginClick} aria-label="Login or register">
            ALREADY REGISTERED?
          </button>
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select language"
          >
            <option value="en">ENGLISH</option>
            <option value="hi">HINDI (हिन्दी)</option>
          </select>

          {/* Partner Zone Dropdown */}
          <div
            className="partner-dropdown"
            onMouseEnter={() => setPartnerDropdownOpen(true)}
            onMouseLeave={() => setPartnerDropdownOpen(false)}
          >
            <button className="partner-zone-btn">PARTNER ZONE ▼</button>
            {partnerDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={onPartnerLogin}>Partner Login</button>
                <button onClick={onSupportTicket}>Support & Ticket</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  )
}

export default Header
