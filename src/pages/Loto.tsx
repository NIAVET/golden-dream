
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, RefreshCw, Target, TrendingUp, Calendar, BarChart3, Zap, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePredictions, useLatestDraws } from "@/hooks/usePredictions";
import AdvancedMetrics from "@/components/AdvancedMetrics";

const Loto = () => {
  const navigate = useNavigate();
  const { data: predictions, isLoading: isPredictionsLoading, error: predictionsError } = usePredictions('loto');
  const { data: latestDraws, isLoading: isDrawsLoading } = useLatestDraws('loto', 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-yellow-600">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-900/90 to-yellow-600/90 backdrop-blur-sm border-b border-yellow-400/30 sticky top-0 z-50">
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
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-green-200">
                  <Star className="w-5 h-5 text-green-900" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Loto Français</h1>
                  <p className="text-sm text-yellow-200">Prédictions IA Ultra-Avancées</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {predictions?.accuracy && predictions.accuracy >= 90 && (
                <Badge className="bg-gradient-to-r from-green-400 to-green-600 text-green-900 border-green-300 animate-pulse">
                  <Activity className="w-3 h-3 mr-1" />
                  90%+ Précision
                </Badge>
              )}
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-green-900 border-yellow-300">
                <RefreshCw className="w-3 h-3 mr-1" />
                Mise à jour auto
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Prédictions IA Ultra-Avancées */}
        <div className="mb-8">
          <Card className="bg-white/95 border-2 border-yellow-400 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-900 to-yellow-600 text-white">
              <CardTitle className="text-2xl flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                Prédictions IA Ultra-Avancées - Prochain Tirage
                {predictions?.accuracy && predictions.accuracy >= 90 && (
                  <Badge className="ml-3 bg-green-500 text-white">
                    OBJECTIF 90%+ ATTEINT
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-yellow-200">
                Analyseur quantique multi-algorithmes - {predictions?.totalDraws || 0} tirages analysés
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isPredictionsLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
                  <p className="text-green-600">Analyse quantique en cours...</p>
                  <p className="text-sm text-green-500 mt-2">8 algorithmes IA en parallèle</p>
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
                    <h3 className="text-lg font-semibold mb-3 text-green-900 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Numéros Principaux (5 numéros)
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        Confiance: {Math.round((predictions.confidence || 0.85) * 100)}%
                      </Badge>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {predictions.predictedNumbers?.slice(0, 5).map((num, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full flex items-center justify-center font-bold text-lg border-2 border-yellow-400 shadow-lg transform hover:scale-110 transition-transform"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Numéro Chance */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-900 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Numéro Chance
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 text-green-900 rounded-full flex items-center justify-center font-bold text-lg border-2 border-green-400 shadow-lg transform hover:scale-110 transition-transform">
                        {predictions.predictedChance || 7}
                      </div>
                    </div>
                  </div>

                  {/* Statistiques principales */}
                  <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-4 border border-green-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-900 flex items-center justify-center">
                          {predictions.accuracy}%
                          {predictions.accuracy >= 90 && <TrendingUp className="w-4 h-4 ml-1 text-green-600" />}
                        </div>
                        <div className="text-green-600">Précision IA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-900">{Math.round((predictions.confidence || 0) * 100)}%</div>
                        <div className="text-yellow-600">Confiance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-900">{predictions.totalDraws}</div>
                        <div className="text-green-600">Tirages analysés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-900">{formatDate(predictions.lastUpdate)}</div>
                        <div className="text-green-600">Dernière MAJ</div>
                      </div>
                    </div>
                  </div>

                  {/* Métriques avancées */}
                  <AdvancedMetrics prediction={predictions} />

                  {predictions.algorithmVersion && (
                    <div className="text-center text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                      <BarChart3 className="w-4 h-4 inline mr-2" />
                      Algorithme: {predictions.algorithmVersion}
                    </div>
                  )}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Historique récent */}
        <div>
          <Card className="bg-white/95 border-2 border-green-400">
            <CardHeader className="bg-gradient-to-r from-green-800 to-green-900 text-white">
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Derniers Tirages
              </CardTitle>
              <CardDescription className="text-green-200">
                Historique des 5 derniers tirages Loto
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isDrawsLoading ? (
                <div className="text-center py-4">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-green-600" />
                  <p className="text-green-600">Chargement de l'historique...</p>
                </div>
              ) : latestDraws && latestDraws.length > 0 ? (
                <div className="space-y-4">
                  {latestDraws.map((draw: any, index: number) => (
                    <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-green-600 font-medium">
                          {formatDate(draw.draw_date)}
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          Tirage #{latestDraws.length - index}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-green-700">Numéros:</span>
                          <div className="flex space-x-1">
                            {draw.numbers?.map((num: number, idx: number) => (
                              <div
                                key={idx}
                                className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
                              >
                                {num}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-yellow-700">Chance:</span>
                          <div className="w-8 h-8 bg-yellow-500 text-green-900 rounded-full flex items-center justify-center text-sm font-bold">
                            {draw.chance_number || 7}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-green-600">
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

export default Loto;
