import { useQueries } from '@tanstack/react-query';
import { useFavoritesStore } from '@/entities/movie/hooks';
import { apiClient } from '@shared/lib/api';

type TMovie = {
  id: number;
  name: string;
  alternativeName: string | null;
  year: number;
  rating: { kp: number };
  poster: { url: string | null };
  genres: Array<{ name: string }>;
};

export const useFavoriteMovies = () => {
  const { favorites } = useFavoritesStore();

  const movieQueries = useQueries({
    queries: favorites.map((movieId) => ({
      queryKey: ['movie', movieId],
      queryFn: () => apiClient<TMovie>(`v1.4/movie/${movieId}`),
      enabled: !!movieId,
    })),
  });

  const isLoading = movieQueries.some((query) => query.isLoading);
  const isError = movieQueries.some((query) => query.isError);

  const movies = movieQueries.filter((query) => query.data).map((query) => query.data!);

  return {
    movies,
    isLoading,
    isError,
    favoritesCount: favorites.length,
  };
};
