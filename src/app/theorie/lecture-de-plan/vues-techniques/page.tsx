"use client";
import Link from "next/link";
import { ArrowLeft, Layout } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function VuesTechniques() {
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
            <Layout className="text-[#E2B44F] w-7 h-7" />
            <h1 className="text-3xl font-bold text-[#E2B44F]">
              Les vues techniques (projection orthogonale)
            </h1>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Les vues techniques permettent de représenter un objet en deux dimensions selon plusieurs perspectives.
            En horlogerie, la précision des vues est essentielle pour interpréter correctement les plans de fabrication.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
            <li>Vue de face : représentation principale de la pièce.</li>
            <li>Vue de dessus et vue de gauche : projections orthogonales associées.</li>
            <li>Vue en coupe : révèle les détails internes de la pièce.</li>
            <li>Vue partielle : utilisée pour des zones précises.</li>
          </ul>

          <p className="text-gray-400 mt-4">
            Ces conventions assurent la cohérence entre le dessin technique et la réalité mécanique.
          </p>
        </div>

        {/* FlipBook PDF à droite */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-[#E2B44F]/30 shadow-lg">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">
            Fiche PDF : Vues techniques
          </h2>
          <FlipBookViewer file="/pdfs/lecture-de-plan/vues-techniques.pdf" />
        </div>
      </div>
    </section>
  );
}

