import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import useBodyLock from '../../hooks/useBodyLock'
import logoImg from '../../assets/icons/Rakshak.jpg'
import './Header.css'

const Header = ({ language, setLanguage, onLoginClick, onPartnerLogin, onSupportTicket, onAdminLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  useBodyLock(mobileMenuOpen)
  const [partnerDropdownOpen, setPartnerDropdownOpen] = useState(false)

  const closeMenu = useCallback(() => setMobileMenuOpen(false), [])

  const handleNavClick = useCallback(() => {
    closeMenu()
  }, [closeMenu])

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo + Brand */}
        <Link to="/" className="logo-wrap" onClick={closeMenu}>
          <img src={logoImg} alt="Rakshak" className="logo-img" />
          <span className="logo-text">RAKSHAK</span>
        </Link>

        {/* Hamburger */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        {/* Nav Links — Desktop only */}
        <nav className="nav-desktop">
          <a href="#features">Why Rakshak?</a>
          <a href="#premium-tools">Premium Tools</a>
          <a href="#services">Services</a>
          <Link to="/about">About Us</Link>
          <a href="#contact">Contact</a>
        </nav>

        {/* Right Side — Desktop only */}
        <div className="nav-right">
          <button className="btn-login" onClick={onLoginClick}>ALREADY REGISTERED?</button>
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">ENGLISH</option>
            <option value="hi">HINDI</option>
          </select>
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

      {/* Mobile Menu — Slide Panel */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-overlay" onClick={closeMenu} />
          <nav className="mobile-menu">
            <a href="#features" onClick={handleNavClick}>Why Rakshak?</a>
            <a href="#premium-tools" onClick={handleNavClick}>Premium Tools</a>
            <a href="#services" onClick={handleNavClick}>Rakshak Services</a>
            <Link to="/about" onClick={handleNavClick}>About Us</Link>
            <a href="#contact" onClick={handleNavClick}>Contact Us</a>

            <div className="mobile-divider" />

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
          </nav>
        </>
      )}
    </header>
  )
}

export default Header
