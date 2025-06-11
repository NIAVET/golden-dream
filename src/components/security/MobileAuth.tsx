
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMobileSecurity } from '@/hooks/useMobileSecurity';
import { Shield, Fingerprint, KeyRound } from 'lucide-react';

interface MobileAuthProps {
  onAuthenticated: () => void;
  onSkip?: () => void;
}

const MobileAuth = ({ onAuthenticated, onSkip }: MobileAuthProps) => {
  const { settings, verifyPin, authenticateWithBiometric } = useMobileSecurity();
  const [pin, setPin] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Auto-trigger biometric if enabled and available
    if (settings.biometricEnabled && settings.biometricType) {
      handleBiometricAuth();
    }
  }, [settings.biometricEnabled, settings.biometricType]);

  const handlePinAuth = async () => {
    if (pin.length !== 4) return;

    setIsAuthenticating(true);
    setError('');

    const isValid = await verifyPin(pin);
    if (isValid) {
      onAuthenticated();
    } else {
      setError('Code PIN incorrect');
      setPin('');
    }

    setIsAuthenticating(false);
  };

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    setError('');

    const success = await authenticateWithBiometric();
    if (success) {
      onAuthenticated();
    } else {
      setError('Authentification biométrique échouée');
    }

    setIsAuthenticating(false);
  };

  // If no security is enabled, allow access
  if (!settings.pinEnabled && !settings.biometricEnabled) {
    onAuthenticated();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-blue-900 flex items-center justify-center">
            <Shield className="w-6 h-6 mr-2" />
            Authentification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.pinEnabled && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Entrez votre code PIN
              </label>
              <Input
                type="password"
                maxLength={4}
                pattern="[0-9]*"
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                className="text-center text-lg tracking-widest"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && pin.length === 4) {
                    handlePinAuth();
                  }
                }}
              />
              
              <Button
                onClick={handlePinAuth}
                disabled={pin.length !== 4 || isAuthenticating}
                className="w-full"
              >
                <KeyRound className="w-4 h-4 mr-2" />
                Valider
              </Button>
            </div>
          )}

          {settings.biometricEnabled && settings.biometricType && (
            <div className="space-y-3">
              {settings.pinEnabled && (
                <div className="text-center text-sm text-gray-500">ou</div>
              )}
              
              <Button
                onClick={handleBiometricAuth}
                disabled={isAuthenticating}
                variant="outline"
                className="w-full"
              >
                <Fingerprint className="w-4 h-4 mr-2" />
                Utiliser la biométrie
              </Button>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 text-sm">{error}</div>
          )}

          {onSkip && (
            <Button
              onClick={onSkip}
              variant="ghost"
              className="w-full text-gray-500"
            >
              Ignorer pour cette fois
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileAuth;
