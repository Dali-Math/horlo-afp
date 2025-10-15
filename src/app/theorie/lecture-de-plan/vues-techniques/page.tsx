"use client";
import Link from "next/link";

export default function VuesTechniques() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/theorie/lecture-de-plan" className="text-[#E2B44F] hover:underline flex items-center gap-2">
            ← Retour
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#E2B44F] underline mb-6 text-center">
          Vues Techniques (ISO 128-3)
</h1>

        <p className="text-gray-300 mb-6">
          Les vues techniques permettent de représenter un objet horloger sous différents angles selon la norme <strong>ISO 128-3</strong>. 
          Elles sont essentielles pour comprendre la géométrie, les volumes et les détails internes d’un mouvement.
        </p>

        <ul className="list-disc pl-6 text-gray-400 space-y-2">
          <li>Vue de face, de dessus et de profil.</li>
          <li>Projections orthogonales et coupes transversales.</li>
          <li>Identification des volumes et axes de perçage.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
          © HorloLearn 2025 — Résumé pédagogique basé sur la norme ISO 128-3:2020.
        </p>
      </div>
    </section>
  );
}
