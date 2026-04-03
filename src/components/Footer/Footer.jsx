import './Footer.css'

const Footer = ({ language, onAdminLogin }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            &copy; {currentYear} Abhishek Technology India Private Limited. All Rights Reserved.
            <span
              onClick={onAdminLogin}
              style={{ cursor: 'default', opacity: 0.05, marginLeft: '4px' }}
            >
              .
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
