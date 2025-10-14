"use client";
import Link from "next/link";
import { ArrowLeft, Cog } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function ElementsHorlogerie() {
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
            <Cog className="text-[#E2B44F] w-7 h-7" />
            <h1 className="text-3xl font-bold text-[#E2B44F]">
              Les éléments spécifiques à l’horlogerie
            </h1>
          </div>

          <p className="text-gray-300 leading-relaxed">
            En horlogerie, les plans intègrent des détails propres à la fabrication 
            de pièces miniaturisées et de haute précision. Ces éléments doivent être 
            dessinés avec rigueur pour garantir la compatibilité et le bon fonctionnement 
            du mouvement.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
            <li>Pivots, axes et logements de rubis.</li>
            <li>Filetages miniatures (M0.8, M1, M1.2, etc.).</li>
            <li>Plans de pose et repères d’usinage.</li>
            <li>Surfaces fonctionnelles et finitions (anglage, polissage, sablage).</li>
          </ul>

          <p className="text-gray-400 mt-4">
            Ces éléments rendent les plans horlogers uniques dans le domaine de la mécanique de précision.
          </p>
        </div>

        {/* FlipBook PDF à droite */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-[#E2B44F]/30 shadow-lg">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">
            Fiche PDF : Éléments spécifiques à l’horlogerie
          </h2>
          <FlipBookViewer file="/pdfs/lecture-de-plan/elements-horlogerie.pdf" />
        </div>
      </div>
    </section>
  );
}

