// src/components/ThematiquesSection.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Thematique } from '@/lib/homepageData';

interface Props {
  thematiques: Thematique[];
}

export default function ThematiquesSection({ thematiques }: Props) {
  return (
    <section id="communaute" className="py-20 px-4 bg-slate-100/60 dark:bg-slate-900/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Explorez par <span className="text-amber-600 dark:text-amber-400">Thématique</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Une bibliothèque vivante organisée pour votre apprentissage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {thematiques.map((theme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-5 group-hover:opacity-15 dark:opacity-10 dark:group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`} />
              
              <div className="relative bg-white dark:bg-gradient-to-br dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl p-8 border border-slate-200 dark:border-amber-500/10 group-hover:border-amber-500/40 dark:group-hover:border-amber-500/30 shadow-sm hover:shadow-xl transition-all duration-300 backdrop-blur-sm flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl">{theme.icon}</div>
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-500/20 border border-amber-300/80 dark:border-amber-500/30 rounded-full text-xs font-bold text-amber-800 dark:text-amber-300">
                      {theme.resources}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-amber-600 dark:text-amber-400">{theme.title}</h3>
                  <p className="text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">{theme.description}</p>

                  <ul className="space-y-2.5 mb-8">
                    {theme.items.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-700 dark:text-gray-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={theme.link}
                  className="block w-full py-3 border-2 border-amber-500/50 dark:border-amber-400/50 text-amber-700 dark:text-amber-300 rounded-xl font-semibold hover:bg-amber-500/10 dark:hover:bg-amber-500/20 transition-all duration-300 text-center"
                >
                  Découvrir
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
