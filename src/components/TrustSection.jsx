import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Building2, MapPin, Award, Landmark, UserCheck } from 'lucide-react'
import { useModal } from '../context/ModalContext'
import './TrustSection.css'

function CountUp({ end, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const endValue = parseFloat(end)

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * endValue * 10) / 10)
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(endValue)
    }

    requestAnimationFrame(tick)
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{typeof count === 'number' && end % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}{suffix}
    </span>
  )
}

const stats = [
  { icon: Users, value: 70, suffix: 'K+', label: 'Active Traders', sub: 'Across India', color: 'teal' },
  { icon: Building2, value: 300, suffix: '+', label: 'Corporate Relationships', sub: 'Across major industries', color: 'emerald' },
  { icon: MapPin, value: 150, suffix: '+', label: 'Cities Covered', sub: 'Pan-India footprint', color: 'blue' },
  { icon: Award, value: 80, suffix: '+ Yrs', label: 'Market Experience', sub: 'Combined leadership tenure', color: 'gold' },
  { icon: Landmark, value: 150, suffix: '+', label: 'Institutional Empanelments', sub: 'Banks & institutions', color: 'teal' },
  { icon: UserCheck, value: 50, suffix: '+', label: 'Research Analysts', sub: 'Across research domains', color: 'blue' },
]

const badges = [
  { label: 'Bank-Grade Security', icon: '🛡️', detail: 'Bank-grade AES-256 SSL encryption & strict security protocols protecting customer data and assets.' },
  { label: 'NSE & BSE Member', icon: '📊', detail: 'Direct exchange clearing & data connectivity on National Stock Exchange and BSE.' },
  { label: '256-bit Encryption', icon: '🔒', detail: 'Bank-grade AES-256 SSL encryption protecting all credential & transaction channels.' },
  { label: 'ISO 27001 Certified', icon: '✅', detail: 'Certified Information Security Management Systems for customer data & trading infrastructure.' },
  { label: 'Expert Research Team', icon: '🎯', detail: '50+ certified senior research analysts across equities, derivatives, and macro domains.' },
  { label: 'Pan-India Footprint', icon: '🌐', detail: 'Serving active traders and investors across 150+ cities with 150+ institutional empanelments.' },
]

export default function TrustSection() {
  const { openInfo } = useModal()

  return (
    <section id="trust" className="trust-section section">
      <div className="divider" />

      <div className="container">
        <motion.div
          className="trust__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Proven Performance</div>
          <h2 className="display-md">
            Numbers that speak for{' '}
            <span className="text-gradient-teal">themselves</span>
          </h2>
          <p className="body-lg text-secondary" style={{ maxWidth: 540 }}>
            Built for India's serious traders. Trusted by professionals,
            retail investors, and aspirants who want an edge in the market.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="trust__stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`trust__stat-card stat-color--${stat.color}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => openInfo({ title: `${stat.label} Breakdown`, subtitle: stat.sub })}
              style={{ cursor: 'pointer' }}
            >
              <div className="trust__stat-icon">
                <stat.icon size={20} />
              </div>
              <div className="trust__stat-number">
                <CountUp end={stat.value} suffix={stat.suffix} duration={2200} />
              </div>
              <div className="trust__stat-label">{stat.label}</div>
              <div className="trust__stat-sub">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          className="trust__badges"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {badges.map((b, i) => (
            <button
              key={i}
              className="trust__badge-item"
              onClick={() => openInfo({ title: b.label, subtitle: 'Trust & Compliance Certification', content: b.detail })}
              style={{ cursor: 'pointer' }}
            >
              <span className="trust__badge-icon">{b.icon}</span>
              <span className="trust__badge-label">{b.label}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
