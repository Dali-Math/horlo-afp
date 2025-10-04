'use client';

import { useState } from 'react';
import HeroSection from './HeroSection';
import FiltersBar from './FiltersBar';
import EventCard from './EventCard';
import type { Event } from './EventCard';
import CallToActionSection from './CallToActionSection';

// Données mock d'événements
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Watches & Wonders Geneva',
    date: '31 mars - 5 avril 2025',
    location: 'Genève, Suisse',
    description:
      "Le plus grand salon international de l'horlogerie. Découvrez les dernières nouveautés des marques prestigieuses, assistez à des conférences et explorez l'univers de la haute horlogerie.",
    category: 'Salons',
  },
  {
    id: '2',
    title: "Journées des Métiers d'Horlogerie",
    date: '15-16 novembre 2025',
    location: 'La Chaux-de-Fonds, Suisse',
    description:
      "Portes ouvertes des écoles d'horlogerie. Ateliers d'initiation gratuits, démonstrations de métiers, rencontres avec des professionnels et visite des installations de formation.",
    category: 'Ateliers',
  },
  {
    id: '3',
    title: 'Salon Belles Montres Paris',
    date: '8-10 décembre 2025',
    location: 'Paris, France',
    description:
      'Salon dédié aux montres vintage et contemporaines. Expositions, conférences techniques, ateliers de restauration et rencontres avec des collectionneurs passionnés.',
    category: 'Salons',
  },
  {
    id: '4',
    title: 'Ateliers MIH - Musée International',
    date: 'Tous les samedis',
    location: 'La Chaux-de-Fonds, Suisse',
    description:
      "Ateliers pédagogiques mensuels au Musée International d'Horlogerie. Découverte des mécanismes, histoire de l'horlogerie, et initiations pratiques pour tous les âges.",
    category: 'Ateliers',
  },
  {
    id: '5',
    title: 'MunichTime Watch Fair',
    date: '24-26 octobre 2025',
    location: 'Munich, Allemagne',
    description:
      'Foire horlogère internationale avec focus sur les marques indépendantes. Conférences techniques, masterclasses, et opportunités de networking avec des horlogers innovants.',
    category: 'Salons',
  },
];

export default function EvenementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  // Filtrage par catégorie
  const filteredEvents =
    selectedCategory === 'Tous'
      ? mockEvents
      : mockEvents.filter((event) => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Section Hero */}
      <HeroSection />

      {/* Barre de filtres */}
      <FiltersBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Grille d'événements */}
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
              Aucun événement disponible dans cette catégorie.
            </p>
          </div>
        )}
      </section>

      {/* Section Call To Action */}
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
