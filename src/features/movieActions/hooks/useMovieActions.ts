import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore, useCompareStore } from '@/entities/movie/hooks';

export const useMovieActions = () => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { toggleCompare, isCompared } = useCompareStore();

  const handleMovieClick = useCallback(
    (movieId: string) => {
      navigate(`/movie/${movieId}`);
    },
    [navigate]
  );

  const handleFavoriteClick = useCallback(
    (movieId: string) => {
      toggleFavorite(movieId);
    },
    [toggleFavorite]
  );

  const handleCompareClick = useCallback(
    (movieId: string) => {
      toggleCompare(movieId);
    },
    [toggleCompare]
  );

  const getIsFavorite = useCallback((movieId: string) => isFavorite(movieId), [isFavorite]);

  const getIsCompared = useCallback((movieId: string) => isCompared(movieId), [isCompared]);

  return {
    handleMovieClick,
    handleFavoriteClick,
    handleCompareClick,
    getIsFavorite,
    getIsCompared,
    isFavorite,
  };
};
