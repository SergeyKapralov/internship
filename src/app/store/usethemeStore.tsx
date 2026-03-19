import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TTheme = 'auto' | 'light' | 'dark';

type TThemeState = {
  theme: TTheme;
};

type TThemeActions = {
  setTheme: (theme: TTheme) => void;
};

type TThemeStore = TThemeState & TThemeActions;

const initialState: TThemeState = {
  theme: 'auto',
};

export const useThemeStore = create<TThemeStore>()(
  persist(
    (set) => ({
      ...initialState,
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
