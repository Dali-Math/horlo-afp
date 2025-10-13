"use client";

import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function MetiersHorlogerie() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Colonne gauche */}
        <div>
          <Link
            href="/suisse"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-yellow-400 w-7 h-7" />
            <h1 className="text-3xl font-bold text-yellow-400">
              Métiers de l'Horlogerie
            </h1>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">
            Le guide des Métiers de l’Horlogerie explore les différentes
            professions de l’industrie suisse : horlogers, polisseurs,
            micro-mécaniciens et concepteurs. Il offre une vision complète des
            formations disponibles et des opportunités offertes par ce secteur
            d’excellence.
          </p>
        </div>

        {/* Colonne droite */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-yellow-500/30 shadow-lg">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            Guide complet des métiers horlogers suisses
          </h2>
          <FlipBookViewer file="/pdfs/metiers-horlogerie.pdf" />
        </div>
      </div>
    </section>
  );
}
