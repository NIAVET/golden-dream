
import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import GamesGrid from '@/components/sections/GamesGrid';
import FeaturesSection from '@/components/sections/FeaturesSection';
import CTASection from '@/components/sections/CTASection';
import MobileAppInfo from '@/components/ui/mobile-app-info';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600">
      <Header />
      <HeroSection />
      <GamesGrid />
      <FeaturesSection />
      <MobileAppInfo />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
