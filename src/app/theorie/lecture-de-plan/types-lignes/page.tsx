"use client";
import Link from "next/link";
import { ArrowLeft, PenTool } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function TypesLignes() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Texte à gauche */}
        <div>
          <Link
            href="/theorie/lecture-de-plan"
            className="inline-flex items-center gap-2 text-[#E2B44F] hover:text-white mb-8"
          >
            <ArrowLeft className="w-5 h-5" /> Retour
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <PenTool className="text-[#E2B44F] w-7 h-7" />
            <h1 className="text-3xl font-bold text-[#E2B44F]">
              Les types de lignes (à connaître absolument)
            </h1>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Chaque type de ligne sur un plan technique possède une signification spécifique.  
            En horlogerie, leur bonne interprétation est indispensable pour comprendre les dessins de fabrication.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
            <li><strong>Ligne continue épaisse</strong> → contour visible.</li>
            <li><strong>Ligne continue fine</strong> → cotes, hachures, repères.</li>
            <li><strong>Ligne mixte</strong> → axe ou plan de symétrie.</li>
            <li><strong>Ligne de coupe</strong> → tracée avec des pointillés et flèches.</li>
          </ul>

          <p className="text-gray-400 mt-4">
            Maîtriser ces conventions normalisées garantit la lecture correcte d’un plan horloger.
          </p>
        </div>

        {/* FlipBook PDF à droite */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-[#E2B44F]/30 shadow-lg">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">
            Fiche PDF : Types de lignes
          </h2>
          <FlipBookViewer file="/pdfs/lecture-de-plan/types-lignes.pdf" />
        </div>
      </div>
    </section>
  );
}

