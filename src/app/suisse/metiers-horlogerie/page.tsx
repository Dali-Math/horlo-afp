"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function MetiersHorlogerie() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-16 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Partie gauche : texte descriptif */}
        <div>
          <Link
            href="/suisse"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-yellow-400 hover:text-blue-800 dark:hover:text-yellow-200 transition mb-8"
          >
            <ArrowLeft className="w-5 h-5" /> Retour
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-blue-600 dark:text-yellow-400 w-7 h-7" />
            <h1 className="text-3xl font-bold text-blue-600 dark:text-yellow-400">
              Métiers de l'Horlogerie
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Le guide des <span className="text-blue-600 dark:text-yellow-400 font-semibold">Métiers de l'Horlogerie</span> explore les
            différentes professions de l'industrie suisse : horlogers, polisseurs,
            micro-mécaniciens et concepteurs.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Il offre une vision complète des formations disponibles et des
            opportunités offertes par ce secteur d'excellence.
          </p>
        </div>

        {/* Partie droite : flipbook PDF */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl border border-blue-500/30 dark:border-yellow-500/30 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-blue-600 dark:text-yellow-400 w-6 h-6" />
            <h2 className="text-xl font-semibold text-blue-600 dark:text-yellow-400">
              Guide complet des métiers horlogers suisses
            </h2>
          </div>
          <FlipBookViewer file="/pdfs/metiers-horlogerie.pdf" />
        </div>
      </div>
    </div>
  );
}
