
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 text-center">
      <div className="container mx-auto">
        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 mb-6 text-sm font-bold border-yellow-300">
          <Sparkles className="w-4 h-4 mr-1" />
          Intelligence Artificielle Avancée
        </Badge>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Prédictions IA pour vos
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent block mt-2">
            Jeux FDJ Préférés
          </span>
        </h2>
        <p className="text-xl text-yellow-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Découvrez des prédictions intelligentes basées sur l'analyse de milliers de tirages historiques. 
          Notre IA analyse les tendances pour maximiser vos chances de gain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 hover:from-yellow-400 hover:to-yellow-500 font-bold text-lg px-8 py-3 border-2 border-yellow-300"
            onClick={() => navigate('/euromillions')}
          >
            <Target className="w-5 h-5 mr-2" />
            Commencer les Prédictions
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 font-bold"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Voir les Statistiques
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
