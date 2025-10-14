"use client";
import Link from "next/link";
import { ArrowLeft, Ruler } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function CotesTolerances() {
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
            <Ruler className="text-[#E2B44F] w-7 h-7" />
            <h1 className="text-3xl font-bold text-[#E2B44F]">Les cotes et tolérances</h1>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Les cotes indiquent les dimensions théoriques d’une pièce, tandis que les tolérances
            définissent les écarts admissibles pour garantir la compatibilité des assemblages.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
            <li>Jeu : H7/g6</li>
            <li>Transition : H7/k6</li>
            <li>Serrage : H7/p6</li>
          </ul>

          <p className="text-gray-400 mt-4">
            Ces notations ISO sont essentielles pour assurer le fonctionnement précis des rouages horlogers.
          </p>
        </div>

        {/* FlipBook PDF à droite */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-[#E2B44F]/30 shadow-lg">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">
            Fiche PDF : Cotes et Tolérances
          </h2>
          <FlipBookViewer file="/pdfs/lecture-de-plan/cotes-tolerances.pdf" />
        </div>
      </div>
    </section>
  );
}

