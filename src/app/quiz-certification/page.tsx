"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, Wrench, FileText, Brain, Ruler } from "lucide-react";

export default function HomePage() {
  const cards = [
    {
      href: "/theorie",
      icon: <BookOpen size={36} className="mb-3 text-gold" />,
      title: "Théorie",
      desc: "Bases et notions horlogères",
    },
    {
      href: "/pratique",
      icon: <Wrench size={36} className="mb-3 text-gold" />,
      title: "Pratique",
      desc: "Exercices d’atelier et gestes pros",
    },
    {
      href: "/quiz",
      icon: <Brain size={36} className="mb-3 text-gold" />,
      title: "Quiz général",
      desc: "Teste tes connaissances horlogères",
    },
    {
      href: "/quiz-longueurs-horlogerie",
      icon: <Ruler size={36} className="mb-3 text-gold" />,
      title: "Quiz Longueurs",
      desc: "Conversions µm → mm → cm → m",
    },
    {
      href: "/outils",
      icon: <Clock size={36} className="mb-3 text-gold" />,
      title: "Outils",
      desc: "Ressources et utilitaires horlogers",
    },
    {
      href: "/ressources",
      icon: <FileText size={36} className="mb-3 text-gold" />,
      title: "Ressources",
      desc: "PDF, fiches et documents techniques",
    },
  ];

  return (
    <main className="min-h-screen bg-light-100 dark:bg-dark-900 text-slate-900 dark:text-light-100 transition-colors duration-500 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gold tracking-wide">
          HorloLearn
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-light-200 mb-12 leading-relaxed">
          Pour les passionnés et apprentis horlogers 🕰️  
          <br />
          Apprends, révise et maîtrise les bases de l’horlogerie suisse.
        </p>

        {/* Grille des sections principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col items-center justify-center rounded-2xl border border-gold/20 bg-white dark:bg-dark-800 p-6 hover:border-gold hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              {card.icon}
              <h3 className="text-xl font-semibold mb-1 text-slate-900 dark:text-light-100">
                {card.title}
              </h3>
              <p className="text-slate-600 dark:text-light-200 text-sm opacity-80">
                {card.desc}
              </p>
            </Link>
          ))}
        </div>

        <footer className="mt-16 text-sm text-slate-600 dark:text-light-300">
          © 2025 HorloLearn — Fait avec passion en Suisse 🇨🇭
        </footer>
      </motion.div>
    </main>
  );
}
