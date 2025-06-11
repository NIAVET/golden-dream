
import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EuroDreams = () => {
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-yellow-600">
        <Header />
        
        {/* Header spécifique EuroDreams */}
        <header className="bg-gradient-to-r from-indigo-900/90 to-yellow-600/90 backdrop-blur-sm border-b border-yellow-400/30">
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
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-indigo-200">
                    <Zap className="w-6 h-6 text-indigo-900" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">EuroDreams</h1>
                    <p className="text-yellow-200">20 000€/mois à vie</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card className="bg-white/95 border-2 border-yellow-400 max-w-2xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white">
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                EuroDreams - Bientôt Disponible
              </CardTitle>
              <CardDescription className="text-indigo-200">
                Prédictions IA pour la rente mensuelle à vie
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-12 h-12 text-yellow-400" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-indigo-900 mb-2">Module en Développement</h2>
                  <p className="text-indigo-700 mb-6">
                    Le nouveau format EuroDreams avec analyse IA pour maximiser vos chances.
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 text-left">
                  <h3 className="font-semibold text-indigo-800 mb-3">Fonctionnalités à venir :</h3>
                  <ul className="space-y-2 text-indigo-700">
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-indigo-600 mr-2" />
                      Analyse 6 numéros + 1 rêve
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-indigo-600 mr-2" />
                      Optimisation rente à vie
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-indigo-600 mr-2" />
                      Nouveau format européen
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-indigo-600 mr-2" />
                      Calcul probabilités
                    </li>
                  </ul>
                </div>

                <Button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800"
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

export default EuroDreams;
