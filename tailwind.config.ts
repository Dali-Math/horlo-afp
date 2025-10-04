import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Palette "atelier horloger" sombre et doré
        dark: {
          900: '#0b0c10',  // Noir profond
          800: '#1c1e26',  // Charbon
        },
        gold: {
          DEFAULT: '#d4af37',  // Or classique
          light: '#f7d070',
          dark: '#b8941f',
        },
        light: {
          100: '#f3f4f6',  // Gris très clair
          200: '#b8b8b8',  // Gris moyen
        },
      },
      fontFamily: {
        // Polices pour titres
        bebas: ['Bebas Neue', 'Oswald', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        // Polices pour texte
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
