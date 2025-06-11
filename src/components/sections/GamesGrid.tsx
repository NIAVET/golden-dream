
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Zap, Dice6, TrendingUp, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GamesGrid = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'euromillions',
      title: 'EuroMillions',
      description: 'Le plus grand jackpot européen',
      icon: Crown,
      status: 'Disponible',
      statusColor: 'bg-green-500',
      features: ['5 numéros + 2 étoiles', 'Jackpots jusqu\'à 240M€', 'IA optimisée'],
      route: '/euromillions'
    },
    {
      id: 'loto',
      title: 'Loto',
      description: 'Le jeu mythique français',
      icon: Star,
      status: 'Bientôt',
      statusColor: 'bg-yellow-500',
      features: ['5 numéros + 1 chance', 'Tirages 3 fois/semaine', 'Analyse historique'],
      route: '/loto'
    },
    {
      id: 'eurodreams',
      title: 'EuroDreams',
      description: 'Rente mensuelle à vie',
      icon: Zap,
      status: 'Bientôt',
      statusColor: 'bg-yellow-500',
      features: ['6 numéros + 1 rêve', '20 000€/mois à vie', 'Nouveau format'],
      route: '/eurodreams'
    },
    {
      id: 'keno',
      title: 'Keno',
      description: 'Tirages quotidiens',
      icon: Dice6,
      status: 'Bientôt',
      statusColor: 'bg-yellow-500',
      features: ['1 à 10 numéros', 'Tirages toutes les 4min', 'Gains rapides'],
      route: '/keno'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Jeux Disponibles
          </h3>
          <p className="text-yellow-200 text-lg max-w-2xl mx-auto">
            Choisissez votre jeu préféré et laissez notre IA vous guider vers les meilleures combinaisons
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="bg-white/95 border-2 border-yellow-400/50 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <game.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <CardTitle className="text-blue-900 text-xl">{game.title}</CardTitle>
                <CardDescription className="text-blue-600">{game.description}</CardDescription>
                <Badge className={`${game.statusColor} text-white`}>
                  {game.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-blue-700 space-y-2">
                  {game.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                  onClick={() => game.id === 'euromillions' ? navigate(game.route) : null}
                  disabled={game.id !== 'euromillions'}
                >
                  {game.id === 'euromillions' ? 'Analyser Maintenant' : 'Bientôt Disponible'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Nouveau bouton pour les tirages exceptionnels */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-yellow-400 to-yellow-600 border-2 border-yellow-500 shadow-2xl max-w-md mx-auto">
            <CardContent className="p-6">
              <Calendar className="w-12 h-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Tirages Exceptionnels</h3>
              <p className="text-blue-800 text-sm mb-4">
                Découvrez l'historique des super-tirages et événements spéciaux
              </p>
              <Button 
                onClick={() => navigate('/special-draws')}
                className="bg-blue-900 text-white hover:bg-blue-800 w-full"
              >
                Voir l'historique FDJ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GamesGrid;
