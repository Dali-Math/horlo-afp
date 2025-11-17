'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, Clock } from 'lucide-react';
import Link from 'next/link';

interface City {
  id: string;
  name: string;
  timezone: string;
}

const cities: City[] = [
  { id: 'new-york', name: 'NEW YORK', timezone: 'America/New_York' },
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
  const [time, setTime] = useState(() => formatTime(new Date(), city.timezone));

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime(new Date(), city.timezone)), 1000);
    return () => clearInterval(interval);
  }, [city.timezone]);

  return (
    <div className="group flex justify-between items-center py-5 border-b border-slate-100 hover:bg-slate-50 transition-all duration-200 cursor-pointer">
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <Clock className="w-4 h-4" />
        </span>
        <span className="text-xl font-medium text-slate-900 tracking-tight">{city.name}</span>
      </div>
      <span className="text-xl font-mono text-slate-700 tracking-tight tabular-nums">{time}</span>
    </div>
  );
}

export default function FuseauxHorairesPage() {
  const pageTitle = "FUSEAUX HORAIRES";
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 font-sans">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1.5" />
          retour
        </Link>
        
        {/* Titre principal */}
        <h1 className="text-5xl font-bold text-slate-900 mb-12 tracking-tight">
          {pageTitle}
        </h1>

        {/* Liste des villes */}
        <div className="space-y-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {cities.map(city => (
            <CityRow key={city.id} city={city} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-slate-400">
          Passion horlogère • @ 2024
        </div>
      </div>
    </main>
  );
}
