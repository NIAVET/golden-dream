
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface PredictionResult {
  predictedNumbers: number[];
  predictedStars?: number[];
  predictedChance?: number[];
  totalDraws: number;
  lastUpdate: string;
  accuracy: number;
  algorithm?: string;
}

export const usePredictions = (game: string) => {
  return useQuery({
    queryKey: ['predictions', game],
    queryFn: async (): Promise<PredictionResult> => {
      if (!isSupabaseConfigured()) {
        // Retourner des données de démonstration si Supabase n'est pas configuré
        return {
          predictedNumbers: [7, 14, 21, 35, 42],
          predictedStars: [4, 9],
          totalDraws: 150,
          lastUpdate: new Date().toISOString(),
          accuracy: 78.5,
          algorithm: 'Mode démonstration - Connectez Supabase pour les vraies prédictions'
        };
      }

      const { data, error } = await supabase.functions.invoke('predict-numbers', {
        body: { game }
      });

      if (error) {
        throw new Error(`Erreur lors de la prédiction: ${error.message}`);
      }

      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Rafraîchir toutes les 10 minutes
  });
};

export const useLatestDraws = (game: string, limit = 10) => {
  return useQuery({
    queryKey: ['latest-draws', game, limit],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        // Retourner des données de démonstration
        return [
          {
            draw_date: '2024-06-07',
            numbers: [3, 12, 21, 35, 47],
            stars: [2, 9]
          },
          {
            draw_date: '2024-06-04', 
            numbers: [7, 15, 28, 39, 42],
            stars: [1, 11]
          },
          {
            draw_date: '2024-05-31',
            numbers: [14, 19, 26, 33, 44],
            stars: [5, 8]
          }
        ];
      }

      const tableName = `${game}_draws`;
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('draw_date', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(`Erreur lors de la récupération des tirages: ${error.message}`);
      }

      return data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
