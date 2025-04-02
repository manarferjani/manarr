// /Frontend/hooks/use-theme-config.ts
"use client";

import { useTheme } from "next-themes";

export function useThemeConfig() {
  const {
    theme,
    setTheme,
    systemTheme,
    resolvedTheme,
    // Ajoutez d'autres valeurs si nécessaire
  } = useTheme();

  if (theme === undefined || setTheme === undefined) {
    throw new Error(
      "useThemeConfig doit être utilisé dans un <ThemeProvider>. " +
      "Vérifiez que :\n" +
      "1. Votre composant a 'use client'\n" +
      "2. ThemeProvider enveloppe bien votre application"
    );
  }

  return {
    theme,
    setTheme,
    systemTheme,
    resolvedTheme,
    // Exportez les valeurs nécessaires
  };
}