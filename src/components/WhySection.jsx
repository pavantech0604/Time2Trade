import { motion } from 'framer-motion'
import { Clock, Target, Cpu, Shield, BookOpen, TrendingUp } from 'lucide-react'
import { useModal } from '../context/ModalContext'
import './WhySection.css'

const pillars = [
  {
    icon: Clock,
    title: 'Timing',
    headline: 'First to signal, first to profit',
    desc: 'Our proprietary timing engine identifies breakout zones and momentum shifts before they happen. We analyze pre-market data, global cues, and technical confluences to give you a head start every session.',
    accent: 'teal',
    stat: '< 30 sec',
    statLabel: 'Signal delivery time',
  },
  {
    icon: Target,
    title: 'Expertise',
    headline: 'Every call is research-backed',
    desc: 'Our analyst team reviews every signal before it goes live. Experienced market professionals put their reputation behind every trade idea and research recommendation.',
    accent: 'gold',
    stat: '50+',
    statLabel: 'Research Analysts',
  },
  {
    icon: Cpu,
    title: 'Institutional Scale',
    headline: 'Institutional-grade infrastructure',
    desc: 'Empaneled with leading financial institutions and corporates across India. Our platform processes high-frequency market data to deliver institutional-grade research.',
    accent: 'blue',
    stat: '150+',
    statLabel: 'Institutional Empanelments',
  },
  {
    icon: Shield,
    title: 'Trust',
    headline: 'Regulated, transparent, and accountable',
    desc: 'Fully transparent and accountable. We publish our call history openly — wins and losses. You can verify our track record at any time. No hidden charges, no conflict of interest.',
    accent: 'emerald',
    stat: '100%',
    statLabel: 'Transparent track record',
  },
  {
    icon: BookOpen,
    title: 'Education',
    headline: 'We grow with you',
    desc: 'From complete beginner to advanced options trader, our structured learning paths, live webinars, and community support ensure you\'re always improving your craft.',
    accent: 'gold',
    stat: '200+',
    statLabel: 'Learning modules available',
  },
  {
    icon: TrendingUp,
    title: 'Intelligence',
    headline: 'AI meets human expertise',
    desc: 'Our AI models scan 4000+ stocks, identify patterns, and flag opportunities — which our human analysts then validate and contextualize. The best of machine speed and human judgment, combined.',
    accent: 'teal',
    stat: '4000+',
    statLabel: 'Stocks scanned daily',
  },
]

export default function WhySection() {
  const { openInfo } = useModal()

  return (
    <section id="why" className="why-section section">
      <div className="why__bg" aria-hidden="true" />
      <div className="container">
        <motion.div
          className="why__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Why TIME2TRADE</div>
          <h2 className="display-md">
            We built what we{' '}
            <span className="text-gradient-teal">always wanted</span>
            <br />
            as traders ourselves
          </h2>
        </motion.div>

        <div className="why__grid">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className={`why-card why-card--${pillar.accent}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              onClick={() => openInfo({ title: `${pillar.title}: ${pillar.headline}`, subtitle: pillar.statLabel, content: pillar.desc })}
              style={{ cursor: 'pointer' }}
            >
              <div className="why-card__header">
                <div className={`why-card__icon icon--${pillar.accent}`}>
                  <pillar.icon size={22} />
                </div>
                <div className={`why-card__tag tag--${pillar.accent}`}>{pillar.title}</div>
              </div>
              <h3 className="why-card__headline">{pillar.headline}</h3>
              <p className="why-card__desc">{pillar.desc}</p>
              <div className="why-card__stat">
                <div className={`why-stat-value stat--${pillar.accent}`}>{pillar.stat}</div>
                <div className="why-stat-label">{pillar.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
