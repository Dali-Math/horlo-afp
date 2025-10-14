"use client";
import Link from "next/link";

export default function SymbolesNormalises() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/theorie/lecture-de-plan" className="text-[#E2B44F] hover:underline flex items-center gap-2">
            ← Retour
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#E2B44F] underline mb-6 text-center">
          Symboles Normalisés (ISO 1302 & ISO 13715)
</h1>

        <p className="text-gray-300 mb-6">
          Les symboles normalisés indiquent les états de surface, chanfreins, filetages et autres détails 
          mécaniques selon les normes <strong>ISO 1302</strong> et <strong>ISO 13715</strong>.
        </p>

        <ul className="list-disc pl-6 text-gray-400 space-y-2">
          <li>ISO 1302 : rugosité et qualité de surface.</li>
          <li>ISO 13715 : bords, arêtes et chanfreins.</li>
          <li>Identification normalisée sur les plans horlogers.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
          © HorloLearn 2025 — Résumé pédagogique basé sur les normes ISO 1302:2002 & ISO 13715:2019.
        </p>
      </div>
    </section>
  );
}
