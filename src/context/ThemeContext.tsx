import React, { createContext, useContext, useState } from 'react';

// ──────────────────────────────────────────────
//  THEME DEFINITIONS (Monochrome Black & White)
// ──────────────────────────────────────────────
export type ThemeColors = {
  isDark: boolean;
  bg: string;
  bgBlob1: string;
  bgBlob2: string;
  card: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  sectionTitle: string;
  accent: string;
  surface: string;
  inputBg: string;
  badgeBg: string;
  badgeBorder: string;
  primaryBtn: string;
  primaryBtnText: string;
};

// Light theme is the default (matches the white PPT slide portfolio)
const LIGHT: ThemeColors = {
  isDark: false,
  bg: '#fcfcfc',
  bgBlob1: 'rgba(0, 0, 0, 0.02)',
  bgBlob2: 'rgba(0, 0, 0, 0.03)',
  card: '#ffffff',
  cardBorder: '#e4e4e7',
  text: '#09090b',
  textMuted: '#52525b',
  sectionTitle: '#09090b',
  accent: '#09090b',
  surface: '#f4f4f5',
  inputBg: '#f4f4f5',
  badgeBg: '#f4f4f5',
  badgeBorder: '#e4e4e7',
  primaryBtn: '#09090b',
  primaryBtnText: '#ffffff',
};

// Dark theme is a clean, sleek dark graphite / monochrome
const DARK: ThemeColors = {
  isDark: true,
  bg: '#09090b',
  bgBlob1: 'rgba(255, 255, 255, 0.02)',
  bgBlob2: 'rgba(255, 255, 255, 0.03)',
  card: '#121215',
  cardBorder: '#27272a',
  text: '#fafafa',
  textMuted: '#a1a1aa',
  sectionTitle: '#fafafa',
  accent: '#fafafa',
  surface: '#18181b',
  inputBg: '#18181b',
  badgeBg: '#1f1f23',
  badgeBorder: '#27272a',
  primaryBtn: '#fafafa',
  primaryBtnText: '#09090b',
};

// ──────────────────────────────────────────────
//  CONTEXT
// ──────────────────────────────────────────────
type ThemeContextType = ThemeColors & { toggle: () => void };

const ThemeContext = createContext<ThemeContextType>({
  ...LIGHT,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to light mode as requested by PPT slide design
  const [isDark, setIsDark] = useState(false);
  const colors = isDark ? DARK : LIGHT;
  const value: ThemeContextType = {
    ...colors,
    toggle: () => setIsDark((d) => !d),
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
