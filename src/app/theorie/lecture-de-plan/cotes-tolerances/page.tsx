"use client";
import { motion } from "framer-motion";
import { useState } from "react";

// Icônes minimalistes internes
const XCircleIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);

const CheckCircleIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

export default function CotesEtTolerancesPage() {
  const erreurs = [
    "Oublier d’indiquer une tolérance sur une cote fonctionnelle.",
    "Définir une tolérance trop serrée (augmente le coût et les rejets).",
    "Choisir une tolérance trop large (crée un jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques (parallélisme, etc.).",
    "Mélanger les unités de mesure (mm et µm) sans le préciser.",
  ];

  const bonnesPratiques = [
    "Analyser la fonction de la pièce pour définir une tolérance juste.",
    "Utiliser les symboles et la syntaxe de la norme ISO appropriée.",
    "Toujours relire la cotation en pensant à l'assemblage final.",
    "Valider la faisabilité des tolérances avec l'atelier d'usinage.",
    "Faire contrôler ses plans par un pair avant la production.",
    "Rester cohérent dans les unités et la précision sur tout le plan.",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 to-black text-gray-100 overflow-hidden">
      <section className="relative flex flex-col items-center text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-yellow-400 mb-4 tracking-wide"
        >
          Cotes et Tolérances
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl text-gray-400 leading-relaxed"
        >
          Ces normes précisent les règles de cotation et les tolérances
          <span className="text-gray-200 font-semibold"> indispensables </span>
          à la qualité en horlogerie. Maîtrise-les pour comprendre l’assemblage,
          l’usinage et le contrôle dimensionnel des montres.
        </motion.p>
      </section>

      {/* Schéma */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-4xl mx-auto my-12 bg-neutral-900/70 border border-yellow-600/40 rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl text-yellow-400 font-semibold mb-4 text-center">
          Schéma Interactif
        </h2>
        <div className="rounded-xl overflow-hidden border border-yellow-700/40 bg-neutral-950/60 shadow-inner">
          <img
            src="/images/cotes-tolerances/tuto.png"
            alt="Schéma des cotes et tolérances"
            className="w-full rounded-lg"
          />
        </div>
        <p className="text-center text-gray-500 italic mt-2">
          Cliquez sur le schéma pour afficher les explications détaillées.
        </p>
      </motion.section>

      {/* Fiche Erreurs / Bonnes Pratiques */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="max-w-5xl mx-auto my-16 p-8 rounded-2xl bg-neutral-900/80 border border-yellow-700/30 shadow-lg"
      >
        <h2 className="text-center text-2xl text-yellow-400 font-semibold mb-10 uppercase tracking-wide">
          Mémo Technique : Erreurs & Bonnes Pratiques
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Erreurs */}
          <div>
            <h3 className="flex items-center gap-2 text-red-400 text-lg font-semibold mb-4">
              <XCircleIcon className="w-6 h-6" /> Erreurs fréquentes
            </h3>
            <ul className="space-y-3 text-gray-300">
              {erreurs.map((err, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 bg-neutral-800/60 rounded-lg p-3 hover:bg-neutral-700/60 transition"
                >
                  <XCircleIcon className="w-5 h-5 mt-1 text-red-400" />
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bonnes pratiques */}
          <div>
            <h3 className="flex items-center gap-2 text-green-400 text-lg font-semibold mb-4">
              <CheckCircleIcon className="w-6 h-6" /> Bonnes pratiques
            </h3>
            <ul className="space-y-3 text-gray-300">
              {bonnesPratiques.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 bg-neutral-800/60 rounded-lg p-3 hover:bg-neutral-700/60 transition"
                >
                  <CheckCircleIcon className="w-5 h-5 mt-1 text-green-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Bloc Quiz stylisé */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="max-w-4xl mx-auto my-20 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-yellow-700/30 rounded-2xl shadow-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
          🧠 Quiz : Teste tes connaissances
        </h2>
        {/* --- ICI tu gardes ton composant de quiz existant --- */}
        <div className="text-gray-300">
          <p>👉 Insère ici ton quiz interactif déjà fonctionnel.</p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-12 text-sm text-gray-500 border-t border-neutral-800 mt-20">
        © HorloLearn 2025 — Basé sur les normes ISO 129-1 & ISO 1101.
      </footer>
    </main>
  );
}
