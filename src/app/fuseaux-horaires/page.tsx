'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, MapPin, Sun, Moon, Calendar, Globe, ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface City {
  id: string;
  name: string;
  timezone: string;
  flag: string;
  coordinates: string;
}

interface TimeDisplay {
  time: string;
  date: string;
  timezone: string;
  isDST: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// DONNÉES
// ─────────────────────────────────────────────────────────────────────────────

const cities: City[] = [
  { id: 'new-york', name: 'New York', timezone: 'America/New_York', flag: '🇺🇸', coordinates: '40.7128° N, 74.0060° W' },
  { id: 'london', name: 'Londres', timezone: 'Europe/London', flag: '🇬🇧', coordinates: '51.5074° N, 0.1278° W' },
  { id: 'tokyo', name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵', coordinates: '35.6762° N, 139.6503° E' },
  { id: 'paris', name: 'Paris', timezone: 'Europe/Paris', flag: '🇫🇷', coordinates: '48.8566° N, 2.3522° E' },
  { id: 'sydney', name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺', coordinates: '33.8688° S, 151.2093° E' },
  { id: 'mexico', name: 'Mexico', timezone: 'America/Mexico_City', flag: '🇲🇽', coordinates: '19.4326° N, 99.1332° W' },
  { id: 'beijing', name: 'Pékin', timezone: 'Asia/Shanghai', flag: '🇨🇳', coordinates: '39.9042° N, 116.4074° E' },
  { id: 'moscow', name: 'Moscou', timezone: 'Europe/Moscow', flag: '🇷🇺', coordinates: '55.7558° N, 37.6173° E' },
  { id: 'dubai', name: 'Dubaï', timezone: 'Asia/Dubai', flag: '🇦🇪', coordinates: '25.2048° N, 55.2708° E' },
  { id: 'berlin', name: 'Berlin', timezone: 'Europe/Berlin', flag: '🇩🇪', coordinates: '52.5200° N, 13.4050° E' },
];

// ─────────────────────────────────────────────────────────────────────────────
// HOOK PERSONNALISÉ
// ─────────────────────────────────────────────────────────────────────────────

function useClock(timezone: string): TimeDisplay {
  const [time, setTime] = useState<TimeDisplay>(() => {
    const now = new Date();
    return {
      time: formatTime(now, timezone),
      date: formatDate(now, timezone),
      timezone: getTimezoneName(now, timezone),
      isDST: isDSTActive(now, timezone),
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        time: formatTime(now, timezone),
        date: formatDate(now, timezone),
        timezone: getTimezoneName(now, timezone),
        isDST: isDSTActive(now, timezone),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return time;
}

function formatTime(date: Date, timezone: string): string {
  return date.toLocaleTimeString('fr-FR', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function formatDate(date: Date, timezone: string): string {
  return date.toLocaleDateString('fr-FR', {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getTimezoneName(date: Date, timezone: string): string {
  const parts = date.toLocaleTimeString('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  });
  const timezoneName = parts.split(' ')[2];
  return timezoneName || '';
}

function isDSTActive(date: Date, timezone: string): boolean {
  const january = new Date(date.getFullYear(), 0, 1);
  const july = new Date(date.getFullYear(), 6, 1);
  
  const januaryOffset = january.getTimezoneOffset();
  const julyOffset = july.getTimezoneOffset();

  // Cette logique est simplifiée - pour une détection précise, utiliser une librairie comme `luxon`
  const now = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
  const utc = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  
  return now.getHours() !== utc.getHours() && timezone.includes('America') || timezone.includes('Europe');
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT CARTE VILLE
// ─────────────────────────────────────────────────────────────────────────────

function CityCard({ city }: { city: City }) {
  const { time, date, timezone, isDST } = useClock(city.timezone);
  
  const isDayTime = useMemo(() => {
    const hour = parseInt(time.split(':')[0], 10);
    return hour >= 6 && hour < 18;
  }, [time]);

  return (
    <div className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Indicateur jour/nuit */}
      <div className={`absolute top-0 left-0 w-full h-1 ${isDayTime ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600'} transition-colors duration-500`} />
      
      {/* En-tête */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{city.flag}</div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{city.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{city.coordinates}</p>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${isDayTime ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-indigo-50 dark:bg-indigo-900/20'}`}>
          {isDayTime ? <Sun className="w-5 h-5 text-yellow-500" aria-hidden="true" /> : <Moon className="w-5 h-5 text-indigo-500" aria-hidden="true" />}
        </div>
      </div>

      {/* Heure principale */}
      <div className="mb-4">
        <div className="text-4xl md:text-5xl font-light font-mono text-slate-900 dark:text-white tracking-tight">
          {time}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Calendar className="w-4 h-4 text-slate-400" aria-hidden="true" />
          <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">{date}</span>
        </div>
      </div>

      {/* Footer infos */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{timezone}</span>
          </div>
          {isDST && (
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full">
              DST
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────

export default function WorldClockPage() {
  const currentCity = useMemo(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return cities.find(c => c.timezone === userTimezone)?.name || 'Votre position';
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
              aria-label="Retour à l'accueil"
            >
              <ChevronLeft className="w-4 h-4 mr-1" aria-hidden="true" />
              retour
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{currentCity}</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-4 tracking-tight">
            Fuseaux Horaires Mondiaux
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Heures locales en temps réel des grandes capitales horlogères
          </p>
        </div>

        {/* Grille des villes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.map(city => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center">
          <p className="text-xs text-slate-400">
            Mises à jour en temps réel • {cities.length} villes
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Horlogerie suisse, precision mondiale
          </p>
        </div>
      </footer>
    </main>
  );
}
