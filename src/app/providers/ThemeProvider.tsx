import { useColorScheme } from '../hooks/useColorScheme';
import { useEffect } from 'react';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    return () => {
      document.documentElement.removeAttribute('data-color-scheme');
    };
  }, [colorScheme]);

  return <>{children}</>;
};
