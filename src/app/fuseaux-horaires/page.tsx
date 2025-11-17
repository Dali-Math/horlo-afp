'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface City {
  id: string;
  name: string;
  timezone: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DONNÉES
// ─────────────────────────────────────────────────────────────────────────────

const cities: City[] = [
  { id: 'new-york', name: 'NEWYORK', timezone: 'America/New_York' },
  { id: 'london', name: 'LONDON', timezone: 'Europe/London' },
  { id: 'tokyo', name: 'TOKYO', timezone: 'Asia/Tokyo' },
  { id: 'paris', name: 'PARIS', timezone: 'Europe/Paris' },
  { id: 'sydney', name: 'SYDNEY', timezone: 'Australia/Sydney' },
  { id: 'mexico', name: 'MEXICO', timezone: 'America/Mexico_City' },
  { id: 'beijing', name: 'BEIJING', timezone: 'Asia/Shanghai' },
  { id: 'moscow', name: 'MOSCOW', timezone: 'Europe/Moscow' },
  { id: 'dubai', name: 'DUBAI', timezone: 'Asia/Dubai' },
  { id: 'berlin', name: 'BERLIN', timezone: 'Europe/Berlin' },
];

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────

function formatTime(date: Date, timezone: string): string {
  return date.toLocaleTimeString('fr-FR', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT CARTE
// ─────────────────────────────────────────────────────────────────────────────

function CityRow({ city }: { city: City }) {
  const [time, setTime] = useState(() => formatTime(new Date(), city.timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date(), city.timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [city.timezone]);

  return (
    <div className="flex justify-between py-5 border-b border-slate-200 font-mono">
      <span className="text-2xl text-black font-medium tracking-tight">{city.name}</span>
      <span className="text-2xl text-black font-mono tracking-tight">{time}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────

export default function FuseauxHorairesPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Header avec lien retour */}
      <header className="max-w-3xl mx-auto px-5 py-6">
        <Link 
          href="/" 
          className="text-sm text-black flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
          retour
        </Link>
      </header>

      {/* Contenu principal */}
      <div className="max-w-3xl mx-auto px-5 pb-16">
        <h1 className="text-4xl font-bold text-black mb-8 tracking-tight">FUSEAUX HORAIRES</h1>
        
        <div className="space-y-0">
          {cities.map(city => (
            <CityRow key={city.id} city={city} />
          ))}
        </div>

        {/* Footer copyright */}
        <div className="text-center mt-12 text-sm text-black opacity-50">
          @ 2024
        </div>
      </div>
    </main>
  );
}
