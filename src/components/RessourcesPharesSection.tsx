// src/components/RessourcesPharesSection.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wand2, Video, FileText, Download, ArrowRight, User, Clock } from 'lucide-react';
import { FeaturedResource } from '@/lib/homepageData';

interface Props {
  resources: FeaturedResource[];
}

export default function RessourcesPharesSection({ resources }: Props) {
  // Helper pour choisir l'icône de luxe selon le type de ressource
  const getResourceIcon = (type: string) => {
    if (type.toLowerCase().includes('ia') || type.toLowerCase().includes('outil')) {
      return <Wand2 className="w-6 h-6 text-amber-500" />;
    }
    if (type.toLowerCase().includes('vidéo') || type.toLowerCase().includes('video')) {
      return <Video className="w-6 h-6 text-amber-500" />;
    }
    return <FileText className="w-6 h-6 text-amber-500" />;
  };

  return (
    <section id="ressources" className="py-20 px-4 relative overflow-hidden">
      {/* Halo lumineux d'ambiance d'atelier */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* En-tête Haute Horlogerie */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-[11px] font-mono font-bold uppercase tracking-widest">
            <span>✦ SÉLECTION D&apos;EXCELLENCE · HORLOLEARN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            Ressources{' '}
            <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Phares
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Découvrez nos modules interactifs, outils et dossiers techniques les plus plébiscités par la communauté horlogère
          </p>
        </div>

        {/* Grille de cartes Haute Horlogerie (Style Élite) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.4 }}
              viewport={{ once: true }}
              className="group flex flex-col justify-between p-7 sm:p-8 rounded-3xl border border-amber-500/20 dark:border-amber-500/20 hover:border-amber-500/60 dark:hover:border-amber-400/50 bg-white dark:bg-gradient-to-br dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 shadow-md dark:shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.18)] transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="space-y-5">
                {/* Ligne haute : Écrin d'icône & Badge technique */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shadow-inner group-hover:border-amber-500/40 transition-colors">
                    {getResourceIcon(resource.type)}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 shadow-sm">
                    {resource.badge || resource.type}
                  </span>
                </div>

                {/* Corps de carte : Titre Serif & Description */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                    {resource.type}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors tracking-tight leading-snug">
                    {resource.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {resource.description}
                  </p>
                </div>

                {/* Métadonnées fines d'atelier */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-2">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-500/80" />
                    {resource.author}
                  </span>
                  {resource.readTime && resource.readTime !== '—' && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500/80" />
                      {resource.readTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Pied de carte : Téléchargements & Lien d'accès interactif */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center text-xs font-mono text-slate-500 dark:text-slate-400">
                  <Download className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                  <span>{resource.downloads}</span>
                </div>
                <Link
                  href={resource.href ?? '#'}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-amber-600 dark:text-amber-400 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors"
                >
                  <span>Accéder à la ressource</span>
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
