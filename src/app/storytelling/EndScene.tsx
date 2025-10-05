"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * EndScene Component
 * Closing scene for storytelling experience
 * Call-to-action with premium gold/black design
 */

export default function EndScene() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-6">
            Votre Voyage Continue
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Vous avez découvert l'histoire, les techniques et les visages de l'horlogerie.
          Il est maintenant temps de poursuivre votre apprentissage.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { number: "400+", label: "Années de tradition" },
            { number: "100+", label: "Techniques à maîtriser" },
            { number: "∞", label: "Passion infinie" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.1, y: -5 }}
              className="bg-gradient-to-br from-zinc-800 to-black border-2 border-yellow-500/30 rounded-xl p-8 hover:border-yellow-500 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-yellow-400 mb-2">{stat.number}</div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <Link href="/theorie">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-lg rounded-lg shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all duration-300"
            >
              📖 Explorer la théorie
            </motion.button>
          </Link>

          <Link href="/pratique">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-zinc-800 to-zinc-900 border-2 border-yellow-500 text-yellow-400 font-bold text-lg rounded-lg hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800 transition-all duration-300"
            >
              🔧 Découvrir la pratique
            </motion.button>
          </Link>

          <Link href="/communaute">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-zinc-800 to-zinc-900 border-2 border-yellow-500 text-yellow-400 font-bold text-lg rounded-lg hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800 transition-all duration-300"
            >
              🤝 Rejoindre la communauté
            </motion.button>
          </Link>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-yellow-500/20"
        >
          <p className="text-gray-500 italic">
            "Le temps est précieux. Apprenez à le comprendre."
          </p>
          <p className="text-yellow-600 font-semibold mt-2">- AFP Horlogerie</p>
        </motion.div>

        {/* Decorative watch icon */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -right-20 text-9xl opacity-10"
        >
          ⌚
        </motion.div>
      </div>
    </section>
  );
}
