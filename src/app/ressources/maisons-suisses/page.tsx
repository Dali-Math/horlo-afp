'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function MaisonsSuissesPage() {
  const router = useRouter();

  const maisons = [
    {
      name: 'Patek Philippe',
      founded: '1839',
      description: 'Manufacture genévoise de prestige, connue pour ses complications et sa finition exceptionnelle.',
    },
    {
      name: 'Vacheron Constantin',
      founded: '1755',
      description: 'La plus ancienne manufacture horlogère en activité continue.',
    },
    {
      name: 'Audemars Piguet',
      founded: '1875',
      description: 'Manufacture de la Vallée de Joux, célèbre pour la Royal Oak.',
    },
    {
      name: 'Rolex',
      founded: '1905',
      description: 'Marque icônique synonyme de précision et de robustesse.',
    },
    {
      name: 'Omega',
      founded: '1848',
      description: 'Manufacture biennoise, montre officielle de la NASA.',
    },
    {
      name: 'Jaeger-LeCoultre',
      founded: '1833',
      description: 'Grande Maison de la Vallée de Joux, maître des complications.',
    },
  ];

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
        Les Grandes Maisons Suisses
      </motion.h1>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mb-12"
      >
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          La Suisse est le berceau de l'horlogerie de luxe. Découvrez les grandes
          manufactures qui ont forgé la réputation mondiale de l'horlogerie suisse
          depuis le XIXe siècle.
        </p>
      </motion.div>

      {/* Maisons Grid */}
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {maisons.map((maison, index) => (
          <motion.div
            key={maison.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 hover:border-amber-500/50 transition-colors duration-300"
          >
            <h3 className="text-2xl font-['Bebas_Neue'] text-amber-400 mb-2">
              {maison.name}
            </h3>
            <p className="text-sm text-amber-300 mb-4">Fondée en {maison.founded}</p>
            <p className="text-gray-400 leading-relaxed">{maison.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Additional Content */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="max-w-4xl"
      >
        <h2 className="text-3xl font-['Bebas_Neue'] text-amber-400 mb-4">
          L'Évolution de l'Horlogerie Suisse
        </h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          L'horlogerie suisse a connu son essor au XVIe siècle à Genève, lorsque
          les réfugiés protestants français ont apporté leurs savoir-faire. Au fil
          des siècles, la Suisse est devenue le centre mondial de l'horlogerie de
          luxe, grâce à son innovation constante et sa quête de perfection.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Aujourd'hui, les manufactures suisses continuent de définir les standards
          de l'industrie horlogère, combinant tradition artisanale et technologies
          de pointe.
        </p>
      </motion.section>
    </div>
  );
}
