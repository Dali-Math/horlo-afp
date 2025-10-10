"use client";
import Flashcards6497 from "@/components/Flashcards6497";
import Link from "next/link";
import { Wrench, Clock, Droplet, FileText, Award, Hammer } from "lucide-react";

export default function PratiquePage() {
  const sections = [
    {
      title: "Démontage & Remontage",
      icon: <Wrench className="w-6 h-6 text-[#E2B44F]" />,
      description: "Étapes détaillées pour démonter et remonter un mouvement mécanique.",
    },
    {
      title: "Réglage & Précision",
      icon: <Clock className="w-6 h-6 text-[#E2B44F]" />,
      description: "Techniques de réglage du balancier et de l'échappement pour une précision optimale.",
    },
    {
      title: "Huilage & Lubrification",
      icon: <Droplet className="w-6 h-6 text-[#E2B44F]" />,
      description: "Protocoles d'huilage pour assurer la longévité des mouvements.",
    },
    {
      title: "Fiches Techniques",
      icon: <FileText className="w-6 h-6 text-[#E2B44F]" />,
      description: "Documents détaillés pour chaque type de mouvement.",
    },
    {
      title: "Outils & Équipement",
      icon: <Hammer className="w-6 h-6 text-[#E2B44F]" />,
      description: "Guide complet des outils essentiels et leur bonne utilisation.",
    },
    {
      title: "Certifications",
      icon: <Award className="w-6 h-6 text-[#E2B44F]" />,
      description: "Standards et parcours professionnels de l'horlogerie suisse.",
    },
  ];

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-10">
          Pratique Horlogère
        </h1>

        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sections.map((s, i) => (
            <div
              key={i}
              className="bg-[#101010] border border-[#E2B44F]/20 rounded-xl p-6 text-left hover:scale-[1.02] transition-transform shadow-lg"
            >
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold text-[#E2B44F] mb-2">{s.title}</h3>
              <p className="text-gray-300 text-sm">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Section Flashcards */}
        <div className="mt-24 relative">
          <div className="absolute left-0 -top-10">
            <Link
              href="/pratique"
              className="inline-flex items-center gap-2 bg-[#E2B44F] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c89b3d] transition-colors"
            >
              ← Retour à la pratique
            </Link>
          </div>
          <Flashcards6497 />
        </div>
      </div>
    </section>
  );
}
