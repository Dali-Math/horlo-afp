// src/app/suisse/layout.tsx - VERSION CORRIGÉE ET AUTONOME
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Configuration du thème (intégrée directement)
const THEME_CONFIG = {
  dark: {
    bg: 'bg-black',
    bgGradient: 'bg-gradient-to-br from-black via-neutral-900 to-neutral-800',
    surface: 'bg-neutral-900',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    accent: 'text-yellow-400',
    accentBg: 'bg-yellow-400',
    border: 'border-neutral-700',
  },
  light: {
    bg: 'bg-white',
    bgGradient: 'bg-gradient-to-br from-white via-gray-50 to-gray-100',
    surface: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    accent: 'text-yellow-600',
    accentBg: 'bg-yellow-500',
    border: 'border-gray-200',
  },
};

// Composant Header inline
const Header = ({ theme, toggleTheme }: { theme: any; toggleTheme: () => void }) => (
  <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${theme.border}`}>
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-400/30 flex items-center justify-center">
            <span className="text-2xl">🕰️</span>
          </div>
          <div>
            <h1 className={`font-black text-2xl ${theme.text}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              HORLO CULTURE
            </h1>
            <p className={`text-xs ${theme.textSecondary}`}>Référence Mondiale</p>
          </div>
        </Link>

        <button
          onClick={toggleTheme}
          className={`relative w-14 h-7 rounded-full border ${theme.border} ${theme.surface} transition-all duration-300 hover:scale-105`}
        >
          <div
            className={`absolute top-1 left-1 w-5 h-5 rounded-full ${theme.accentBg} transition-transform duration-300 ${
              theme.accent.includes('yellow-600') ? 'translate-x-7' : ''
            }`}
          />
          <span className="absolute -left-8 top-1.5 text-sm">🌙</span>
          <span className="absolute -right-8 top-1.5 text-sm">☀️</span>
        </button>
      </div>
    </div>
  </header>
);

// Composant Footer inline
const Footer = ({ theme }: { theme: any }) => (
  <footer className={`border-t ${theme.border} backdrop-blur-xl mt-20`}>
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className={`text-3xl font-bold mb-4 ${theme.accent}`} style={{ fontFamily: "'Playfair Display', serif" }}>
          Horlo Culture
        </h3>
        <p className={`${theme.textSecondary} mb-6`}>La référence mondiale sur l'horlogerie suisse depuis 2024</p>
        <div className="flex justify-center gap-8 text-sm">
          <span className={theme.accent}>Histoire</span>
          <span className={theme.textSecondary}>•</span>
          <span className={theme.accent}>Innovation</span>
          <span className={theme.textSecondary}>•</span>
          <span className={theme.accent}>Tradition</span>
          <span className={theme.textSecondary}>•</span>
          <span className={theme.accent}>Excellence</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('horlo-theme') as 'dark' | 'light' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setThemeMode(saved || (systemPrefersDark ? 'dark' : 'light'));
  }, []);

  const theme = THEME_CONFIG[themeMode];

  const toggleTheme = () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    localStorage.setItem('horlo-theme', newTheme);
  };

  return (
    <html lang="fr" className={`${themeMode === 'dark' ? 'dark' : ''}`}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>
      <body className={`${theme.bgGradient} ${theme.text} transition-colors duration-500`}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>{children}</main>
        <Footer theme={theme} />
      </body>
    </html>
  );
}
