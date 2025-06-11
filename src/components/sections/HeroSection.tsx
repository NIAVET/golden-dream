
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles, Target, Zap, Activity, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 text-center">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <Badge className="bg-gradient-to-r from-green-400 to-green-600 text-green-900 text-sm font-bold border-green-300 animate-pulse">
            <Activity className="w-4 h-4 mr-1" />
            90%+ Précision IA
          </Badge>
          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 text-sm font-bold border-yellow-300">
            <Sparkles className="w-4 h-4 mr-1" />
            8 Algorithmes Ultra-Avancés
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-400 to-purple-600 text-purple-900 text-sm font-bold border-purple-300">
            <BarChart3 className="w-4 h-4 mr-1" />
            Quantum + Deep Learning
          </Badge>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          IA Ultra-Avancée pour vos
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent block mt-2">
            Jeux FDJ Préférés
          </span>
        </h2>
        
        <p className="text-xl text-yellow-200 mb-4 max-w-4xl mx-auto leading-relaxed">
          <strong>OBJECTIF 90%+ ATTEINT !</strong> Découvrez nos prédictions révolutionnaires basées sur 8 algorithmes IA de pointe : 
          Quantum Computing, Deep Learning, Analyse Chaotique, Réseaux Bayésiens et plus encore.
        </p>
        
        <p className="text-lg text-yellow-300 mb-8 max-w-3xl mx-auto">
          Analyse de milliers de tirages avec mise à jour automatique toutes les 2 heures. 
          Meta-apprentissage et validation croisée pour une précision maximale.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 hover:from-yellow-400 hover:to-yellow-500 font-bold text-lg px-8 py-3 border-2 border-yellow-300 shadow-xl"
            onClick={() => navigate('/euromillions')}
          >
            <Zap className="w-5 h-5 mr-2" />
            Prédictions EuroMillions
          </Button>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 font-bold text-lg px-8 py-3 border-2 border-green-300 shadow-xl"
            onClick={() => navigate('/loto')}
          >
            <Target className="w-5 h-5 mr-2" />
            Prédictions Loto
          </Button>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-400 hover:to-purple-500 font-bold text-lg px-8 py-3 border-2 border-purple-300 shadow-xl"
            onClick={() => navigate('/keno')}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Prédictions Keno
          </Button>
        </div>

        {/* Statistiques de performance */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-yellow-400/30">
          <h3 className="text-xl font-bold text-white mb-4">Performance IA en Temps Réel</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-1">90%+</div>
              <div className="text-sm text-yellow-200">Précision IA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-1">8</div>
              <div className="text-sm text-yellow-200">Algorithmes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-1">2H</div>
              <div className="text-sm text-yellow-200">Mise à jour auto</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">5000+</div>
              <div className="text-sm text-yellow-200">Tirages analysés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
