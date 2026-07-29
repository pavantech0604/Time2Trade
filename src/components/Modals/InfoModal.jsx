import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, MapPin, Star } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import CompanyAddress from '../CompanyAddress'
import { COMPANY_INFO } from '../../constants/companyInfo'
import './Modal.css'

export default function InfoModal() {
  const { activeModal, modalData, closeModal, openAccount } = useModal()

  if (activeModal !== 'info') return null

  const { title = 'Information & Legal Disclosure', subtitle = 'TIME2TRADE Platform Policy', content, type = 'info', callData, traderData } = modalData

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
              <div className="modal-header__title">{title}</div>
              <div className="modal-header__subtitle">{subtitle}</div>
            </div>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          <div className="modal-body">
            {traderData ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
                  <div className={`testimonial-avatar avatar--${traderData.color}`} style={{ width: '48px', height: '48px', fontSize: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: 'var(--font-display)', border: '1px solid transparent' }}>
                    {traderData.avatar}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--navy-900)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {traderData.name}
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--emerald-700)', background: 'rgba(16, 185, 129, 0.08)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} fill="var(--emerald-600)" color="white" /> Verified P&L
                      </span>
                    </h3>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{traderData.role} &bull; {traderData.location}</span>
                      <span style={{ display: 'inline-flex', gap: '1.5px' }}>
                        {Array.from({ length: traderData.rating }).map((_, i) => (
                          <Star key={i} size={11} fill="var(--gold-400)" color="var(--gold-400)" />
                        ))}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div style={{ padding: '16px', background: 'rgba(13,148,136,0.04)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(13,148,136,0.15)', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Performance Record</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--teal-700)', fontFamily: 'var(--font-display)', marginTop: '4px' }}>{traderData.stats.metric}</div>
                  </div>
                  <div style={{ padding: '16px', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Timeframe</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navy-900)', marginTop: '6px' }}>{traderData.stats.period}</div>
                  </div>
                  <div style={{ padding: '16px', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Membership</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy-900)', marginTop: '6px' }}>{traderData.memberSince}</div>
                  </div>
                </div>

                <div style={{ background: 'var(--surface-1)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>Verified Trader Feedback</div>
                  <blockquote style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                    "{traderData.text}"
                  </blockquote>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                  <button className="btn btn-outline" onClick={closeModal}>Close Profile</button>
                  <button className="btn btn-primary" onClick={() => openAccount(1)}>
                    Follow {traderData.name.split(' ')[0]}'s Trades
                  </button>
                </div>
              </div>
            ) : callData ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-1)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div>
                    <span className={`badge ${callData.action === 'BUY' ? 'badge-emerald' : 'badge-gold'}`} style={{ marginBottom: '6px' }}>
                      {callData.action} {callData.type}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--navy-900)' }}>
                      {callData.symbol}
                    </h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Confidence Rating</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--teal-700)', fontFamily: 'var(--font-mono)' }}>
                      {callData.confidence}%
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div style={{ padding: '12px', background: 'var(--surface-1)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recommended Entry</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--navy-900)' }}>{callData.entry}</div>
                  </div>
                  <div style={{ padding: '12px', background: 'rgba(16,185,129,0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--emerald-700)', textTransform: 'uppercase' }}>Target Level</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--emerald-700)' }}>{callData.target}</div>
                  </div>
                  <div style={{ padding: '12px', background: 'rgba(239,68,68,0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--red-600)', textTransform: 'uppercase' }}>Stop Loss</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--red-600)' }}>{callData.sl}</div>
                  </div>
                </div>

                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, background: 'var(--surface-1)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                  <strong>Analyst Rationale:</strong> Strong technical breakout above 20-DMA on 3x average volume. Option chain shows heavy writing at lower strikes supporting momentum toward target level.
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                  <button className="btn btn-outline" onClick={closeModal}>Close</button>
                  <button className="btn btn-primary" onClick={() => openAccount(1)}>
                    Trade This Signal Now
                  </button>
                </div>
              </div>
            ) : content ? (
              <div style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {content}
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-navy" onClick={closeModal}>I Understand</button>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <p style={{ marginBottom: '14px' }}>
                  <strong>Security & Compliance:</strong> TIME2TRADE operates under institutional compliance standards, strict data protection, and bank-grade SSL security protocols.
                </p>
                <p style={{ marginBottom: '14px' }}>
                  <strong>Market Risk Warning:</strong> Trading in equities, derivatives (F&O), commodities, and currencies involves substantial risk of loss and is not suitable for every investor. Valuation of investments can fluctuate, and investors may lose more than their initial investment.
                </p>
                <p style={{ marginBottom: '14px' }}>
                  <strong>Data Privacy Policy:</strong> All customer information is encrypted using bank-grade AES-256 standards. We do not sell or share personal trading data with third parties.
                </p>
                <div style={{ marginTop: '16px', padding: '14px', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ color: 'var(--navy-900)', display: 'block', marginBottom: '4px' }}>
                    Registered Office Address — {COMPANY_INFO.legalName}:
                  </strong>
                  <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '4px' }}>
                    <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--teal-700)' }} />
                    <CompanyAddress variant="formatted" />
                  </div>
                </div>
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-navy" onClick={closeModal}>Close Window</button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
