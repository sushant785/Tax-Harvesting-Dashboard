import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative flex items-center w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors duration-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
    >

      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}>
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-slate-300" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-yellow-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;