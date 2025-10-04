'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ChronographePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-gray-200 px-6 py-20">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
      >
        ← Retour aux ressources
      </motion.button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-['Bebas_Neue'] text-amber-400 mb-6"
      >
        Guide du Chronographe
      </motion.h1>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mb-12"
      >
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Le chronographe est l'un des mécanismes les plus emblématiques de
          l'horlogerie. Il permet de mesurer un intervalle de temps grâce à un
          système d'embrayage et de roue à colonnes ou de came.
        </p>
      </motion.div>

      {/* Content Sections */}
      <div className="max-w-4xl space-y-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-['Bebas_Neue'] text-amber-400 mb-4">
            Histoire
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Le chronographe a été inventé au XIXe siècle pour répondre aux besoins
            de mesure précise du temps dans divers domaines scientifiques et sportifs.
            Louis Moinet est crédité de la création du premier chronographe en 1816.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-['Bebas_Neue'] text-amber-400 mb-4">
            Fonctionnement
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Le chronographe fonctionne grâce à plusieurs composants clés :
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li>La roue à colonnes ou came : permet de coordonner les fonctions start, stop et reset</li>
            <li>L'embrayage : connecte et déconnecte le chronographe du mécanisme principal</li>
            <li>Les poussoirs : permettent d'actionner les fonctions du chronographe</li>
            <li>Les compteurs : affichent les mesures (secondes, minutes, heures)</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-['Bebas_Neue'] text-amber-400 mb-4">
            Types de chronographes
          </h2>
          <div className="space-y-4">
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-amber-300 mb-2">Chronographe simple</h3>
              <p className="text-gray-400">Permet de mesurer un seul intervalle de temps avec les fonctions start, stop et reset.</p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-amber-300 mb-2">Chronographe rattrapante (split-seconds)</h3>
              <p className="text-gray-400">Permet de mesurer deux intervalles simultanés grâce à deux aiguilles de chronographe superposées.</p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-amber-300 mb-2">Flyback</h3>
              <p className="text-gray-400">Permet de remettre à zéro et redémarrer immédiatement le chronographe d'une seule pression.</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-3xl font-['Bebas_Neue'] text-amber-400 mb-4">
            Calibres iconiques
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Certains calibres de chronographe sont devenus légendaires dans l'horlogerie :
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li>Zenith El Primero (1969) - Premier chronographe automatique à haute fréquence</li>
            <li>Valjoux 7750 - Mouvement robuste et fiable, largement utilisé</li>
            <li>Lemania 2310 - Chronographe manuel apprécié pour sa précision</li>
            <li>Patek Philippe CH 29-535 PS - Chronographe manufacture de haute horlogerie</li>
          </ul>
        </motion.section>
      </div>

      {/* Download CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 max-w-4xl"
      >
        <a
          href="/docs/guide-chronographe.pdf"
          download
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-['Bebas_Neue'] text-xl rounded-lg shadow-lg hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] hover:scale-105 transition-all duration-300"
        >
          📄 Télécharger le guide PDF complet
        </a>
      </motion.div>
    </div>
  );
}
