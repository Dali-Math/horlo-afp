"use client";
import Link from "next/link";
import { ArrowLeft, Target } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function CompetencesEleve() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        <div>
          <Link href="/theorie/lecture-de-plan" className="inline-flex items-center gap-2 text-[#E2B44F] hover:text-white mb-8">
            <ArrowLeft className="w-5 h-5" /> Retour
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <Target className="text-[#E2B44F] w-7 h-7" />
            <h1 className="text-3xl font-bold text-[#E2B44F]">Compétences à développer chez l’élève</h1>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Ce module aide l’élève à comprendre les représentations techniques, 
            à lire les tolérances et à reconnaître les symboles ISO utilisés en horlogerie.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
            <li>Identifier les vues et les projections d’un dessin horloger.</li>
            <li>Lire les cotes et tolérances.</li>
            <li>Reconnaître les symboles normalisés ISO.</li>
            <li>Analyser un cartouche horloger complet.</li>
          </ul>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-[#E2B44F]/30 shadow-lg">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">Fiche PDF : Compétences</h2>
          <FlipBookViewer file="/pdfs/lecture-de-plan/competences-eleve.pdf" />
        </div>
      </div>
    </section>
  );
}
