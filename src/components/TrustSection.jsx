import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Zap, Target, Activity, ShieldCheck, Star } from 'lucide-react'
import { useModal } from '../context/ModalContext'
import './TrustSection.css'

function CountUp({ end, suffix = '', prefix = '', duration = 2500 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const endValue = parseFloat(end)

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * endValue)
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(endValue)
    }

    requestAnimationFrame(tick)
  }, [inView, end, duration])

  const formattedCount = Math.floor(count).toLocaleString('en-IN')

  return (
    <span ref={ref}>
      {prefix}{formattedCount}{suffix}
    </span>
  )
}

const stats = [
  { icon: TrendingUp, value: 4500, prefix: '₹', suffix: ' Cr+', label: 'Daily Trading Volume', sub: 'Across NSE, BSE & MCX', color: 'teal' },
  { icon: Zap, value: 10, prefix: '< ', suffix: ' ms', label: 'Execution Speed', sub: 'Ultra-low latency infrastructure', color: 'emerald' },
  { icon: Target, value: 95, suffix: '%', label: 'Signal Accuracy', sub: 'AI & Quant research verified', color: 'blue' },
  { icon: Activity, value: 4000, suffix: '+', label: 'Stocks Scanned', sub: 'Real-time market radar', color: 'gold' },
  { icon: ShieldCheck, value: 100, suffix: '%', label: 'Capital & Risk Protection', sub: 'Automated stop-loss limits', color: 'teal' },
  { icon: Star, value: 99, suffix: '.9%', label: 'Platform Uptime', sub: 'Institutional SLA reliability', color: 'blue' },
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
                <CountUp end={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix} duration={2200} />
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
