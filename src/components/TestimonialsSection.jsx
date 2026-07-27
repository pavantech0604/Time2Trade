import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
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
  },
]

function StarRating({ rating }) {
  return (
    <div className="stars">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={14} fill="var(--gold-400)" color="var(--gold-400)" />
      ))}
    </div>
  )
}

function Avatar({ initials, color }) {
  return (
    <div className={`testimonial-avatar avatar--${color}`}>
      {initials}
    </div>
  )
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const timerRef = useRef(null)

  const total = testimonials.length

  const next = () => setCurrent(c => (c + 1) % total)
  const prev = () => setCurrent(c => (c - 1 + total) % total)

  useEffect(() => {
    if (!autoplay) return
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [autoplay, current])

  const handleNav = (fn) => {
    setAutoplay(false)
    fn()
    clearTimeout(timerRef.current)
    setTimeout(() => setAutoplay(true), 8000)
  }

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
          <p className="body-lg text-secondary" style={{ maxWidth: 500 }}>
            Real results from real traders. See what TIME2TRADE has done
            for portfolios across every trading style.
          </p>
        </motion.div>

        {/* Main carousel */}
        <div className="testimonials__carousel">
          {/* Featured large card */}
          <div className="testimonials__featured">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className={`testimonial-main-card card--${testimonials[current].color}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <Quote size={36} className="testimonial-quote-icon" />
                <p className="testimonial-text">{testimonials[current].text}</p>
                <div className="testimonial-meta">
                  <Avatar initials={testimonials[current].avatar} color={testimonials[current].color} />
                  <div>
                    <div className="testimonial-name">{testimonials[current].name}</div>
                    <div className="testimonial-role">
                      {testimonials[current].role} · {testimonials[current].location}
                    </div>
                    <StarRating rating={testimonials[current].rating} />
                  </div>
                  <div className="testimonial-stat-box">
                    <div className="testimonial-stat-val">{testimonials[current].stats.metric}</div>
                    <div className="testimonial-stat-period">{testimonials[current].stats.period}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav controls */}
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
                    onClick={() => { setAutoplay(false); setCurrent(i); }}
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

          {/* Side mini cards */}
          <div className="testimonials__sidebar">
            {testimonials.filter((_, i) => i !== current).slice(0, 3).map((t, i) => (
              <motion.div
                key={`${t.name}-${current}`}
                className="testimonial-mini-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                onClick={() => setCurrent(testimonials.indexOf(t))}
              >
                <div className="mini-card__header">
                  <Avatar initials={t.avatar} color={t.color} />
                  <div>
                    <div className="mini-name">{t.name}</div>
                    <div className="mini-role">{t.role}</div>
                  </div>
                  <div className="mini-stat">{t.stats.metric}</div>
                </div>
                <p className="mini-text">{t.text.substring(0, 100)}...</p>
                <StarRating rating={t.rating} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
