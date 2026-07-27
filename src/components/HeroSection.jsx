import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, Shield, Users, Building2, MapPin, Award, Landmark, UserCheck, ChevronDown } from 'lucide-react'
import { useModal } from '../context/ModalContext'
import TickerStrip from './TickerStrip'
import './HeroSection.css'

/* ---- Animated SVG Chart Line ---- */
function AnimatedChart() {
  return (
    <svg className="hero__chart-bg" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(13, 148, 136, 0)" />
          <stop offset="30%" stopColor="rgba(13, 148, 136, 0.25)" />
          <stop offset="70%" stopColor="rgba(30, 58, 95, 0.25)" />
          <stop offset="100%" stopColor="rgba(30, 58, 95, 0)" />
        </linearGradient>
        <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(13, 148, 136, 0.08)" />
          <stop offset="100%" stopColor="rgba(13, 148, 136, 0)" />
        </linearGradient>
        <filter id="blur-sm">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {[50, 100, 150, 200, 250].map(y => (
        <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="rgba(15, 23, 36, 0.03)" strokeWidth="1" />
      ))}
      {[0, 200, 400, 600, 800, 1000, 1200].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="rgba(15, 23, 36, 0.03)" strokeWidth="1" />
      ))}
      <motion.path
        d="M0,230 C100,220 150,180 220,170 C290,160 340,190 420,155 C500,120 550,140 620,110 C690,80 750,130 830,95 C910,60 970,90 1050,70 C1100,55 1150,65 1200,50 L1200,300 L0,300Z"
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.path
        d="M0,230 C100,220 150,180 220,170 C290,160 340,190 420,155 C500,120 550,140 620,110 C690,80 750,130 830,95 C910,60 970,90 1050,70 C1100,55 1150,65 1200,50"
        fill="none"
        stroke="url(#chartGrad)"
        strokeWidth="2.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.circle
        cx="1200"
        cy="50"
        r="5"
        fill="var(--teal-600)"
        filter="url(#blur-sm)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7, 1] }}
        transition={{ duration: 2, delay: 2.2, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  )
}

/* ---- Mini Dashboard Mockup ---- */
function DashboardMockup() {
  const [priceIdx, setPriceIdx] = useState(0)
  const prices = ['24,386', '24,412', '24,398', '24,441', '24,429', '24,465']

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceIdx(i => (i + 1) % prices.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="hero__mockup"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mockup__header">
        <div className="mockup__dots">
          <span /><span /><span />
        </div>
        <div className="mockup__title">TIME2TRADE Terminal</div>
        <div className="mockup__badge">
          <span className="live-dot" />LIVE
        </div>
      </div>

      <div className="mockup__price-row">
        <div className="mockup__symbol">NIFTY 50</div>
        <div className="mockup__price-group">
          <motion.div
            key={priceIdx}
            className="mockup__price"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {prices[priceIdx]}
          </motion.div>
          <div className="mockup__change up">▲ +127.35 (+0.52%)</div>
        </div>
      </div>

      <div className="mockup__sparkline">
        <svg viewBox="0 0 260 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(13, 148, 136, 0.2)" />
              <stop offset="100%" stopColor="rgba(13, 148, 136, 0)" />
            </linearGradient>
          </defs>
          <path d="M0,45 C30,40 50,35 70,28 C90,21 110,32 130,22 C150,12 170,25 190,15 C210,5 230,18 260,8 L260,60 L0,60Z"
            fill="url(#sparkGrad)" />
          <path d="M0,45 C30,40 50,35 70,28 C90,21 110,32 130,22 C150,12 170,25 190,15 C210,5 230,18 260,8"
            fill="none" stroke="var(--teal-600)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="mockup__signals">
        <div className="signal-card buy">
          <div className="signal-label">BUY Signal</div>
          <div className="signal-asset">RELIANCE</div>
          <div className="signal-price">₹2,847 <span>Target: ₹3,050</span></div>
        </div>
        <div className="signal-card sell">
          <div className="signal-label">WATCH</div>
          <div className="signal-asset">BANKNIFTY</div>
          <div className="signal-price">52,174 <span>Support: 51,800</span></div>
        </div>
      </div>

      <div className="mockup__portfolio">
        <div className="port-item">
          <div className="port-label">Portfolio</div>
          <div className="port-value">₹12.4L</div>
          <div className="port-change up">+18.6% YTD</div>
        </div>
        <div className="port-item">
          <div className="port-label">Today P&L</div>
          <div className="port-value up">+₹8,420</div>
          <div className="port-change up">+0.68%</div>
        </div>
        <div className="port-item">
          <div className="port-label">Active Trades</div>
          <div className="port-value">6</div>
          <div className="port-change">Open Positions</div>
        </div>
      </div>
    </motion.div>
  )
}

