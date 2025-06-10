
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, RefreshCw, Crown, Sparkles, Target, Calendar, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePredictions, useLatestDraws } from "@/hooks/usePredictions";

const EuroMillions = () => {
  const navigate = useNavigate();
  const { data: predictions, isLoading: isPredictionsLoading, error: predictionsError } = usePredictions('euromillions');
  const { data: latestDraws, isLoading: isDrawsLoading } = useLatestDraws('euromillions', 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900/90 to-yellow-600/90 backdrop-blur-sm border-b border-yellow-400/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
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
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-blue-200">
                  <Crown className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">EuroMillions</h1>
                  <p className="text-sm text-yellow-200">Prédictions IA</p>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 border-yellow-300">
              <RefreshCw className="w-3 h-3 mr-1" />
              Mise à jour automatique
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Prédictions IA */}
        <div className="mb-8">
          <Card className="bg-white/95 border-2 border-yellow-400 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-900 to-yellow-600 text-white">
              <CardTitle className="text-2xl flex items-center">
                <Sparkles className="w-6 h-6 mr-2" />
                Prédictions IA - Prochain Tirage
              </CardTitle>
              <CardDescription className="text-yellow-200">
                Basé sur l'analyse de {predictions?.totalDraws || 0} tirages historiques
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isPredictionsLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-blue-600">Analyse des données en cours...</p>
                </div>
              ) : predictionsError ? (
                <div className="text-center py-8 text-red-600">
                  <p>Erreur lors du chargement des prédictions</p>
                  <p className="text-sm mt-2">{predictionsError.message}</p>
                </div>
              ) : predictions ? (
                <div className="space-y-6">
                  {/* Numéros principaux */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-900 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Numéros Principaux (5 numéros)
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {predictions.predictedNumbers?.slice(0, 5).map((num, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg border-2 border-yellow-400 shadow-lg"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Étoiles */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-900 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Étoiles (2 étoiles)
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {predictions.predictedStars?.slice(0, 2).map((star, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 rounded-full flex items-center justify-center font-bold text-lg border-2 border-blue-400 shadow-lg"
                        >
                          {star}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Statistiques */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{predictions.accuracy}%</div>
                        <div className="text-blue-600">Précision IA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{predictions.totalDraws}</div>
                        <div className="text-blue-600">Tirages analysés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{formatDate(predictions.lastUpdate)}</div>
                        <div className="text-blue-600">Dernière MAJ</div>
                      </div>
                    </div>
                  </div>

                  {predictions.algorithm && (
                    <div className="text-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <BarChart3 className="w-4 h-4 inline mr-2" />
                      Algorithme: {predictions.algorithm}
                    </div>
                  )}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Historique récent */}
        <div>
          <Card className="bg-white/95 border-2 border-blue-400">
            <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Derniers Tirages
              </CardTitle>
              <CardDescription className="text-blue-200">
                Historique des 5 derniers tirages EuroMillions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isDrawsLoading ? (
                <div className="text-center py-4">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                  <p className="text-blue-600">Chargement de l'historique...</p>
                </div>
              ) : latestDraws && latestDraws.length > 0 ? (
                <div className="space-y-4">
                  {latestDraws.map((draw: any, index: number) => (
                    <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-blue-600 font-medium">
                          {formatDate(draw.draw_date)}
                        </div>
                        <Badge variant="outline" className="text-blue-600 border-blue-300">
                          Tirage #{latestDraws.length - index}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-blue-700">Numéros:</span>
                          <div className="flex space-x-1">
                            {draw.numbers?.map((num: number, idx: number) => (
                              <div
                                key={idx}
                                className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
                              >
                                {num}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-yellow-700">Étoiles:</span>
                          <div className="flex space-x-1">
                            {draw.stars?.map((star: number, idx: number) => (
                              <div
                                key={idx}
                                className="w-8 h-8 bg-yellow-500 text-blue-900 rounded-full flex items-center justify-center text-sm font-bold"
                              >
                                {star}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-blue-600">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun historique disponible</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EuroMillions;
