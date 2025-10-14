"use client";
import Link from "next/link";
import { ArrowLeft, Shapes } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function SymbolesNormalises() {
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
            <Shapes className="text-[#E2B44F] w-7 h-7" />
            <h1 className="text-3xl font-bold text-[#E2B44F]">
              Les symboles normalisés (ISO / horlogerie)
            </h1>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Les symboles techniques utilisés sur les plans horlogers suivent les normes ISO 1302, 2768, et 8015.  
            Ils permettent d’indiquer les exigences de fabrication, les tolérances et les états de surface.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
            <li>Rugosité de surface (Ra, Rz, Rt).</li>
            <li>Tolérances géométriques (planéité, cylindricité, concentricité).</li>
            <li>Symboles de traitement thermique ou de finition.</li>
          </ul>

          <p className="text-gray-400 mt-4">
            En horlogerie, ces symboles garantissent la précision et l’interchangeabilité des composants.
          </p>
        </div>

        {/* FlipBook PDF à droite */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-[#E2B44F]/30 shadow-lg">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">
            Fiche PDF : Symboles normalisés
          </h2>
          <FlipBookViewer file="/pdfs/lecture-de-plan/symboles-normalises.pdf" />
        </div>
      </div>
    </section>
  );
}

