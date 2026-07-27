import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react'
import { useModal } from '../context/ModalContext'
import './CtaSection.css'

const benefits = [
  { icon: Zap, text: 'Zero brokerage on equity delivery' },
  { icon: Shield, text: 'SEBI regulated & DDPI secured' },
  { icon: TrendingUp, text: 'First month of research access free' },
]

export default function CtaSection() {
  const { openAccount, openDemo } = useModal()

  return (
    <section id="cta" className="cta-section">
      {/* Animated background */}
      <div className="cta__bg" aria-hidden="true">
        <div className="cta__glow cta__glow--1" />
        <div className="cta__glow cta__glow--2" />
        <div className="cta__grid" />
      </div>

      <div className="container">
        <motion.div
          className="cta__inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Top tag */}
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            It is never too late to start trading
          </div>

          <h2 className="display-lg cta__headline">
            Your edge in the market
            <br />
            starts{' '}
            <span className="text-gradient-teal">here, today.</span>
          </h2>

          <p className="body-lg cta__subheadline">
            Join 2.4 lakh+ traders who chose to trade smarter.
            Open your account in under 5 minutes —
            no paperwork, no waiting.
          </p>

          {/* Benefits row */}
          <div className="cta__benefits">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                className="cta__benefit"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              >
                <div className="cta__benefit-icon">
                  <b.icon size={16} />
                </div>
                <span>{b.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="cta__buttons">
            <button
              className="btn btn-gold btn-lg"
              id="cta-open-account-free"
              style={{ fontWeight: 700, fontSize: '17px' }}
              onClick={() => openAccount(1)}
            >
              Open Free Account Now
              <ArrowRight size={20} />
            </button>
            <button
              className="btn btn-outline btn-lg"
              id="cta-explore-platform"
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}
              onClick={() => openDemo()}
            >
              Explore Platform
            </button>
          </div>

          {/* Fine print */}
          <p className="cta__fine-print">
            No credit card required · KYC in 5 minutes · Start trading immediately
          </p>
        </motion.div>
      </div>
    </section>
  )
}
