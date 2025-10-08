"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, Wrench, FileText, Brain, Ruler } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#E2B44F] tracking-wide">
          HorloLearn
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
          Pour les passionnés et apprentis horlogers 🕰️  
          <br /> Apprends, révise et maîtrise les bases de l’horlogerie suisse.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link
            href="/theorie"
            className="group flex flex-col items-center justify-center rounded-2xl border border-gray-700 bg-[#111] p-6 hover:bg-[#1a1a1a] transition"
          >
            <BookOpen size={36} className="mb-3 text-[#E2B44F]" />
            <h3 className="text-xl font-semibold mb-1">Théorie</h3>
            <p className="text-gray-400 text-sm opacity-80">Bases et notions horlogères</p>
          </Link>

          <Link
            href="/pratique"
            className="group flex flex-col items-center justify-center rounded-2xl border border-gray-700 bg-[#111] p-6 hover:bg-[#1a1a1a] transition"
          >
            <Wrench size={36} className="mb-3 text-[#E2B44F]" />
            <h3 className="text-xl font-semibold mb-1">Pratique</h3>
            <p className="text-gray-400 text-sm opacity-80">Exercices d’atelier et gestes pros</p>
          </Link>

          <Link
            href="/quiz"
            className="group flex flex-col items-center justify-center rounded-2xl border border-gray-700 bg-[#111] p-6 hover:bg-[#1a1a1a] transition"
          >
            <Brain size={36} className="mb-3 text-[#E2B44F]" />
            <h3 className="text-xl font-semibold mb-1">Quiz général</h3>
            <p className="text-gray-400 text-sm opacity-80">Teste tes connaissances</p>
          </Link>

          <Link
            href="/quiz-longueurs-horlogerie"
            className="group flex flex-col items-center justify-center rounded-2xl border border-gray-700 bg-[#111] p-6 hover:bg-[#1a1a1a] transition"
          >
            <Ruler size={36} className="mb-3 text-[#E2B44F]" />
            <h3 className="text-xl font-semibold mb-1">Quiz Longueurs</h3>
            <p className="text-gray-400 text-sm opacity-80">Conversions µm → mm → cm → m</p>
          </Link>

          <Link
            href="/outils"
            className="group flex flex-col items-center justify-center rounded-2xl border border-gray-700 bg-[#111] p-6 hover:bg-[#1a1a1a] transition"
          >
            <Clock size={36} className="mb-3 text-[#E2B44F]" />
            <h3 className="text-xl font-semibold mb-1">Outils</h3>
            <p className="text-gray-400 text-sm opacity-80">Ressources et utilitaires horlogers</p>
          </Link>

          <Link
            href="/ressources"
            className="group flex flex-col items-center justify-center rounded-2xl border border-gray-700 bg-[#111] p-6 hover:bg-[#1a1a1a] transition"
          >
            <FileText size={36} className="mb-3 text-[#E2B44F]" />
            <h3 className="text-xl font-semibold mb-1">Ressources</h3>
            <p className="text-gray-400 text-sm opacity-80">PDF, fiches et documents</p>
          </Link>
        </div>

        <footer className="mt-16 text-sm text-gray-500">
          © 2025 HorloLearn — Fait avec passion en Suisse 🇨🇭
        </footer>
      </motion.div>
    </main>
  );
}
