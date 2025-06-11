
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useMobileSecurity } from '@/hooks/useMobileSecurity';
import MobileAuth from '@/components/security/MobileAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { settings } = useMobileSecurity();
  const [isMobileAuthenticated, setIsMobileAuthenticated] = useState(false);
  const [isCheckingMobileAuth, setIsCheckingMobileAuth] = useState(true);

  // Reset mobile authentication when user changes or settings change
  useEffect(() => {
    console.log('ProtectedRoute: user', user?.id, 'pinEnabled', settings.pinEnabled);
    
    if (user) {
      if (settings.pinEnabled) {
        // Si le PIN est activé, forcer la ré-authentification
        setIsMobileAuthenticated(false);
      } else {
        // Si pas de PIN, autoriser l'accès
        setIsMobileAuthenticated(true);
      }
    } else {
      // Pas d'utilisateur, pas d'accès mobile
      setIsMobileAuthenticated(false);
    }
    
    setIsCheckingMobileAuth(false);
  }, [user, settings.pinEnabled]);

  if (loading || isCheckingMobileAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check mobile authentication if security is enabled
  if (settings.pinEnabled && !isMobileAuthenticated) {
    console.log('ProtectedRoute: Showing MobileAuth because PIN is enabled and not authenticated');
    return (
      <MobileAuth
        onAuthenticated={() => {
          console.log('ProtectedRoute: PIN authentication successful');
          setIsMobileAuthenticated(true);
        }}
        onSkip={() => {
          console.log('ProtectedRoute: PIN authentication skipped');
          setIsMobileAuthenticated(true);
        }}
      />
    );
  }

  console.log('ProtectedRoute: Allowing access to protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
