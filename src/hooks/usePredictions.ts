
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

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
