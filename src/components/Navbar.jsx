import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { useModal } from '../context/ModalContext'
import './Navbar.css'

const navLinks = [
  {
    label: 'Markets',
    target: '#trust',
    children: [
      { label: 'Equities Market', target: '#hero', actionType: 'heroTab', payload: 'nifty' },
      { label: 'F&O Intelligence', target: '#research', actionType: 'researchTab', payload: 'F&O' },
      { label: 'Commodities Data', target: '#hero', actionType: 'heroTab', payload: 'gold' },
      {
        label: 'Smart Scanners',
        target: '#features',
        actionType: 'modal',
        payload: {
          title: 'Advanced Real-Time Market Scanners',
          subtitle: 'Smart Scanners · Automation',
          content: 'Scan 4000+ stocks in real time with 150+ filters. Identify patterns, volume breakouts, and price confluences instantly.'
        }
      },
    ]
  },
  {
    label: 'Features',
    target: '#features',
    children: [
      {
        label: 'Real-Time Insights',
        target: '#features',
        actionType: 'modal',
        payload: {
          title: 'Live Market Intelligence, Zero Delay',
          subtitle: 'Real-Time Insights · Core Stream',
          content: 'Tick-by-tick data streams, order book depth, and level 2 market data — all rendered in real time for precision decision-making.'
        }
      },
      {
        label: 'AI Signals',
        target: '#features',
        actionType: 'modal',
        payload: {
          title: 'Signals That Act Before the Market Does',
          subtitle: 'AI-Assisted Signals · Intelligence',
          content: 'Our AI models analyze price action, volume, and sentiment to deliver high-confidence trade ideas with clear entry, target, and SL levels.'
        }
      },
      {
        label: 'Smart Alerts',
        target: '#features',
        actionType: 'modal',
        payload: {
          title: 'Never Miss a Move',
          subtitle: 'Smart Alerts · Automation',
          content: 'Customizable price, volume, pattern, and news alerts across all your watchlisted instruments.'
        }
      },
      {
        label: 'Advanced Watchlists',
        target: '#features',
        actionType: 'modal',
        payload: {
          title: 'Multi-screen Watchlists',
          subtitle: 'Advanced Watchlists · Multi-Screen',
          content: 'Monitor 500+ instruments simultaneously with custom columns and heat map visualization.'
        }
      },
    ]
  },
  {
    label: 'Research',
    target: '#research',
    children: [
      { label: 'Analyst Calls', target: '#research', actionType: 'researchTab', payload: 'Intraday' },
      { label: 'Swing Signals', target: '#research', actionType: 'researchTab', payload: 'Swing' },
      { label: 'Intraday Ideas', target: '#research', actionType: 'researchTab', payload: 'Intraday' },
      { label: 'F&O Strategies', target: '#research', actionType: 'researchTab', payload: 'F&O' },
    ]
  },
  { label: 'Terminal', target: '#platform' },
  { label: 'Why Us', target: '#why' },
  { label: 'Branches', target: '#branches' },
  { label: 'Reviews', target: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeSection, setActiveSection] = useState('hero')
  
  const { 
    openAuth, 
    openAccount, 
    openDemo, 
    openInfo, 
    setActiveResearchTab, 
    setHeroActiveTab 
  } = useModal()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ['hero', 'trust', 'features', 'research', 'platform', 'why', 'branches', 'testimonials']
      let currentSection = 'hero'
      const scrollPos = window.scrollY + 120

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el && el.offsetTop <= scrollPos) {
          currentSection = sectionId
        }
      }
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (targetId, action) => {
    setActiveDropdown(null)
    setMobileOpen(false)

    if (targetId) {
      const el = document.querySelector(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    if (action) {
      const { actionType, payload } = action
      if (actionType === 'researchTab') {
        setActiveResearchTab(payload)
      } else if (actionType === 'heroTab') {
        setHeroActiveTab(payload)
      } else if (actionType === 'modal') {
        setTimeout(() => {
          openInfo(payload)
        }, 500)
      }
    }
  }

  const isLinkActive = (link) => {
    return activeSection === link.target.replace('#', '')
  }

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="#hero" className="navbar__logo" aria-label="TIME2TRADE Home" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
          <BrandLogo variant="navbar" />
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__nav" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="navbar__item"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`navbar__link ${isLinkActive(link) ? 'navbar__link--active' : ''}`}
                onClick={() => handleNavClick(link.target)}
              >
                {link.label}
                {link.children && <ChevronDown size={14} style={{ opacity: 0.6 }} />}
              </button>

              <AnimatePresence>
                {link.children && activeDropdown === link.label && (
                  <motion.div
                    className="navbar__dropdown"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {link.children.map((child) => (
                      <button
                        key={child.label}
                        className="navbar__dropdown-item"
                        onClick={() => handleNavClick(child.target, child)}
                      >
                        {child.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <button
            className="navbar__signin"
            id="nav-signin"
            onClick={() => openAuth('signin')}
          >
            Sign In
          </button>
          <button
            className="btn btn-primary btn-sm"
            id="nav-open-account"
            onClick={() => openAccount(1)}
          >
            <Zap size={14} />
            Open Account
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="navbar__mobile-inner">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.children ? (
                    <div className="navbar__mobile-group">
                      <div className="navbar__mobile-group-header">
                        {link.label}
                      </div>
                      <div className="navbar__mobile-group-children">
                        {link.children.map((child) => (
                          <button
                            key={child.label}
                            className="navbar__mobile-child-link"
                            onClick={() => handleNavClick(child.target, child)}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      className="navbar__mobile-link"
                      onClick={() => handleNavClick(link.target)}
                    >
                      {link.label}
                    </button>
                  )}
                </motion.div>
              ))}
              <div className="navbar__mobile-ctas">
                <button
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => { setMobileOpen(false); openAuth('signin'); }}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => { setMobileOpen(false); openAccount(1); }}
                >
                  <Zap size={14} />
                  Open Account Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
