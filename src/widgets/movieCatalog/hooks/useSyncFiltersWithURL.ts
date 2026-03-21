import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMoviesFilters } from '@entities/movie/hooks';

export const useSyncFiltersWithURL = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMoviesFilters();
  const { setGenres, setYearRange, setRatingRange } = filters;

  useEffect(() => {
    const genres = searchParams.getAll('genre');
    const year = searchParams.get('year');
    const rating = searchParams.get('rating');

    if (genres.length) setGenres(genres);
    if (year) {
      const [min, max] = year.split('-').map(Number);
      if (!isNaN(min) || !isNaN(max)) {
        setYearRange(isNaN(min) ? undefined : min, isNaN(max) ? undefined : max);
      }
    }
    if (rating) {
      const [min, max] = rating.split('-').map(Number);
      if (!isNaN(min) || !isNaN(max)) {
        setRatingRange(isNaN(min) ? undefined : min, isNaN(max) ? undefined : max);
      }
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    filters.genres.forEach((g) => params.append('genre', g));

    if (filters.yearMin || filters.yearMax) {
      const from = filters.yearMin ?? '';
      const to = filters.yearMax ?? '';
      params.set('year', `${from}${from && to ? '-' : ''}${to}`);
    }

    if (filters.ratingMin || filters.ratingMax) {
      const from = filters.ratingMin ?? '';
      const to = filters.ratingMax ?? '';
      params.set('rating', `${from}${from && to ? '-' : ''}${to}`);
    }

    setSearchParams(params, { replace: true });
  }, [
    filters.genres,
    filters.yearMin,
    filters.yearMax,
    filters.ratingMin,
    filters.ratingMax,
    setSearchParams,
  ]);
};
