
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AIMatchingSection from '@/components/MatchingSection';
import KnowledgeHub from '@/components/KnowledgeHub';
import BusinessTools from '@/components/BusinessTools';
import GlobalHub from '@/components/GlobalHub';
import Testimonials from '@/components/Testimonials';
import SecuritySection from '@/components/SecuritySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection/>
        <FeaturesSection/>
        <AIMatchingSection />
        <KnowledgeHub />
        <BusinessTools />
        <GlobalHub />
        <Testimonials />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
