"use client";
import Link from "next/link";

export default function CartoucheHorloger() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/theorie/lecture-de-plan" className="text-[#E2B44F] hover:underline flex items-center gap-2">
            ← Retour
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#E2B44F] underline mb-6 text-center">
          Cartouche Horloger (NIHS 7200 / 7201)
</h1>

        <p className="text-gray-300 mb-6">
          Le cartouche horloger regroupe les informations techniques essentielles : titre, échelle, matière, 
          auteur, date et révision, selon les normes <strong>NIHS 7200</strong> et <strong>NIHS 7201</strong>.
        </p>

        <ul className="list-disc pl-6 text-gray-400 space-y-2">
          <li>Identification du dessin et du mouvement.</li>
          <li>Standardisation pour l’industrie horlogère suisse.</li>
          <li>Conformité à la présentation NIHS.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
          © HorloLearn 2025 — Résumé pédagogique basé sur les normes NIHS 7200 & 7201.
        </p>
      </div>
    </section>
  );
}
