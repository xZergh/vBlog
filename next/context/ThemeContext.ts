import { createContext } from 'react';

export type Theme = {
  type: 'light' | 'dark';
  fontColor: string;
  background: string;
};

export const themes: Record<'light' | 'dark', Theme> = {
  light: {
    type: 'light',
    fontColor: '#2b2c38',
    background: '#f4f7f8',
  },
  dark: {
    type: 'dark',
    fontColor: '#ffffff',
    background: '#2b2c38',
  },
};

export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
