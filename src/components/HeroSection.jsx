import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Shield, TrendingUp, Users, Building2, MapPin, Award, Landmark, UserCheck, ChevronDown, Sun, Moon, Coins, Sparkles, Clock } from 'lucide-react'
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

/* ---- Market Timing Engine (IST: Mon-Fri 09:15 - 15:30) ---- */
function getMarketSessionInfo() {
  const now = new Date()
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  const istTime = new Date(utc + (3600000 * 5.5)) // IST offset +5:30

  const day = istTime.getDay() // 0=Sun, 1=Mon... 6=Sat
  const hours = istTime.getHours()
  const mins = istTime.getMinutes()
  const timeInMinutes = hours * 60 + mins

  const isWeekday = day >= 1 && day <= 5
  // 09:15 AM = 555 mins, 15:30 PM = 930 mins
  const isEquityOpen = isWeekday && (timeInMinutes >= 555 && timeInMinutes <= 930)

  const timeString = istTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  return {
    isEquityOpen,
    timeString,
    defaultTab: isEquityOpen ? 'nifty' : 'gold'
  }
}

/* ---- Real-Time Market Datasets ---- */
const MARKET_ASSETS = {
  nifty: {
    id: 'nifty',
    symbol: 'NIFTY 50',
    type: 'EQUITY',
    tag: 'NSE INDIA • LIVE MARKET',
    prices: ['24,386', '24,412', '24,398', '24,441', '24,429', '24,465'],
    change: '▲ +127.35 (+0.52%)',
    isUp: true,
    accent: 'emerald',
    strokeColor: '#059669',
    gradId: 'sparkGradTeal',
    gradColor: 'rgba(16, 185, 129, 0.25)',
    signals: [
      { type: 'BUY', label: 'BUY SIGNAL', asset: 'RELIANCE', price: '₹2,847', detail: 'Target: ₹3,050', isUp: true },
      { type: 'WATCH', label: 'WATCH', asset: 'BANKNIFTY', price: '52,174', detail: 'Support: 51,800', isUp: true }
    ],
    portfolio: [
      { label: 'Equity Portfolio', value: '₹12.4L', change: '+18.6% YTD', isUp: true },
      { label: 'Today P&L', value: '+₹8,420', change: '+0.68%', isUp: true },
      { label: 'Active Trades', value: '6', change: 'Open Positions', isUp: false }
    ]
  },
  banknifty: {
    id: 'banknifty',
    symbol: 'BANK NIFTY',
    type: 'EQUITY',
    tag: 'NSE INDIA • LIVE MARKET',
    prices: ['52,110', '52,174', '52,240', '52,190', '52,280', '52,350'],
    change: '▲ +340.80 (+0.66%)',
    isUp: true,
    accent: 'emerald',
    strokeColor: '#0d9488',
    gradId: 'sparkGradBank',
    gradColor: 'rgba(13, 148, 136, 0.25)',
    signals: [
      { type: 'BUY', label: 'BUY CALL', asset: 'HDFCBANK 1650 CE', price: '₹34.50', detail: 'Target: ₹52.00', isUp: true },
      { type: 'BUY', label: 'ACCUMULATE', asset: 'ICICIBANK', price: '₹1,210', detail: 'Target: ₹1,300', isUp: true }
    ],
    portfolio: [
      { label: 'Bank Index Call', value: '₹4.2L', change: '+22.4% YTD', isUp: true },
      { label: 'Options P&L', value: '+₹6,150', change: '+1.48%', isUp: true },
      { label: 'Open Lots', value: '4 Lots', change: 'F&O Derivatives', isUp: false }
    ]
  },
  gold: {
    id: 'gold',
    symbol: 'MCX GOLD 24K',
    type: 'COMMODITY',
    tag: 'AFTER-HOURS • MCX BULLION',
    prices: ['72,410', '72,450', '72,480', '72,520', '72,490', '72,560'],
    change: '▲ +540.00 (+0.75%)',
    isUp: true,
    accent: 'gold',
    strokeColor: '#d97706',
    gradId: 'sparkGradGold',
    gradColor: 'rgba(217, 119, 6, 0.25)',
    signals: [
      { type: 'BUY', label: 'BUY BULLION', asset: 'GOLD 10g (AUG)', price: '₹72,450', detail: 'Target: ₹73,500', isUp: true, theme: 'gold' },
      { type: 'ACCUMULATE', label: 'ACCUMULATE', asset: 'GOLD PETAL', price: '₹7,245', detail: 'Target: ₹7,400', isUp: true, theme: 'gold' }
    ],
    portfolio: [
      { label: 'Bullion Holding', value: '250g Gold', change: '+4.2% Return', isUp: true },
      { label: 'MCX P&L', value: '+₹4,250', change: '+0.75%', isUp: true },
      { label: 'Bullion Status', value: 'Active', change: 'Evening Market', isUp: false }
    ]
  },
  silver: {
    id: 'silver',
    symbol: 'MCX SILVER 1KG',
    type: 'COMMODITY',
    tag: 'AFTER-HOURS • MCX BULLION',
    prices: ['88,100', '88,250', '88,400', '88,350', '88,520', '88,680'],
    change: '▲ +1,120.00 (+1.28%)',
    isUp: true,
    accent: 'blue',
    strokeColor: '#0284c7',
    gradId: 'sparkGradSilver',
    gradColor: 'rgba(2, 132, 199, 0.25)',
    signals: [
      { type: 'BUY', label: 'STRONG BUY', asset: 'SILVER 1KG (SEP)', price: '₹88,250', detail: 'Target: ₹91,000', isUp: true, theme: 'blue' },
      { type: 'WATCH', label: 'WATCH', asset: 'SILVER MIC', price: '₹88,300', detail: 'Support: 87,500', isUp: true, theme: 'blue' }
    ],
    portfolio: [
      { label: 'Silver Futures', value: '2 Kg Silver', change: '+6.8% Return', isUp: true },
      { label: 'MCX P&L', value: '+₹5,600', change: '+1.28%', isUp: true },
      { label: 'Active Lots', value: '2 Mini Lots', change: 'Evening Trade', isUp: false }
    ]
  },
  sensex: {
    id: 'sensex',
    symbol: 'BSE SENSEX',
    type: 'EQUITY',
    tag: 'BSE INDIA • LIVE MARKET',
    prices: ['79,850', '79,920', '79,890', '79,986', '80,040', '80,120'],
    change: '▲ +412.05 (+0.52%)',
    isUp: true,
    accent: 'emerald',
    strokeColor: '#059669',
    gradId: 'sparkGradSensex',
    gradColor: 'rgba(16, 185, 129, 0.25)',
    signals: [
      { type: 'BUY', label: 'BUY CALL', asset: 'TCS 3800 CE', price: '₹48.20', detail: 'Target: ₹72.00', isUp: true },
      { type: 'BUY', label: 'BUY', asset: 'INFY', price: '₹1,840', detail: 'Target: ₹1,950', isUp: true }
    ],
    portfolio: [
      { label: 'Sensex Basket', value: '₹18.6L', change: '+15.2% YTD', isUp: true },
      { label: 'BSE P&L', value: '+₹9,820', change: '+0.52%', isUp: true },
      { label: 'Large Cap', value: '8 Stocks', change: 'Balanced', isUp: false }
    ]
  }
}

