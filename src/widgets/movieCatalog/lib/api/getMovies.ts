import { apiClient } from '@/shared/lib/api';
import type { TShortMovie } from '@/entities/movie/model/types';
import type { TMoviesResponse } from '../../model/types';

export const getMovies = async (
  params: Record<string, string>,
  nextCursor?: string
): Promise<{ movies: TShortMovie[]; next: string | null }> => {
  const query = new URLSearchParams({
    limit: '50',
    ...params,
    ...(nextCursor && { next: nextCursor }),
  }).toString();

  const data = await apiClient<TMoviesResponse>(`v1.5/movie?${query}`);

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
