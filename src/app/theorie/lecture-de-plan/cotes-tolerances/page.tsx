"use client";
import Link from "next/link";

export default function CotesTolerances() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/theorie/lecture-de-plan" className="text-[#E2B44F] hover:underline flex items-center gap-2">
            ← Retour
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#E2B44F] underline mb-6 text-center">
          Cotes et Tolérances (ISO 129-1 & ISO 1101)
</h1>

        <p className="text-gray-300 mb-6">
          Ces normes précisent les règles de cotation et les tolérances dimensionnelles pour garantir 
          la compatibilité et la précision des composants horlogers.
        </p>

        <ul className="list-disc pl-6 text-gray-400 space-y-2">
          <li><strong>ISO 129-1</strong> : indication des dimensions.</li>
          <li><strong>ISO 1101</strong> : tolérances géométriques.</li>
          <li>Respect des limites d’usinage et d’ajustement entre pièces.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
          © HorloLearn 2025 — Résumé pédagogique basé sur les normes ISO 129-1:2018 & ISO 1101:2017.
        </p>
      </div>
    </section>
  );
}
