// src/components/ActualitesSection.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Clock, Radio } from 'lucide-react';
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
}

export default function ActualitesSection({ actualites }: Props) {
  const [items, setItems] = useState<LiveItem[]>(() => {
    if (actualites && actualites.length > 0) {
      return actualites.slice(0, 3).map((a, idx) => ({
        id: `prop-${idx}`,
        title: a.title,
        link: a.link || '/actualites',
        source: 'Presse Horlogère',
        time: a.time || 'Récemment',
        category: a.category || 'Haute Horlogerie',
      }));
    }
    return [
      {
        id: 'default-1',
        title: 'Exportations horlogères suisses : dynamique et résilience du secteur',
        link: '/actualites',
        source: 'Luxury Tribune',
        time: 'Aujourd’hui',
        category: 'Économie & Marchés',
      },
      {
        id: 'default-2',
        title: 'L’horlogerie suisse stimulée par l’engouement pour les calibres d’exception',
        link: '/actualites',
        source: 'FashionNetwork',
        time: 'Hier',
        category: 'Haute Horlogerie',
      },
      {
        id: 'default-3',
        title: 'Watches & Wonders Geneva : Calendrier et nouveautés en préparation',
        link: '/actualites',
        source: 'FHH Suisse',
        time: 'Il y a 2 jours',
        category: 'Événements',
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
        // En cas d'indisponibilité, garde les articles par défaut
      }
    }
    loadLiveNews();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="actualites" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Radio className="w-3.5 h-3.5" />
              {isLive ? 'Flux d’actualités en direct' : 'Veille horlogère suisse'}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Actualités
              </span>{' '}
              Horlogères
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base mt-1">
              Restez informé des dernières créations, innovations et analyses de l’industrie helvétique
            </p>
          </div>

          <Link
            href="/actualites"
            className="inline-flex items-center text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-500 dark:hover:text-amber-300 transition-colors text-sm group"
          >
            Toutes les dépêches en direct{' '}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((news, index) => {
            const isExternal = news.link && news.link.startsWith('http');
            return (
              <motion.div
                key={news.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/40 shadow-sm hover:shadow-xl dark:hover:shadow-amber-500/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full text-xs font-bold text-amber-800 dark:text-amber-300">
                      {news.category}
                    </span>
                    {news.time && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" /> {news.time}
                      </span>
                    )}
                  </div>

                  <a
                    href={news.link}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="block cursor-pointer"
                  >
                    <h3 className="text-base sm:text-lg font-bold mb-3 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-3">
                      {news.title}
                    </h3>
                  </a>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[170px]">
                    {news.source}
                  </span>

                  <a
                    href={news.link}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
                  >
                    Lire
                    {isExternal ? (
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
