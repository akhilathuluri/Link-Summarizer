import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';

export function ThemeToggle() {
  const { settings, setTheme } = useStore();
  const isDark = settings.theme === 'dark';

  React.useEffect(() => {
    // Initial theme setup
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = settings.theme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  React.useEffect(() => {
    // Apply theme changes
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}