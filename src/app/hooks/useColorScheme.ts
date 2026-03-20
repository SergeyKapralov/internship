import { useThemeStore } from '@shared/lib/store';
import { useState, useEffect } from 'react';

export const useColorScheme = (): 'light' | 'dark' => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme !== 'auto') {
      setColorScheme(theme);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  return colorScheme;
};
