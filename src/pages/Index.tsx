
import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MobileAuthGuard from '@/components/mobile/MobileAuthGuard';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import GamesGrid from '@/components/sections/GamesGrid';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import FeaturesSection from '@/components/sections/FeaturesSection';
import CTASection from '@/components/sections/CTASection';
import MobileAppInfo from '@/components/ui/mobile-app-info';
import AppStatus from '@/components/system/AppStatus';
import SecuritySettings from '@/components/security/SecuritySettings';
import Footer from '@/components/layout/Footer';
import { useMobileFeatures } from '@/hooks/useMobileFeatures';

const Index = () => {
  const { isNative } = useMobileFeatures();

  return (
    <ProtectedRoute>
      <MobileAuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600">
          <Header />
          <HeroSection />
          <GamesGrid />
          <UpcomingEvents />
          <FeaturesSection />
          
          {/* Ajout du statut de l'application */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-md">
              <AppStatus />
            </div>
          </section>
          
          {/* Ajout des paramètres de sécurité */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-md">
              <SecuritySettings />
            </div>
          </section>
          
          {/* Afficher les infos mobile seulement sur web */}
          {!isNative && <MobileAppInfo />}
          
          <CTASection />
          <Footer />
        </div>
      </MobileAuthGuard>
    </ProtectedRoute>
  );
};

export default Index;
