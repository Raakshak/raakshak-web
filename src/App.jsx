import { ConfigProvider, theme } from 'antd'
import { AppProvider, useAppContext } from './context/AppContext'
import AppRouter from './router/AppRouter'
import RegistrationModal from './components/Auth/RegistrationModal'
import PremiumStudioModal from './components/Auth/PremiumStudioModal'
import SuccessModal from './components/Auth/SuccessModal'
import LoginModal from './components/Auth/LoginModal'
import AdminLoginModal from './components/Auth/AdminLoginModal'
import PartnerLoginModal from './components/Auth/PartnerLoginModal'
import SupportTicketModal from './components/Auth/SupportTicketModal'
import ServiceInquiryModal from './components/Auth/ServiceInquiryModal'
import BenefitsSlider from './components/Features/BenefitsSlider'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import './App.css'

function GlobalModals() {
  const {
    registrationOpen, setRegistrationOpen,
    loginOpen, setLoginOpen,
    adminLoginOpen, setAdminLoginOpen,
    partnerLoginOpen, setPartnerLoginOpen,
    supportTicketOpen, setSupportTicketOpen,
    studioOpen, setStudioOpen,
    successOpen, setSuccessOpen, successData, setSuccessData,
    serviceInquiryOpen, setServiceInquiryOpen, activeServiceType, setActiveServiceType,
    sliderOpen, setSliderOpen, sliderIndex, sliderCategory,
    currentVehicleNum,
    handleRegistrationSuccess, handleOpenStudio,
  } = useAppContext()

  return (
    <>
      <RegistrationModal
        open={registrationOpen}
        onClose={() => setRegistrationOpen(false)}
        onSuccess={handleRegistrationSuccess}
        onOpenStudio={handleOpenStudio}
      />
      <PremiumStudioModal
        open={studioOpen}
        onClose={() => setStudioOpen(false)}
        vehicleNum={currentVehicleNum}
      />
      <SuccessModal
        open={successOpen}
        onClose={() => { setSuccessOpen(false); setSuccessData(null) }}
        data={successData}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
      <AdminLoginModal
        open={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
      />
      <PartnerLoginModal
        open={partnerLoginOpen}
        onClose={() => setPartnerLoginOpen(false)}
      />
      <SupportTicketModal
        open={supportTicketOpen}
        onClose={() => setSupportTicketOpen(false)}
      />
      <ServiceInquiryModal
        open={serviceInquiryOpen}
        onClose={() => { setServiceInquiryOpen(false); setActiveServiceType(null) }}
        serviceType={activeServiceType}
      />
      <BenefitsSlider
        open={sliderOpen}
        onClose={() => setSliderOpen(false)}
        initialIndex={sliderIndex}
        category={sliderCategory}
      />
    </>
  )
}

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#F28C38',
          borderRadius: 10,
          fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
        },
      }}
    >
      <ErrorBoundary>
        <AppProvider>
          <div className="app bg-darkBg min-h-screen">
            <AppRouter>
              <GlobalModals />
            </AppRouter>
          </div>
        </AppProvider>
      </ErrorBoundary>
    </ConfigProvider>
  )
}

export default App
