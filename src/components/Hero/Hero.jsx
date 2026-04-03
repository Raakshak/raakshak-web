import React from 'react'
import './Hero.css'

const Hero = ({ language }) => {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="hero-content">
        <div className="hero-counter">
          <span className="blinking-dot">●</span> 2,484 VEHICLES PROTECTED TODAY
        </div>
        <h1 className="hero-title">Protect Your Vehicle's Privacy</h1>
        <p className="hero-tagline">HAR GAADI KA GUARDIAN</p>
        <button className="btn-register">REGISTER YOUR VEHICLE</button>
      </div>
    </section>
  )
}

export default Hero
