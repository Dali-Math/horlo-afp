// components/Hero.tsx
import React from 'react';
import Image from 'next/image';
import { Stat } from '../types';

interface HeroProps {
  stats: Stat[];
}

export function Hero({ stats }: HeroProps) {
  return (
    <section id="hero" className="hero-section">
      <Image
        src="/imgs/luxury_swiss_watch_tourbillon_complication_macro.jpg"
        alt="Mécanisme horloger de luxe"
        fill
        className="hero-background"
        priority
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="display-1">L'Excellence Horlogère Suisse</h1>
        <p className="subhead">500 Ans de Savoir-Faire</p>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
