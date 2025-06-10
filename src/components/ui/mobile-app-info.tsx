
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Download, Shield, Zap } from "lucide-react";

const MobileAppInfo = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Application Mobile Dream-golden
          </h3>
          <p className="text-yellow-200 text-lg max-w-2xl mx-auto">
            Emportez vos prédictions IA partout avec vous. Application native Android optimisée.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <Card className="bg-white/95 border-2 border-yellow-400">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900 flex items-center">
                <Smartphone className="w-6 h-6 mr-2" />
                Application Native
              </CardTitle>
              <CardDescription className="text-blue-600">
                Développée avec Capacitor pour des performances optimales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-500 text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  Performances Natives
                </Badge>
                <Badge className="bg-blue-500 text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  Sécurité Renforcée
                </Badge>
              </div>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-center">
                  <Download className="w-4 h-4 mr-2 text-green-600" />
                  Interface optimisée pour mobile
                </li>
                <li className="flex items-center">
                  <Download className="w-4 h-4 mr-2 text-green-600" />
                  Notifications push pour les tirages
                </li>
                <li className="flex items-center">
                  <Download className="w-4 h-4 mr-2 text-green-600" />
                  Mode hors ligne disponible
                </li>
                <li className="flex items-center">
                  <Download className="w-4 h-4 mr-2 text-green-600" />
                  Synchronisation automatique
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900 to-yellow-600 text-white border-2 border-yellow-400">
            <CardHeader>
              <CardTitle className="text-2xl">
                Instructions de Déploiement
              </CardTitle>
              <CardDescription className="text-yellow-200">
                Guide pour développeurs et utilisateurs avancés
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold mb-2">Étapes de Compilation :</h4>
                <ol className="text-sm space-y-1 text-yellow-200">
                  <li>1. Exporter vers GitHub</li>
                  <li>2. Cloner le projet localement</li>
                  <li>3. Installer les dépendances : npm install</li>
                  <li>4. Ajouter Android : npx cap add android</li>
                  <li>5. Build : npm run build</li>
                  <li>6. Sync : npx cap sync</li>
                  <li>7. Ouvrir : npx cap run android</li>
                </ol>
              </div>
              <Badge className="bg-yellow-500 text-blue-900">
                Nécessite Android Studio
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MobileAppInfo;
