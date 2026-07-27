import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TrustSection from './components/TrustSection'
import FeaturesSection from './components/FeaturesSection'
import ResearchSection from './components/ResearchSection'
import DashboardShowcase from './components/DashboardShowcase'
import TestimonialsSection from './components/TestimonialsSection'
import WhySection from './components/WhySection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import { ModalProvider } from './context/ModalContext'
import AuthModal from './components/Modals/AuthModal'
import AccountModal from './components/Modals/AccountModal'
import DemoModal from './components/Modals/DemoModal'
import InfoModal from './components/Modals/InfoModal'

function App() {
  return (
    <ModalProvider>
      <div className="app-root" style={{ background: 'var(--surface-1)' }}>
        <div className="noise-overlay" />
        <Navbar />
        <main style={{ paddingTop: '72px' }}>
          <HeroSection />
          <TrustSection />
          <FeaturesSection />
          <ResearchSection />
          <DashboardShowcase />
          <TestimonialsSection />
          <WhySection />
          <CtaSection />
        </main>
        <Footer />
        {/* Global Modals */}
        <AuthModal />
        <AccountModal />
        <DemoModal />
        <InfoModal />
      </div>
    </ModalProvider>
  )
}

export default App
