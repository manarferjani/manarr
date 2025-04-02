"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeProvider } from "./theme-provider"; // Importation du ThemeProvider

const COOKIE_NAME = "active_theme";
const DEFAULT_THEME = "default";

const ThemeContext = createContext<{ activeTheme: string; setActiveTheme: (theme: string) => void } | undefined>(undefined);

function setThemeCookie(theme: string) {
  if (typeof window === "undefined") return;

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
}

interface ActiveThemeProviderProps {
  children: ReactNode;
  initialTheme?: string;
}

export function ActiveThemeProvider({ children, initialTheme }: ActiveThemeProviderProps) {
  const [activeTheme, setActiveTheme] = useState<string>(initialTheme || DEFAULT_THEME);
  const { setTheme } = useTheme();

  useEffect(() => {
    document.body.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        document.body.classList.remove(className);
      }
    });

    document.body.classList.add(`theme-${activeTheme.replace("-scaled", "")}`);
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled");
    } else {
      document.body.classList.remove("theme-scaled");
    }

    setTheme(activeTheme.replace("-scaled", ""));
    setThemeCookie(activeTheme);
  }, [activeTheme, setTheme]);

  return (
    <ThemeProvider>
      <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
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
