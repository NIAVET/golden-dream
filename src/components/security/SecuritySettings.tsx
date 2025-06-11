
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useMobileSecurity } from '@/hooks/useMobileSecurity';
import { Shield, Fingerprint, KeyRound, Smartphone } from 'lucide-react';

const SecuritySettings = () => {
  const { settings, isLoading, setupPin, enableBiometric, disableSecurity } = useMobileSecurity();
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPinSetup, setShowPinSetup] = useState(false);

  const handlePinSetup = async () => {
    if (newPin.length !== 4) {
      return;
    }
    
    if (newPin !== confirmPin) {
      return;
    }

    const success = await setupPin(newPin);
    if (success) {
      setNewPin('');
      setConfirmPin('');
      setShowPinSetup(false);
    }
  };

  const getBiometricIcon = () => {
    switch (settings.biometricType) {
      case 'touchId':
      case 'fingerprintAuthentication':
        return <Fingerprint className="h-5 w-5" />;
      case 'faceId':
      case 'faceAuthentication':
        return <Shield className="h-5 w-5" />;
      default:
        return <Smartphone className="h-5 w-5" />;
    }
  };

  const getBiometricLabel = () => {
    switch (settings.biometricType) {
      case 'touchId':
        return 'Touch ID';
      case 'faceId':
        return 'Face ID';
      case 'fingerprintAuthentication':
        return 'Empreinte digitale';
      case 'faceAuthentication':
        return 'Reconnaissance faciale';
      default:
        return 'Biométrie';
    }
  };

  return (
    <Card className="bg-white/95 border-2 border-blue-400">
      <CardHeader>
        <CardTitle className="text-lg text-blue-900 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Paramètres de sécurité
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Code PIN Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <KeyRound className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Code PIN</span>
              {settings.pinEnabled && (
                <Badge className="bg-green-500 text-white">Activé</Badge>
              )}
            </div>
            <Switch
              checked={settings.pinEnabled}
              onCheckedChange={(checked) => {
                if (checked) {
                  setShowPinSetup(true);
                } else {
                  disableSecurity('pin');
                }
              }}
              disabled={isLoading}
            />
          </div>

          {showPinSetup && !settings.pinEnabled && (
            <div className="space-y-3 p-4 border rounded-lg bg-blue-50">
              <Label htmlFor="new-pin">Nouveau code PIN (4 chiffres)</Label>
              <Input
                id="new-pin"
                type="password"
                maxLength={4}
                pattern="[0-9]*"
                placeholder="••••"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                className="text-center text-lg tracking-widest"
              />
              
              <Label htmlFor="confirm-pin">Confirmer le code PIN</Label>
              <Input
                id="confirm-pin"
                type="password"
                maxLength={4}
                pattern="[0-9]*"
                placeholder="••••"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                className="text-center text-lg tracking-widest"
              />
              
              {newPin && confirmPin && newPin !== confirmPin && (
                <p className="text-red-500 text-sm">Les codes PIN ne correspondent pas</p>
              )}
              
              <div className="flex space-x-2">
                <Button
                  onClick={handlePinSetup}
                  disabled={newPin.length !== 4 || newPin !== confirmPin || isLoading}
                  className="flex-1"
                >
                  Configurer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPinSetup(false);
                    setNewPin('');
                    setConfirmPin('');
                  }}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Biometric Section */}
        {settings.biometricType && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getBiometricIcon()}
                <span className="font-medium">{getBiometricLabel()}</span>
                {settings.biometricEnabled && (
                  <Badge className="bg-green-500 text-white">Activé</Badge>
                )}
              </div>
              <Switch
                checked={settings.biometricEnabled}
                onCheckedChange={(checked) => {
                  if (checked) {
                    enableBiometric();
                  } else {
                    disableSecurity('biometric');
                  }
                }}
                disabled={isLoading}
              />
            </div>
            
            <p className="text-sm text-gray-600">
              Utilisez votre {getBiometricLabel().toLowerCase()} pour un accès rapide et sécurisé
            </p>
          </div>
        )}

        {!settings.biometricType && (
          <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
            <p className="text-sm text-yellow-800">
              L'authentification biométrique n'est pas disponible sur cet appareil
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
