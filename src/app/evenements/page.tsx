'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
  Filter,
  Users,
  Sparkles,
} from 'lucide-react';

const upcomingEvents = [
  {
    id: 1,
    title: 'Watches & Wonders Geneva 2026',
    date: '6-10 avril 2026',
    location: 'Palexpo, Genève',
    type: 'Salon',
    isFeatured: true,
    isFree: false,
    description:
      'Le salon horloger le plus prestigieux au monde. Découvrez les nouveautés des plus grandes manufactures suisses.',
    url: 'https://www.watches-and-wonders.com',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Baselworld 2026',
    date: '26-30 mars 2026',
    location: 'Messe Basel, Bâle',
    type: 'Salon',
    isFeatured: true,
    isFree: false,
    description:
      "Le rendez-vous incontournable de l'horlogerie et de la joaillerie mondiale.",
    url: 'https://www.baselworld.com',
    image:
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Atelier Démontage ETA 2824',
    date: '15 novembre 2025',
    location: "École d'Horlogerie, Genève",
    type: 'Atelier',
    isFeatured: true,
    isFree: true,
    description:
      "Atelier pratique gratuit : démontage et remontage complet d'un ETA 2824-2 avec un horloger professionnel.",
    url: '#',
    image:
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: "Conférence : L'avenir de l'horlogerie",
    date: '3 décembre 2025',
    location: 'MIH, La Chaux-de-Fonds',
    type: 'Conférence',
    isFeatured: false,
    isFree: true,
    description:
      "Table ronde avec des experts sur les défis et opportunités de l'horlogerie face au numérique.",
    url: 'https://www.mih.ch',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: "Exposition : 250 ans d'horlogerie suisse",
    date: '20 oct 2025 - 30 jan 2026',
    location: 'Musée Patek Philippe, Genève',
    type: 'Exposition',
    isFeatured: false,
    isFree: false,
    description:
      "Exposition exceptionnelle retraçant l'histoire de l'horlogerie suisse avec pièces rares.",
    url: 'https://www.patekmuseum.com',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Journée Portes Ouvertes Manufacture',
    date: '22 novembre 2025',
    location: 'Manufacture Vaucher, Fleurier',
    type: 'Portes ouvertes',
    isFeatured: false,
    isFree: true,
    description:
      'Visitez une vraie manufacture horlogère ! Démonstrations et rencontres avec les artisans.',
    url: 'https://www.vaucher-manufacture.ch',
    image:
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&h=400&fit=crop',
  },
];

export default function EvenementsPage() {
  const [selectedType, setSelectedType] = useState('all');

  const filteredEvents =
    selectedType === 'all'
      ? upcomingEvents
      : upcomingEvents.filter((e) => e.type === selectedType);

  const featuredEvents = upcomingEvents.filter((e) => e.isFeatured);

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-900 text-slate-900 dark:text-light-100 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-dark-900 shadow-sm border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-gold hover:text-gold-light transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l’accueil
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Agenda horloger 2025-2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-light-100 mb-4">
            Événements & Salons
          </h1>
          <p className="text-lg text-slate-600 dark:text-light-200 max-w-3xl mx-auto">
            Découvrez {upcomingEvents.length} événements horlogers à venir :
            salons, conférences et ateliers.
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-6 mb-8 border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gold" />
            <span className="font-semibold">Filtrer par type</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'Salon', 'Atelier', 'Conférence', 'Exposition', 'Portes ouvertes'].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedType === type
                      ? 'bg-gold text-dark-900'
                      : 'bg-dark-800 text-light-100 hover:bg-dark-700'
                  }`}
                >
                  {type === 'all' ? 'Tous' : type}
                </button>
              )
            )}
          </div>
        </div>

        {/* Événements vedettes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-gold" />
            À ne pas manquer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-200 dark:border-white/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 bg-gold text-dark-900 text-xs font-bold rounded-full">
                      ⭐ VEDETTE
                    </span>
                    {event.isFree && (
                      <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                        GRATUIT
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-bold rounded mb-3 inline-block">
                    {event.type}
                  </span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-light-200 mb-4">
                    {event.description}
                  </p>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold" />
                      {event.location}
                    </div>
                  </div>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gold text-dark-900 px-4 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Plus d’infos
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tous les événements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Tous les événements ({filteredEvents.length})
          </h2>
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-slate-200 dark:border-white/10"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-bold rounded">
                            {event.type}
                          </span>
                          {event.isFree && (
                            <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">
                              GRATUIT
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                        <p className="text-slate-600 dark:text-light-200 mb-4">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gold" />
                        {event.location}
                      </div>
                    </div>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold text-dark-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Plus d’informations
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-gold-dark to-gold rounded-3xl p-12 text-dark-900 text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Votre événement n’est pas listé ?
          </h2>
          <p className="text-xl mb-8">
            Partagez vos événements horlogers avec la communauté HorloLearn
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-dark-900 text-light-100 px-8 py-4 rounded-xl font-bold text-lg hover:bg-dark-800 transition-all"
          >
            <Users className="w-5 h-5" />
            Proposer un événement
          </Link>
        </div>
      </main>

      <footer className="bg-dark-900 text-light-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-light-400">
            © 2025 HorloLearn – Passion & Découverte Horlogère Suisse
          </p>
        </div>
      </footer>
    </div>
  );
}
