import { motion } from 'framer-motion'
import {
  Zap, Eye, TrendingUp, Bell, BarChart2, Shield,
  BookOpen, Target, Activity, PieChart, Layers, Search
} from 'lucide-react'
import { useModal } from '../context/ModalContext'
import './FeaturesSection.css'

const featureChips = {
  realtime: '⚡ <5ms Latency • Level 2 Order Book',
  signals: '🎯 94% Win Rate • AI Sentiment',
  alerts: '🔔 Push, Email & Telegram Alerts',
  research: '📊 15+ SEBI Registered Analysts',
  risk: '🛡️ Position Sizer • Drawdown Guard',
  watchlist: '👁️ 500+ Instruments • Heatmaps',
  portfolio: '📈 Realtime P&L • Sector Exposure',
  scanner: '🔍 4000+ Stocks • 150+ Filters',
}

const features = [
  {
    id: 'realtime',
    icon: Activity,
    label: 'Real-Time Insights',
    title: 'Live Market Intelligence, Zero Delay',
    desc: 'Tick-by-tick data streams, order book depth, and level 2 market data — all rendered in real time for precision decision-making.',
    color: 'teal',
    tag: 'Core Stream',
  },
  {
    id: 'signals',
    icon: Zap,
    label: 'AI-Assisted Signals',
    title: 'Signals That Act Before the Market Does',
    desc: 'Our AI models analyze price action, volume, and sentiment to deliver high-confidence trade ideas with clear entry, target, and SL levels.',
    color: 'gold',
    tag: 'Intelligence',
  },
  {
    id: 'alerts',
    icon: Bell,
    label: 'Smart Alerts',
    title: 'Never Miss a Move',
    desc: 'Customizable price, volume, pattern, and news alerts across all your watchlisted instruments.',
    color: 'blue',
    tag: 'Automation',
  },
  {
    id: 'research',
    icon: BookOpen,
    label: 'Research-Backed Ideas',
    title: 'Expert Analyst Calls',
    desc: 'Every signal is backed by our in-house research desk with 15+ years of market experience.',
    color: 'emerald',
    tag: 'Research',
  },
  {
    id: 'risk',
    icon: Shield,
    label: 'Risk Management',
    title: 'Trade Smarter, Not Harder',
    desc: 'Position sizing, portfolio heat maps, risk/reward calculators, and drawdown analysis built in.',
    color: 'teal',
    tag: 'Protection',
  },
  {
    id: 'watchlist',
    icon: Eye,
    label: 'Advanced Watchlists',
    title: 'Multi-screen Watchlists',
    desc: 'Monitor 500+ instruments simultaneously with custom columns and heat map visualization.',
    color: 'blue',
    tag: 'Multi-Screen',
  },
]

function FeatureIcon({ icon: Icon, color }) {
  return (
    <div className={`feat-icon feat-icon--${color}`}>
      <Icon size={20} />
    </div>
  )
}

function FeatureCard({ feature, index, onClick }) {
  return (
    <motion.div
      className={`feat-card feat-card--${feature.color}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="feat-card__inner">
        <div className="feat-card__top">
          <FeatureIcon icon={feature.icon} color={feature.color} />
          <span className={`badge badge-${feature.color}`}>{feature.tag}</span>
        </div>
        <div className="feat-card__label">{feature.label}</div>
        <h3 className="feat-card__title">{feature.title}</h3>
        <p className="feat-card__desc">{feature.desc}</p>
        <div className="feat-card__footer">
          <span className="feat-chip">{featureChips[feature.id]}</span>
        </div>
      </div>
      <div className="feat-card__deco" aria-hidden="true" />
    </motion.div>
  )
}

export default function FeaturesSection() {
  const { openInfo } = useModal()

  return (
    <section id="features" className="features-section section">
      <div className="container">
        <motion.div
          className="features__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-tag">Platform Features</div>
          <h2 className="display-md">
            Everything a serious trader{' '}
            <span className="text-gradient-teal">needs — and more</span>
          </h2>
          <p className="body-lg text-secondary" style={{ maxWidth: 540 }}>
            A single unified platform that combines professional-grade tools,
            intelligent research, and seamless execution.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="features__bento">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={i}
              onClick={() => openInfo({ title: feature.title, subtitle: `${feature.label} · ${feature.tag}`, content: feature.desc })}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
