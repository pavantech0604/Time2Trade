import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import './Modal.css'

export default function AuthModal() {
  const { activeModal, modalData, closeModal, openAccount } = useModal()
  const [tab, setTab] = useState(modalData?.tab || 'signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (activeModal !== 'auth') return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      closeModal()
    }, 2000)
  }

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={closeModal}>
        <motion.div
          className="modal-container"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div>
              <div className="modal-header__title">
                {tab === 'signin' ? 'Sign In to TIME2TRADE' : 'Create Free Account'}
              </div>
              <div className="modal-header__subtitle">
                {tab === 'signin'
                  ? 'Access real-time intelligence & live trading terminal'
                  : 'Start trading with premium research intelligence'}
              </div>
            </div>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-tabs">
              <button
                className={`modal-tab ${tab === 'signin' ? 'active' : ''}`}
                onClick={() => { setTab('signin'); setSubmitted(false); }}
              >
                Sign In
              </button>
              <button
                className={`modal-tab ${tab === 'signup' ? 'active' : ''}`}
                onClick={() => { openAccount(1); }}
              >
                Register Free
              </button>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={48} color="var(--emerald-600)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--navy-900)' }}>
                  Authentication Successful!
                </h3>
                <p className="body-sm" style={{ marginTop: '8px' }}>
                  Redirecting to TIME2TRADE Pro Terminal...
                </p>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="modal-form__group">
                  <label className="modal-form__label">Email or Mobile Number</label>
                  <input
                    type="text"
                    className="modal-form__input"
                    placeholder="trader@example.com / +91 9876543210"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="modal-form__group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="modal-form__label">Password / OTP</label>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '12px', color: 'var(--teal-700)', textDecoration: 'none' }}>
                      Forgot?
                    </a>
                  </div>
                  <input
                    type="password"
                    className="modal-form__input"
                    placeholder="Enter password or 6-digit OTP"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                  Sign In to Terminal
                  <ArrowRight size={18} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={14} color="var(--emerald-600)" />
                  256-Bit Encrypted & Secure Encrypted Connection
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
