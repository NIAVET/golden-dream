
import React, { useState } from 'react';
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

  if (loading) {
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
  if ((settings.pinEnabled || settings.biometricEnabled) && !isMobileAuthenticated) {
    return (
      <MobileAuth
        onAuthenticated={() => setIsMobileAuthenticated(true)}
        onSkip={() => setIsMobileAuthenticated(true)}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
