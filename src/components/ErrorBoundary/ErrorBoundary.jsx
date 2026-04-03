import React from 'react'
import './ErrorBoundary.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-text">
              We're sorry for the inconvenience. Please refresh the page.
            </p>
            <button
              className="error-btn"
              onClick={() => window.location.reload()}
            >
              REFRESH PAGE
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
