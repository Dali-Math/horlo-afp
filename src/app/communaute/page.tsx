// src/app/communaute/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  GraduationCap,
  ExternalLink,
  Mail,
  Calendar,
  Download,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

const OFFICIAL_COMMUNITIES = [
  {
    name: 'Forum À Montres (FAM)',
    badge: 'Communauté Francophone',
    desc: 'Le plus important forum indépendant francophone. Plus de 80 000 passionnés, rubriques techniques d’établi, revues de pièces et histoire des manufactures.',
    link: 'https://forumamontres.forumactif.com/',
    highlights: ['Discussions d’amateurs et professionnels', 'Section technique & démontage', 'Revue de montres vintage et modernes']
  },
  {
    name: 'Horlogerie-Suisse (Le Forum)',
    badge: 'Technique & Établi Suisse',
    desc: 'Le forum technique helvétique de référence, fondé par et pour les horlogers. Idéal pour les questions de calibres, lubrification et restauration.',
    link: 'https://www.horlogerie-suisse.com/',
    highlights: ['Conseils pointus de professionnels', 'Fiches pas-à-pas sur mouvements suisses', 'Partage d’expériences d’atelier']
  },
  {
    name: 'Société Suisse de Chronométrie (SSC)',
    badge: 'Institution Savante',
    desc: 'La société officielle réunissant les ingénieurs, techniciens, formateurs et horlogers de l’industrie suisse. Congrès annuels et publications scientifiques.',
    link: 'https://www.ssc.ch/',
    highlights: ['Journées d’études techniques', 'Bulletins scientifiques', 'Réseau de l’industrie horlogère']
  },
  {
    name: 'WatchUSeek (WUS)',
    badge: 'International',
    desc: 'La plus vaste communauté horlogère mondiale en langue anglaise. Sous-forums dédiés aux mouvements mécaniques, calibres suisses et outillage.',
    link: 'https://www.watchuseek.com/',
    highlights: ['Portée internationale', 'Forums dédiés par grandes marques', 'Base de données collaborative']
  }
];

const SWISS_SCHOOLS = [
  {
    name: 'École d’Horlogerie de Genève (CFPT)',
    location: 'Genève (GE)',
    canton: 'Genève',
    desc: 'Fondée en 1824. Formations officielles menant aux CFC d’Horloger praticien (3 ans) et d’Horloger (4 ans), ainsi qu’aux diplômes de technicien.',
    link: 'https://www.ge.ch/ecole-horlogerie-geneve',
    type: 'Formation Publique d’État'
  },
  {
    name: 'École Technique de la Vallée de Joux (ETVJ)',
    location: 'Le Sentier (VD)',
    canton: 'Vaud',
    desc: 'Située au berceau des plus grandes complications. Formations d’excellence en horlogerie, micromécanique et finitions de Haute Horlogerie.',
    link: 'https://etvj.ch',
    type: 'Centre d’Excellence Complications'
  },
  {
    name: 'CIFOM – Pôle Horloger des Montagnes Neuchâteloises',
    location: 'Le Locle & La Chaux-de-Fonds (NE)',
    canton: 'Neuchâtel',
    desc: 'Au cœur du patrimoine horloger UNESCO. Formation initiale et continue d’horlogers, restaurateurs et créateurs de calibres.',
    link: 'https://cifom.ch',
    type: 'Patrimoine & Haute Horlogerie'
  },
  {
    name: 'Centre de Formation Professionnelle Bienne (CFP Bienne)',
    location: 'Bienne (BE)',
    canton: 'Berne',
    desc: 'École bilingue (français / allemand) au carrefour des grands groupes horlogers suisses (Rolex, Omega, Swatch Group).',
    link: 'https://www.cfp-biel-bienne.ch',
    type: 'Filière Bilingue & Industrielle'
  }
];

const REFERENCE_BOOKS = [
  {
    title: 'Théorie d’Horlogerie',
    authors: 'C.-A. Reymondin, G. Monnier, D. Jeanneret, U. Pelaratti',
    publisher: 'Fédération des Écoles Techniques (FET)',
    desc: 'La bible officielle et indispensable utilisée par toutes les écoles d’horlogerie en Suisse. Couvre la mécanique, l’échappement, le rouage, l’isochronisme et les complications.',
    category: 'Ouvrage officiel suisse'
  },
  {
    title: 'Dictionnaire Professionnel Illustré de l’Horlogerie',
    authors: 'G.-A. Berner',
    publisher: 'Fédération Horlogère Suisse (FHS)',
    desc: 'L’ouvrage linguistique et technique de référence absolue définissant chaque composant, outil et geste horloger avec schémas précis.',
    category: 'Lexique officiel FHS'
  },
  {
    title: 'La Montre : Principes et Mécanismes',
    authors: 'George Daniels',
    publisher: 'Éditions Scriptar',
    desc: 'Le chef-d’œuvre du maître qui a inventé l’échappement Co-Axial. Une plongée magistrale dans la fabrication intégrale à la main d’une montre de précision.',
    category: 'Haute Horlogerie'
  },
  {
    title: 'Fiches & Guides Techniques ETA (6497-1, 2824-2, 7750)',
    authors: 'Manufacture ETA SA',
    publisher: 'Documentation Technique Officielle',
    desc: 'Plans d’assemblage, éclatés de composants, nomenclature des vis et tableaux officiels de lubrification Moebius.',
    category: 'Documentation d’atelier'
  }
];

