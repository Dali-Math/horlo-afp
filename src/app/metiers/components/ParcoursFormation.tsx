'use client';

import { motion } from 'framer-motion';
import { FaTools, FaCertificate, FaGraduationCap, FaIndustry } from 'react-icons/fa';

const etapes = [
  {
    icon: FaTools,
    titre: 'Atelier',
    description: 'Premiers pas dans l’univers horloger',
  },
  {
    icon: FaCertificate,
    titre: 'AFP (2 ans)',
    description: 'Attestation de Formation Professionnelle',
  },
  {
    icon: FaGraduationCap,
    titre: 'CFC (4 ans)',
    description: 'Certificat Fédéral de Capacité',
  },
  {
    icon: FaIndustry,
    titre: 'Spécialisation',
    description: 'Manufacture / Maîtrise',
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

        {/* Frise horizontale */}
        <div className="relative">
          {/* Ligne de connexion */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E2B44F]/30 transform -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {etapes.map((etape, index) => {
              const Icon = etape.icon;
              return (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Icône */}
                  <div className="relative z-10 w-24 h-24 rounded-full bg-[#1A1A1A] border-4 border-[#E2B44F] flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300">
                    <Icon className="text-[#E2B44F] text-3xl" />
                  </div>

                  {/* Titre */}
                  <h3 className="text-xl font-bold text-[#E2B44F] mb-2">
                    {etape.titre}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#d1d1d1]">{etape.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
