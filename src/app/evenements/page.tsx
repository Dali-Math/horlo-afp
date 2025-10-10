'use client';

import { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import FiltersBar from './FiltersBar';
import EventCard from './EventCard';
import CallToActionSection from './CallToActionSection';
import type { Event } from './EventCard';

export default function EvenementsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  useEffect(() => {
    fetch('/data/events.json')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Erreur de chargement des événements:', err));
  }, []);

  const filteredEvents =
    selectedCategory === 'Tous'
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
      <HeroSection />
      <FiltersBar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400 font-['Inter']">
              Chargement des événements...
            </p>
          </div>
        )}
      </section>

      <CallToActionSection />

      {/* Section Agendas externes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="bg-gradient-to-br from-zinc-800/70 to-zinc-900/70 backdrop-blur-sm rounded-xl border border-amber-500/30 p-8 shadow-2xl">
          <h2 className="font-['Bebas_Neue'] text-3xl text-amber-400 tracking-wide mb-6">
            📅 Agendas Externes & Ressources
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="https://www.fh-pressroom.ch/fr/agenda"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <h3 className="font-['Bebas_Neue'] text-lg text-amber-400 mb-2">
                Fédération Horlogère
              </h3>
              <p className="text-sm text-gray-400 font-['Inter']">
                Événements et salons en Suisse
              </p>
            </a>
            <a
              href="https://www.hautehorlogerie.org/fr/actualites/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <h3 className="font-['Bebas_Neue'] text-lg text-amber-400 mb-2">
                FHH Actualités
              </h3>
              <p className="text-sm text-gray-400 font-['Inter']">
                Conférences et expositions
              </p>
            </a>
            <a
              href="https://www.bhi.co.uk/horology-events/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <h3 className="font-['Bebas_Neue'] text-lg text-amber-400 mb-2">
                BHI Horology Events
              </h3>
              <p className="text-sm text-gray-400 font-['Inter']">
                Rencontres et salons (UK)
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