export default function CommunautePage() {
  const [activeTab, setActiveTab] = useState<'forums' | 'ecoles' | 'bibliotheque' | 'planning'>('forums');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:contact.horlogeries@gmail.com?subject=${encodeURIComponent(
      `[HorloLearn Communauté] ${subject || 'Question d’établi'}`
    )}&body=${encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <span>🇨🇭</span>
                Réseau & Transmission • Horlogerie Suisse
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                La Communauté &{' '}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Le Réseau Horloger
                </span>
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Pas de faux profils, pas d’artifices : HorloLearn est une plateforme indépendante qui réunit les véritables communautés, les écoles suisses officielles, la bibliographie de référence et un canal direct d’entraide avec notre établi.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact-etabli"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>Poser une question à l’établi</span>
              </a>
            </div>
          </div>

          {/* Les 4 Engagements d'authenticité */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200/60 dark:border-slate-800">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm font-bold">100% Authentique</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Aucun faux profil, aucun faux avis.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-bold">Filière Suisse</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Liens directs vers les 4 grandes écoles.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-bold">Théorie Officielle</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manuels et normes suisses de référence.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm font-bold">Entraide Gratuite</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Réponse humaine de passionnés à l’établi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ONGLET DE NAVIGATION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('forums')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'forums'
                ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Forums & Communautés Réelles</span>
          </button>

          <button
            onClick={() => setActiveTab('ecoles')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'ecoles'
                ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Les Écoles Officielles Suisses</span>
          </button>

          <button
            onClick={() => setActiveTab('bibliotheque')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'bibliotheque'
                ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Livres & Références de l’Établi</span>
          </button>

          <button
            onClick={() => setActiveTab('planning')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'planning'
                ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Documents & Planning Élèves</span>
          </button>
        </div>
      </div>

      {/* --- CONTENU --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* --- ONGLET 1 : LES VRAIS FORUMS HORLOGERS --- */}
        {activeTab === 'forums' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Les Forums Horlogers Actifs & Recommandés
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ces espaces rassemblent quotidiennement des milliers de collectionneurs, passionnés et horlogers professionnels francophones et internationaux.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {OFFICIAL_COMMUNITIES.map((com, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
                        {com.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {com.name}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {com.desc}
                    </p>

                    <div className="space-y-1.5 mb-6">
                      {com.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href={com.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <span>Accéder au forum</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ONGLET 2 : LES ÉCOLES SUISSES --- */}
        {activeTab === 'ecoles' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Les Écoles d’Horlogerie Officielles en Suisse
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Vous souhaitez vous former professionnellement ? Voici les centres reconnus par la Confédération suisse pour préparer les diplômes AFP et CFC.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {SWISS_SCHOOLS.map((school, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20 mb-3">
                      {school.type}
                    </span>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {school.name}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {school.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">📍 {school.location}</span>
                    <a
                      href={school.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <span>Site officiel</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ONGLET 3 : LIVRES & BIBLIOGRAPHIE --- */}
        {activeTab === 'bibliotheque' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                La Bibliothèque de Référence de l’Horloger
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Les ouvrages théoriques et techniques authentiques utilisés par les maîtres d’atelier et les élèves en Suisse.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {REFERENCE_BOOKS.map((book, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {book.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {book.title}
                    </h3>

                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-3">
                      {book.authors} • {book.publisher}
                    </p>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {book.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Ressource recommandée</span>
                    <Link
                      href="/theorie"
                      className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      Consulter les résumés de cours <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ONGLET 4 : PLANNING & DOCUMENTS --- */}
        {activeTab === 'planning' && (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-3xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Planning Scolaire & Modules d’Atelier 2025-2026
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Accès direct au document de formation modulaire pour les élèves et candidats libres. Pas de mot de passe requis.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  📄 Planning Modulaire d’Horlogerie (PDF)
                </span>
                <span className="text-xs text-slate-500">1.2 Mo • Document officiel</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calendrier des modules pratiques (assemblage, lubrification, réglage de marche) et révisions théoriques.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/planning-horlogerie.pdf"
                download="Planning-Horlogerie-2025-2026.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 font-bold text-sm shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Planning en PDF</span>
              </a>

              <Link
                href="/pratique"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <span>Voir les 8 modules pratiques</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* --- SECTION CONTACT DIRECT AVEC L'ÉTABLI (VRAIE ENTRAIDE) --- */}
        <section
          id="contact-etabli"
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-600/10 via-white to-amber-600/5 dark:from-slate-900 dark:via-slate-900/90 dark:to-amber-950/20 border border-amber-500/30 shadow-xl"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Mail className="w-3.5 h-3.5" /> Entraide Directe
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                Une question sur un calibre ou un cours ? Écrivez à l’établi.
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Vous bloquez sur un remontage de calibre ETA 6497, un problème de dard ou un calcul d’examen ? Envoyez votre question directement à notre équipe à <span className="font-semibold text-amber-600 dark:text-amber-400">contact.horlogeries@gmail.com</span>.
              </p>
            </div>

            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Votre Nom ou Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Marc"
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Votre Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marc@exemple.ch"
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Sujet de votre question *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Question sur la lubrification de l’échappement sur ETA 6497"
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Votre Message / Détail de l’établi *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre question, le calibre concerné ou l'exercice théorique..."
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer ma question à l’établi</span>
                </button>
              </div>

              {submitted && (
                <p className="text-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-2">
                  Votre messagerie s’ouvre avec votre message pré-rempli pour envoi à contact.horlogeries@gmail.com.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
