import './TickerStrip.css'

const tickers = [
  { symbol: 'NIFTY 50', price: '24,386.40', change: '+127.35', pct: '+0.52%', up: true },
  { symbol: 'SENSEX', price: '79,986.80', change: '+412.05', pct: '+0.52%', up: true },
  { symbol: 'BANKNIFTY', price: '52,174.60', change: '-156.20', pct: '-0.30%', up: false },
  { symbol: 'RELIANCE', price: '2,847.35', change: '+42.10', pct: '+1.50%', up: true },
  { symbol: 'TCS', price: '4,182.90', change: '+28.60', pct: '+0.69%', up: true },
  { symbol: 'HDFCBANK', price: '1,756.45', change: '-12.85', pct: '-0.73%', up: false },
  { symbol: 'INFY', price: '1,924.30', change: '+15.75', pct: '+0.82%', up: true },
  { symbol: 'WIPRO', price: '584.60', change: '+4.25', pct: '+0.73%', up: true },
  { symbol: 'ADANIENT', price: '2,945.80', change: '-34.50', pct: '-1.16%', up: false },
  { symbol: 'BAJFINANCE', price: '7,284.60', change: '+112.45', pct: '+1.57%', up: true },
  { symbol: 'GOLD', price: '₹72,480', change: '+340', pct: '+0.47%', up: true },
  { symbol: 'CRUDE OIL', price: '$86.42', change: '+1.28', pct: '+1.50%', up: true },
]

export default function TickerStrip() {
  const doubled = [...tickers, ...tickers]
  return (
    <div className="ticker-strip">
      <div className="ticker-inner">
        {doubled.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className="symbol">{t.symbol}</span>
            <span className="price">{t.price}</span>
            <span className={t.up ? 'change-up' : 'change-down'}>
              {t.change} ({t.pct})
            </span>
            <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 4px' }}>|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
