import { Navbar } from '../components/layout/navbar'
import { HeroSection } from '../components/landing/hero-section'
import { FeaturesSection } from '../components/landing/features-section'
import { PricingSection } from '../components/landing/pricing-section'
import { ContactSection } from '../components/landing/contact-section'
import { Footer } from '../components/layout/footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default LandingPage
