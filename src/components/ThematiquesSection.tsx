// src/components/ThematiquesSection.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Wrench, Award, ArrowRight, ChevronRight } from 'lucide-react';
import { Thematique } from '@/lib/homepageData';

interface Props {
  thematiques: Thematique[];
}

export default function ThematiquesSection({ thematiques }: Props) {
  // Helper d'icônes Haute Horlogerie selon le titre de la thématique
  const getThemeIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('théorie') || t.includes('theorie')) {
      return <BookOpen className="w-6 h-6 text-amber-500" />;
    }
    if (t.includes('pratique')) {
      return <Wrench className="w-6 h-6 text-sky-500 dark:text-sky-400" />;
    }
    return <Award className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />;
  };

  // Helper de badge couleur selon la thématique
  const getBadgeStyle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('pratique')) {
      return 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300';
    }
    if (t.includes('évaluation') || t.includes('evaluation') || t.includes('quiz')) {
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
    }
    return 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300';
  };

  return (
    <section id="communaute" className="py-20 px-4 relative overflow-hidden bg-slate-50/50 dark:bg-[#07090E]/60 transition-colors duration-300 border-t border-slate-200/60 dark:border-slate-800/60">
      {/* Halo lumineux d'établi */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[300px] bg-blue-500/5 dark:bg-amber-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* En-tête Haute Horlogerie */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-[11px] font-mono font-bold uppercase tracking-widest">
            <span>✦ CURSUS D&apos;EXCELLENCE HORLOGÈRE SUISSE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            Explorez par{' '}
            <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Thématique
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Une bibliothèque vivante et structurée pour maîtriser la théorie, la pratique d&apos;établi et la certification
          </p>
        </div>

        {/* Grille de cartes Haute Horlogerie */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {thematiques.map((theme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.4 }}
              viewport={{ once: true }}
              className="group flex flex-col justify-between p-7 sm:p-8 rounded-3xl border border-amber-500/20 dark:border-amber-500/20 hover:border-amber-500/60 dark:hover:border-amber-400/50 bg-white dark:bg-gradient-to-br dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 shadow-md dark:shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.18)] transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="space-y-5">
                {/* Ligne haute : Écrin d'icône & Badge compteur */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shadow-inner group-hover:border-amber-500/40 transition-colors">
                    {getThemeIcon(theme.title)}
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm ${getBadgeStyle(theme.title)}`}>
                    {theme.resources} MODULES
                  </span>
                </div>

                {/* Titre & Description */}
                <div className="space-y-2.5">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors tracking-tight leading-snug">
                    {theme.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {theme.description}
                  </p>
                </div>

                {/* Liste des modules clés */}
                <ul className="space-y-2.5 pt-2">
                  {theme.items.map((item, i) => (
                    <li key={i} className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <ChevronRight className="w-3.5 h-3.5 mr-2 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pied de carte : Lien d'accès interactif */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href={theme.link}
                  className="w-full flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-amber-600 dark:text-amber-400 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors"
                >
                  <span>Explorer la thématique</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
