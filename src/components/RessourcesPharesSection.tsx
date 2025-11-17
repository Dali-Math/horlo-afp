// components/RessourcesPharesSection.tsx

'use client'; // Nécessaire car il utilise motion.div

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'next/link';
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ressources <span className="text-amber-400">Phares</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl overflow-hidden border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300"
            >
              {/* ... (Le reste du JSX pour une ressource phare) ... */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
