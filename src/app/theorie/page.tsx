// src/app/theorie/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import HeroSection from './components/HeroSection';
import {
  Layers,
  Award,
  Wrench,
  BookOpen,
  Compass,
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function Theorie() {
  const masterworks = [
    {
      title: 'Écorché Éclaté des Calibres Suisses',
      badge: 'Laboratoire 3D & Cinématique',
      description: 'Désossez les calibres ETA 6497-1 et 2824-2 en vue éclatée interactive. Fiches techniques complètes, tolérances d’ébats et protocoles Moebius.',
      href: '/theorie/galerie-3d',
      icon: <Layers className="w-6 h-6 text-amber-500" />,
      color: 'border-amber-500/30 hover:border-amber-500'
    },
    {
      title: 'Musée des Grandes Complications',
      badge: 'Haute Horlogerie & Acoustique',
      description: 'Explorez le Tourbillon de Breguet, écoutez la Répétition Minutes via son synthétiseur acoustique réel, et testez la came de 48 mois du Quantième Perpétuel.',
      href: '/theorie/complications',
      icon: <Award className="w-6 h-6 text-amber-500" />,
      color: 'border-amber-500/30 hover:border-amber-500'
    },
    {
      title: 'Atelier de Restauration & Rhabillage',
      badge: 'Guide Méthodologique d’Établi',
      description: 'Le protocole pas-à-pas des maîtres horlogers : diagnostic sous cloche, bouchonnage de platine, roulage des pivots au tour Jacot et redressement de spiral.',
      href: '/theorie/restauration',
      icon: <Wrench className="w-6 h-6 text-amber-500" />,
      color: 'border-amber-500/30 hover:border-amber-500'
    },
    {
      title: 'Lecture de Plan & Normes NIHS',
      badge: 'Métrologie & Dessin Technique',
      description: 'Maîtrisez les projections ISO 128-3, cartouches NIHS, types de lignes, cotations fonctionnelles et tolérances micrométriques de fabrication.',
      href: '/theorie/lecture-de-plan',
      icon: <Compass className="w-6 h-6 text-amber-500" />,
      color: 'border-amber-500/30 hover:border-amber-500'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <HeroSection />

      {/* --- GRILLE DES GRANDS ESPACES THÉORIQUES --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            🇨🇭 Les Fondations du Savoir Horloger
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Espaces d’Étude & Laboratoires Interactifs
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Une immersion complète dans la théorie mécanique, le dessin technique, l’histoire et les complications suisses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {masterworks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 ${item.color} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>Entrer dans le laboratoire</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* --- DOCUMENTS & RÉFÉRENCES OFFICIELLES --- */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <span>Documentation Académique de Référence</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                Pour approfondir les manuels officiels de la Convention Patronale et les standards de la Fédération Horlogère Suisse (FH).
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.hautehorlogerie.org/fr/encyclopedie/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:border-amber-500 border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1.5"
              >
                <span>Encyclopédie FHH</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.fhs.swiss/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:border-amber-500 border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1.5"
              >
                <span>Normes FH / NIHS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
