"use client";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function VuesTechniques() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-16 py-16 text-white bg-[#0B0B0B]">
      <div>
        <h1 className="text-4xl font-bold text-gold-400 mb-6">Vues Techniques</h1>
        <p className="text-lg text-gray-300 mb-4">
          Les vues techniques permettent de représenter un objet horloger sous différents angles,
          selon la norme <strong>ISO 128-3</strong>. Elles sont indispensables pour comprendre la
          structure et les détails internes d’un mouvement.
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Vue de face, de dessus et de profil.</li>
          <li>Projections orthogonales et coupes transversales.</li>
          <li>Identification précise des volumes et des axes de perçage.</li>
        </ul>
      </div>
      <div>
        <FlipBookViewer file="/pdfs/lecture-de-plan/vues-techniques.pdf" />
      </div>
    </section>
  );
}
