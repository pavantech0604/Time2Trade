import { COMPANY_INFO } from '../constants/companyInfo'

/**
 * Reusable CompanyAddress Component
 * @param {Object} props
 * @param {'formatted' | 'structured' | 'inline' | 'short'} [props.variant='formatted']
 * @param {string} [props.className='']
 */
export default function CompanyAddress({ variant = 'formatted', className = '' }) {
  const { address } = COMPANY_INFO

  if (variant === 'structured') {
    return (
      <div className={`company-address company-address--structured ${className}`}>
        <div className="address-line">{address.addressLine1}</div>
        <div className="address-line">{address.addressLine2}</div>
        <div className="address-line">
          {address.locality}, {address.city} - {address.pincode}
        </div>
        <div className="address-line">
          {address.state}, {address.country}
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return <span className={`company-address ${className}`}>{address.inline}</span>
  }

  if (variant === 'short') {
    return <span className={`company-address ${className}`}>{address.short}</span>
  }

  return (
    <span className={`company-address ${className}`}>
      {address.formatted}
    </span>
  )
}
