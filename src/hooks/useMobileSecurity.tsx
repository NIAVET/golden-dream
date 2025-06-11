
import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { BiometricAuth, BiometryType } from '@capacitor/biometric';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface SecuritySettings {
  pinEnabled: boolean;
  biometricEnabled: boolean;
  biometricType: BiometryType | null;
}

export const useMobileSecurity = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<SecuritySettings>({
    pinEnabled: false,
    biometricEnabled: false,
    biometricType: null
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadSecuritySettings();
      checkBiometricAvailability();
    }
  }, [user]);

  const loadSecuritySettings = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('user_settings')
        .select('pin_enabled, biometric_enabled')
        .eq('id', user.id)
        .single();

      if (data) {
        setSettings(prev => ({
          ...prev,
          pinEnabled: data.pin_enabled || false,
          biometricEnabled: data.biometric_enabled || false
        }));
      }
    } catch (error) {
      console.error('Error loading security settings:', error);
    }
  };

  const checkBiometricAvailability = async () => {
    try {
      const result = await BiometricAuth.checkBiometry();
      setSettings(prev => ({
        ...prev,
        biometricType: result.biometryType
      }));
    } catch (error) {
      console.log('Biometric not available:', error);
    }
  };

  const setupPin = async (pin: string) => {
    if (!user) return false;

    setIsLoading(true);
    try {
      // Hash the PIN (in production, use a proper hashing library)
      const pinHash = btoa(pin + user.id);
      
      const { error } = await supabase
        .from('user_settings')
        .update({ 
          pin_enabled: true, 
          pin_hash: pinHash 
        })
        .eq('id', user.id);

      if (error) throw error;

      // Store PIN locally for quick access
      await Preferences.set({
        key: 'userPin',
        value: pinHash
      });

      setSettings(prev => ({ ...prev, pinEnabled: true }));
      
      toast({
        title: "Code PIN configuré",
        description: "Votre code PIN a été configuré avec succès"
      });
      
      return true;
    } catch (error) {
      console.error('Error setting up PIN:', error);
      toast({
        title: "Erreur",
        description: "Impossible de configurer le code PIN",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPin = async (pin: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const expectedHash = btoa(pin + user.id);
      const { value: storedHash } = await Preferences.get({ key: 'userPin' });
      
      return storedHash === expectedHash;
    } catch (error) {
      console.error('Error verifying PIN:', error);
      return false;
    }
  };

  const enableBiometric = async (): Promise<boolean> => {
    if (!user) return false;

    setIsLoading(true);
    try {
      // Check if biometric is available
      await BiometricAuth.checkBiometry();
      
      // Request biometric authentication
      const result = await BiometricAuth.authenticate({
        reason: 'Activez l\'authentification biométrique pour Dream-golden',
        title: 'Authentification biométrique',
        subtitle: 'Utilisez votre empreinte digitale ou Face ID',
        fallbackTitle: 'Utiliser le code PIN'
      });

      if (result.isAuthenticated) {
        const { error } = await supabase
          .from('user_settings')
          .update({ biometric_enabled: true })
          .eq('id', user.id);

        if (error) throw error;

        setSettings(prev => ({ ...prev, biometricEnabled: true }));
        
        toast({
          title: "Biométrie activée",
          description: "L'authentification biométrique a été activée"
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error enabling biometric:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'activer l'authentification biométrique",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateWithBiometric = async (): Promise<boolean> => {
    try {
      const result = await BiometricAuth.authenticate({
        reason: 'Authentifiez-vous pour accéder à Dream-golden',
        title: 'Authentification biométrique',
        subtitle: 'Utilisez votre empreinte digitale ou Face ID',
        fallbackTitle: 'Utiliser le code PIN'
      });

      return result.isAuthenticated;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  };

  const disableSecurity = async (type: 'pin' | 'biometric') => {
    if (!user) return;

    setIsLoading(true);
    try {
      const updates = type === 'pin' 
        ? { pin_enabled: false, pin_hash: null }
        : { biometric_enabled: false };

      const { error } = await supabase
        .from('user_settings')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      if (type === 'pin') {
        await Preferences.remove({ key: 'userPin' });
        setSettings(prev => ({ ...prev, pinEnabled: false }));
      } else {
        setSettings(prev => ({ ...prev, biometricEnabled: false }));
      }

      toast({
        title: "Sécurité désactivée",
        description: `${type === 'pin' ? 'Code PIN' : 'Biométrie'} désactivé(e)`
      });
    } catch (error) {
      console.error(`Error disabling ${type}:`, error);
      toast({
        title: "Erreur",
        description: `Impossible de désactiver ${type === 'pin' ? 'le code PIN' : 'la biométrie'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    settings,
    isLoading,
    setupPin,
    verifyPin,
    enableBiometric,
    authenticateWithBiometric,
    disableSecurity
  };
};
