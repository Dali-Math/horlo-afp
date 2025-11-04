// components/Hero.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Stat } from '../types';

interface HeroProps {
  stats: Stat[];
}

export function Hero({ stats }: HeroProps) {
  return (
    <section id="hero" className="hero-section">
      {/* Image de fond */}
      <div className="hero-background">
        <Image
          src="/imgs/Patek_Philippe_Rose_Gold_Grand_Complications_Watch.jpg"
          alt="Mécanisme horloger de luxe"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
      </div>
      
      {/* Overlay sombre */}
      <div className="hero-overlay" />
      
      {/* Contenu */}
      <div className="hero-content">
        <h1 className="display-1">L'Excellence Horlogère Suisse</h1>
        <p className="subhead">500 Ans de Savoir-Faire</p>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
