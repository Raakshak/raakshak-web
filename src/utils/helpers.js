// Helper Functions

/**
 * Format phone number to Indian format
 */
export const formatPhoneNumber = (number) => {
  const cleaned = number.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  return cleaned
}

/**
 * Validate Indian vehicle number
 */
export const validateVehicleNumber = (number) => {
  const pattern = /^[A-Z]{2}\s?\d{2}\s?[A-Z]{2}\s?\d{4}$/i
  return pattern.test(number.toUpperCase())
}

/**
 * Validate mobile number
 */
export const validateMobileNumber = (number) => {
  const pattern = /^[6-9]\d{9}$/
  return pattern.test(number)
}

/**
 * Validate email
 */
export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

/**
 * Generate unique user ID
 */
export const generateUserId = () => {
  return `RKSK${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}`
}

/**
 * Format date to readable format
 */
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-IN', options)
}

/**
 * Convert currency to INR
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount)
}

/**
 * Get QR data URL
 */
export const generateQRCodeUrl = (data, size = 200) => {
  const encodedData = encodeURIComponent(data)
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`
}

/**
 * Handle file upload to Firebase
 */
export const getFileExtension = (file) => {
  return file.name.split('.').pop()
}

/**
 * Debounce function
 */
export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Throttle function
 */
export const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Copy to clipboard
 */
export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard!')
  }).catch(() => {
    console.error('Failed to copy')
  })
}
