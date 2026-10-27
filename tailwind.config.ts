import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "var(--color-cream, #f3efe7)",
          card: "var(--color-cream-card, #faf7f1)",
          tile: "var(--color-cream-tile, #f7f3ea)",
          border: "var(--color-cream-border, #d7d0c4)",
          track: "var(--color-cream-track, #e7e0d2)",
        },
        bronze: {
          DEFAULT: "var(--color-bronze, #9c7a43)",
          light: "var(--color-bronze-light, #b08d57)",
          dark: "var(--color-bronze-dark, #7c5f33)",
        },
        ink: {
          DEFAULT: "var(--color-ink, #171717)",
          soft: "var(--color-ink-soft, #57534e)",
        },

        background: "var(--background)",
        foreground: "var(--foreground)",
        // Palette "atelier horloger" sombre et doré
        dark: {
          700: '#343A40',
          800: '#1c1e26',
          900: '#0b0c10',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f7d070',
          dark: '#b8941f',
        },
        light: {
          100: '#f3f4f6',
          200: '#b8b8b8',
          300: '#DEE2E6',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'Times New Roman', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        label: ['var(--font-jbmono)', 'ui-monospace', 'monospace'],

        bebas: ['Bebas Neue', 'Oswald', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
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
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
