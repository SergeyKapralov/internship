import type { TShortMovie } from '@entities/movie/model/types';

export type TMovieApiItem = {
  id: number;
  name: string;
  alternativeName?: string;
  year?: number;
  rating?: { kp?: number };
  poster?: { url?: string };
};

export type TMoviesResponse = {
  docs: TMovieApiItem[];
  next: string | null;
  hasNext: boolean;
};

export type TGetMoviesResponse = {
  movies: TShortMovie[];
  next: string | null;
};
