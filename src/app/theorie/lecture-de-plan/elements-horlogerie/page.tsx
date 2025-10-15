"use client";
import Link from "next/link";

export default function ElementsHorlogerie() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/theorie/lecture-de-plan" className="text-[#E2B44F] hover:underline flex items-center gap-2">
            ← Retour
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#E2B44F] underline mb-6 text-center">
          Éléments d’Horlogerie (Normes NIHS)
</h1>

        <p className="text-gray-300 mb-6">
          Les éléments d’horlogerie regroupent les composants standardisés (roues, vis, axes, ressorts, etc.) 
          utilisés dans la construction des mouvements mécaniques suisses.
        </p>

        <ul className="list-disc pl-6 text-gray-400 space-y-2">
          <li>Respect des dimensions et tolérances NIHS.</li>
          <li>Interopérabilité entre les fabricants.</li>
          <li>Références communes pour les écoles et ateliers horlogers.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
          © HorloLearn 2025 — Résumé pédagogique basé sur les normes NIHS applicables aux composants horlogers.
        </p>
      </div>
    </section>
  );
}
