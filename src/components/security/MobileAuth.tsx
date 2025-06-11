
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMobileSecurity } from '@/hooks/useMobileSecurity';
import { Shield, KeyRound } from 'lucide-react';

interface MobileAuthProps {
  onAuthenticated: () => void;
  onSkip?: () => void;
}

const MobileAuth = ({ onAuthenticated, onSkip }: MobileAuthProps) => {
  const { settings, verifyPin } = useMobileSecurity();
  const [pin, setPin] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');

  console.log('MobileAuth: Rendering with settings.pinEnabled =', settings.pinEnabled);

  const handlePinAuth = async () => {
    if (pin.length !== 4) return;

    setIsAuthenticating(true);
    setError('');

    console.log('MobileAuth: Verifying PIN...');
    const isValid = await verifyPin(pin);
    console.log('MobileAuth: PIN verification result:', isValid);
    
    if (isValid) {
      onAuthenticated();
    } else {
      setError('Code PIN incorrect');
      setPin('');
    }

    setIsAuthenticating(false);
  };

  // Toujours afficher l'écran de PIN si on arrive ici
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
