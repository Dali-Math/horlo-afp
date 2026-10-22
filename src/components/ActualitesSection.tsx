// src/components/ActualitesSection.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Clock, Radio, Newspaper } from 'lucide-react';
import { Actualite } from '@/lib/homepageData';

interface Props {
  actualites?: Actualite[];
}

interface LiveItem {
  id: string;
  title: string;
  link: string;
  source: string;
  time: string;
  category: string;
  summary?: string;
}

export default function ActualitesSection({ actualites }: Props) {
  const [items, setItems] = useState<LiveItem[]>(() => {
    if (actualites && actualites.length > 0) {
      return actualites.slice(0, 3).map((a, idx) => ({
        id: `prop-${idx}`,
        title: a.title,
        link: a.link || '/actualites',
        source: 'Chronique Horlogère Suisse',
        time: a.time || 'Publication récente',
        category: a.category || 'Haute Horlogerie',
        summary: 'Analyse approfondie des mouvements, innovations techniques et dynamiques des manufactures helvétiques.'
      }));
    }
    return [
      {
        id: 'default-1',
        title: 'Exportations horlogères suisses : dynamique, marchés clés et calibres mécaniques d\'exception',
        link: '/actualites',
        source: 'Fédération de l\'Industrie Horlogère (FH)',
        time: 'Chronique Officielle',
        category: 'Économie & Industrie',
        summary: 'Bilan analytique sur la résilience du secteur suisse, la demande accrue en pièces à complications et le rayonnement mondial.'
      },
      {
        id: 'default-2',
        title: 'L\'essor des finitions manuelles de prestige : Anglage, Côtes de Genève et Poinçon de Genève',
        link: '/actualites',
        source: 'Fondation Haute Horlogerie (FHH)',
        time: 'Métiers d\'Établi',
        category: 'Haute Horlogerie',
        summary: 'Étude technique sur les critères stricts d\'anglage au berceau, du poli bloqué et des exigences normatives des grandes maisons.'
      },
      {
        id: 'default-3',
        title: 'Watches & Wonders Geneva 2026 : Calendrier, innovations de calibres et conférences de maîtres',
        link: '/actualites',
        source: 'Salon International Genève',
        time: 'Agenda d\'Excellence',
        category: 'Salons & Événements',
        summary: 'Les grandes manufactures dévoilent leurs derniers régulateurs tourbillons, répétitions minutes et développements chronométriques.'
      },
    ];
  });

  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveNews() {
      try {
        const res = await fetch('/api/actualites');
        if (res.ok) {
          const data = await res.json();
          if (data.items && Array.isArray(data.items) && data.items.length > 0 && isMounted) {
            setItems(data.items.slice(0, 3));
            setIsLive(true);
          }
        }
      } catch {
        // En cas d'indisponibilité, conserve les chroniques de référence
      }
    }
    loadLiveNews();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="actualites" className="py-20 px-4 relative overflow-hidden">
      {/* Halo lumineux d'atelier */}
      <div className="absolute top-1/2 right-1/3 w-[600px] h-[300px] bg-amber-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* En-tête Haute Horlogerie */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-[11px] font-mono font-bold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Radio className="w-3.5 h-3.5 text-amber-500" />
              <span>{isLive ? 'DÉPÊCHES EN DIRECT DU SECTEUR' : 'CHRONIQUES & VEILLE DES MANUFACTURES'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Chroniques &{' '}
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Actualités
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-light leading-relaxed">
              Veille normative, analyses des grandes manufactures suisses et actualités de l&apos;art horloger genevois
            </p>
          </div>

          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 transition-colors group self-start md:self-end"
          >
            <span>Consulter toutes les chroniques</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Grille de 3 cartes Haute Horlogerie */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {items.map((news, index) => {
            const isExternal = news.link && news.link.startsWith('http');
            return (
              <motion.div
                key={news.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.4 }}
                viewport={{ once: true }}
                className="group flex flex-col justify-between p-7 sm:p-8 rounded-3xl border border-amber-500/20 dark:border-amber-500/20 hover:border-amber-500/60 dark:hover:border-amber-400/50 bg-white dark:bg-gradient-to-br dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 shadow-md dark:shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.18)] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="space-y-5">
                  {/* Ligne haute : Écrin d'icône & Badge catégorie */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shadow-inner group-hover:border-amber-500/40 transition-colors">
                      <Newspaper className="w-6 h-6 text-amber-500" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 shadow-sm">
                      {news.category}
                    </span>
                  </div>

                  {/* Titre & Description */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-amber-500/80" />
                      <span>{news.time}</span>
                    </div>

                    <a
                      href={news.link}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="block group/title"
                    >
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white group-hover/title:text-amber-600 dark:group-hover/title:text-amber-300 transition-colors tracking-tight leading-snug line-clamp-3">
                        {news.title}
                      </h3>
                    </a>

                    {news.summary && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light line-clamp-3">
                        {news.summary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pied de carte : Source de presse & Lien d'accès */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate max-w-[170px]">
                    {news.source}
                  </span>

                  <a
                    href={news.link}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-amber-600 dark:text-amber-400 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors"
                  >
                    <span>Consulter</span>
                    {isExternal ? (
                      <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                    )}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
