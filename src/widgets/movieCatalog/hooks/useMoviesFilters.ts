import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TFilters = {
  genres: string[];
  yearMin?: number;
  yearMax?: number;
  ratingMin?: number;
  ratingMax?: number;
};

type TFiltersState = TFilters & {
  setGenres: (genres: string[]) => void;
  setYearRange: (min?: number, max?: number) => void;
  setRatingRange: (min?: number, max?: number) => void;
  resetFilters: () => void;
};

export const useMoviesFilters = create<TFiltersState>()(
  persist(
    (set) => ({
      genres: [],
      yearMin: undefined,
      yearMax: undefined,
      ratingMin: undefined,
      ratingMax: undefined,
      setGenres: (genres) => set({ genres }),
      setYearRange: (min, max) => set({ yearMin: min, yearMax: max }),
      setRatingRange: (min, max) => set({ ratingMin: min, ratingMax: max }),
      resetFilters: () =>
        set({
          genres: [],
          yearMin: undefined,
          yearMax: undefined,
          ratingMin: undefined,
          ratingMax: undefined,
        }),
    }),
    { name: 'movie-filters' }
  )
);
