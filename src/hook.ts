"use client";
import { useEffect, useState } from "react";
import { autoScheme } from "./utils.ts";
import type { BinaryTheme, TernaryTheme } from "./types.ts";
import { AUTO } from "./constant.ts";

export function useTheme({
  defaultTheme = AUTO,
  onThemeChange,
}: {
  defaultTheme?: TernaryTheme;
  onThemeChange?: (theme: TernaryTheme, resolved: BinaryTheme) => void;
} = {}): {
  theme: TernaryTheme;
  setTheme: (theme: TernaryTheme) => void;
  resolvedTheme: BinaryTheme;
} {
  const [theme, setTheme] = useState<TernaryTheme>(defaultTheme);

  useEffect(() => {
    if (theme !== AUTO || !onThemeChange) {
      return;
    }

    const { watch, resolved } = autoScheme();
    return watch(() => onThemeChange(theme, resolved));
  }, [theme]);

  return {
    theme,
    setTheme,
    resolvedTheme: theme === AUTO ? autoScheme().resolved : theme,
  };
}