/* ---- Mini Dashboard Mockup ---- */
function DashboardMockup() {
  const { heroActiveTab, setHeroActiveTab } = useModal()
  const activeTab = heroActiveTab || 'nifty'
  const [session, setSession] = useState(getMarketSessionInfo)
  const [priceIdx, setPriceIdx] = useState(0)

  // Initialize context tab state once on mount based on market session
  useEffect(() => {
    setHeroActiveTab(getMarketSessionInfo().defaultTab)
  }, [setHeroActiveTab])

  // 1. Real-time automatic IST market clock check (runs every 5 seconds)
  useEffect(() => {
    const clockTimer = setInterval(() => {
      const updated = getMarketSessionInfo()
      setSession(prev => {
        if (prev.isEquityOpen !== updated.isEquityOpen) {
          setHeroActiveTab(updated.defaultTab)
        }
        return updated
      })
    }, 5000)
    return () => clearInterval(clockTimer)
  }, [setHeroActiveTab])

  const currentAsset = MARKET_ASSETS[activeTab] || MARKET_ASSETS.nifty

  // 2. Real-time price tick rotation every 1.8 seconds
  useEffect(() => {
    const priceTimer = setInterval(() => {
      setPriceIdx(i => (i + 1) % currentAsset.prices.length)
    }, 1800)
    return () => clearInterval(priceTimer)
  }, [currentAsset])

  return (
    <motion.div
      className="hero__mockup"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Mockup Top Header */}
      <div className="mockup__header">
        <div className="mockup__dots">
          <span /><span /><span />
        </div>
        <div className="mockup__title">TIME2TRADE Terminal</div>

        {/* Automatic Real-Time Market Status Badge */}
        <div className={`mockup__badge ${session.isEquityOpen ? 'mockup__badge--live' : 'mockup__badge--after'}`}>
          <span className={session.isEquityOpen ? 'live-dot' : 'gold-dot'} />
          <span>{session.isEquityOpen ? 'LIVE MARKET' : 'AFTER MARKET / MCX'}</span>
        </div>
      </div>

      {/* Symbol Switcher Tabs */}
      <div className="mockup__tabs-strip">
        <button
          className={`mockup__tab ${activeTab === 'nifty' ? 'mockup__tab--active' : ''}`}
          onClick={() => { setHeroActiveTab('nifty'); setPriceIdx(0); }}
        >
          <span className="tab-indicator live" />
          NIFTY 50
        </button>
        <button
          className={`mockup__tab ${activeTab === 'banknifty' ? 'mockup__tab--active' : ''}`}
          onClick={() => { setHeroActiveTab('banknifty'); setPriceIdx(0); }}
        >
          <span className="tab-indicator live" />
          BANK NIFTY
        </button>
        <button
          className={`mockup__tab ${activeTab === 'sensex' ? 'mockup__tab--active' : ''}`}
          onClick={() => { setHeroActiveTab('sensex'); setPriceIdx(0); }}
        >
          <span className="tab-indicator live" />
          SENSEX
        </button>
        <button
          className={`mockup__tab ${activeTab === 'gold' ? 'mockup__tab--active mockup__tab--gold' : ''}`}
          onClick={() => { setHeroActiveTab('gold'); setPriceIdx(0); }}
        >
          <Coins size={12} className="tab-icon-gold" />
          MCX GOLD
        </button>
        <button
          className={`mockup__tab ${activeTab === 'silver' ? 'mockup__tab--active mockup__tab--silver' : ''}`}
          onClick={() => { setHeroActiveTab('silver'); setPriceIdx(0); }}
        >
          <Sparkles size={12} className="tab-icon-silver" />
          MCX SILVER
        </button>
      </div>

      {/* Main Price Row */}
      <div className="mockup__price-row">
        <div>
          <div className="mockup__symbol">{currentAsset.symbol}</div>
          <div className="mockup__tag-sub">{currentAsset.tag}</div>
        </div>
        <div className="mockup__price-group">
          <motion.div
            key={`${activeTab}-${priceIdx}`}
            className="mockup__price"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentAsset.prices[priceIdx]}
          </motion.div>
          <div className={`mockup__change ${currentAsset.isUp ? 'up' : 'down'}`}>
            {currentAsset.change}
          </div>
        </div>
      </div>

      {/* Sparkline SVG Chart */}
      <div className="mockup__sparkline">
        <svg viewBox="0 0 260 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id={currentAsset.gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={currentAsset.gradColor} />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M0,45 C30,40 50,35 70,28 C90,21 110,32 130,22 C150,12 170,25 190,15 C210,5 230,18 260,8 L260,60 L0,60Z"
            fill={`url(#${currentAsset.gradId})`}
          />
          <path
            d="M0,45 C30,40 50,35 70,28 C90,21 110,32 130,22 C150,12 170,25 190,15 C210,5 230,18 260,8"
            fill="none"
            stroke={currentAsset.strokeColor}
            strokeWidth="1.8"
          />
        </svg>
      </div>

      {/* Signals Cards */}
      <div className="mockup__signals">
        {currentAsset.signals.map((sig, idx) => (
          <div key={idx} className={`signal-card ${sig.theme ? `signal-card--${sig.theme}` : (sig.type === 'BUY' ? 'buy' : 'sell')}`}>
            <div className="signal-label">{sig.label}</div>
            <div className="signal-asset">{sig.asset}</div>
            <div className="signal-price">
              {sig.price} <span>{sig.detail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Grid Row */}
      <div className="mockup__portfolio">
        {currentAsset.portfolio.map((item, idx) => (
          <div key={idx} className="port-item">
            <div className="port-label">{item.label}</div>
            <div className={`port-value ${item.isUp ? 'up' : ''}`}>{item.value}</div>
            <div className={`port-change ${item.isUp ? 'up' : ''}`}>{item.change}</div>
          </div>
        ))}
      </div>

      {/* Automated Live Market Session Banner */}
      <div className="mockup__session-bar">
        <div className="session-bar__info">
          {session.isEquityOpen ? <Sun size={12} className="icon-sun" /> : <Moon size={12} className="icon-moon" />}
          <span>{session.isEquityOpen ? 'NSE/BSE Live Equity Trading Session' : 'After-Market Evening MCX Bullion Session'}</span>
        </div>
        <div className="session-bar__clock">
          <Clock size={11} />
          <span>{session.timeString} IST</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ---- Animated Hero CountUp ---- */
function HeroCountUp({ num, duration = 2500, isFloat = false }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const startTime = performance.now()
    const endValue = parseFloat(num)

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * endValue)
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(endValue)
    }

    requestAnimationFrame(tick)
  }, [num, duration])

  return (
    <span>
      {isFloat ? count.toFixed(1) : Math.floor(count).toLocaleString('en-IN')}
    </span>
  )
}

