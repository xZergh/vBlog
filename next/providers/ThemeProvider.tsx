import { useContext, useMemo, useState } from 'react';
import { ThemeContext, themes } from '../context/ThemeContext';
import type { Theme, ThemeContextValue } from '../context/ThemeContext';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(themes.light);

  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme.type === 'light' ? themes.dark : themes.light
    );
  };

  const themeAPI = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeAPI}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider };
export default ThemeProvider;