/* ---- Hero Stat Pills ---- */
function StatPill({ icon: Icon, value, label, delay }) {
  return (
    <motion.div
      className="hero__stat-pill"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="hero__stat-icon">
        <Icon size={16} />
      </div>
      <div>
        <div className="hero__stat-value">{value}</div>
        <div className="hero__stat-label">{label}</div>
      </div>
    </motion.div>
  )
}

/* ---- Main Hero ---- */
export default function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const { openAccount, openDemo, openInfo } = useModal()

  return (
    <section id="hero" className="hero" ref={containerRef}>
      <TickerStrip />
      <div className="hero__bg-glow hero__bg-glow--teal" aria-hidden="true" />
      <div className="hero__bg-glow hero__bg-glow--blue" aria-hidden="true" />
      <div className="hero__bg-grid" aria-hidden="true" />

      <motion.div className="hero__chart-wrapper" style={{ y }}>
        <AnimatedChart />
      </motion.div>

      <div className="container">
        <div className="hero__layout">
          {/* Left: Copy */}
          <div className="hero__copy">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="section-tag">
                <span>India's Premium Trading Intelligence Platform</span>
              </div>
            </motion.div>

            <motion.h1
              className="display-xl hero__headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              Trade with{' '}
              <span className="text-gradient-teal">Precision.</span>
              <br />
              Invest with{' '}
              <span className="text-gradient-gold">Confidence.</span>
            </motion.h1>

            <motion.p
              className="body-lg hero__subheadline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Research-backed signals, real-time market intelligence, and AI-assisted
              trade ideas — all in one platform built for serious traders who demand
              more from their tools.
            </motion.p>

            <motion.div
              className="hero__cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                className="btn btn-primary btn-lg"
                id="hero-open-account"
                onClick={() => openAccount(1)}
              >
                Open Free Account
                <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-outline btn-lg"
                id="hero-watch-demo"
                onClick={() => openDemo()}
              >
                <Play size={16} fill="currentColor" />
                Watch Demo
              </button>
            </motion.div>

            {/* Trust line */}
            <motion.div
              className="hero__trust-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={() => openInfo({ title: 'Platform Security & Compliance', subtitle: 'Security & Infrastructure Details' })}
              style={{ cursor: 'pointer' }}
            >
              <Shield size={13} />
              <span>ISO 27001 Certified &bull; Bank-Grade Security &bull; Zero Brokerage on Equity Delivery</span>
            </motion.div>

            {/* Stat pills */}
            <div className="hero__stats">
              <StatPill icon={Users} value="70K+" label="Active Traders" delay={0.7} />
              <StatPill icon={MapPin} value="150+" label="Cities in India" delay={0.8} />
              <StatPill icon={Building2} value="300+" label="Corporate Relations" delay={0.9} />
              <StatPill icon={Award} value="80+ Yrs" label="Market Experience" delay={1.0} />
              <StatPill icon={Landmark} value="150+" label="Inst. Empanelments" delay={1.1} />
              <StatPill icon={UserCheck} value="50+" label="Research Analysts" delay={1.2} />
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="hero__mockup-wrapper">
            <DashboardMockup />
            {/* Floating badges */}
            <motion.div
              className="hero__float-badge hero__float-badge--1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              onClick={() => openInfo({ title: 'Top Market Pick', subtitle: 'BAJFINANCE +2.4% Momentum Alert & Target Analysis' })}
              title="Click to view signal details"
            >
              <TrendingUp size={16} className="badge-icon-up" />
              <div>
                <div className="float-badge-title">Today's Top Pick</div>
                <div className="float-badge-value">BAJFINANCE +2.4%</div>
              </div>
            </motion.div>
            <motion.div
              className="hero__float-badge hero__float-badge--2"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              onClick={() => openInfo({ title: 'Capital Protection & Risk Management', subtitle: 'Automated Risk Limits & Institutional Stop Loss Tracking' })}
              title="Click to view risk parameters"
            >
              <Shield size={16} className="badge-icon-safe" />
              <div>
                <div className="float-badge-title">Risk Score</div>
                <div className="float-badge-value">Protected — Low Risk</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Scroll Down Indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        onClick={() => {
          document.getElementById('trust')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <span>Explore Platform</span>
        <ChevronDown size={14} className="scroll-arrow" />
      </motion.div>

      <div className="hero__bottom-fade" aria-hidden="true" />
    </section>
  )
}
