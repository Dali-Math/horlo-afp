'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function TermesTechniquesPage() {
  const router = useRouter();

  const termes = [
    { term: 'Balancier', definition: 'Organe régulateur du mouvement qui oscille à fréquence constante.' },
    { term: 'Spiral', definition: 'Ressort fin en forme de spirale attaché au balancier.' },
    { term: 'Ancre', definition: 'Pièce qui fait le lien entre l\'échappement et le balancier.' },
    { term: 'Barillet', definition: 'Cylindre contenant le ressort moteur.' },
    { term: 'Platine', definition: 'Plaque de base sur laquelle sont montés tous les composants.' },
    { term: 'Ponts', definition: 'Plaques fixées sur la platine pour maintenir les roues.' },
    { term: 'Rubis', definition: 'Pierres synthétiques utilisées comme paliers pour réduire les frottements.' },
    { term: 'Remontoir', definition: 'Mécanisme permettant de remonter le ressort moteur.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-gray-200 px-6 py-20">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
      >
        ← Retour aux ressources
      </motion.button>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-['Bebas_Neue'] text-amber-400 mb-6"
      >
        Termes Techniques Essentiels
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mb-12"
      >
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Familiarisez-vous avec le vocabulaire essentiel de l\'horlogerie.
          Ces termes sont fondamentaux pour comprendre le fonctionnement
          d\'une montre mécanique.
        </p>
      </motion.div>

      <div className="max-w-4xl space-y-4">
        {termes.map((item, index) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 hover:border-amber-500/50 transition-colors duration-300"
          >
            <h3 className="text-xl font-['Bebas_Neue'] text-amber-400 mb-2">
              {item.term}
            </h3>
            <p className="text-gray-400 leading-relaxed">{item.definition}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 max-w-4xl p-6 bg-amber-500/10 border border-amber-500/30 rounded-lg"
      >
        <p className="text-amber-300 leading-relaxed">
          🔍 Pour un glossaire complet et officiel, consultez le dictionnaire de la Fondation de la Haute Horlogerie.
        </p>
      </motion.div>
    </div>
  );
}
