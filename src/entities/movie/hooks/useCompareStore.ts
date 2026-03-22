import { create } from 'zustand';
import { getFromSessionStorage, setToSessionStorage } from '@/shared/lib/utils';

type TCompareStore = {
  compared: string[];
  toggleCompare: (movieId: string) => void;
  isCompared: (movieId: string) => boolean;
  getComparedMovies: () => string[];
};

const COMPARED_KEY = 'compared';
const MAX_COMPARE_ITEMS = 2;

export const useCompareStore = create<TCompareStore>((set, get) => ({
  compared: getFromSessionStorage<string[]>(COMPARED_KEY) ?? [],

  toggleCompare: (movieId) => {
    const { compared } = get();
    const isAlreadyCompared = compared.includes(movieId);

    let newCompared: string[];

    if (isAlreadyCompared) {
      newCompared = compared.filter((id) => id !== movieId);
    } else {
      if (compared.length < MAX_COMPARE_ITEMS) {
        newCompared = [...compared, movieId];
      } else {
        newCompared = [...compared.slice(1), movieId];
      }
    }

    set({ compared: newCompared });
    setToSessionStorage(COMPARED_KEY, newCompared);
  },

  isCompared: (movieId) => {
    return get().compared.includes(movieId);
  },

  getComparedMovies: () => {
    return get().compared;
  },
}));
