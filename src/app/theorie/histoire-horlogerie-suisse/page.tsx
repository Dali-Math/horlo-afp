// page.tsx
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

export default function HistoireHorlogeriePage() {
  const { theme, toggleTheme, mounted } = useTheme();
  useScrollAnimations();

  if (!mounted) {
    return null;
  }

  return (
    <div className="horlogerie-page" data-theme={theme}>
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
