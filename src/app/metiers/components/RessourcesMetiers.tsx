'use client';

import { motion } from 'framer-motion';
import { FaFilePdf, FaExternalLinkAlt, FaBook } from 'react-icons/fa';
import Link from 'next/link';

const ressources = [
  {
    titre: 'Guide des métiers d’horlogerie',
    type: 'PDF',
    icon: FaFilePdf,
    lien: '#',
  },
  {
    titre: 'Orientation.ch : AFP & CFC',
    type: 'Lien externe',
    icon: FaExternalLinkAlt,
    lien: 'https://www.orientation.ch/dyn/show/1900?id=306',
  },
  {
    titre: 'Rapport FHH sur la formation suisse',
    type: 'PDF',
    icon: FaBook,
    lien: '#',
  },
];

export default function RessourcesMetiers() {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#E2B44F] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ressources officielles & documents
        </motion.h2>

        <motion.p
          className="text-lg text-[#d1d1d1] text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Accédez aux documents officiels et guides pédagogiques suisses.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ressources.map((ressource, index) => {
            const Icon = ressource.icon;
            return (
              <motion.div
                key={index}
                className="bg-[#1A1A1A] p-6 rounded-lg border border-[#E2B44F]/20 hover:border-[#E2B44F] transition-all duration-300 hover:shadow-lg hover:shadow-[#E2B44F]/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <Icon className="text-[#E2B44F] text-3xl mr-4" />
                  <span className="text-xs text-[#E2B44F] uppercase tracking-wide">
                    {ressource.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#d1d1d1] mb-4">
                  {ressource.titre}
                </h3>
                <Link
                  href={ressource.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-[#E2B44F] text-[#0a0a0a] font-semibold text-sm rounded hover:bg-[#d4a73e] transition-colors duration-300"
                >
                  {ressource.type === 'PDF' ? 'Télécharger' : 'Consulter'}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
