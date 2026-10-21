// src/app/evenements/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  ExternalLink,
  Sparkles,
  Search,
  CheckCircle2,
  Download,
  Mail,
  ArrowRight,
  ChevronRight,
  Award
} from 'lucide-react';

interface EventItem {
  id: number;
  title: string;
  date: string;
  dateIsoStart?: string;
  dateIsoEnd?: string;
  location: string;
  canton: string;
  type: string;
  isFeatured: boolean;
  isFree: boolean;
  audience: string;
  description: string;
  url: string;
  image: string;
  highlights: string[];
}

const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'Watches & Wonders Geneva 2026',
    date: '6 - 10 avril 2026',
    dateIsoStart: '20260406',
    dateIsoEnd: '20260410',
    location: 'Palexpo, Genève',
    canton: 'Genève (GE)',
    type: 'Salon International',
    isFeatured: true,
    isFree: false,
    audience: 'Professionnels & Public (week-end)',
    description:
      'Le sommet mondial incontournable de la Haute Horlogerie. Plus de 55 manufactures prestigieuses (Rolex, Patek Philippe, Cartier, IWC, Jaeger-LeCoultre, Tudor) dévoilent en avant-première leurs créations de l’année.',
    url: 'https://www.watchesandwonders.com',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=500&fit=crop',
    highlights: [
      '55+ Grandes Manufactures',
      'Révélations des nouveautés mondiales',
      'Conférences et démonstrations d’artisans'
    ]
  },
  {
    id: 2,
    title: 'Geneva Watch Days 2026',
    date: 'Fin août - Début septembre 2026',
    dateIsoStart: '20260828',
    dateIsoEnd: '20260901',
    location: 'Rotonde du Mont-Blanc & Hôtels, Genève',
    canton: 'Genève (GE)',
    type: 'Salon Décentralisé',
    isFeatured: true,
    isFree: true,
    audience: 'Accès libre au Pavillon & Passionnés',
    description:
      'Fondé par Bulgari, Breitling, De Bethune, H. Moser & Cie, MB&F, Ulysse Nardin et Urwerk. Un salon estival convivial et décentralisé au bord du lac Léman, accessible directement aux passionnés et collectionneurs.',
    url: 'https://www.gva-watch-days.com',
    image:
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&h=500&fit=crop',
    highlights: [
      'Bord du lac Léman & Pavillon ouvert',
      'Horlogerie indépendante d’avant-garde',
      'Échanges directs avec les horlogers'
    ]
  },
  {
    id: 3,
    title: 'GPHG 2026 – Grand Prix d’Horlogerie de Genève',
    date: 'Novembre 2026',
    dateIsoStart: '20261105',
    dateIsoEnd: '20261105',
    location: 'Théâtre du Léman, Genève',
    canton: 'Genève (GE)',
    type: 'Cérémonie & Prix',
    isFeatured: true,
    isFree: true,
    audience: 'Exposition publique & Cérémonie',
    description:
      'Les « Oscars » de l’horlogerie mondiale. Le jury d’experts couronne les plus remarquables garde-temps de l’année avec la mythique Aiguille d’Or. Exposition publique gratuite des 90 montres présélectionnées avant la cérémonie.',
    url: 'https://www.gphg.org',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=500&fit=crop',
    highlights: [
      'Remise de l’Aiguille d’Or',
      'Exposition publique des montres nommées',
      'Diffusion mondiale en direct'
    ]
  },
  {
    id: 4,
    title: 'EPHJ 2026 – Le Salon Mondial de la Haute Précision Horlogère',
    date: 'Juin 2026',
    dateIsoStart: '20260609',
    dateIsoEnd: '20260612',
    location: 'Palexpo, Genève',
    canton: 'Genève (GE)',
    type: 'Salon Professionnel',
    isFeatured: false,
    isFree: false,
    audience: 'Professionnels, Ingénieurs & Horlogers',
    description:
      'Le plus grand salon professionnel annuel de Suisse : sous-traitance horlogère, machines-outils de pointe, composants micromécaniques, décolletage, outillage et R&D au cœur de la fabrication suisse.',
    url: 'https://ephj.ch',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=500&fit=crop',
    highlights: [
      '800+ exposants internationaux',
      'Innovations outillage & matériaux',
      'Grand Prix des Exposants'
    ]
  },
  {
    id: 5,
    title: 'Time to Watches 2026',
    date: 'Avril 2026 (en parallèle de W&W)',
    dateIsoStart: '20260407',
    dateIsoEnd: '20260410',
    location: 'HEAD Genève, Campus Châtelaine',
    canton: 'Genève (GE)',
    type: 'Salon Indépendant',
    isFeatured: false,
    isFree: false,
    audience: 'Amateurs, Journalistes & Collectionneurs',
    description:
      'Un salon vibrant mettant à l’honneur l’indépendance, l’audace stylistique et les jeunes marques émergentes dans les espaces d’art et de design de la HEAD Genève.',
    url: 'https://www.timetowatches.com',
    image:
      'https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=800&h=500&fit=crop',
    highlights: [
      'Jeunes marques & créateurs audacieux',
      'Cadre contemporain et décontracté',
      'Rencontres directes avec les fondateurs'
    ]
  },
  {
    id: 6,
    title: 'Musée International d’Horlogerie (MIH) – Expositions & Ateliers',
    date: 'Toute l’année 2026',
    location: 'Rue des Musées 29, La Chaux-de-Fonds',
    canton: 'Neuchâtel (NE)',
    type: 'Musée & Patrimoine',
    isFeatured: false,
    isFree: false,
    audience: 'Tout public, Passionnés & Familles',
    description:
      'Le temple absolu du temps, au cœur des Montagnes neuchâteloises inscrites à l’UNESCO. Plus de 4 500 chefs-d’œuvre horlogers retraçant 500 ans d’histoire, avec atelier de restauration visible du public.',
    url: 'https://www.mih.ch',
    image:
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&h=500&fit=crop',
    highlights: [
      'Patrimoine mondial UNESCO',
      'Atelier de restauration ouvert au regard',
      'Pendules astronomiques rarissimes'
    ]
  },
  {
    id: 7,
    title: 'Bourse Internationale d’Horlogerie Ancienne',
    date: 'Premier dimanche d’octobre 2026',
    dateIsoStart: '20261004',
    dateIsoEnd: '20261004',
    location: 'Musée International d’Horlogerie, La Chaux-de-Fonds',
    canton: 'Neuchâtel (NE)',
    type: 'Bourse & Enchères',
    isFeatured: false,
    isFree: false,
    audience: 'Chineurs, Horlogers & Collectionneurs',
    description:
      'La Mecque européenne de l’horlogerie de collection ancienne : montres de poche, pendules comtoises, outillage d’époque Bergeon, pièces détachées introuvables et littérature technique rare.',
    url: 'https://www.mih.ch',
    image:
      'https://images.unsplash.com/photo-1495856458515-06371457571f?w=800&h=500&fit=crop',
    highlights: [
      'Fournitures & outils d’époque',
      'Pièces de collection uniques',
      'Ambiance de passionnés d’établi'
    ]
  },
  {
    id: 8,
    title: 'Atelier Pratique HorloLearn : Montage & Réglage ETA 6497',
    date: 'Chaque 2e samedi du mois',
    location: 'Atelier Partenaire Horloger, Genève / Jura',
    canton: 'Genève / Jura',
    type: 'Atelier Pratique',
    isFeatured: false,
    isFree: true,
    audience: 'Membres & Passionnés HorloLearn',
    description:
      'Session d’immersion complète à l’établi : utilisation des brucelles Dumont, démontage méthodique du calibre unitaire 6497, huilage Moebius et vérification de la marche sur chronocomparateur Witschi.',
    url: '/pratique',
    image:
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&h=500&fit=crop',
    highlights: [
      'Établi horloger et outils professionnels',
      'Calibre ETA 6497 mis à disposition',
      'Encadrement par des diplômés suisses'
    ]
  },
  {
    id: 9,
    title: 'Grandes Ventes aux Enchères Horlogères de Genève (Phillips & Christie’s)',
    date: 'Mai & Novembre 2026',
    location: 'Hôtels La Réserve & Four Seasons, Genève',
    canton: 'Genève (GE)',
    type: 'Bourse & Enchères',
    isFeatured: false,
    isFree: true,
    audience: 'Expositions publiques ouvertes à tous',
    description:
      'Les adjudications les plus spectaculaires de la planète. L’accès aux salons d’exposition préalable est gratuit : l’occasion rêvée de contempler et prendre en main des montres historiques rarissimes.',
    url: 'https://www.phillips.com/watches',
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=500&fit=crop',
    highlights: [
      'Exposition gratuite des pièces d’exception',
      'Modèles historiques Rolex, Patek, Journe',
      'Ambiance d’enchères internationale'
    ]
  },
  {
    id: 10,
    title: 'Espace Horloger de la Vallée de Joux – Visite des Complications',
    date: 'Toute l’année (Mardi au Dimanche)',
    location: 'Grand-Rue 2, Le Sentier',
    canton: 'Vaud (VD)',
    type: 'Musée & Patrimoine',
    isFeatured: false,
    isFree: false,
    audience: 'Tout public, Écoles & Passionnés',
    description:
      'Au cœur du berceau mondial des grandes complications horlogères (Le Sentier, Le Brassus). Découverte immersive des savoir-faire des maîtres combiers, tables tactiles et animations interactives.',
    url: 'https://www.espacehorloger.ch',
    image:
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=500&fit=crop',
    highlights: [
      'Immersion au berceau des complications',
      'Animations interactives et établis 3D',
      'Histoire des paysans-horlogers combiers'
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Tous les événements' },
  { id: 'Salon International', label: 'Salons Mondiaux' },
  { id: 'Salon Décentralisé', label: 'Salons Indépendants' },
  { id: 'Atelier Pratique', label: 'Ateliers & Établis' },
  { id: 'Musée & Patrimoine', label: 'Musées & Patrimoine' },
  { id: 'Bourse & Enchères', label: 'Enchères & Bourses' },
  { id: 'Cérémonie & Prix', label: 'Cérémonies & Prix' },
];

export default function EvenementsPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [freeOnly, setFreeOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Téléchargement du fichier .ics pour l'agenda Apple, Google ou Outlook
  const downloadIcs = (event: EventItem) => {
    const start = event.dateIsoStart ? `${event.dateIsoStart}T090000Z` : '20260406T090000Z';
    const end = event.dateIsoEnd ? `${event.dateIsoEnd}T180000Z` : '20260410T180000Z';
    const titleClean = event.title.replace(/,/g, '');
    const descClean = event.description.replace(/\n/g, ' ');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HorloLearn//Agenda Horloger Suisse//FR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${titleClean} - HorloLearn`,
      `DESCRIPTION:${descClean} - En savoir plus : ${event.url}`,
      `LOCATION:${event.location}, ${event.canton}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `URL:${event.url}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute(
      'download',
      `${event.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_horlolearn.ics`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`Événement « ${event.title} » exporté dans votre calendrier !`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredEvents = useMemo(() => {
    return UPCOMING_EVENTS.filter((event) => {
      const matchType = selectedType === 'all' || event.type === selectedType;
      const matchFree = !freeOnly || event.isFree;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.canton.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.type.toLowerCase().includes(query);

      return matchType && matchFree && matchSearch;
    });
  }, [selectedType, freeOnly, searchQuery]);

  const featuredEvents = useMemo(() => {
    return UPCOMING_EVENTS.filter((e) => e.isFeatured);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-2xl flex items-center gap-3 text-sm border border-amber-400"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Agenda Horloger Suisse Officiel • 2026-2027
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Événements, Salons &{' '}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Rencontres Horlogères
                </span>
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Explorez les salons internationaux majeurs, les bourses de collectionneurs, les expositions muséales et les ateliers pratiques organisés en Suisse et dans le monde.
              </p>
            </div>

            {/* Badges Chiffres Clés */}
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm text-center min-w-[110px]">
                <div className="text-xl font-black text-amber-600 dark:text-amber-400">
                  {UPCOMING_EVENTS.length}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  Rendez-vous
                </div>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm text-center min-w-[110px]">
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  100%
                </div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  Vérifiés
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* --- SECTION DES ÉVÉNEMENTS PHARES (FEATURED) --- */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                Les Grands Rendez-vous Mondiaux
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Les trois événements incontournables qui rythment l’année horlogère en Suisse
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/40 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Image avec Overlay & Tags */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
                        {event.type}
                      </span>
                      {event.isFree && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md">
                          Entrée Libre
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {event.canton}
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {event.date}
                      </span>
                    </div>
                  </div>

                  {/* Contenu de la Carte */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-3 leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Points Clés */}
                    <div className="space-y-1.5 mb-6">
                      {event.highlights.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Boutons d'Action */}
                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 text-xs font-bold hover:bg-amber-500 transition-colors shadow-sm"
                  >
                    <span>Site Officiel</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => downloadIcs(event)}
                    title="Ajouter à Apple / Google Calendar"
                    className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10 transition-colors border border-slate-200 dark:border-slate-700 text-xs font-medium"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- ZONE DE RECHERCHE ET DE FILTRAGE --- */}
        <div className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-10 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Barre de Recherche */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par mot-clé, ville (Genève, La Chaux-de-Fonds, Le Sentier...), musée..."
                className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Checkbox Événements Gratuits */}
            <label className="inline-flex items-center gap-2 cursor-pointer select-none px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-amber-500/50 transition-colors">
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4"
              />
              <span>Entrée libre / Gratuits uniquement</span>
            </label>
          </div>

          {/* Onglets Catégories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedType === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedType(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 dark:bg-amber-500 dark:text-slate-950'
                      : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Décompte */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>
              Affichage de {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''}
              {searchQuery && ` pour « ${searchQuery} »`}
            </span>
            <span>🇨🇭 Suisse Romande & International</span>
          </div>
        </div>

        {/* --- LISTE COMPLÈTE DES ÉVÉNEMENTS --- */}
        <div className="space-y-6 mb-16">
          <AnimatePresence>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.3) }}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center"
                >
                  {/* Photo d'ambiance */}
                  <div className="w-full md:w-56 h-40 rounded-2xl overflow-hidden bg-slate-950 flex-shrink-0 relative group">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm font-semibold">
                        {event.canton}
                      </span>
                    </div>
                  </div>

                  {/* Détails de l'événement */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
                        {event.type}
                      </span>
                      {event.isFree ? (
                        <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                          Entrée Libre
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          Billetterie / Inscription
                        </span>
                      )}
                      <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Public : {event.audience}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                      {event.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Méta : Date & Localisation */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'Action à droite */}
                  <div className="w-full md:w-auto flex md:flex-col items-center gap-2.5 flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                    <a
                      href={event.url}
                      target={event.url.startsWith('http') ? '_blank' : undefined}
                      rel={event.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex-1 md:w-44 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 text-xs font-bold hover:bg-amber-600 dark:hover:bg-amber-400 transition-colors shadow-sm"
                    >
                      <span>Détails & Accès</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => downloadIcs(event)}
                      className="flex-1 md:w-44 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:border-amber-500/40 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ajouter au calendrier</span>
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 px-4 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800">
                <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                  Aucun événement trouvé
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                  Aucun résultat ne correspond à votre filtre actuel. Essayez d'effacer les critères de recherche.
                </p>
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSearchQuery('');
                    setFreeOnly(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all"
                >
                  Réinitialiser l'agenda
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* --- BANNIÈRE VIP : PROPOSER UN ÉVÉNEMENT --- */}
        <section className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-slate-950 text-white shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Mail className="w-3.5 h-3.5" /> Espace Organisateurs & Ateliers
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
              Votre événement horloger n’apparaît pas dans l’agenda ?
            </h2>

            <p className="text-base text-amber-100/90 leading-relaxed mb-8">
              Vous organisez une journée portes ouvertes de manufacture, une exposition de pièces anciennes, une vente aux enchères ou une masterclass d’établi ? Soumettez gratuitement votre date à la communauté HorloLearn.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:contact.horlogeries@gmail.com?subject=Proposition%20d'%C3%A9v%C3%A9nement%20horloger%20-%20HorloLearn&body=Bonjour%20l'%C3%A9quipe%20HorloLearn,%0D%0A%0D%0AJe%20souhaite%20vous%20proposer%20un%20%C3%A9v%C3%A9nement%20%C3%A0%20ajouter%20%C3%A0%20l'agenda%20:%0D%0A-%20Nom%20de%20l'%C3%A9v%C3%A9nement%20:%20%0D%0A-%20Dates%20et%20horaires%20:%20%0D%0A-%20Lieu%20et%20Canton%20:%20%0D%0A-%20Type%20(Salon,%20Atelier,%20Conf%C3%A9rence,%20Ench%C3%A8res...)%20:%20%0D%0A-%20Acc%C3%A8s%20(Gratuit%20ou%20Payant)%20:%20%0D%0A-%20Site%20web%20officiel%20:%20%0D%0A-%20Description%20:%20%0D%0A%0D%0AMerci%20!"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-extrabold text-sm hover:bg-amber-100 transition-all shadow-lg active:scale-95"
              >
                <Mail className="w-4 h-4 text-amber-600" />
                <span>Soumettre un événement (Gratuit)</span>
              </a>

              <Link
                href="/theorie"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-white font-bold text-sm hover:bg-black/50 transition-all"
              >
                <span>Découvrir la théorie horlogère</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
