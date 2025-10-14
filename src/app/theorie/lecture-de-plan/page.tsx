"use client";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function LectureDePlanIndex() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Titre principal */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-[#E2B44F] w-8 h-8" />
          <h1 className="text-4xl font-bold text-[#E2B44F]">Lecture de Plan Horloger</h1>
        </div>

        {/* Introduction */}
        <p className="text-gray-300 mb-10 max-w-3xl">
          Explorez les fondements de la lecture de plans techniques selon les normes ISO et NIHS.
          Chaque section ci-dessous ouvre une page dédiée contenant le résumé et les liens vers les
          documents officiels.
        </p>

        {/* Liste de sous-pages */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vues Techniques */}
          <Link
            href="/theorie/lecture-de-plan/vues-techniques"
            className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all block"
          >
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">📐 Vues Techniques</h2>
            <p className="text-gray-400">
              Comprendre les projections et coupes selon la norme ISO 128-3.
            </p>
          </Link>

          {/* Types de Lignes */}
          <Link
            href="/theorie/lecture-de-plan/types-lignes"
            className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all block"
          >
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">✏️ Types de Lignes</h2>
            <p className="text-gray-400">
              Identifier les lignes de contour, d’axe et de coupe selon ISO 128-2.
            </p>
          </Link>

          {/* Cotes et Tolérances */}
          <Link
            href="/theorie/lecture-de-plan/cotes-tolerances"
            className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all block"
          >
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">📏 Cotes et Tolérances</h2>
            <p className="text-gray-400">
              Lecture et interprétation des cotes selon ISO 129-1 et des tolérances géométriques ISO 1101.
            </p>
          </Link>

          {/* Symboles Normalisés */}
          <Link
            href="/theorie/lecture-de-plan/symboles-normalises"
            className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all block"
          >
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">🔣 Symboles Normalisés</h2>
            <p className="text-gray-400">
              Reconnaître les symboles ISO 1302 et 13715 utilisés en horlogerie.
            </p>
          </Link>

          {/* Cartouche Horloger */}
          <Link
            href="/theorie/lecture-de-plan/cartouche-horloger"
            className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all block"
          >
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">📄 Cartouche Horloger</h2>
            <p className="text-gray-400">
              Analyse du cartouche horloger selon les normes NIHS 7200 / 7201.
            </p>
          </Link>

          {/* Éléments d’Horlogerie */}
          <Link
            href="/theorie/lecture-de-plan/elements-horlogerie"
            className="p-6 bg-[#111827] rounded-xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all block"
          >
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">⚙️ Éléments d’Horlogerie</h2>
            <p className="text-gray-400">
              Lecture et identification des composants horlogers sur un plan technique.
            </p>
          </Link>
        </div>

        {/* Mention bas de page */}
        <p className="text-gray-500 text-sm mt-12 border-t border-gray-700 pt-6">
          © HorloLearn 2025 — Liens officiels vers les normes ISO et NIHS.
          Contenu pédagogique résumé à des fins de formation horlogère.
        </p>
      </div>
    </section>
  );
}
