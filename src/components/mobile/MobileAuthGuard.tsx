
import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { useMobileSecurity } from '@/hooks/useMobileSecurity';
import MobileAuth from '@/components/security/MobileAuth';
import { useAuth } from '@/hooks/useAuth';

interface MobileAuthGuardProps {
  children: React.ReactNode;
}

const MobileAuthGuard = ({ children }: MobileAuthGuardProps) => {
  const { user } = useAuth();
  const { settings } = useMobileSecurity();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shouldShowAuth, setShouldShowAuth] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsAuthenticated(false);
      setShouldShowAuth(false);
      return;
    }

    // Uniquement sur mobile et si PIN activé
    if (Capacitor.isNativePlatform() && settings.pinEnabled) {
      setShouldShowAuth(true);
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      setShouldShowAuth(false);
    }
  }, [user, settings.pinEnabled]);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    setShouldShowAuth(false);
  };

  const handleSkip = () => {
    setIsAuthenticated(true);
    setShouldShowAuth(false);
  };

  if (shouldShowAuth && !isAuthenticated) {
    return (
      <MobileAuth 
        onAuthenticated={handleAuthenticated}
        onSkip={handleSkip}
      />
    );
  }

  return <>{children}</>;
};

export default MobileAuthGuard;
