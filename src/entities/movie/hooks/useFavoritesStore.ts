import { create } from 'zustand';
import { getFromSessionStorage, setToSessionStorage } from '@/shared/lib/utils';

type TFavoritesStore = {
  favorites: string[];
  toggleFavorite: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
};

const FAVORITES_KEY = 'favorites';

export const useFavoritesStore = create<TFavoritesStore>((set, get) => ({
  favorites: getFromSessionStorage<string[]>(FAVORITES_KEY) ?? [],

  toggleFavorite: (movieId) => {
    const { favorites } = get();
    const isFavorite = favorites.includes(movieId);

    const newFavorites = isFavorite
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];

    set({ favorites: newFavorites });
    setToSessionStorage(FAVORITES_KEY, newFavorites);
  },

  isFavorite: (movieId) => {
    return get().favorites.includes(movieId);
  },
}));
