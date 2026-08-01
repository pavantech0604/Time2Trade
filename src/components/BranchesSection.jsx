import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  UserCheck,
  Building2,
  Navigation,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { BRANCHES_DATA } from '../constants/branchesData'
import { useModal } from '../context/ModalContext'
import './BranchesSection.css'

export default function BranchesSection() {
  const { openInfo, openAccount } = useModal()

  const handleBookVisit = (branch) => {
    openInfo({
      title: `Book Office Visit — ${branch.name}`,
      subtitle: `${branch.address}, ${branch.city} - ${branch.pincode}`,
      content: `Our office team led by ${branch.manager} is ready to assist you. Meet our equity & derivatives experts, set up offline KYCs, or consult on specialized portfolio strategies.`,
      branchDetails: branch
    })
  }

  return (
    <section id="branches" className="branches-section">
      <div className="container">
        {/* Section Header */}
        <div className="branches__header">
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-tag" style={{ margin: '0 auto 14px' }}>
              <Building2 size={13} style={{ color: 'var(--teal-600)' }} />
              <span>OFFICIAL BRANCH NETWORK</span>
            </div>
            <h2 className="display-md branches__title">
              Visit Our <span className="text-gradient-teal">Branch Offices</span>
            </h2>
            <p className="body-md branches__subtitle">
              Connect directly with our advisory teams and institutional desks at our official office locations across India.
            </p>
          </motion.div>
        </div>

        {/* 3 Branch Showcase Grid */}
        <div className="branches__3col-grid">
          {BRANCHES_DATA.map((branch, idx) => (
            <motion.div
              key={branch.id}
              className={`branch-card branch-card--${branch.accent} ${branch.isHq ? 'branch-card--featured' : ''}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Card Top Badge */}
              {branch.isHq && (
                <div className="branch-card__top-ribbon">
                  <Sparkles size={11} />
                  <span>CORPORATE HEADQUARTERS</span>
                </div>
              )}

              {/* Card Header */}
              <div className="branch-card__header">
                <div>
                  <div className="branch-card__type-tag">{branch.typeTag}</div>
                  <h3 className="branch-card__name">
                    {branch.name}
                  </h3>
                </div>
                <div className={`branch-card__city-badge branch-card__city-badge--${branch.accent}`}>
                  <MapPin size={12} />
                  <span>{branch.city}</span>
                </div>
              </div>

              {/* Branch Contact Details */}
              <div className="branch-card__body">
                <div className="branch-info-row">
                  <Building2 size={15} className="info-icon" />
                  <div>
                    <div className="info-text">{branch.address}</div>
                    <div className="info-sub">{branch.landmark} &bull; PIN {branch.pincode}</div>
                  </div>
                </div>

                <div className="branch-info-row">
                  <Phone size={15} className="info-icon" />
                  <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="info-link">
                    {branch.phone}
                  </a>
                </div>

                <div className="branch-info-row">
                  <Mail size={15} className="info-icon" />
                  <a href={`mailto:${branch.email}`} className="info-link">
                    {branch.email}
                  </a>
                </div>

                <div className="branch-info-row">
                  <UserCheck size={15} className="info-icon" />
                  <div className="info-text">Desk Manager: <strong>{branch.manager}</strong></div>
                </div>

                <div className="branch-info-row">
                  <Clock size={15} className="info-icon" />
                  <div className="info-text">{branch.timing}</div>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="branch-card__features">
                {branch.features.map((feat, fIdx) => (
                  <span key={fIdx} className="feature-pill">
                    <CheckCircle2 size={11} className="pill-check" />
                    {feat}
                  </span>
                ))}
              </div>

              {/* Card Actions */}
              <div className="branch-card__actions">
                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="branch-btn branch-btn--outline"
                >
                  <Navigation size={13} />
                  <span>Directions</span>
                </a>
                <button
                  className="branch-btn branch-btn--primary"
                  onClick={() => handleBookVisit(branch)}
                >
                  <span>Book Visit</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Assistance Banner */}
        <motion.div
          className="branches__banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="banner-content">
            <ShieldCheck size={28} className="banner-icon" />
            <div>
              <h4 className="banner-title">Need Dedicated Advisory or Offline Support?</h4>
              <p className="banner-desc">
                Connect with your dedicated Relationship Manager at any of our official branch locations for personalized trading guidance and SEBI-compliant account setup.
              </p>
            </div>
          </div>
          <button
            className="banner-cta-btn"
            onClick={() => openAccount(1)}
          >
            <span>Open Account with Branch RM</span>
            <ChevronRight size={15} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
