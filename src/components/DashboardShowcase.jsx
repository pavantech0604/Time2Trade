import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Bell, ArrowUpRight } from 'lucide-react'
import { useModal } from '../context/ModalContext'
import './DashboardShowcase.css'

/* Candlestick component */
function Candlestick({ x, open, close, high, low, up }) {
  const bodyTop = Math.min(open, close)
  const bodyHeight = Math.abs(close - open)
  return (
    <g>
      <line x1={x} y1={high} x2={x} y2={low} stroke={up ? 'var(--emerald-600)' : 'var(--red-600)'} strokeWidth="1.5" />
      <rect x={x - 5} y={bodyTop} width={10} height={Math.max(bodyHeight, 2)}
        fill={up ? 'var(--emerald-500)' : 'var(--red-500)'} rx="1" />
    </g>
  )
}

const candles = [
  { x: 30, open: 140, close: 120, high: 110, low: 150, up: true },
  { x: 55, open: 120, close: 130, high: 105, low: 135, up: false },
  { x: 80, open: 130, close: 108, high: 100, low: 135, up: true },
  { x: 105, open: 108, close: 90, high: 82, low: 113, up: true },
  { x: 130, open: 90, close: 105, high: 80, low: 112, up: false },
  { x: 155, open: 105, close: 88, high: 78, low: 110, up: true },
  { x: 180, open: 88, close: 72, high: 65, low: 92, up: true },
  { x: 205, open: 72, close: 82, high: 60, low: 88, up: false },
  { x: 230, open: 82, close: 65, high: 55, low: 88, up: true },
  { x: 255, open: 65, close: 55, high: 45, low: 70, up: true },
]

const watchlist = [
  { sym: 'RELIANCE', price: '2,847', change: '+1.5%', up: true },
  { sym: 'TCS', price: '4,183', change: '+0.7%', up: true },
  { sym: 'HDFCBANK', price: '1,756', change: '-0.7%', up: false },
  { sym: 'INFY', price: '1,924', change: '+0.8%', up: true },
  { sym: 'WIPRO', price: '584', change: '+0.7%', up: true },
  { sym: 'BAJFINANCE', price: '7,285', change: '+1.6%', up: true },
]

const movers = [
  { sym: 'DIXON TECH', change: '+8.4%', up: true },
  { sym: 'STAR HEALTH', change: '+6.1%', up: true },
  { sym: 'ZOMATO', change: '+5.3%', up: true },
  { sym: 'PAYTM', change: '-4.2%', up: false },
  { sym: 'INDUSIND', change: '-3.8%', up: false },
]

const notifications = [
  { type: 'signal', text: 'BUY Signal: BAJFINANCE @ ₹7,150', time: '2m ago' },
  { type: 'alert', text: 'NIFTY crossed 24,400 — Watch zone', time: '8m ago' },
  { type: 'news', text: 'RBI Policy: Rates on hold — Bullish for Banks', time: '15m ago' },
]

