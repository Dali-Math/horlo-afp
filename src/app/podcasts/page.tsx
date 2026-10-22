// src/app/podcasts/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones,
  Disc,
  Play,
  Pause,
  Radio,
  Volume2,
  Clock,
  Compass,
  BookOpen,
  Flame,
  Share2,
  ExternalLink,
  CheckCircle2,
  Layers,
  Wrench,
  Award,
  Music,
  ChevronRight,
  ArrowRight,
  SlidersHorizontal,
  Bookmark,
  Check
} from 'lucide-react';

export interface PodcastEpisode {
  id: string;
  calibreCode: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  frequency: string;
  frequencyHz: string;
  level: string;
  description: string;
  embedUrl: string;
  soundCloudUrl: string;
  timecodes: { time: string; label: string }[];
  tags: string[];
  featured?: boolean;
}

export interface ChronicleItem {
  id: string;
  title: string;
  manufacture: string;
  epoch: string;
  summary: string;
  highlights: string[];
  readTime: string;
  theme: string;
}

// Les 3 Grands Podcasts Officiels HorloLearn
const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'coulisses',
    calibreCode: 'CALIBRE N°01',
    title: 'Dans les Coulisses du Temps',
    subtitle: 'L’Âme de l’Atelier, Discipline & Rituels du Maître Horloger',
    category: 'Immersion Atelier & Rhabillage',
    duration: '24 min',
    frequency: '21’600 A/h',
    frequencyHz: '3.0 Hz',
    level: 'Tous Niveaux',
    featured: true,
    description:
      'Franchissez les portes feutrées de l’atelier de Haute Horlogerie. Entre le silence recueilli, la loupe d’œil 4x vissée à l’arcade et la brucelle Dumont n°3 en main, cet épisode vous plonge dans l’intimité sacrée de l’artisan. Découvrez pourquoi la moindre particule de poussière est l’ennemi mortel du calibre, le rituel minutieux du désassemblage sous cloche, les secrets des bains de benzine et l’émotion unique de redonner vie à un garde-temps centenaire.',
    embedUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2185373015%3Fsecret_token%3Ds-Xw2rx3p2LOw&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false',
    soundCloudUrl: 'https://soundcloud.com/user-555747421/dans-les-coulisses-du-temps',
    timecodes: [
      { time: '02:15', label: 'L’atmosphère silencieuse et la discipline de l’établi suisse' },
      { time: '07:40', label: 'Le toucher des brucelles et la sensibilité du geste' },
      { time: '13:50', label: 'Le diagnostic des pannes et l’art du désassemblage' },
      { time: '19:30', label: 'Le rhabillage d’art : restaurer sans jamais dénaturer' },
    ],
    tags: ['Établi Horloger', 'Rhabillage', 'Brucelles', 'Précision Suisse', 'Nettoyage']
  },
  {
    id: 'rouages',
    calibreCode: 'CALIBRE N°02',
    title: 'Dans les Rouages du Temps',
    subtitle: 'Anatomie Mécanique, Échappement Suisse & Cœur Pulsant',
    category: 'Mécanique & Cinématique Horlogère',
    duration: '32 min',
    frequency: '28’800 A/h',
    frequencyHz: '4.0 Hz',
    level: 'Technique & Passionnés',
    description:
      'Devenez microscopique et voyagez le long de la chaîne cinématique. Cet épisode décortique avec une clarté limpide la vie mécanique interne d’un calibre suisse : du ressort de barillet comprimé qui emmagasine l’énergie motrice, au train de rouage démultiplicateur (grande moyenne, seconde), jusqu’à la magie de l’échappement à ancre suisse qui découpe le temps en battements parfaits grâce aux oscillations du balancier-spiral.',
    embedUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2185374163%3Fsecret_token%3Ds-yk6jMmCWxyx&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false',
    soundCloudUrl: 'https://soundcloud.com/user-555747421/dans-les-rouages-du-temps',
    timecodes: [
      { time: '03:10', label: 'Le barillet moteur et la réserve de marche' },
      { time: '11:20', label: 'Le train d’engrenages : mobiles, tigerons et pignons' },
      { time: '18:45', label: 'L’échappement à ancre suisse : levées de rubis et dard' },
      { time: '26:15', label: 'L’organe régulateur : balancier, spiral et isochronisme' },
    ],
    tags: ['Barillet', 'Échappement à Ancre', 'Balancier-Spiral', 'Train de Rouage', 'Isochronisme']
  },
  {
    id: 'vocabulaire',
    calibreCode: 'CALIBRE N°03',
    title: 'Le Vocabulaire Horloger d’Élite',
    subtitle: 'Le Langage Secret des Manufactures & Termes Officiels Suisses',
    category: 'Dictionnaire & Théorie Officielle',
    duration: '29 min',
    frequency: 'Convention Patronale',
    frequencyHz: 'Norme NIHS',
    level: 'Apprentissage AFP / CFC',
    description:
      'Parlez le véritable langage de la Haute Horlogerie suisse ! Un épisode de référence indispensable pour les apprentis AFP/CFC, les candidats aux manufactures et les collectionneurs exigeants. Finies les approximations : découvrez la définition exacte, l’étymologie et la fonction pratique de termes cruciaux comme l’ébat de dard, la chaussée, le tigeron, le coq, l’anglage main, le perlage et les Côtes de Genève.',
    embedUrl:
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-555747421/vocabulaire_horloger&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false',
    soundCloudUrl: 'https://soundcloud.com/user-555747421/vocabulaire_horloger',
    timecodes: [
      { time: '01:50', label: 'L’ébat de dard et les jeux fonctionnels indispensables' },
      { time: '08:15', label: 'Les organes de mise à l’heure : tirette, bascule, pignon coulant' },
      { time: '16:00', label: 'Les décorations et finitions manuelles de prestige' },
      { time: '23:30', label: 'Le lexique du chronocomparateur Witschi : repère, amplitude, marche' },
    ],
    tags: ['Vocabulaire Suisse', 'Ébat & Jeux', 'CFC Horlogerie', 'Finitions Main', 'Normes NIHS']
  }
];

