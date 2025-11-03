// page.tsx (ou histoire-horlogerie.tsx)
'use client';

import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { Regions } from './components/Regions';
import { Manufactures } from './components/Manufactures';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { stats, periods, regions, manufactures } from './data/content';
import './styles/globals.css';

export default function HistoireHorlogeriePage() {
  const { theme, toggleTheme, mounted } = useTheme();
  useScrollAnimations();

  // Éviter le flash de contenu non stylé
  if (!mounted) {
    return null;
  }

  return (
    <div className="horlogerie-page">
      <Navigation onThemeToggle={toggleTheme} theme={theme} />
      <main>
        <Hero stats={stats} />
        <Timeline periods={periods} />
        <Regions regions={regions} />
        <Manufactures manufactures={manufactures} />
      </main>
      <Footer />
    </div>
  );
}
