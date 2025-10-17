'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Star,
  Download,
  Filter,
  Users,
  Sparkles
} from 'lucide-react';

// Événements statiques en attendant que tu remplisses le Google Calendar
const upcomingEvents = [
  {
    id: 1,
    title: 'Watches & Wonders Geneva 2026',
    date: '6-10 avril 2026',
    location: 'Palexpo, Genève',
    type: 'Salon',
    isFeatured: true,
    isFree: false,
    description: 'Le salon horloger le plus prestigieux au monde. Découvrez les nouveautés des plus grandes manufactures suisses.',
    url: 'https://www.watches-and-wonders.com',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Baselworld 2026',
    date: '26-30 mars 2026',
    location: 'Messe Basel, Bâle',
    type: 'Salon',
    isFeatured: true,
    isFree: false,
    description: 'Le rendez-vous incontournable de l\'horlogerie et de la joaillerie mondiale.',
    url: 'https://www.baselworld.com',
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Atelier Démontage ETA 2824',
    date: '15 novembre 2025',
    location: 'École d\'Horlogerie, Genève',
    type: 'Atelier',
    isFeatured: true,
    isFree: true,
    description: 'Atelier pratique gratuit : démontage et remontage complet d\'un ETA 2824-2 avec un horloger professionnel.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Conférence : L\'avenir de l\'horlogerie',
    date: '3 décembre 2025',
    location: 'MIH, La Chaux-de-Fonds',
    type: 'Conférence',
    isFeatured: false,
    isFree: true,
    description: 'Table ronde avec des experts sur les défis et opportunités de l\'horlogerie face au numérique.',
    url: 'https://www.mih.ch',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Exposition : 250 ans d\'horlogerie suisse',
    date: '20 oct 2025 - 30 jan 2026',
    location: 'Musée Patek Philippe, Genève',
    type: 'Exposition',
    isFeatured: false,
    isFree: false,
    description: 'Exposition exceptionnelle retraçant l\'histoire de l\'horlogerie suisse avec pièces rares.',
    url: 'https://www.patekmuseum.com',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Journée Portes Ouvertes Manufacture',
    date: '22 novembre 2025',
    location: 'Manufacture Vaucher, Fleurier',
    type: 'Portes ouvertes',
    isFeatured: false,
    isFree: true,
    description: 'Visitez une vraie manufacture horlogère ! Démonstrations et rencontres avec les artisans.',
    url: 'https://www.vaucher-manufacture.ch',
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&h=400&fit=crop'
  }
];

export default function EvenementsPage() {
  const [selectedType, setSelectedType] = useState('all');
  
  const filteredEvents = selectedType === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(e => e.type === selectedType);
    
  const featuredEvents = upcomingEvents.filter(e => e.isFeatured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Agenda horloger 2025-2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Événements & Salons
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Découvrez {upcomingEvents.length} événements horlogers à venir : salons internationaux, ateliers gratuits et journées portes ouvertes
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <span className="font-semibold text-slate-900">Filtrer par type</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'Salon', 'Atelier', 'Conférence', 'Exposition', 'Portes ouvertes'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'Tous' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Events */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            À ne pas manquer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <div
                key={event.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                      ⭐ VEDETTE
                    </span>
                    {event.isFree && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        GRATUIT
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded mb-3 inline-block">
                    {event.type}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <MapPin className="w-4 h-4 text-red-600" />
                      {event.location}
                    </div>
                  </div>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Plus d'infos
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Events */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Tous les événements ({filteredEvents.length})
          </h2>
          <div className="space-y-4">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-slate-200"
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
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                            {event.type}
                          </span>
                          {event.isFree && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                              GRATUIT
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{event.title}</h3>
                        <p className="text-slate-600 mb-4">{event.description}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <MapPin className="w-4 h-4 text-red-600" />
                        {event.location}
                      </div>
                    </div>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Plus d'informations
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Google Calendar Integration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Calendrier complet
          </h2>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=d7e5e27dadbbc3132a5433e7595a99ec7bd8646f28d1ded3860bea8e0865cf47%40group.calendar.google.com&ctz=Europe%2FZurich&mode=AGENDA&showTitle=0&showPrint=0&showTabs=1&showCalendars=0&showTz=0&height=600&wkst=2&bgcolor=%23ffffff"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Votre événement n'est pas listé ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Partagez vos événements horlogers avec la communauté HorloLearn
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            <Users className="w-5 h-5" />
            Proposer un événement
          </Link>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2025 HorloLearn – Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
