"use client";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function ElementsFondamentaux() {
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
            <Layers className="text-[#E2B44F] w-7 h-7" />
            <h1 className="text-3xl font-bold text-[#E2B44F]">
              Les éléments fondamentaux d’un plan horloger
            </h1>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Un plan horloger complet comprend plusieurs éléments indispensables pour
            garantir la compréhension, la fabrication et le contrôle des pièces.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
            <li>Les vues principales (face, dessus, coupe, détail).</li>
            <li>Les cotes et tolérances normalisées.</li>
            <li>Les symboles ISO spécifiques à l’horlogerie.</li>
            <li>Le cartouche complet et la légende technique.</li>
            <li>Les indications de matière, de traitement et de finition.</li>
          </ul>

          <p className="text-gray-400 mt-4">
            Maîtriser ces éléments est essentiel pour interpréter et produire un plan
            conforme aux standards de l’industrie horlogère suisse.
          </p>
        </div>

        {/* FlipBook PDF à droite */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-[#E2B44F]/30 shadow-lg">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">
            Fiche PDF : Éléments fondamentaux
          </h2>
          <FlipBookViewer file="/pdfs/lecture-de-plan/elements-fondamentaux.pdf" />
        </div>
      </div>
    </section>
  );
}

