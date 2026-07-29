/**
 * TIME 2 TRADE Private Limited — Company Information & Address Single Source of Truth
 */

export const COMPANY_INFO = {
  name: 'TIME 2 TRADE Private Limited',
  legalName: 'TIME 2 TRADE Private Limited',
  shortName: 'TIME2TRADE',
  cin: 'UXXXXXXXXXXXXXXXXX',
  email: 'support@time2trade.in',
  phone: '1800 123 4567 (Toll Free)',
  
  // Structured Address Fields
  address: {
    addressLine1: '3rd Floor, Sadhana House',
    addressLine2: '570, P.B. Marg',
    locality: 'Worli',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400018',
    country: 'India',
    
    // Full-formatted display string for legal/compliance use
    formatted: '3rd Floor, Sadhana House, 570, P.B. Marg, Worli, Mumbai - 400018, Maharashtra, India',
    inline: '3rd Floor, Sadhana House, 570, P.B. Marg, Worli, Mumbai - 400018, Maharashtra, India',
    short: 'Worli, Mumbai - 400018, Maharashtra, India'
  }
}

/**
 * Address & Pincode Validation Rules
 */
export const ADDRESS_VALIDATION = {
  // Pincode validation: 6 digits (Indian PIN format)
  pincodeRegex: /^[1-9][0-9]{5}$/,

  // Address validation: Allows letters, numbers, spaces, commas, periods, hyphens, slashes, hash & parens
  // Accepts abbreviations like "P.B. Marg", "3rd Floor", "570, P.B. Marg"
  addressTextRegex: /^[a-zA-Z0-9\s,.\-/#()&]+$/,

  validateAddress: (addr) => {
    if (!addr || typeof addr !== 'string') return false
    return ADDRESS_VALIDATION.addressTextRegex.test(addr.trim())
  },

  validatePincode: (pin) => {
    if (!pin) return false
    return ADDRESS_VALIDATION.pincodeRegex.test(String(pin).trim())
  }
}
