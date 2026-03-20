import { Moon, Sun, Monitor } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type Theme = 'auto' | 'light' | 'dark';

export const ThemeSwitcher = ({
  activeTheme,
  onThemeChange,
}: {
  activeTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const themes: Theme[] = ['light', 'auto', 'dark'];
  const activeIndex = themes.indexOf(activeTheme);

  useEffect(() => {
    const activeButton = buttonsRef.current[activeIndex];
    if (activeButton && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeTheme]);

  return (
    <div
      ref={containerRef}
      className="relative flex w-fit items-center gap-1 rounded-full border bg-gray-300 p-1"
    >
      <div
        className="absolute rounded-full bg-white shadow-md transition-all duration-300 ease-out"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          height: 'calc(100% - 8px)',
        }}
      />

      {themes.map((theme, index) => (
        <button
          key={theme}
          ref={(el) => {
            buttonsRef.current[index] = el;
          }}
          onClick={() => onThemeChange(theme)}
          className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all ${
            activeTheme === theme
              ? 'text-gray-900'
              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
          }`}
        >
          {theme === 'light' && <Sun size={16} />}
          {theme === 'auto' && <Monitor size={16} />}
          {theme === 'dark' && <Moon size={16} />}
        </button>
      ))}
    </div>
  );
};
