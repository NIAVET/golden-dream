
import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Loto = () => {
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-yellow-600">
        <Header />
        
        {/* Header spécifique Loto */}
        <header className="bg-gradient-to-r from-green-900/90 to-yellow-600/90 backdrop-blur-sm border-b border-yellow-400/30">
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
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-green-200">
                    <Star className="w-6 h-6 text-green-900" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Loto Français</h1>
                    <p className="text-yellow-200">Le jeu mythique français</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card className="bg-white/95 border-2 border-yellow-400 max-w-2xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-green-800 to-green-900 text-white">
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Loto - Bientôt Disponible
              </CardTitle>
              <CardDescription className="text-green-200">
                Prédictions IA pour le Loto français
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-12 h-12 text-yellow-400" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-green-900 mb-2">Module en Développement</h2>
                  <p className="text-green-700 mb-6">
                    Nous travaillons activement sur l'intégration de l'analyse IA pour le Loto français.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-6 text-left">
                  <h3 className="font-semibold text-green-800 mb-3">Fonctionnalités à venir :</h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                      Analyse des tendances historiques
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                      Prédictions IA optimisées
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                      Statistiques avancées
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                      Suivi des résultats
                    </li>
                  </ul>
                </div>

                <Button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
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

export default Loto;
