import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Zap, Shield, BarChart2, TrendingUp, Cpu, CheckCircle } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import './Modal.css'

export default function DemoModal() {
  const { activeModal, closeModal, openAccount } = useModal()

  if (activeModal !== 'demo') return null

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={closeModal}>
        <motion.div
          className="modal-container modal-container--xl"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div>
              <div className="modal-header__title">TIME2TRADE Pro Terminal Demo</div>
              <div className="modal-header__subtitle">Experience real-time data streaming & AI-assisted signals</div>
            </div>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Screen Mockup / Demo player */}
            <div
              style={{
                width: '100%',
                height: '320px',
                background: 'linear-gradient(135deg, var(--navy-900), #16243b)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle at 50% 50%, var(--teal-400) 0%, transparent 60%)' }} />
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--teal-600), var(--teal-500))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(13, 148, 136, 0.6)',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
              >
                <Play size={28} color="#ffffff" style={{ marginLeft: '4px' }} />
              </div>
              <div style={{ color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginTop: '16px', zIndex: 2 }}>
                Watch TIME2TRADE Live Platform Walkthrough
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', zIndex: 2 }}>
                Full HD Interactive Demo (3m 45s)
              </div>
            </div>

            {/* Feature highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div style={{ background: 'var(--surface-1)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-700)', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                  <Zap size={16} /> Sub-50ms Data Feed
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Direct low-latency tick streams straight from NSE/BSE servers.
                </div>
              </div>

              <div style={{ background: 'var(--surface-1)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-600)', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                  <BarChart2 size={16} /> Analyst Research Desk
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Real-time entry, target, and stop-loss calls verified by senior research analysts.
                </div>
              </div>

              <div style={{ background: 'var(--surface-1)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-700)', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                  <Shield size={16} /> Built-in Risk Management
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Position sizing calculators and automatic risk-reward ratio indicators.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
              <button className="btn btn-outline" onClick={closeModal}>Close Demo</button>
              <button className="btn btn-primary" onClick={() => openAccount(1)}>
                Open Free Account Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
