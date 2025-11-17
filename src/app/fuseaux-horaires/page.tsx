'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface City {
  id: string;
  name: string;
  timezone: string;
}

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

function formatTime(date: Date, timezone: string): string {
  return date.toLocaleTimeString('fr-FR', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function CityRow({ city }: { city: City }) {
  const [time, setTime] = useState<string>(() => formatTime(new Date(), city.timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date(), city.timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [city.timezone]);

  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-200 hover:bg-slate-50 transition-colors">
      <span className="text-2xl font-medium text-slate-900">{city.name}</span>
      <span className="text-2xl font-mono text-slate-700">{time}</span>
    </div>
  );
}

export default function FuseauxHorairesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header simple */}
      <header className="sticky top-0 bg-white border-b border-slate-200 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            retour
          </Link>
        </div>
      </header>

      {/* Liste des villes */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">FUSEAUX HORAIRES</h1>
        
        <div className="space-y-0">
          {cities.map(city => (
            <CityRow key={city.id} city={city} />
          ))}
        </div>
      </div>

      {/* Footer minimal */}
      <footer className="mt-16 py-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400">© 2024</p>
        </div>
      </footer>
    </main>
  );
}
