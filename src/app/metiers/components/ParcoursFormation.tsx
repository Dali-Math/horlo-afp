'use client';
import { motion } from 'framer-motion';
import { FaTools, FaClock, FaStar } from 'react-icons/fa';

const etapes = [
  {
    icon: FaTools,
    titre: 'AFP',
    duree: '2 ans',
    description: 'Découverte du métier et des outils',
  },
  {
    icon: FaClock,
    titre: 'CFC',
    duree: '4 ans',
    description: 'Maîtrise des techniques horlogères',
  },
  {
    icon: FaStar,
    titre: 'Spécialisation',
    duree: 'Modules complémentaires',
    description: 'Haute horlogerie, micromécanique, contrôle qualité',
  },
];

export default function ParcoursFormation() {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#E2B44F] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Parcours de formation
        </motion.h2>

        <motion.p
          className="text-lg text-[#d1d1d1] text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Le chemin vers l'excellence horlogère, étape par étape.
        </motion.p>

        {/* Frise horizontale desktop / verticale mobile */}
        <div className="relative">
          {/* Ligne de connexion dorée - horizontale sur desktop, verticale sur mobile */}
          <motion.div
            className="absolute md:top-1/2 md:left-0 md:right-0 md:h-1 md:w-full left-1/2 top-0 bottom-0 w-1 h-full md:transform md:-translate-y-1/2 transform -translate-x-1/2 bg-gradient-to-r md:bg-gradient-to-r bg-gradient-to-b from-[#E2B44F]/20 via-[#E2B44F] to-[#E2B44F]/20 md:block"
            initial={{ scaleX: 0, scaleY: 0 }}
            whileInView={{ scaleX: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {etapes.map((etape, index) => {
              const Icon = etape.icon;
              return (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 + index * 0.2 }}
                >
                  {/* Icône avec effet hover */}
                  <motion.div
                    className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#0a0a0a] border-4 border-[#E2B44F] flex items-center justify-center mb-6 shadow-lg shadow-[#E2B44F]/20 hover:shadow-[#E2B44F]/40 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="text-[#E2B44F] text-4xl" />
                  </motion.div>

                  {/* Titre */}
                  <h3 className="text-2xl font-bold text-[#E2B44F] mb-2">
                    {etape.titre}
                  </h3>

                  {/* Durée */}
                  <p className="text-base text-[#E2B44F]/80 font-semibold mb-3">
                    {etape.duree}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#d1d1d1] leading-relaxed max-w-xs">
                    {etape.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
