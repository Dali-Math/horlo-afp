"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import dynamic from "next/dynamic";

// On charge FlipBookViewer sans SSR pour éviter les erreurs Next.js
const FlipBookViewer = dynamic(() => import("@/components/FlipBookViewer"), { ssr: false });

export default function RapportFHH() {
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
            <FileText className="text-yellow-400 w-7 h-7" />
            <h1 className="text-3xl font-bold text-yellow-400">
              Rapport FHH 2024
            </h1>
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            Le <span className="text-yellow-400 font-semibold">Rapport FHH 2024</span> présente
            les chiffres clés, les tendances et les perspectives de l’industrie
            horlogère suisse. Il s’agit d’une ressource précieuse pour comprendre
            l’évolution du secteur et ses dynamiques économiques.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Publié par la Fondation de la Haute Horlogerie, ce rapport met en lumière
            les innovations, les marchés émergents et les défis auxquels les maisons
            suisses font face dans un contexte mondial en mutation.
          </p>
        </div>

        {/* Partie droite : flipbook PDF */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-yellow-500/30 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-yellow-400 w-6 h-6" />
            <h2 className="text-xl font-semibold text-yellow-400">
              Rapport Annuel de la Fondation de la Haute Horlogerie
            </h2>
          </div>

          {/* Le bon chemin du PDF */}
          <FlipBookViewer file="/pdfs/rapport-fhh.pdf" />
        </div>
      </div>
    </div>
  );
}
