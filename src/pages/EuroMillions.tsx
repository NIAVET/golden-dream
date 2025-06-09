
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Star, Target, Crown, Sparkles, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePredictions, useLatestDraws } from "@/hooks/usePredictions";

const EuroMillions = () => {
  const navigate = useNavigate();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  
  const { data: predictions, isLoading: predictionsLoading, refetch: refetchPredictions } = usePredictions('euromillions');
  const { data: latestDraws, isLoading: drawsLoading } = useLatestDraws('euromillions', 5);

  const selectNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < 5) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const selectStar = (star: number) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter(s => s !== star));
    } else if (selectedStars.length < 2) {
      setSelectedStars([...selectedStars, star].sort((a, b) => a - b));
    }
  };

  const generateOptimalGrid = () => {
    if (predictions?.predictedNumbers && predictions?.predictedStars) {
      setSelectedNumbers(predictions.predictedNumbers.slice(0, 5));
      setSelectedStars(predictions.predictedStars.slice(0, 2));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900/90 to-yellow-600/90 backdrop-blur-sm border-b border-yellow-400/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Crown className="w-6 h-6 text-yellow-400 mr-2" />
                <h1 className="text-2xl font-bold text-white">
                  EuroMillions
                </h1>
                <Crown className="w-6 h-6 text-yellow-400 ml-2" />
              </div>
              <p className="text-sm text-yellow-200">Prédicteur Intelligent IA</p>
            </div>
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 border-yellow-300">
              <Sparkles className="w-3 h-3 mr-1" />
              Jackpot: 17M€
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analyse et Prédictions */}
          <div className="lg:col-span-2">
            {/* Numéros Prédits */}
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-yellow-50 border-2 border-yellow-300">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <TrendingUp className="w-5 h-5 mr-2 text-yellow-600" />
                  Prédictions IA - Prochain Tirage
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => refetchPredictions()}
                    className="ml-auto text-blue-600 hover:text-blue-800"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Basé sur l'analyse de {predictions?.totalDraws || 0} tirages historiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                {predictionsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
                    <p className="text-blue-700 font-medium">Analyse en cours de l'historique complet...</p>
                  </div>
                ) : predictions ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-blue-900 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-600" />
                        Numéros les plus probables
                      </h3>
                      <div className="grid grid-cols-8 gap-2 mb-4">
                        {predictions.predictedNumbers.map((num, index) => (
                          <div key={num} className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                            index < 5 ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-yellow-400' : 'bg-gradient-to-r from-blue-400 to-blue-500'
                          }`}>
                            {num}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-blue-600">Les 5 premiers sont les plus recommandés</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-blue-900 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        Étoiles les plus probables
                      </h3>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {(predictions.predictedStars || []).map((star, index) => (
                          <div key={star} className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                            index < 2 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 border-2 border-blue-400' : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                          }`}>
                            {star}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-blue-600">Les 2 premières sont les plus recommandées</p>
                    </div>

                    <div className="bg-blue-100 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-blue-800">Précision IA:</span>
                          <span className="ml-2 text-blue-600">{predictions.accuracy}%</span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">Dernière MAJ:</span>
                          <span className="ml-2 text-blue-600">{predictions.lastUpdate}</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={generateOptimalGrid} 
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Utiliser la Grille Optimale IA
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-red-600">
                    Erreur lors du chargement des prédictions
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Grid Selection */}
            <Card className="mb-6 bg-white/95 border border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Target className="w-5 h-5 mr-2 text-yellow-600" />
                  Votre Sélection
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Choisissez 5 numéros (1-50) et 2 étoiles (1-12)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Numbers */}
                <div>
                  <h3 className="font-semibold mb-3 text-blue-900">
                    Numéros ({selectedNumbers.length}/5)
                  </h3>
                  <div className="grid grid-cols-10 gap-2">
                    {Array.from({ length: 50 }, (_, i) => i + 1).map(num => {
                      const isSelected = selectedNumbers.includes(num);
                      const isPredicted = predictedNumbers.slice(0, 5).includes(num);
                      
                      return (
                        <Button
                          key={num}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className={`h-10 w-10 text-sm font-semibold ${
                            isSelected 
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-2 border-yellow-400" 
                              : isPredicted
                              ? "bg-yellow-100 border-2 border-yellow-400 text-blue-800 hover:bg-yellow-200"
                              : "hover:bg-blue-50 border-blue-200 text-blue-700"
                          }`}
                          onClick={() => selectNumber(num)}
                        >
                          {num}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Stars */}
                <div>
                  <h3 className="font-semibold mb-3 text-blue-900 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    Étoiles ({selectedStars.length}/2)
                  </h3>
                  <div className="grid grid-cols-12 gap-2">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(star => {
                      const isSelected = selectedStars.includes(star);
                      const isPredicted = predictedStars.slice(0, 2).includes(star);
                      
                      return (
                        <Button
                          key={star}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className={`h-10 w-10 text-sm font-semibold ${
                            isSelected 
                              ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-2 border-blue-400" 
                              : isPredicted
                              ? "bg-blue-100 border-2 border-blue-400 text-yellow-700 hover:bg-blue-200"
                              : "hover:bg-yellow-50 border-yellow-200 text-yellow-700"
                          }`}
                          onClick={() => selectStar(star)}
                        >
                          {star}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => {
                      setSelectedNumbers([]);
                      setSelectedStars([]);
                    }}
                    variant="outline"
                    className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    Effacer
                  </Button>
                  <Button 
                    onClick={simulateHistoricalAnalysis}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Nouvelle Analyse
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Selected Grid Display */}
            {(selectedNumbers.length > 0 || selectedStars.length > 0) && (
              <Card className="bg-gradient-to-r from-blue-900 to-yellow-600 text-white border-2 border-yellow-400">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Votre Grille de Jeu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      {selectedNumbers.map(num => (
                        <div key={num} className="w-12 h-12 bg-white text-blue-900 rounded-full flex items-center justify-center font-bold text-lg border-2 border-yellow-400">
                          {num}
                        </div>
                      ))}
                      {Array.from({ length: 5 - selectedNumbers.length }).map((_, i) => (
                        <div key={i} className="w-12 h-12 border-2 border-dashed border-yellow-300 rounded-full flex items-center justify-center text-yellow-200">
                          ?
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {selectedStars.map(star => (
                        <div key={star} className="w-12 h-12 bg-yellow-400 text-blue-900 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white">
                          {star}
                        </div>
                      ))}
                      {Array.from({ length: 2 - selectedStars.length }).map((_, i) => (
                        <div key={i} className="w-12 h-12 border-2 border-dashed border-yellow-300 rounded-full flex items-center justify-center text-yellow-200 text-lg">
                          ⭐
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Statistiques */}
          <div>
            <Card className="bg-gradient-to-br from-yellow-50 to-blue-50 border-2 border-yellow-300 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Sparkles className="w-5 h-5 mr-2 text-yellow-600" />
                  Analyse Statistique
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Données en temps réel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg">
                    <div className="text-2xl font-bold flex items-center justify-center">
                      <Crown className="w-6 h-6 mr-2 text-yellow-400" />
                      {predictions?.accuracy || '--'}%
                    </div>
                    <div className="text-sm text-blue-100">Précision IA</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 rounded-lg">
                    <div className="text-2xl font-bold">{predictions?.totalDraws || '--'}</div>
                    <div className="text-sm">Tirages analysés</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-yellow-500 text-white rounded-lg">
                    <div className="text-xl font-bold">Dernière MAJ</div>
                    <div className="text-sm text-blue-100">{predictions?.lastUpdate || '--'}</div>
                  </div>
                </div>
                <div className="text-xs text-blue-600 text-center">
                  {predictions?.algorithm || 'Algorithme avancé de prédiction'}
                </div>
              </CardContent>
            </Card>

            {/* Derniers Tirages */}
            <Card className="bg-white/95 border border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <TrendingUp className="w-5 h-5 mr-2 text-yellow-600" />
                  Derniers Tirages
                </CardTitle>
              </CardHeader>
              <CardContent>
                {drawsLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : latestDraws ? (
                  <div className="space-y-3">
                    {latestDraws.map((draw, index) => (
                      <div key={draw.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span className="text-sm text-blue-600 font-medium">
                          {new Date(draw.draw_date).toLocaleDateString('fr-FR')}
                        </span>
                        <div className="flex gap-1">
                          {draw.numbers.map((num: number) => (
                            <div key={num} className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {num}
                            </div>
                          ))}
                          {draw.stars.map((star: number) => (
                            <div key={star} className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {star}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">Aucun tirage disponible</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EuroMillions;
