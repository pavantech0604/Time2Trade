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
      { label: 'Equities Market', target: '#trust' },
      { label: 'F&O Intelligence', target: '#research' },
      { label: 'Commodities Data', target: '#trust' },
      { label: 'Smart Scanners', target: '#features' },
    ]
  },
  {
    label: 'Features',
    target: '#features',
    children: [
      { label: 'Real-Time Insights', target: '#features' },
      { label: 'AI Signals', target: '#features' },
      { label: 'Smart Alerts', target: '#features' },
      { label: 'Portfolio Tracker', target: '#features' },
    ]
  },
  {
    label: 'Research',
    target: '#research',
    children: [
      { label: 'Analyst Calls', target: '#research' },
      { label: 'Swing Signals', target: '#research' },
      { label: 'Intraday Ideas', target: '#research' },
      { label: 'F&O Strategies', target: '#research' },
    ]
  },
  { label: 'Terminal', target: '#platform' },
  { label: 'Why Us', target: '#why' },
  { label: 'Reviews', target: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { openAuth, openAccount } = useModal()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (targetId) => {
    setActiveDropdown(null)
    setMobileOpen(false)
    if (targetId) {
      const el = document.querySelector(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
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
                className="navbar__link"
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
                        onClick={() => handleNavClick(child.target)}
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
                  <button
                    className="navbar__mobile-link"
                    onClick={() => handleNavClick(link.target)}
                  >
                    {link.label}
                  </button>
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
