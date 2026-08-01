import { Mail, Phone, MapPin, Share2, Rss, PlayCircle, Heart } from 'lucide-react'
import BrandLogo from './BrandLogo'
import CompanyAddress from './CompanyAddress'
import { COMPANY_INFO } from '../constants/companyInfo'
import { useModal } from '../context/ModalContext'
import './Footer.css'

const footerLinks = {
  Platform: [
    { label: 'Web Terminal', target: '#platform' },
    { label: 'Mobile App', target: '#platform' },
    { label: 'API Access', target: '#platform' },
    { label: 'Smart Alerts', target: '#features' },
    { label: 'Portfolio Tracker', target: '#features' },
    { label: 'Market Scanner', target: '#features' }
  ],
  Research: [
    { label: 'Daily Calls', target: '#research' },
    { label: 'Swing Signals', target: '#research' },
    { label: 'F&O Strategies', target: '#research' },
    { label: 'Options Ideas', target: '#research' },
    { label: 'Market Reports', target: '#research' },
    { label: 'Earnings Analysis', target: '#research' }
  ],
  Learn: [
    { label: 'Beginner Guide', target: '#why' },
    { label: 'Technical Analysis', target: '#why' },
    { label: 'F&O Mastery', target: '#why' },
    { label: 'Risk Management', target: '#why' },
    { label: 'Options Greeks', target: '#why' },
    { label: 'Live Webinars', target: '#why' }
  ],
  Company: [
    { label: 'About Us', target: '#why' },
    { label: 'Branch Network', target: '#branches' },
    { label: 'Our Team', target: '#why' },
    { label: 'Careers', target: '#why' },
    { label: 'Press Kit', target: '#why' },
    { label: 'Blog', target: '#research' },
    { label: 'Contact', target: '#cta' }
  ],
}

const socials = [
  { icon: Share2, label: 'Twitter/X' },
  { icon: Rss, label: 'LinkedIn' },
  { icon: PlayCircle, label: 'YouTube' },
  { icon: Heart, label: 'Instagram' },
]

export default function Footer() {
  const { openInfo } = useModal()

  const handleLinkClick = (item) => {
    if (item.target) {
      const el = document.querySelector(item.target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    openInfo({ title: item.label, subtitle: 'TIME2TRADE Information' })
  }

  const handleLegalClick = (title, subtitle) => {
    openInfo({ title, subtitle })
  }

  return (
    <footer className="footer">
      <div className="divider" />
      <div className="container">
        <div className="footer__main">
          {/* Brand col */}
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <BrandLogo variant="footer" />
            </div>
            <p className="footer__desc">
              India's premium trading intelligence platform — combining research,
              technology, and expertise to give every trader a professional edge.
            </p>

            {/* Contact */}
            <div className="footer__contact">
              <a href={`tel:${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`} className="footer__contact-item">
                <Phone size={14} />
                {COMPANY_INFO.phone}
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="footer__contact-item">
                <Mail size={14} />
                {COMPANY_INFO.email}
              </a>
              <div className="footer__contact-item footer__address-item" title="Registered Office Address">
                <MapPin size={14} className="footer__address-icon" />
                <CompanyAddress variant="formatted" />
              </div>
            </div>

            {/* Social */}
            <div className="footer__socials">
              {socials.map(s => (
                <button
                  key={s.label}
                  className="footer__social"
                  aria-label={s.label}
                  onClick={() => openInfo({ title: `${s.label} Channel`, subtitle: 'Official TIME2TRADE Handle' })}
                >
                  <s.icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="footer__link-col">
              <div className="footer__col-title">{group}</div>
              <ul className="footer__links">
                {links.map(item => (
                  <li key={item.label}>
                    <button
                      className="footer__link"
                      onClick={() => handleLinkClick(item)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <div className="footer__legal">
            <p>© 2026 TIME2TRADE Intelligence Technologies Ltd. All rights reserved.</p>
            <p className="footer__disclaimer">
              CIN: UXXXXXXXXXXXXXXXXX | Exchange Empaneled & Member
            </p>
          </div>
          <div className="footer__bottom-links">
            <button className="footer__bottom-link-btn" onClick={() => handleLegalClick('Privacy Policy', 'Data Protection & Privacy Policy')}>Privacy Policy</button>
            <button className="footer__bottom-link-btn" onClick={() => handleLegalClick('Terms of Use', 'User Terms & Conditions Agreement')}>Terms of Use</button>
            <button className="footer__bottom-link-btn" onClick={() => handleLegalClick('Risk Disclosure Statement', 'Market Risk & Regulatory Disclosure')}>Risk Disclosure</button>
            <button className="footer__bottom-link-btn" onClick={() => handleLegalClick('Grievance Redressal Policy', 'Customer Support & Escalation Matrix')}>Grievance Policy</button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="footer__risk-disclosure">
          <strong>Risk Disclosure:</strong> Investments in securities market are subject to market risks.
          Read all the related documents carefully before investing. Past performance is not indicative
          of future results. TIME2TRADE provides research intelligence and analytical market tools.
        </div>
      </div>
    </footer>
  )
}
