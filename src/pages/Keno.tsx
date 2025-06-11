
import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Dice6, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Keno = () => {
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-yellow-600">
        <Header />
        
        {/* Header spécifique Keno */}
        <header className="bg-gradient-to-r from-purple-900/90 to-yellow-600/90 backdrop-blur-sm border-b border-yellow-400/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/')}
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-purple-200">
                    <Dice6 className="w-6 h-6 text-purple-900" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Keno FDJ</h1>
                    <p className="text-yellow-200">Tirages quotidiens rapides</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card className="bg-white/95 border-2 border-yellow-400 max-w-2xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-purple-800 to-purple-900 text-white">
              <CardTitle className="flex items-center">
                <Dice6 className="w-5 h-5 mr-2" />
                Keno - Bientôt Disponible
              </CardTitle>
              <CardDescription className="text-purple-200">
                Prédictions IA pour le Keno FDJ
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto">
                  <Dice6 className="w-12 h-12 text-yellow-400" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-purple-900 mb-2">Module en Développement</h2>
                  <p className="text-purple-700 mb-6">
                    L'analyse IA pour le Keno avec ses tirages toutes les 4 minutes arrive bientôt.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 text-left">
                  <h3 className="font-semibold text-purple-800 mb-3">Fonctionnalités à venir :</h3>
                  <ul className="space-y-2 text-purple-700">
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-purple-600 mr-2" />
                      Analyse en temps réel
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-purple-600 mr-2" />
                      Prédictions rapides
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-purple-600 mr-2" />
                      Choix de 1 à 10 numéros
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-purple-600 mr-2" />
                      Suivi des gains
                    </li>
                  </ul>
                </div>

                <Button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
                >
                  Retour à l'accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Keno;
