import { NavLink } from 'react-router-dom';
import { ThemeSwitcher } from '@/shared/ui';
import { useThemeStore } from '@/shared/lib/store';

export const Header = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <header className="bg-bg sticky top-0 z-1 flex w-full items-center justify-between gap-2 p-4">
      <nav className="text-disabled flex flex-col gap-2 md:order-2 md:flex-row md:gap-6">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'text-fg underline' : 'hover:text-fg-highlight')}
        >
          Поиск
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? 'text-fg underline' : 'hover:text-fg-highlight')}
        >
          Избранное
        </NavLink>
      </nav>
      <h1 className="text-center text-xl font-bold md:order-1">Movie App</h1>
      <div className="order-3">
        <ThemeSwitcher activeTheme={theme} onThemeChange={setTheme}></ThemeSwitcher>
      </div>
    </header>
  );
};
