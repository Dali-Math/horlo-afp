// src/components/ActualitesSection.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // <-- CORRIGÉ
import { Actualite } from '@/lib/homepageData';

interface Props {
  actualites: Actualite[];
}

export default function ActualitesSection({ actualites }: Props) {
  return (
    <section id="actualites" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-amber-400">Actualités</span> Horlogères
            </h2>
            <p className="text-gray-400">Restez informé des dernières nouveautés</p>
          </div>
          <Link href="/actualites" className="hidden md:block text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center">
            Voir tout <Link href={'/'} className="ml-2 w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {actualites.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-xl p-6 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 group"
            >
              <Link
                href={news.link ?? '#'}
                className="block no-underline cursor-pointer"
              >
                <span className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs font-bold text-amber-300 mb-4">
                  {news.category}
                </span>

                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                  {news.title}
                </h3>

                {news.time && (
                  <p className="text-sm text-gray-500">{news.time}</p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
