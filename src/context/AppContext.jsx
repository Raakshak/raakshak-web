import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  // Auth state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = sessionStorage.getItem('rakshak_user')
    return saved ? JSON.parse(saved) : null
  })

  const loginUser = useCallback((userData) => {
    setCurrentUser(userData)
    sessionStorage.setItem('rakshak_user', JSON.stringify(userData))
  }, [])

  const logoutUser = useCallback(() => {
    setCurrentUser(null)
    sessionStorage.removeItem('rakshak_user')
  }, [])

  // Modal states
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [adminLoginOpen, setAdminLoginOpen] = useState(false)
  const [partnerLoginOpen, setPartnerLoginOpen] = useState(false)
  const [supportTicketOpen, setSupportTicketOpen] = useState(false)
  const [studioOpen, setStudioOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [successData, setSuccessData] = useState(null)
  const [serviceInquiryOpen, setServiceInquiryOpen] = useState(false)
  const [activeServiceType, setActiveServiceType] = useState(null)

  // Benefits slider
  const [sliderOpen, setSliderOpen] = useState(false)
  const [sliderIndex, setSliderIndex] = useState(0)
  const [sliderCategory, setSliderCategory] = useState('love')

  // Vehicle number for studio
  const [currentVehicleNum, setCurrentVehicleNum] = useState('')

  // Handlers
  const handleRegisterClick = useCallback(() => setRegistrationOpen(true), [])
  const handleLoginClick = useCallback(() => setLoginOpen(true), [])

  const handleRegistrationSuccess = useCallback((data) => {
    setSuccessData(data)
    setSuccessOpen(true)
  }, [])

  const handleOpenStudio = useCallback(() => setStudioOpen(true), [])

  const handleServiceClick = useCallback((serviceId) => {
    setActiveServiceType(serviceId)
    setServiceInquiryOpen(true)
  }, [])

  const handleBenefitSlider = useCallback((index, category) => {
    setSliderIndex(index)
    setSliderCategory(category)
    setSliderOpen(true)
  }, [])

  const value = {
    // Auth
    currentUser,
    loginUser,
    logoutUser,

    // Language
    language,
    setLanguage,

    // Modal states
    registrationOpen, setRegistrationOpen,
    loginOpen, setLoginOpen,
    adminLoginOpen, setAdminLoginOpen,
    partnerLoginOpen, setPartnerLoginOpen,
    supportTicketOpen, setSupportTicketOpen,
    studioOpen, setStudioOpen,
    successOpen, setSuccessOpen,
    successData, setSuccessData,
    serviceInquiryOpen, setServiceInquiryOpen,
    activeServiceType, setActiveServiceType,
    sliderOpen, setSliderOpen,
    sliderIndex, sliderCategory,
    currentVehicleNum, setCurrentVehicleNum,

    // Handlers
    handleRegisterClick,
    handleLoginClick,
    handleRegistrationSuccess,
    handleOpenStudio,
    handleServiceClick,
    handleBenefitSlider,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
