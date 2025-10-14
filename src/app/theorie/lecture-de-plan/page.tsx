"use client";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function LectureDePlan() {
  const topics = [
    { title: "Compétences à développer chez l’élève", href: "/theorie/lecture-de-plan/competences-eleve" },
    { title: "Les éléments spécifiques à l’horlogerie", href: "/theorie/lecture-de-plan/elements-horlogerie" },
    { title: "Le cartouche horloger", href: "/theorie/lecture-de-plan/cartouche-horloger" },
    { title: "Les symboles normalisés (ISO / horlogerie)", href: "/theorie/lecture-de-plan/symboles-normalises" },
    { title: "Les cotes et tolérances", href: "/theorie/lecture-de-plan/cotes-tolerances" },
    { title: "Les vues techniques (projection orthogonale)", href: "/theorie/lecture-de-plan/vues-techniques" },
    { title: "Les types de lignes (à connaître absolument)", href: "/theorie/lecture-de-plan/types-lignes" },
    { title: "Les éléments fondamentaux d’un plan horloger", href: "/theorie/lecture-de-plan/elements-fondamentaux" },
  ];

  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-[#E2B44F] w-8 h-8" />
          <h1 className="text-4xl font-bold text-[#E2B44F]">Lecture de Plan</h1>
        </div>

        <p className="text-gray-300 mb-12 max-w-3xl">
          Apprendre à lire un plan horloger, c’est comprendre le langage universel de la mécanique de précision.
          Ce module regroupe toutes les notions nécessaires pour interpréter, réaliser et vérifier un dessin horloger complet.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className="p-6 rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] hover:shadow-lg hover:shadow-[#E2B44F]/10 transition-all bg-[#111827]"
            >
              <h2 className="text-xl font-semibold text-[#E2B44F] flex items-center justify-between">
                {topic.title} <ArrowRight className="w-5 h-5" />
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                Découvre les bases essentielles de {topic.title.toLowerCase()}.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
