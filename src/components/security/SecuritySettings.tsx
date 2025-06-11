
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useMobileSecurity } from '@/hooks/useMobileSecurity';
import { Shield, KeyRound } from 'lucide-react';

const SecuritySettings = () => {
  const { settings, isLoading, setupPin, disablePin } = useMobileSecurity();
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
                  disablePin();
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

        <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-800">
            Utilisez un code PIN à 4 chiffres pour sécuriser l'accès à votre application
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
