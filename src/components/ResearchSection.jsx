import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, ArrowRight, BarChart2, Clock, Target } from 'lucide-react'
import { useModal } from '../context/ModalContext'
import './ResearchSection.css'

const tabs = ['Intraday', 'Swing', 'Long-Term', 'F&O', 'Options', 'Learning']

const callsData = {
  Intraday: [
    { symbol: 'NIFTY 50 CE', action: 'BUY', entry: '24,350', target: '24,500', sl: '24,280', confidence: 88, status: 'active', time: '9:32 AM', type: 'Options' },
    { symbol: 'HDFCBANK', action: 'BUY', entry: '1,748', target: '1,782', sl: '1,730', confidence: 82, status: 'active', time: '10:05 AM', type: 'Equity' },
    { symbol: 'BANKNIFTY', action: 'SELL', entry: '52,400', target: '52,100', sl: '52,580', confidence: 76, status: 'closed', time: '11:20 AM', result: '+₹4,200', type: 'F&O' },
    { symbol: 'RELIANCE', action: 'BUY', entry: '2,835', target: '2,875', sl: '2,810', confidence: 85, status: 'active', time: '2:15 PM', type: 'Equity' },
  ],
  Swing: [
    { symbol: 'BAJFINANCE', action: 'BUY', entry: '7,150', target: '7,600', sl: '6,950', confidence: 91, status: 'active', time: '3 days ago', type: 'Equity' },
    { symbol: 'WIPRO', action: 'BUY', entry: '572', target: '620', sl: '555', confidence: 79, status: 'active', time: '5 days ago', type: 'Equity' },
    { symbol: 'TATAMOTORS', action: 'BUY', entry: '920', target: '985', sl: '895', confidence: 87, status: 'closed', time: '8 days ago', result: '+₹12,500', type: 'Equity' },
    { symbol: 'ADANIENT', action: 'SELL', entry: '2,980', target: '2,750', sl: '3,080', confidence: 74, status: 'active', time: '2 days ago', type: 'Equity' },
  ],
  'Long-Term': [
    { symbol: 'IRFC', action: 'BUY', entry: '158', target: '220', sl: '138', confidence: 85, status: 'active', time: '6 weeks ago', type: 'Equity' },
    { symbol: 'HDFC Life', action: 'BUY', entry: '542', target: '680', sl: '510', confidence: 88, status: 'active', time: '3 weeks ago', type: 'Equity' },
    { symbol: 'TATAPOWER', action: 'BUY', entry: '348', target: '430', sl: '318', confidence: 82, status: 'active', time: '4 weeks ago', type: 'Equity' },
    { symbol: 'COALINDIA', action: 'BUY', entry: '415', target: '480', sl: '390', confidence: 76, status: 'active', time: '2 weeks ago', type: 'Equity' },
  ],
  'F&O': [
    { symbol: 'NIFTY FUT', action: 'BUY', entry: '24,350', target: '24,650', sl: '24,200', confidence: 84, status: 'active', time: '1 day ago', type: 'Futures' },
    { symbol: 'BANKNIFTY FUT', action: 'SELL', entry: '52,500', target: '51,800', sl: '52,900', confidence: 78, status: 'active', time: '1 day ago', type: 'Futures' },
    { symbol: 'RELIANCE FUT', action: 'BUY', entry: '2,840', target: '2,920', sl: '2,795', confidence: 81, status: 'active', time: '2 days ago', type: 'Futures' },
    { symbol: 'INFY FUT', action: 'BUY', entry: '1,915', target: '1,980', sl: '1,880', confidence: 77, status: 'active', time: '1 day ago', type: 'Futures' },
  ],
  Options: [
    { symbol: 'NIFTY 24500 CE', action: 'BUY', entry: '120', target: '250', sl: '65', confidence: 79, status: 'active', time: '2 hrs ago', type: 'Options' },
    { symbol: 'BANKNIFTY 52000 PE', action: 'BUY', entry: '185', target: '380', sl: '95', confidence: 73, status: 'active', time: '3 hrs ago', type: 'Options' },
    { symbol: 'RELIANCE 2900 CE', action: 'BUY', entry: '42', target: '90', sl: '20', confidence: 76, status: 'closed', time: '1 day ago', result: '+₹3,600', type: 'Options' },
    { symbol: 'NIFTY 24000 PE', action: 'SELL', entry: '95', target: '30', sl: '145', confidence: 80, status: 'active', time: '4 hrs ago', type: 'Options' },
  ],
  Learning: [
    { symbol: 'Price Action Basics', action: 'LEARN', entry: 'Beginner', target: 'Intermediate', sl: '—', confidence: 100, status: 'course', time: '45 min', type: 'Education' },
    { symbol: 'Options Greeks Mastery', action: 'LEARN', entry: 'Intermediate', target: 'Advanced', sl: '—', confidence: 100, status: 'course', time: '90 min', type: 'Education' },
    { symbol: 'F&O Risk Management', action: 'LEARN', entry: 'Intermediate', target: 'Expert', sl: '—', confidence: 100, status: 'course', time: '60 min', type: 'Education' },
    { symbol: 'Sector Rotation Strategy', action: 'LEARN', entry: 'Intermediate', target: 'Expert', sl: '—', confidence: 100, status: 'course', time: '75 min', type: 'Education' },
  ],
}

