"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function MetiersHorlogerie() {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Partie gauche : description */}
        <div>
          <Link
            href="/suisse"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition mb-8"
          >
            <ArrowLeft className="w-5 h-5" /> Retour
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-yellow-400 w-7 h-7" />
            <h1 className="text-3xl font-bold text-yellow-400">
              Métiers de l'Horlogerie
            </h1>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Ce guide complet présente les différents métiers de l’horlogerie
            suisse, les compétences requises et les parcours de formation.
            Réalisé pour les futurs professionnels et les passionnés,
            il met en valeur l’excellence artisanale et technique suisse.
          </p>
        </div>

        {/* Partie droite : flipbook PDF */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-yellow-500/30 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-yellow-400 w-6 h-6" />
            <h2 className="text-xl font-semibold text-yellow-400">
              Guide des Métiers Horlogers
            </h2>
          </div>
          <FlipBookViewer file="/pdfs/metiers-horlogerie.pdf" />
        </div>
      </div>
    </div>
  );
}
