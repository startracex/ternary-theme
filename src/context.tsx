"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { autoScheme } from "./utils.ts";
import type { BinaryTheme, TernaryTheme } from "./types.ts";
import { AUTO } from "./constant.ts";

interface ThemeContextType {
  /**
   * Current theme, can be "light", "dark", or "auto".
   */
  theme: TernaryTheme;
  /**
   * Resolved auto theme, can be "light" or "dark".
   */
  resolvedTheme: BinaryTheme;
  setTheme: (theme: TernaryTheme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children: ReactNode;
  /**
   * Runs when the theme is initialized, use to override the default theme.
   *
   * @returns "light", "dark", or "auto".
   */
  onThemeInitialize?: () => TernaryTheme;
  /**
   * Default theme.
   */
  defaultTheme?: TernaryTheme;
  /**
   * Runs when the theme is changed.
   *
   * @param theme Current theme, can be "light", "dark", or "auto".
   * @param resolvedTheme Resolved auto theme, can be "light" or "dark".
   */
  onThemeChange?: (theme: TernaryTheme, resolvedTheme: BinaryTheme) => void;
  ssrTheme?: BinaryTheme;
}

export function ThemeProvider({
  children,
  defaultTheme = AUTO,
  onThemeInitialize,
  ssrTheme,
  onThemeChange,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<TernaryTheme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  const getResolvedTheme = (): BinaryTheme => {
    if (!mounted) {
      return ssrTheme;
    }
    return theme === AUTO ? autoScheme().resolved : theme;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !onThemeInitialize) {
      return;
    }
    setThemeState(onThemeInitialize());
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    onThemeChange?.(theme, getResolvedTheme());
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || theme !== AUTO || !onThemeChange) {
      return;
    }
    const { watch, resolved } = autoScheme();
    return watch(() => onThemeChange(theme, resolved));
  }, [theme, mounted]);

  const setTheme = (newTheme: TernaryTheme) => {
    setThemeState(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme: getResolvedTheme(),
    mounted,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
