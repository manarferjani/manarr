"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const COOKIE_NAME = "active_theme";
const DEFAULT_THEME = "default";

// Création du contexte pour partager l'état du thème
const ThemeContext = createContext<{ activeTheme: string; setActiveTheme: (theme: string) => void } | undefined>(undefined);

// Fonction pour définir le cookie du thème
function setThemeCookie(theme: string) {
  if (typeof window === "undefined") return;

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
}

// Provider qui gère l'état du thème et synchronise les changements avec le cookie
export function ActiveThemeProvider({ children, initialTheme = DEFAULT_THEME }: { children: ReactNode; initialTheme?: string }) {
  const [activeTheme, setActiveTheme] = useState<string>(initialTheme);
  const { setTheme } = useTheme(); // Utilisation de 'setTheme' de 'next-themes'

  useEffect(() => {
    // Suppression des anciennes classes de thème
    document.body.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        document.body.classList.remove(className);
      }
    });

    // Ajout de la nouvelle classe de thème
    const themeClass = `theme-${activeTheme.replace("-scaled", "")}`;
    document.body.classList.add(themeClass);

    // Gestion de la classe 'theme-scaled'
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled");
    } else {
      document.body.classList.remove("theme-scaled");
    }

    // Synchroniser le thème avec 'next-themes'
    setTheme(activeTheme.replace("-scaled", ""));
    // Sauvegarder le thème dans un cookie
    setThemeCookie(activeTheme);
  }, [activeTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


// Hook personnalisé pour accéder au contexte du thème
export function useActiveTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useActiveTheme must be used within an ActiveThemeProvider");
  }
  return context;
}
