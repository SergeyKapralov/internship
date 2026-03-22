import { apiClient } from '@/shared/lib/api';
import type { TShortMovie } from '@/entities/movie/model/types';
import type { TMoviesResponse } from '../../model/types';

export const getMovies = async (
  params: Record<string, string | string[]>,
  nextCursor?: string
): Promise<{ movies: TShortMovie[]; next: string | null }> => {
  const urlParams = new URLSearchParams();
  urlParams.set('limit', '50');
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => urlParams.append(key, v));
    } else {
      urlParams.set(key, value);
    }
  });
  if (nextCursor) {
    urlParams.set('next', nextCursor);
  }

  const data = await apiClient<TMoviesResponse>(`v1.5/movie?${urlParams.toString()}`);

  const movies: TShortMovie[] = data.docs.map((doc) => ({
    id: String(doc.id),
    src: doc.poster?.url,
    alt: doc.alternativeName || doc.name,
    title: doc.name,
    released: doc.year ? String(doc.year) : '',
    score: doc.rating?.kp ?? 0,
  }));

  return { movies, next: data.next ?? null };
};
