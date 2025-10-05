'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const metiers = [
  {
    titre: 'Opérateur en assemblage',
    description: 'Montage de composants de base',
    duree: '2 ans',
    lien: 'https://www.orientation.ch/dyn/show/1900?id=306',
  },
  {
    titre: 'Monteur horloger',
    description: 'Assemblage de mouvements simples',
    duree: '2 ans',
    lien: 'https://www.orientation.ch/dyn/show/1900?id=306',
  },
  {
    titre: 'Polisseur',
    description: 'Finition des surfaces et pièces',
    duree: '2 ans',
    lien: 'https://www.orientation.ch/dyn/show/1900?id=306',
  },
  {
    titre: 'Contrôleur qualité',
    description: 'Vérification des tolérances et précision',
    duree: '2 ans',
    lien: 'https://www.orientation.ch/dyn/show/1900?id=306',
  },
  {
    titre: 'Sertisseur débutant',
    description: 'Pose de pierres et éléments décoratifs',
    duree: '2 ans',
    lien: 'https://www.orientation.ch/dyn/show/1900?id=306',
  },
  {
    titre: 'Technicien micromécanique',
    description: 'Travail de précision sur composants',
    duree: '2 ans',
    lien: 'https://www.orientation.ch/dyn/show/1900?id=306',
  },
];

export default function MetiersAFPGrid() {
  return (
    <section id="metiers-afp" className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#E2B44F] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Métiers AFP
        </motion.h2>
        
        <motion.p
          className="text-lg text-[#d1d1d1] text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Découvrez les métiers accessibles via l'Attestation de Formation Professionnelle (AFP) en horlogerie.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metiers.map((metier, index) => (
            <motion.div
              key={index}
              className="bg-[#1A1A1A] p-6 rounded-lg border border-[#E2B44F]/20 hover:border-[#E2B44F] transition-all duration-300 hover:shadow-lg hover:shadow-[#E2B44F]/20 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-[#E2B44F] mb-3">
                {metier.titre}
              </h3>
              <p className="text-[#d1d1d1] mb-4">{metier.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-[#E2B44F] font-medium">
                  Durée : {metier.duree}
                </span>
              </div>
              <Link
                href={metier.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#E2B44F] text-[#0a0a0a] font-semibold text-sm rounded hover:bg-[#d4a73e] transition-colors duration-300"
              >
                Découvrir le parcours complet
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
