
import React from 'react';
import { Button } from "@/components/ui/button";
import { Crown, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-blue-900 border-4 border-blue-200">
          <Crown className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">
            Prêt à Découvrir vos Numéros Gagnants ?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Commencez vos prédictions IA dès maintenant
          </p>
          <Button 
            size="lg" 
            className="bg-blue-900 text-white hover:bg-blue-800 font-bold"
            onClick={() => navigate('/euromillions')}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Lancer l'Analyse IA
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
