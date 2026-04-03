import { useAppContext } from '../context/AppContext'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Features from '../components/Features/Features'
import ProcessFlow from '../components/Features/ProcessFlow'
import WhyIndia from '../components/Features/WhyIndia'
import Reviews from '../components/Reviews/Reviews'
import PremiumTools from '../components/Features/PremiumTools'
import Services from '../components/Features/Services'
import Contact from '../components/Footer/Contact'
import Footer from '../components/Footer/Footer'

const HomePage = () => {
  const {
    language,
    setLanguage,
    handleRegisterClick,
    handleLoginClick,
    handleBenefitSlider,
    handleServiceClick,
    setPartnerLoginOpen,
    setSupportTicketOpen,
    setAdminLoginOpen,
  } = useAppContext()

  return (
    <>
      <Header
        language={language}
        setLanguage={setLanguage}
        onLoginClick={handleLoginClick}
        onPartnerLogin={() => setPartnerLoginOpen(true)}
        onSupportTicket={() => setSupportTicketOpen(true)}
        onAdminLogin={() => setAdminLoginOpen(true)}
      />
      <main>
        <Hero language={language} onRegisterClick={handleRegisterClick} />
        <Features language={language} onCardClick={handleBenefitSlider} />
        <ProcessFlow />
        <WhyIndia onCardClick={handleBenefitSlider} />
        <Reviews language={language} />
        <PremiumTools language={language} onLoginClick={handleLoginClick} />
        <Services language={language} onServiceClick={handleServiceClick} />
        <Contact language={language} />
      </main>
      <Footer
        language={language}
        onAdminLogin={() => setAdminLoginOpen(true)}
      />
    </>
  )
}

export default HomePage
