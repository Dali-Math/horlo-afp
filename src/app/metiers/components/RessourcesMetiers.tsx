'use client';
import { motion } from 'framer-motion';
import { FaFilePdf, FaVideo, FaExternalLinkAlt, FaTools } from 'react-icons/fa';
import Link from 'next/link';

const ressources = [
  {
    titre: 'Guide des métiers AFP',
    description: 'Documentation complète sur les métiers d\'horlogerie en formation AFP',
    type: 'PDF',
    icon: FaFilePdf,
    lien: '#',
  },
  {
    titre: 'Vidéo officielle de formation',
    description: 'Découvrez les coulisses de la formation horlogère suisse',
    type: 'Vidéo',
    icon: FaVideo,
    lien: '#',
  },
  {
    titre: 'orientation.ch — Formation horlogère',
    description: 'Portail officiel suisse pour l\'orientation professionnelle AFP & CFC',
    type: 'Lien externe',
    icon: FaExternalLinkAlt,
    lien: 'https://www.orientation.ch/dyn/show/1900?id=306',
  },
  {
    titre: 'Fiche technique outils & processus AFP',
    description: 'Guide pratique des outils et processus de fabrication horlogère',
    type: 'PDF',
    icon: FaTools,
    lien: '#',
  },
];

export default function RessourcesMetiers() {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
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
          Accédez aux documents officiels et guides pédagogiques suisses pour approfondir votre connaissance des métiers AFP.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ressources.map((ressource, index) => {
            const Icon = ressource.icon;
            return (
              <motion.a
                key={index}
                href={ressource.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-[#1A1A1A] to-[#0f0f0f] p-6 rounded-xl border border-[#E2B44F]/20 hover:border-[#E2B44F] transition-all duration-300 hover:shadow-2xl hover:shadow-[#E2B44F]/30 hover:scale-[1.02] cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-[#E2B44F]/10 rounded-lg flex items-center justify-center group-hover:bg-[#E2B44F]/20 transition-all duration-300 group-hover:scale-110">
                    <Icon className="text-[#E2B44F] text-2xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-[#E2B44F] uppercase tracking-wider font-semibold">
                        {ressource.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#E2B44F] transition-colors duration-300">
                      {ressource.titre}
                    </h3>
                    <p className="text-sm text-[#a1a1a1] leading-relaxed">
                      {ressource.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#E2B44F]/10">
                  <span className="inline-flex items-center gap-2 text-[#E2B44F] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                    {ressource.type === 'PDF' ? '📄 Télécharger' : ressource.type === 'Vidéo' ? '▶️ Regarder' : '🔗 Consulter'}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
