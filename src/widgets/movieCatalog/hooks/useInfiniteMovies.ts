import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '../lib/api';
import { useMoviesFilters } from './useMoviesFilters';
import type { TGetMoviesResponse } from '../model/types';

const buildQueryParams = (filters: ReturnType<typeof useMoviesFilters.getState>) => {
  const params: Record<string, string> = {};

  if (filters.genres.length) {
    params['genres.name'] = filters.genres.map((g) => `+${g}`).join('&genres.name=');
  }
  if (filters.yearMin || filters.yearMax) {
    const from = filters.yearMin ?? '';
    const to = filters.yearMax ?? '';
    params.year = `${from}${from && to ? '-' : ''}${to}`;
  }
  if (filters.ratingMin || filters.ratingMax) {
    const from = filters.ratingMin ?? '';
    const to = filters.ratingMax ?? '';
    params['rating.kp'] = `${from}${from && to ? '-' : ''}${to}`;
  }
  return params;
};

export const useInfiniteMovies = () => {
  const filters = useMoviesFilters();

  return useInfiniteQuery({
    queryKey: ['movies', filters],
    queryFn: ({ pageParam }: { pageParam?: string }): Promise<TGetMoviesResponse> =>
      getMovies(buildQueryParams(filters), pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });
};