// Récits et Chroniques du Patrimoine Horloger
const CHRONICLES: ChronicleItem[] = [
  {
    id: 'daytona',
    title: 'La Saga de la Rolex Daytona',
    manufacture: 'Rolex Genève',
    epoch: '1963 - Aujourd’hui',
    theme: 'Chronométrie de Course',
    readTime: '6 min d’écoute',
    summary:
      'Des plages de sable de Daytona Beach jusqu’aux 24 Heures du Mans, l’histoire incroyable d’un chronographe boudé à ses débuts, devenu le garde-temps le plus légendaire et convoité au monde.',
    highlights: ['Calibre Valjoux 72 à l’époque', 'Le cadran Paul Newman exotique', 'Lunette tachymétrique Cerachrom']
  },
  {
    id: 'beta21',
    title: 'La Bataille du Bêta-21',
    manufacture: 'Centre Électronique Horloger (Neuchâtel)',
    epoch: 'Années 1960 - 1970',
    theme: 'Épopée Scientifique',
    readTime: '8 min d’écoute',
    summary:
      'Quand 21 manufactures suisses prestigieuses se sont unies à Neuchâtel pour concevoir le premier mouvement à quartz au monde, devançant les prototypes japonais dans une course technologique haletante.',
    highlights: ['Consortium de 21 manufactures', 'Oscillateur à quartz à 8’192 Hz', 'Prouesse d’ingénierie suisse']
  },
  {
    id: 'trinite',
    title: 'La Sainte Trinité Horlogère',
    manufacture: 'Patek Philippe, Audemars Piguet, Vacheron Constantin',
    epoch: 'XVIIIe siècle à nos jours',
    theme: 'Haute Horlogerie Sommitale',
    readTime: '7 min d’écoute',
    summary:
      'Pourquoi ces trois maisons règnent-elles sans partage au sommet de la pyramide horlogère ? Plongée dans leurs archives, leurs complications astronomiques et leurs finitions d’exception.',
    highlights: ['Poinçon de Genève & Qualité Fleurier', 'Complications astronomiques', 'Savoir-faire ininterrompu']
  },
  {
    id: 'tourbillon',
    title: 'L’Énigme du Tourbillon Volant',
    manufacture: 'Invention Abraham-Louis Breguet & Alfred Helwig',
    epoch: '1801 - 1920',
    theme: 'Gravité Vaincue',
    readTime: '5 min d’écoute',
    summary:
      'Comment enfermer l’échappement et le balancier dans une cage rotative effectuant un tour par minute pour annuler les effets de la pesanteur terrestre sur la précision du calibre.',
    highlights: ['Cage rotative sur 360°', 'Suppression du pont supérieur (Volant)', 'Chef-d’œuvre de micromécanique']
  },
  {
    id: 'vallee-de-joux',
    title: 'La Vallée de Joux, Sanctuaire des Complications',
    manufacture: 'Le Brassus, Le Sentier, L’Orient',
    epoch: 'Hivers Jurassiens du XIXe',
    theme: 'Géographie du Génie',
    readTime: '9 min d’écoute',
    summary:
      'Pendant les rigoureux hivers suisses, les paysans du Jura devenaient maîtres cabinotiers à la lueur des lampes à huile, façonnant les répétitions minutes et quantièmes perpétuels les plus complexes de la planète.',
    highlights: ['Cabinotiers et paysans-horlogers', 'Répétitions minutes à timbres cathédrale', 'Climat et lumière du Jura']
  },
  {
    id: 'finitions',
    title: 'L’Art des Finitions et Décorations de Haute Volée',
    manufacture: 'Haute Horlogerie Helvétique',
    epoch: 'Tradition Ancestrale',
    theme: 'Métiers d’Art',
    readTime: '6 min d’écoute',
    summary:
      'Anglage rentrant à la moelle de sureau, Côtes de Genève circulaires, perlage sous les ponts et soleillage du rochet : découvrez pourquoi la beauté d’un calibre suisse se cache là où personne ne la voit.',
    highlights: ['Anglage rentrant à la main (bois de sureau)', 'Côtes de Genève tracées au buis', 'Vis bleuies à la flamme']
  }
];

