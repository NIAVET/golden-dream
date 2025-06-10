
import React from 'react';
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, TrendingUp, RefreshCw, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-4 border-blue-200 shadow-2xl">
            <Crown className="w-12 h-12 text-blue-900" />
          </div>
        </div>
        <h2 className="text-5xl font-bold text-white mb-6">
          Prédisez vos <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Numéros Gagnants</span>
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Intelligence artificielle avancée pour prédire les numéros les plus susceptibles de sortir au prochain tirage. 
          Analyse complète de l'historique et mise à jour automatique.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-yellow-200 mb-8">
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            Prédictions IA
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            Historique complet
          </div>
          <div className="flex items-center">
            <RefreshCw className="w-4 h-4 mr-1" />
            Auto-sync
          </div>
        </div>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8"
          onClick={() => navigate('/euromillions')}
        >
          <Target className="w-5 h-5 mr-2" />
          Commencer les Prédictions
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
