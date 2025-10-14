"use client";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function CartoucheHorloger() {
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
            <FileText className="text-[#E2B44F] w-7 h-7" />
            <h1 className="text-3xl font-bold text-[#E2B44F]">Le cartouche horloger</h1>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Le cartouche est une partie essentielle d’un plan horloger.  
            Il regroupe toutes les informations de référence nécessaires à la compréhension du dessin et à la production de la pièce.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
            <li>Nom de la pièce et numéro de référence.</li>
            <li>Échelle de représentation (souvent 10:1 ou 20:1).</li>
            <li>Matière, traitement thermique ou finition.</li>
            <li>Nom du dessinateur, date, vérification et approbation.</li>
            <li>Numéro de plan, version et révision.</li>
          </ul>

          <p className="text-gray-400 mt-4">
            Ces informations assurent la traçabilité et la qualité de la production horlogère.
          </p>
        </div>

        {/* FlipBook PDF à droite */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-[#E2B44F]/30 shadow-lg">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">
            Exemple de cartouche horloger
          </h2>
          <FlipBookViewer file="/pdfs/lecture-de-plan/cartouche-horloger.pdf" />
        </div>
      </div>
    </section>
  );
}