// Les Fréquences Horlogères (Métronome Acoustique Interactif)
const FREQUENCIES = [
  {
    label: '18’000 A/h',
    hz: '2.5 Hz',
    altSec: '5 battements / sec',
    useCase: 'Montres de poche historiques, calibres d’époque'
  },
  {
    label: '21’600 A/h',
    hz: '3.0 Hz',
    altSec: '6 battements / sec',
    useCase: 'Unitas 6497-1, calibres traditionnels à remontage manuel'
  },
  {
    label: '28’800 A/h',
    hz: '4.0 Hz',
    altSec: '8 battements / sec',
    useCase: 'Standard moderne de Haute Horlogerie (Rolex 3135, ETA 2824)'
  },
  {
    label: '36’000 A/h',
    hz: '5.0 Hz',
    altSec: '10 battements / sec',
    useCase: 'Haute fréquence d’exception (Zenith El Primero, Grand Seiko)'
  }
];

export default function PodcastsPage() {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode>(PODCAST_EPISODES[0]);
  const [isPlayingVisual, setIsPlayingVisual] = useState(false);
  const [activeFrequency, setActiveFrequency] = useState(FREQUENCIES[2]);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Toast de confirmation de partage */}
      <AnimatePresence>
        {copiedLink && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-2xl flex items-center gap-3 text-sm border border-amber-400"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Lien de l’auditorium copié dans le presse-papiers !</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO HEADER : L'AUDITORIUM HAUTE HORLOGERIE --- */}
      <section className="relative pt-14 pb-12 overflow-hidden border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        {/* Cercles de guillochage décoratifs d'arrière-plan */}
        <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 overflow-hidden flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full border border-amber-500/30" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-amber-500/20" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-amber-500/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              {/* Badge d'excellence */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-5">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                <span>🇨🇭 Auditorium Audio HorloLearn Genève</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                L’Art du Temps &{' '}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Récits d’Établi
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Plongez dans le silence solennel des ateliers genevois et la pulsation mécanique des calibres suisses. Écoutez nos épisodes immersifs consacrés aux secrets d’artisans, aux mystères de l’échappement à ancre et au vocabulaire officiel de la Haute Horlogerie.
              </p>

              {/* Méta badges audio */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#0f1422] border border-slate-200 dark:border-slate-700">
                  <Headphones className="w-3.5 h-3.5 text-amber-500" />
                  3 Grands Calibres Audio
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#0f1422] border border-slate-200 dark:border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  +85 Minutes d’immersion
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#0f1422] border border-slate-200 dark:border-slate-700">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  Conforme Normes Horlogères Suisses
                </span>
              </div>
            </div>

            {/* Citation gravée façon cadran de manufacture */}
            <div className="p-5 rounded-3xl bg-white/80 dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-lg dark:shadow-2xl dark:shadow-black/70 max-w-sm ring-1 ring-slate-900/5 dark:ring-white/10 flex-shrink-0">
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Devise de l’Artisan</span>
              </div>
              <p className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">
                « Le temps ne s’observe pas seulement : il résonne à chaque alternance du balancier, chaque frottement de rubis et chaque vibration du spiral. »
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Tradition Horlogère</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">Genève, Suisse 🇨🇭</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PLATINE MAJESTUEUSE : LE GRAND LECTEUR STUDIO --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-xl dark:shadow-2xl dark:shadow-black/80 ring-1 ring-slate-900/5 dark:ring-white/10 relative overflow-hidden">
          {/* Lueur d'ambiance dorée */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Colonne Gauche : Disque Rotatif / Barillet d'Art & Spectrogramme */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative group mb-6">
                {/* Cadre or circulaire façon boîte de montre */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 shadow-2xl relative flex items-center justify-center">
                  {/* Cadran guilloché interne */}
                  <div
                    className={`w-full h-full rounded-full bg-[#0a0d14] border-4 border-slate-800 flex items-center justify-center relative overflow-hidden transition-all duration-700 ${
                      isPlayingVisual ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '18s' }}
                  >
                    {/* Gravures concentriques */}
                    <div className="absolute inset-2 rounded-full border border-amber-500/20" />
                    <div className="absolute inset-6 rounded-full border border-amber-500/15" />
                    <div className="absolute inset-10 rounded-full border border-amber-500/10" />

                    {/* Centre façon rubis et pont de balancier */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 p-1 shadow-inner flex items-center justify-center z-10">
                      <div className="w-8 h-8 rounded-full bg-rose-700 border-2 border-amber-300 shadow-md flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                      </div>
                    </div>

                    {/* Faux bras de balancier dorés */}
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                    <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />
                  </div>
                </div>

                {/* Badge Calibre flottant */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-900 border-2 border-amber-500 text-amber-400 text-xs font-mono font-bold uppercase shadow-lg whitespace-nowrap">
                  {selectedEpisode.calibreCode}
                </div>
              </div>

              {/* Ondes sonores dorées simulées (Visualiseur acoustique) */}
              <div className="flex items-end justify-center gap-1.5 h-10 w-full max-w-xs px-4">
                {[40, 75, 55, 90, 60, 100, 70, 85, 45, 95, 65, 80, 50, 90, 70, 60, 85, 45, 95, 75, 55, 80].map(
                  (val, idx) => (
                    <span
                      key={idx}
                      className="w-1 rounded-full bg-gradient-to-t from-amber-600 to-yellow-400 transition-all duration-300"
                      style={{
                        height: isPlayingVisual ? `${val}%` : `${Math.max(15, val * 0.3)}%`,
                        animation: isPlayingVisual
                          ? `pulse ${0.8 + (idx % 5) * 0.2}s ease-in-out infinite alternate`
                          : 'none'
                      }}
                    />
                  )
                )}
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Pulsation acoustique : {selectedEpisode.frequency} ({selectedEpisode.frequencyHz})</span>
              </div>
            </div>

            {/* Colonne Droite : Lecteur Audio & Informations de l'Épisode */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300">
                    {selectedEpisode.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Clock className="w-3 h-3 text-amber-500" />
                    {selectedEpisode.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Layers className="w-3 h-3 text-amber-500" />
                    {selectedEpisode.level}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {selectedEpisode.title}
                </h2>

                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-1">
                  {selectedEpisode.subtitle}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedEpisode.description}
                </p>
              </div>

              {/* LECTEUR EMBARQUÉ SOUNDCLOUD HABILLÉ HAUTE HORLOGERIE */}
              <div className="rounded-2xl p-2.5 bg-slate-900 border-2 border-amber-500/40 shadow-2xl relative">
                <div className="flex items-center justify-between px-3 py-1.5 text-xs text-amber-400 font-mono border-b border-slate-800 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    Flux Audio Officiel HorloLearn
                  </span>
                  <span>SoundCloud Master Stereo</span>
                </div>

                <iframe
                  key={selectedEpisode.id}
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  className="rounded-xl shadow-inner"
                  src={selectedEpisode.embedUrl}
                  onPlay={() => setIsPlayingVisual(true)}
                  onPause={() => setIsPlayingVisual(false)}
                />
              </div>

              {/* Actions & Partage */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-700/80">
                {/* Sélecteur rapide des 3 calibres */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                    Calibre :
                  </span>
                  {PODCAST_EPISODES.map((ep, idx) => (
                    <button
                      key={ep.id}
                      onClick={() => {
                        setSelectedEpisode(ep);
                        setIsPlayingVisual(true);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedEpisode.id === ep.id
                          ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500'
                      }`}
                    >
                      N°0{idx + 1}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-600 hover:text-amber-500 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Partager</span>
                  </button>

                  <a
                    href={selectedEpisode.soundCloudUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-700 dark:text-amber-300 hover:text-slate-950 text-xs font-bold border border-amber-500/40 transition-all"
                  >
                    <span>Ouvrir sur SoundCloud</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- LES 3 GRANDES PIÈCES D'ART : CARTES D'ÉPISODES MONUMENTALES --- */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>🎙️</span>
                Collection Officielle
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Les Calibres Sonores HorloLearn
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Chaque épisode a été enregistré pour transmettre le geste, l’esprit de rigueur et le vocabulaire d’excellence des maîtres horlogers suisses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PODCAST_EPISODES.map((ep, index) => {
              const isSelected = selectedEpisode.id === ep.id;

              return (
                <div
                  key={ep.id}
                  className={`p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0f1422] border-2 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-2xl ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/30 dark:shadow-amber-500/10'
                      : 'border-slate-200 dark:border-slate-600 hover:border-amber-500/50 ring-1 ring-slate-900/5 dark:ring-white/10'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Entête Carte */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-amber-600 dark:text-amber-400 tracking-wider">
                        {ep.calibreCode}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <Clock className="w-3 h-3 text-amber-500" />
                        {ep.duration}
                      </span>
                    </div>

                    {/* Titre */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1">
                        {ep.title}
                      </h3>
                      <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                        {ep.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                      {ep.description}
                    </p>

                    {/* Sommaire & Timecodes cliquables */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Moments clés de l’épisode :
                      </div>
                      <div className="space-y-1">
                        {ep.timecodes.slice(0, 3).map((tc, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300"
                          >
                            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold flex-shrink-0">
                              {tc.time}
                            </span>
                            <span className="truncate">{tc.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {ep.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bouton pour charger dans la platine principale */}
                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-700/60">
                    <button
                      onClick={() => {
                        setSelectedEpisode(ep);
                        setIsPlayingVisual(true);
                        window.scrollTo({ top: 320, behavior: 'smooth' });
                      }}
                      className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400'
                          : 'bg-slate-100 hover:bg-amber-500 hover:text-slate-950 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{isSelected ? 'Épisode Actuellement Chargé' : 'Écouter ce Calibre'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- LE MÉTRONOME DU TEMPS : FRÉQUENCES ACOUSTIQUES --- */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md ring-1 ring-slate-900/5 dark:ring-white/10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Music className="w-3.5 h-3.5" />
                <span>Acoustique du Balancier</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Les Fréquences de Battement Horloger
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                L’acoustique d’une montre suisse dépend de la vitesse d’oscillation de son balancier-spiral.
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-amber-500 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 self-start md:self-auto">
              Cadence Active : {activeFrequency.label} ({activeFrequency.hz})
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FREQUENCIES.map((freq) => {
              const isActive = activeFrequency.label === freq.label;

              return (
                <button
                  key={freq.label}
                  onClick={() => setActiveFrequency(freq)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    isActive
                      ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#141a2b] hover:border-amber-500/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                      {freq.label}
                    </span>
                    <span className="text-xs font-bold text-amber-500">{freq.hz}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    {freq.altSec}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {freq.useCase}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* --- CHRONIQUES & HISTOIRES EXTRAORDINAIRES --- */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Discothèque du Patrimoine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Les Grands Récits Horlogers
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Des dossiers thématiques approfondis sur les créations de légende, les inventions révolutionnaires et les manufactures mythiques.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHRONICLES.map((chronicle) => (
              <div
                key={chronicle.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md hover:shadow-xl hover:border-amber-500/50 transition-all ring-1 ring-slate-900/5 dark:ring-white/10 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                      {chronicle.theme}
                    </span>
                    <span className="text-slate-400 text-[11px] font-mono">{chronicle.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {chronicle.title}
                  </h3>

                  <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    {chronicle.manufacture} • {chronicle.epoch}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {chronicle.summary}
                  </p>

                  <ul className="pt-2 space-y-1">
                    {chronicle.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                  <span>Dossier d’archive HorloLearn</span>
                  <span className="inline-flex items-center gap-1">
                    🇨🇭 Suisse
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- BANNIÈRE D'APPEL À L'ACTION : REJOINDRE LA COMMUNAUTÉ --- */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 text-slate-950 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="px-3 py-1 rounded-full bg-slate-950/15 border border-slate-950/20 text-slate-950 text-xs font-bold uppercase tracking-wider">
              Une question d’établi après l’écoute ?
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Échangez avec les Maîtres et Apprentis Horlogers
            </h3>
            <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed">
              Vous avez une interrogation sur un terme technique ou une opération de rhabillage ? Rejoignez notre communauté libre d’entraide horlogère suisse.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/communaute"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm shadow-xl transition-all active:scale-95"
              >
                <span>Accéder à la Communauté HorloLearn</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/theorie"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-slate-950 font-bold text-sm border border-slate-950/20 transition-all"
              >
                <span>Explorer la Théorie Horlogère</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
