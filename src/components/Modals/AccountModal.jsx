import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ArrowRight, ShieldCheck, Zap, User, CreditCard, Landmark, CheckCircle2 } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import './Modal.css'

export default function AccountModal() {
  const { activeModal, closeModal } = useModal()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    pan: '',
    dob: '',
    bankAccount: '',
    ifsc: '',
  })
  const [completed, setCompleted] = useState(false)

  if (activeModal !== 'account') return null

  const handleNext = (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(s => s + 1)
    } else {
      setCompleted(true)
      setTimeout(() => {
        setCompleted(false)
        setStep(1)
        closeModal()
      }, 3000)
    }
  }

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={closeModal}>
        <motion.div
          className="modal-container modal-container--lg"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div>
              <div className="modal-header__title">Open Your Free Trading Account</div>
              <div className="modal-header__subtitle">5-Minute Instant Paperless KYC · Zero Delivery Brokerage</div>
            </div>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          <div className="modal-body">
            {/* Steps indicator */}
            <div className="wizard-steps">
              <div className={`wizard-step ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <div className="wizard-step__num">{step > 1 ? <Check size={16} /> : '1'}</div>
                <div className="wizard-step__title">Mobile & Email</div>
              </div>
              <div className={`wizard-step ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <div className="wizard-step__num">{step > 2 ? <Check size={16} /> : '2'}</div>
                <div className="wizard-step__title">PAN & DOB</div>
              </div>
              <div className={`wizard-step ${step === 3 ? 'active' : ''} ${completed ? 'completed' : ''}`}>
                <div className="wizard-step__num">{completed ? <Check size={16} /> : '3'}</div>
                <div className="wizard-step__title">Bank Link</div>
              </div>
            </div>

            {completed ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={54} color="var(--emerald-600)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--navy-900)' }}>
                  Account Opening Submitted!
                </h3>
                <p className="body-md" style={{ marginTop: '8px', maxWidth: '420px', margin: '8px auto 0' }}>
                  Your e-KYC verification is processing instantly. Check your mobile number for the activation code.
                </p>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleNext}>
                {step === 1 && (
                  <>
                    <div className="modal-form__group">
                      <label className="modal-form__label">Mobile Number (Aadhaar linked)</label>
                      <input
                        type="tel"
                        className="modal-form__input"
                        placeholder="+91 98765 43210"
                        required
                        value={formData.mobile}
                        onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                      />
                    </div>
                    <div className="modal-form__group">
                      <label className="modal-form__label">Email Address</label>
                      <input
                        type="email"
                        className="modal-form__input"
                        placeholder="you@domain.com"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="modal-form__group">
                      <label className="modal-form__label">PAN Card Number</label>
                      <input
                        type="text"
                        className="modal-form__input"
                        placeholder="ABCDE1234F"
                        required
                        style={{ textTransform: 'uppercase' }}
                        value={formData.pan}
                        onChange={e => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                      />
                    </div>
                    <div className="modal-form__group">
                      <label className="modal-form__label">Date of Birth (as per PAN)</label>
                      <input
                        type="date"
                        className="modal-form__input"
                        required
                        value={formData.dob}
                        onChange={e => setFormData({ ...formData, dob: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="modal-form__group">
                      <label className="modal-form__label">Bank Account Number</label>
                      <input
                        type="text"
                        className="modal-form__input"
                        placeholder="Enter account number for funds transfer"
                        required
                        value={formData.bankAccount}
                        onChange={e => setFormData({ ...formData, bankAccount: e.target.value })}
                      />
                    </div>
                    <div className="modal-form__group">
                      <label className="modal-form__label">IFSC Code</label>
                      <input
                        type="text"
                        className="modal-form__input"
                        placeholder="HDFC0001234"
                        required
                        style={{ textTransform: 'uppercase' }}
                        value={formData.ifsc}
                        onChange={e => setFormData({ ...formData, ifsc: e.target.value.toUpperCase() })}
                      />
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
                  {step > 1 && (
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setStep(s => s - 1)}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 2, justifyContent: 'center' }}
                  >
                    {step === 3 ? 'Complete Account Creation' : 'Continue to Next Step'}
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={14} color="var(--emerald-600)" />
                  SEBI Registered & DigiLocker e-KYC Verified
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