export default function DashboardShowcase() {
  const [selectedSym, setSelectedSym] = useState('RELIANCE')
  const [activeTimeframe, setActiveTimeframe] = useState('15m')
  const { openAccount, openInfo } = useModal()

  const currentItem = watchlist.find(w => w.sym === selectedSym) || watchlist[0]

  return (
    <section id="platform" className="dashboard-section section">
      <div className="dashboard__bg-glow" aria-hidden="true" />
      <div className="container">
        <motion.div
          className="dashboard__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Platform Preview</div>
          <h2 className="display-md">
            Built for the{' '}
            <span className="text-gradient-teal">modern trader</span>
          </h2>
          <p className="body-lg text-secondary" style={{ maxWidth: 560 }}>
            A trading terminal that works the way you think — fast, precise,
            and designed to keep you ahead of the market.
          </p>
        </motion.div>

        {/* Main dashboard frame */}
        <motion.div
          className="dashboard__frame"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Frame header */}
          <div className="dash-frame__header">
            <div className="mockup__dots">
              <span /><span /><span />
            </div>
            <div className="dash-frame__title">TIME2TRADE Pro Terminal</div>
            <div className="dash-frame__tag">
              <span className="live-dot" />
              NSE LIVE
            </div>
          </div>

          {/* Dashboard grid */}
          <div className="dashboard__grid">
            {/* Watchlist */}
            <div className="dash-panel dash-watchlist">
              <div className="dash-panel__title">My Watchlist <span className="badge badge-teal" style={{ fontSize: '10px' }}>6</span></div>
              <div className="watchlist__items">
                {watchlist.map((w, i) => (
                  <div
                    key={i}
                    className={`wl-item ${selectedSym === w.sym ? 'active' : ''}`}
                    onClick={() => setSelectedSym(w.sym)}
                  >
                    <div className="wl-sym">{w.sym}</div>
                    <div className="wl-right">
                      <div className="wl-price">{w.price}</div>
                      <div className={`wl-change ${w.up ? 'up' : 'down'}`}>
                        {w.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {w.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="dash-panel dash-chart">
              <div className="dash-chart__top">
                <div>
                  <div className="dash-chart__sym">{currentItem.sym} IND LTD</div>
                  <div className="dash-chart__price">
                    ₹{currentItem.price}.35 <span className={currentItem.up ? 'up' : 'down'}>{currentItem.up ? '▲' : '▼'} {currentItem.change}</span>
                  </div>
                </div>
                <div className="dash-chart__timeframes">
                  {['1m', '5m', '15m', '1h', '1D'].map(t => (
                    <button
                      key={t}
                      className={`tf-btn ${activeTimeframe === t ? 'active' : ''}`}
                      onClick={() => setActiveTimeframe(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="dash-chart__canvas">
                <svg viewBox="0 0 290 170" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="priceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(13, 148, 136, 0.15)" />
                      <stop offset="100%" stopColor="rgba(13, 148, 136, 0)" />
                    </linearGradient>
                  </defs>
                  {[40, 80, 120].map(y => (
                    <line key={y} x1="0" y1={y} x2="290" y2={y} stroke="rgba(15, 23, 36, 0.05)" strokeWidth="1" />
                  ))}
                  {candles.map((c, i) => (
                    <rect key={`v-${i}`} x={c.x - 7} y={150} width={14}
                      height={Math.random() * 15 + 5}
                      fill={c.up ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.18)'}
                      transform={`scale(1,-1) translate(0,-170)`} />
                  ))}
                  {candles.map((c, i) => <Candlestick key={i} {...c} />)}
                  <path
                    d="M30,135 C55,128 80,118 105,102 C130,86 155,98 180,82 C205,66 230,78 255,58"
                    fill="none" stroke="rgba(180,83,9,0.6)" strokeWidth="1.5" strokeDasharray="4,3"
                  />
                </svg>
              </div>
            </div>

            {/* Signals + P&L */}
            <div className="dash-right-col">
              {/* Signal card */}
              <div
                className="dash-panel dash-signal"
                onClick={() => openInfo({ title: 'Active Signal: BAJFINANCE', subtitle: 'Target: ₹7,600 | Stop Loss: ₹6,950' })}
                style={{ cursor: 'pointer' }}
              >
                <div className="dash-panel__title">Active Signal</div>
                <div className="sig-card-content">
                  <div className="sig-label buy">🎯 BUY</div>
                  <div className="sig-sym">BAJFINANCE</div>
                  <div className="sig-grid">
                    <div className="sig-item"><span>Entry</span><strong>₹7,150</strong></div>
                    <div className="sig-item"><span>Target</span><strong className="up">₹7,600</strong></div>
                    <div className="sig-item"><span>SL</span><strong className="down">₹6,950</strong></div>
                    <div className="sig-item"><span>R:R</span><strong>1:2.25</strong></div>
                  </div>
                </div>
              </div>

              {/* P&L widget */}
              <div className="dash-panel dash-pnl">
                <div className="dash-panel__title">Today's P&L</div>
                <div className="pnl-value up">+₹8,420</div>
                <div className="pnl-sub">+0.68% of portfolio</div>
                <div className="pnl-bar-wrap">
                  <div className="pnl-bar" style={{ width: '68%' }} />
                </div>
              </div>
            </div>

            {/* Market movers */}
            <div className="dash-panel dash-movers">
              <div className="dash-panel__title">Top Movers</div>
              {movers.map((m, i) => (
                <div key={i} className="mover-item">
                  <span className="mover-sym">{m.sym}</span>
                  <span className={`mover-change ${m.up ? 'up' : 'down'}`}>{m.change}</span>
                </div>
              ))}
            </div>

            {/* Notifications */}
            <div className="dash-panel dash-notifs">
              <div className="dash-panel__title">
                <Bell size={13} style={{ display: 'inline', marginRight: 6, color: 'var(--gold-400)' }} />
                Smart Alerts
              </div>
              {notifications.map((n, i) => (
                <div key={i} className={`notif-item notif-${n.type}`}>
                  <div className="notif-dot" />
                  <div className="notif-body">
                    <div className="notif-text">{n.text}</div>
                    <div className="notif-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="dashboard__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-secondary body-md">Experience the full platform — no credit card required.</p>
          <button
            className="btn btn-primary"
            id="try-platform-free"
            onClick={() => openAccount(1)}
          >
            Try Platform Free
            <ArrowUpRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
