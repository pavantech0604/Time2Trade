import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, TrendingUp, BarChart2, Award, Globe, Clock } from 'lucide-react'
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
  { icon: Users, value: 240, suffix: 'K+', label: 'Active Traders', sub: 'Across India', color: 'teal' },
  { icon: TrendingUp, value: 94, suffix: '%', label: 'Signal Accuracy', sub: 'Last 12 months', color: 'emerald' },
  { icon: BarChart2, value: 12500, suffix: '+', label: 'Research Calls', sub: 'Published to date', color: 'blue' },
  { icon: Award, value: 8.2, suffix: 'L+', label: 'Crore Volume', sub: 'Daily traded', color: 'gold' },
  { icon: Globe, value: 50, suffix: '+', label: 'Market Segments', sub: 'Covered daily', color: 'teal' },
  { icon: Clock, value: 48, suffix: 'ms', label: 'Avg. Execution', sub: 'Lightning fast', color: 'blue' },
]

const badges = [
  { label: 'SEBI Registered', icon: '🛡️', detail: 'SEBI Research Analyst Registration INH000XXXXXX. Compliant with RA Regulations 2014.' },
  { label: 'NSE & BSE Member', icon: '📊', detail: 'Direct exchange clearing & data connectivity on National Stock Exchange and BSE.' },
  { label: '256-bit Encryption', icon: '🔒', detail: 'Bank-grade AES-256 SSL encryption protecting all credential & transaction channels.' },
  { label: 'ISO 27001 Certified', icon: '✅', detail: 'Certified Information Security Management Systems for customer data & trading infrastructure.' },
  { label: 'Expert Research Team', icon: '🎯', detail: '15+ certified SEBI analysts with over 15 years average market experience.' },
  { label: 'Real-Time Data', icon: '⚡', detail: 'Co-located tick-by-tick market feed with sub-50ms latency.' },
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
