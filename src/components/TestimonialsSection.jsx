import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react'
import { useModal } from '../context/ModalContext'
import './TestimonialsSection.css'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Swing Trader',
    location: 'Mumbai',
    avatar: 'RK',
    rating: 5,
    text: "TIME2TRADE completely changed my approach to swing trading. The research calls are spot-on, and the risk management tools helped me cut my losses by 40%. I've been profitable for 8 consecutive months now.",
    stats: { metric: '+32% Returns', period: 'Last 6 months' },
    color: 'teal',
    memberSince: 'Member since Jan 2024'
  },
  {
    name: 'Priya Sharma',
    role: 'Intraday Trader',
    location: 'Bangalore',
    avatar: 'PS',
    rating: 5,
    text: "The intraday signals are incredibly precise. I used to rely on random tips from Telegram groups — now I have a structured, research-backed approach. The platform executes within milliseconds, which is critical for scalping.",
    stats: { metric: '94% Win Rate', period: 'F&O signals this year' },
    color: 'gold',
    memberSince: 'Member since Jul 2023'
  },
  {
    name: 'Amit Verma',
    role: 'Retail Investor',
    location: 'Delhi',
    avatar: 'AV',
    rating: 5,
    text: "As a beginner, I was intimidated by the market. TIME2TRADE's learning modules and guided investment ideas gave me the confidence to start. My first year portfolio is up 22%. Couldn't ask for more.",
    stats: { metric: '+22% Portfolio', period: 'First year as investor' },
    color: 'blue',
    memberSince: 'Member since Feb 2025'
  },
  {
    name: 'Sanjay Mehta',
    role: 'Options Trader',
    location: 'Pune',
    avatar: 'SM',
    rating: 5,
    text: "The options strategy module is world-class. The Greeks dashboard and IV analysis tools alone are worth the subscription. It's the only platform where I feel like I have a genuine edge in options.",
    stats: { metric: '2.5x Returns', period: 'Options strategies YTD' },
    color: 'emerald',
    memberSince: 'Member since Oct 2024'
  },
  {
    name: 'Deepa Nair',
    role: 'Long-Term Investor',
    location: 'Chennai',
    avatar: 'DN',
    rating: 5,
    text: "I manage family investments and needed a platform I could trust. TIME2TRADE's research team provides clear reasoning for every call — not just a number, but WHY and with what risk. That transparency earns my trust completely.",
    stats: { metric: '+28% CAGR', period: 'Portfolio over 2 years' },
    color: 'teal',
    memberSince: 'Member since Mar 2023'
  },
  {
    name: 'Vikram Singh',
    role: 'Professional Trader',
    location: 'Hyderabad',
    avatar: 'VS',
    rating: 5,
    text: "I've used Bloomberg terminals, premium brokerage tools, and everything in between. TIME2TRADE gives me 80% of the professional functionality at a fraction of the cost. The UI is cleaner too — no information overload.",
    stats: { metric: '₹2Cr+ Volume', period: 'Monthly traded on platform' },
    color: 'gold',
    memberSince: 'Member since Sep 2022'
  },
]

function StarRating({ rating }) {
  return (
    <div className="stars">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={13} fill="var(--gold-400)" color="var(--gold-400)" />
      ))}
    </div>
  )
}

function Avatar({ initials, color, size = 44 }) {
  return (
    <div className={`testimonial-avatar avatar--${color}`} style={{ width: size, height: size, fontSize: size * 0.35 }}>
      {initials}
    </div>
  )
}

export default function TestimonialsSection() {
  const { openInfo } = useModal()
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const timerRef = useRef(null)

  const total = testimonials.length

  const next = () => setCurrent(c => (c + 1) % total)
  const prev = () => setCurrent(c => (c - 1 + total) % total)

  useEffect(() => {
    if (!autoplay) return
    timerRef.current = setInterval(next, 6000)
    return () => clearInterval(timerRef.current)
  }, [autoplay, current])

  const handleNav = (fn) => {
    setAutoplay(false)
    fn()
    clearTimeout(timerRef.current)
    setTimeout(() => setAutoplay(true), 10000)
  }

  const handleMiniCardClick = (index) => {
    setAutoplay(false)
    setCurrent(index)
    clearTimeout(timerRef.current)
    setTimeout(() => setAutoplay(true), 10000)
  }

  // Find exactly 2 upcoming reviews to display in the sidebar
  const otherIndices = []
  for (let i = 1; i < total; i++) {
    otherIndices.push((current + i) % total)
  }
  const sidebarIndices = otherIndices.slice(0, 2)

  return (
    <section id="testimonials" className="testimonials-section section">
      <div className="testimonials__bg" aria-hidden="true" />
      <div className="container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Trader Stories</div>
          <h2 className="display-md">
            Trusted by traders{' '}
            <span className="text-gradient-teal">across India</span>
          </h2>
        </motion.div>

        <div className="testimonials__carousel">
          {/* Main Featured Testimonial Card */}
          <div className="testimonials__featured">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className={`testimonial-main-card card--${testimonials[current].color}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => openInfo({
                  title: 'Verified Trader Profile',
                  subtitle: 'TIME2TRADE Verified Track Record',
                  traderData: testimonials[current]
                })}
              >
                <div className="testimonial-main-card__top">
                  <Quote size={32} className="testimonial-quote-icon" />
                  <span className="verified-badge-pill">
                    <CheckCircle2 size={12} fill="var(--emerald-600)" color="white" /> Verified P&L
                  </span>
                </div>

                <p className="testimonial-text">"{testimonials[current].text}"</p>

                <div className="testimonial-meta">
                  <Avatar initials={testimonials[current].avatar} color={testimonials[current].color} size={48} />
                  <div className="testimonial-author-details">
                    <div className="testimonial-name">{testimonials[current].name}</div>
                    <div className="testimonial-role">{testimonials[current].role} &bull; {testimonials[current].location}</div>
                    <StarRating rating={testimonials[current].rating} />
                  </div>

                  <div className={`testimonial-stat-badge badge--${testimonials[current].color}`}>
                    <span className="stat-badge-metric">{testimonials[current].stats.metric}</span>
                    <span className="stat-badge-period">{testimonials[current].stats.period}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="testimonials__controls">
              <button
                className="testimonial-nav-btn"
                onClick={() => handleNav(prev)}
                aria-label="Previous testimonial"
                id="testimonial-prev"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="testimonials__dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`testimonial-dot ${i === current ? 'active' : ''}`}
                    onClick={() => handleMiniCardClick(i)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                className="testimonial-nav-btn"
                onClick={() => handleNav(next)}
                aria-label="Next testimonial"
                id="testimonial-next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Sidebar - displaying exactly 2 cards */}
          <div className="testimonials__sidebar">
            {sidebarIndices.map((idx) => {
              const t = testimonials[idx]
              return (
                <div
                  key={t.name}
                  className={`testimonial-mini-card mini-card--${t.color}`}
                  onClick={() => handleMiniCardClick(idx)}
                >
                  <div className="mini-card__header">
                    <Avatar initials={t.avatar} color={t.color} size={36} />
                    <div className="mini-card__author-info">
                      <div className="mini-name">{t.name}</div>
                      <div className="mini-role">{t.role}</div>
                    </div>
                    <div className={`mini-stat-pill badge--${t.color}`}>
                      {t.stats.metric}
                    </div>
                  </div>
                  <p className="mini-text">"{t.text.substring(0, 92)}..."</p>
                  <div className="mini-card__footer">
                    <StarRating rating={t.rating} />
                    <span className="mini-click-hint">Click to view &rarr;</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
