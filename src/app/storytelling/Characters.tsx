"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/**
 * Characters Component
 * Interactive character profiles for storytelling
 * Gold/black theme with hover animations
 */

interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  specialty: string;
  quote: string;
}

const characters: Character[] = [
  {
    id: "watchmaker",
    name: "Le Maître Horloger",
    role: "Artisan",
    description: "Gardien des traditions horlogères suisses depuis 40 ans",
    icon: "👨‍🔧",
    specialty: "Complications mécaniques",
    quote: "Chaque montre raconte une histoire de précision et de passion.",
  },
  {
    id: "apprentice",
    name: "L'Apprenti",
    role: "Étudiant",
    description: "Nouvelle génération apprenant l'art ancestral",
    icon: "👨‍🏫",
    specialty: "Réglage et assemblage",
    quote: "J'apprends à donner vie au temps, mouvement après mouvement.",
  },
  {
    id: "designer",
    name: "La Designer",
    role: "Créatrice",
    description: "Alliance entre esthétique moderne et tradition",
    icon: "👩‍🎨",
    specialty: "Design & innovation",
    quote: "La beauté d'une montre doit égaler sa précision.",
  },
  {
    id: "collector",
    name: "Le Collectionneur",
    role: "Passionné",
    description: "Préservateur de l'histoire horlogère",
    icon: "👔",
    specialty: "Montres vintage",
    quote: "Chaque pièce est un témoin du génie humain.",
  },
];

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 py-20 px-4">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
          Les Visages de l'Horlogerie
        </h2>
        <p className="text-xl text-gray-400">Rencontrez les artisans de la précision</p>
      </motion.div>

      {/* Characters grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character, index) => (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedCharacter(character.id)}
              className="bg-gradient-to-br from-zinc-800 to-black border-2 border-yellow-500/30 rounded-xl p-6 cursor-pointer hover:border-yellow-500 transition-all duration-300 h-full"
            >
              {/* Icon */}
              <div className="text-6xl mb-4 text-center">{character.icon}</div>

              {/* Name & role */}
              <h3 className="text-2xl font-bold text-yellow-400 mb-2 text-center">
                {character.name}
              </h3>
              <p className="text-sm text-yellow-600 mb-4 text-center font-semibold">
                {character.role}
              </p>

              {/* Description */}
              <p className="text-gray-300 text-center mb-4">{character.description}</p>

              {/* Specialty badge */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 text-center">
                <span className="text-yellow-400 text-sm font-semibold">
                  {character.specialty}
                </span>
              </div>

              {/* Hover indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute bottom-4 right-4 text-yellow-400"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Character detail modal */}
      {selectedCharacter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCharacter(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-zinc-900 to-black border-4 border-yellow-500 rounded-2xl p-8 max-w-2xl w-full relative"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCharacter(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {characters
              .filter((c) => c.id === selectedCharacter)
              .map((character) => (
                <div key={character.id}>
                  <div className="text-8xl mb-6 text-center">{character.icon}</div>
                  <h2 className="text-4xl font-bold text-yellow-400 mb-2 text-center">
                    {character.name}
                  </h2>
                  <p className="text-xl text-yellow-600 mb-6 text-center font-semibold">
                    {character.role}
                  </p>
                  <p className="text-lg text-gray-300 mb-6 text-center">
                    {character.description}
                  </p>
                  <div className="bg-zinc-800/50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-6">
                    <p className="text-yellow-200 italic text-lg">"{character.quote}"</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-full px-6 py-3 text-center">
                    <span className="text-yellow-400 font-bold">
                      Spécialité: {character.specialty}
                    </span>
                  </div>
                </div>
              ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