/* ---- Stat Bar Item ---- */
function StatBarItem({ icon: Icon, numValue, suffix = '+', prefix = '', label, isFloat = false, delay }) {
  return (
    <motion.div
      className="stat-bar__item"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="stat-bar__icon">
        <Icon size={16} />
      </div>
      <div className="stat-bar__content">
        <div className="stat-bar__value">
          {prefix}<HeroCountUp num={numValue} isFloat={isFloat} />{suffix}
        </div>
        <div className="stat-bar__label">{label}</div>
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

      {/* Main 2-Column Responsive Grid */}
      <div className="container hero__container-inner">
        <div className="hero__layout">
          {/* Left Column (7 cols): Copy & CTAs */}
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

            {/* CTA Button Group */}
            <motion.div
              className="hero__cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                className="hero__btn-primary"
                id="hero-open-account"
                onClick={() => openAccount(1)}
              >
                Open Free Account
                <ArrowRight size={17} />
              </button>
              <button
                className="hero__btn-secondary"
                id="hero-watch-demo"
                onClick={() => openDemo()}
              >
                <Play size={15} fill="currentColor" />
                Watch Demo
              </button>
            </motion.div>

            {/* Inline Trust Line */}
            <motion.div
              className="hero__trust-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={() => openInfo({ title: 'Platform Security & Compliance', subtitle: 'Security & Infrastructure Details' })}
              style={{ cursor: 'pointer' }}
            >
              <Shield size={13} style={{ color: 'var(--emerald-600)' }} />
              <span>ISO 27001 Certified &bull; Bank-Grade Security &bull; Zero Brokerage on Delivery</span>
            </motion.div>
          </div>

          {/* Right Column (5 cols): Terminal Mockup with Contained Floating Cards */}
          <div className="hero__mockup-wrapper">
            <DashboardMockup />

            {/* Floating Micro Badge 1 - Top Right */}
            <motion.div
              className="hero__float-badge hero__float-badge--1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              onClick={() => openInfo({ title: 'Capital Protection & Risk Management', subtitle: 'Automated Risk Limits & Institutional Stop Loss Tracking' })}
              title="Click to view risk parameters"
            >
              <Shield size={12} className="badge-icon-safe" />
              <span className="float-badge-text">Low Risk Protected</span>
            </motion.div>

            {/* Floating Micro Badge 2 - Bottom Left */}
            <motion.div
              className="hero__float-badge hero__float-badge--2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              onClick={() => openInfo({ title: 'Top Market Pick', subtitle: 'BAJFINANCE +2.4% Momentum Alert & Target Analysis' })}
              title="Click to view signal details"
            >
              <TrendingUp size={12} className="badge-icon-up" />
              <span className="float-badge-text">Top Pick: BAJFINANCE +2.4%</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Horizontal 6-Column Stat Bar Divider Directly Below Hero */}
      <div className="hero__stat-bar-container">
        <div className="container">
          <div className="hero__stat-bar">
            <StatBarItem icon={Users} numValue={30} suffix="K+" label="Active Traders" delay={0.7} />
            <StatBarItem icon={MapPin} numValue={30} suffix="+" label="Cities in India" delay={0.8} />
            <StatBarItem icon={Building2} numValue={100} suffix="+" label="Corporate Relations" delay={0.9} />
            <StatBarItem icon={Award} numValue={35} suffix="+ Yrs" label="Market Experience" delay={1.0} />
            <StatBarItem icon={Landmark} numValue={100} suffix="+" label="Inst. Empanelments" delay={1.1} />
            <StatBarItem icon={UserCheck} numValue={20} suffix="+" label="Research Analysts" delay={1.2} />
          </div>
        </div>
      </div>
    </section>
  )
}
