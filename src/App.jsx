import { useState } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import Reviews from './components/Reviews/Reviews'
import PremiumTools from './components/Features/PremiumTools'
import Services from './components/Features/Services'
import Contact from './components/Footer/Contact'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  const [language, setLanguage] = useState('en')

  return (
    <div className="app bg-darkBg min-h-screen">
      <Header language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <Features language={language} />
      <Reviews language={language} />
      <PremiumTools language={language} />
      <Services language={language} />
      <Contact language={language} />
      <Footer language={language} />
    </div>
  )
}

export default App
