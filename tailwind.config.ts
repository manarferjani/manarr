import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background, 0 0% 100%))", // Ajout d'une valeur de secours
        foreground: "hsl(var(--foreground, 240 10% 3.9%))",
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 100%))",
          foreground: "hsl(var(--card-foreground, 240 10% 3.9%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 100%))",
          foreground: "hsl(var(--popover-foreground, 240 10% 3.9%))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary, 240 100% 50%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 240 5% 64.9%))",
          foreground: "hsl(var(--secondary-foreground, 240 5.9% 10%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 240 4% 95.9%))",
          foreground: "hsl(var(--muted-foreground, 240 10% 3.9%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 142.1 76.2% 36.3%))",
          foreground: "hsl(var(--accent-foreground, 355.7 100% 97.3%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84.2% 60.2%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%))",
        },
        border: "hsl(var(--border, 240 5% 90%))",
        input: "hsl(var(--input, 240 5% 90%))",
        ring: "hsl(var(--ring, 240 100% 50%))",
        chart: {
          "1": "hsl(var(--chart-1, 240 100% 50%))",
          "2": "hsl(var(--chart-2, 120 100% 50%))",
          "3": "hsl(var(--chart-3, 60 100% 50%))",
          "4": "hsl(var(--chart-4, 30 100% 50%))",
          "5": "hsl(var(--chart-5, 0 100% 50%))",
        },
      },
      borderRadius: {
        lg: "var(--radius, 12px)", // Valeur de repli si non définie
        md: "calc(var(--radius, 12px) - 2px)",
        sm: "calc(var(--radius, 12px) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
