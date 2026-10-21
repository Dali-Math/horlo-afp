// src/components/RessourcesPharesSection.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wand2, FileText, Users, Download, ArrowRight } from 'lucide-react';
import { FeaturedResource } from '@/lib/homepageData';

interface Props {
  resources: FeaturedResource[];
}

export default function RessourcesPharesSection({ resources }: Props) {
  return (
    <section id="ressources" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Ressources <span className="text-amber-600 dark:text-amber-400">Phares</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez nos contenus les plus appréciés par la communauté
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-gradient-to-br dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl overflow-hidden border border-slate-200 dark:border-amber-500/10 hover:border-amber-500/40 dark:hover:border-amber-500/30 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-sm">
                  {resource.badge}
                </span>
              </div>

              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-sm">
                    {resource.type === 'Outil IA' ? (
                      <Wand2 className="w-6 h-6 text-white" />
                    ) : (
                      <FileText className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    {resource.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {resource.title}
                </h3>

                <p className="text-slate-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-gray-400 mb-6">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1.5 text-slate-400 dark:text-gray-500" />
                    {resource.author}
                  </span>
                  <span>{resource.readTime}</span>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-amber-500/10">
                  <div className="flex items-center text-sm text-slate-500 dark:text-gray-400">
                    <Download className="w-4 h-4 mr-2 text-amber-600 dark:text-amber-400" />
                    {resource.downloads} téléchargements
                  </div>
                  <Link
                    href={resource.href ?? '#'}
                    className="text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-500 dark:hover:text-amber-300 transition-colors flex items-center group-hover:translate-x-1"
                  >
                    Voir <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
