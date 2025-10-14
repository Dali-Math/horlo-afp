"use client";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function ElementsHorlogerie() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-16 py-16 text-white bg-[#0B0B0B]">
      <div>
        <h1 className="text-4xl font-bold text-gold-400 mb-6">Éléments d’Horlogerie</h1>
        <p className="text-lg text-gray-300 mb-4">
          L’étude des éléments horlogers vise à identifier les composants d’un mouvement et leur
          représentation sur un plan.
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Lecture des ponts, rouages, vis, axes et ressorts.</li>
          <li>Symbolisation des liaisons et des ajustements.</li>
          <li>Identification fonctionnelle des composants.</li>
        </ul>
      </div>
      <div>
        <FlipBookViewer pdfUrl="/pdfs/lecture-de-plan/elements-horlogerie.pdf" />
      </div>
    </section>
  );
}