function CallCard({ call, index, onClick }) {
  const isBuy = call.action === 'BUY'
  const isLearn = call.action === 'LEARN'
  const isClosed = call.status === 'closed'
  const isCourse = call.status === 'course'

  return (
    <motion.div
      className={`call-card ${isClosed ? 'call-card--closed' : ''} ${isCourse ? 'call-card--course' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="call-card__header">
        <div className="call-card__info">
          {!isLearn && (
            <div className={`call-action ${isBuy ? 'buy' : 'sell'}`}>
              {isBuy ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {call.action}
            </div>
          )}
          {isLearn && <div className="call-action learn">📚 LEARN</div>}
          <div className="call-symbol">{call.symbol}</div>
          <span className={`badge ${isCourse ? 'badge-blue' : 'badge-teal'}`} style={{ fontSize: '10px' }}>{call.type}</span>
        </div>
        <div className="call-card__right">
          {isClosed && call.result && (
            <div className="call-result">{call.result}</div>
          )}
          {!isClosed && !isCourse && (
            <div className="call-confidence">
              <div className="conf-bar">
                <div className="conf-fill" style={{ width: `${call.confidence}%` }} />
              </div>
              <span>{call.confidence}%</span>
            </div>
          )}
        </div>
      </div>

      {!isCourse ? (
        <div className="call-card__levels">
          <div className="level-item">
            <span className="level-label">Entry</span>
            <span className="level-value">{call.entry}</span>
          </div>
          <div className="level-item level-target">
            <Target size={11} />
            <span className="level-label">Target</span>
            <span className="level-value">{call.target}</span>
          </div>
          <div className="level-item level-sl">
            <span className="level-label">SL</span>
            <span className="level-value">{call.sl}</span>
          </div>
          <div className="level-item">
            <Clock size={11} />
            <span className="level-value" style={{ color: 'var(--text-muted)' }}>{call.time}</span>
          </div>
        </div>
      ) : (
        <div className="call-card__course-meta">
          <span>Duration: {call.time}</span>
          <span>Level: {call.entry} → {call.target}</span>
        </div>
      )}
    </motion.div>
  )
}

export default function ResearchSection() {
  const { activeResearchTab, setActiveResearchTab, openInfo } = useModal()
  const activeTab = activeResearchTab || 'Intraday'

  return (
    <section id="research" className="research-section section">
      <div className="research__bg-accent" aria-hidden="true" />
      <div className="container">
        <div className="research__layout">
          {/* Left: Header */}
          <motion.div
            className="research__header"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-tag">Research & Insights</div>
            <h2 className="display-md">
              Analyst-Powered
              <br />
              <span className="text-gradient-gold">Market Intelligence</span>
            </h2>
            <p className="body-md text-secondary">
              From intraday scalps to long-term investment ideas —
              our research desk covers every style, every timeframe,
              and every instrument.
            </p>

            <div className="research__stats">
              <div className="res-stat">
                <div className="res-stat-value">15+</div>
                <div className="res-stat-label">Expert Analysts</div>
              </div>
              <div className="res-stat">
                <div className="res-stat-value">6 AM</div>
                <div className="res-stat-label">Daily Coverage Starts</div>
              </div>
              <div className="res-stat">
                <div className="res-stat-value">3X</div>
                <div className="res-stat-label">Average Risk/Reward</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Tab panel */}
          <div className="research__panel">
            {/* Tabs */}
            <div className="research__tabs" role="tablist">
              {tabs.map(tab => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`research__tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveResearchTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Cards (1-Column List) */}
            <div className="research__calls" role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="research__cards-list"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {(callsData[activeTab] || []).map((call, i) => (
                    <CallCard
                      key={i}
                      call={call}
                      index={i}
                      onClick={() => openInfo({ title: `${call.symbol} — ${call.action} Signal`, subtitle: `Research Call Details (${call.type})`, callData: call })}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* View All Calls Button - Anchored cleanly at bottom of panel */}
            <div className="research__footer-cta">
              <button
                className="btn btn-primary"
                id="view-all-calls"
                onClick={() => openInfo({ title: 'TIME2TRADE Full Research Stream', subtitle: 'Live Active Calls Across All Segments' })}
              >
                View All Calls
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
