"use client";
import Flashcards6497 from "@/components/Flashcards6497";
import Link from "next/link";
import { Wrench, Clock, Droplet, FileText, Award, Hammer } from "lucide-react";

export default function PratiquePage() {
  const sections = [
    {
      title: "Démontage & Remontage",
      icon: <Wrench className="w-6 h-6 text-gold" />,
      description:
        "Étapes détaillées pour démonter et remonter un mouvement mécanique.",
      slug: "demontage",
    },
    {
      title: "Réglage & Précision",
      icon: <Clock className="w-6 h-6 text-gold" />,
      description:
        "Techniques de réglage du balancier et de l'échappement pour une précision optimale.",
      slug: "reglage",
    },
    {
      title: "Huilage & Lubrification",
      icon: <Droplet className="w-6 h-6 text-gold" />,
      description:
        "Protocoles d'huilage pour assurer la longévité des mouvements.",
      slug: "huilage",
    },
    {
      title: "Fiches Techniques",
      icon: <FileText className="w-6 h-6 text-gold" />,
      description:
        "Documents détaillés pour chaque type de mouvement.",
      slug: "fiches",
    },
    {
      title: "Outils & Équipement",
      icon: <Hammer className="w-6 h-6 text-gold" />,
      description:
        "Guide complet des outils essentiels et leur bonne utilisation.",
      slug: "outils",
    },
    {
      title: "Certifications",
      icon: <Award className="w-6 h-6 text-gold" />,
      description:
        "Standards et parcours professionnels de l'horlogerie suisse.",
      slug: "certifications",
    },
  ];

  return (
    <section className="min-h-screen bg-light-100 dark:bg-dark-900 text-slate-900 dark:text-light-100 transition-colors duration-500 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gold mb-10">
          Pratique Horlogère
        </h1>

        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sections.map((s, i) => (
            <Link
              key={i}
              href={`/pratique/${s.slug}`}
              className="bg-white dark:bg-dark-800 border border-gold/20 rounded-xl p-6 text-left hover:scale-[1.02] transition-transform shadow-md hover:shadow-lg hover:border-gold/40"
            >
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold text-gold mb-2">
                {s.title}
              </h3>
              <p className="text-slate-700 dark:text-light-200 text-sm">
                {s.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Section Flashcards */}
        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">
            Cartes Mémoire — ETA 6497
          </h2>
          <Flashcards6497 />
        </div>
      </div>
    </section>
  );
}
