import { ThemeSwitcher, MovieCard } from '@/shared/ui';
import { useThemeStore } from '@/shared/lib/store';

export const TestPage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div>
      Я тестовая страница, протестируй меня
      <ThemeSwitcher activeTheme={theme} onThemeChange={setTheme}></ThemeSwitcher>
      <MovieCard
        onClick={() => {}}
        onCompareClick={() => {}}
        onFavoriteClick={() => {}}
        data={{
          score: 8.8,
          alt: '2',
          src: '2',
          title: 'Вызов',
          released: '2 окт 2015',
        }}
      ></MovieCard>
    </div>
  );
};
