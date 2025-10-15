"use client";
import Link from "next/link";

export default function TypesLignes() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/theorie/lecture-de-plan" className="text-[#E2B44F] hover:underline flex items-center gap-2">
            ← Retour
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#E2B44F] underline mb-6 text-center">
          Types de Lignes (ISO 128-2)
</h1>

        <p className="text-gray-300 mb-6">
          Les lignes techniques définies par la norme <strong>ISO 128-2</strong> indiquent la nature des contours, axes et arêtes dans les dessins horlogers.
        </p>

        <ul className="list-disc pl-6 text-gray-400 space-y-2">
          <li>Ligne continue épaisse : contours visibles.</li>
          <li>Ligne mixte longue/courte : axes de symétrie.</li>
          <li>Ligne fine : cotes, hachures et repères.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
          © HorloLearn 2025 — Résumé pédagogique basé sur la norme ISO 128-2:2020.
        </p>
      </div>
    </section>
  );
}
