"use client";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function TypesLignes() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-16 py-16 text-white bg-[#0B0B0B]">
      <div>
        <h1 className="text-4xl font-bold text-gold-400 mb-6">Types de Lignes</h1>
        <p className="text-lg text-gray-300 mb-4">
          Les lignes techniques normalisées (norme <strong>ISO 128-2</strong>) indiquent la nature des
          contours, axes, coupes et arêtes dans les plans horlogers.
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Ligne continue épaisse : contours visibles.</li>
          <li>Ligne mixte longue/courte : axes de symétrie.</li>
          <li>Ligne fine : cotes, hachures et repères.</li>
        </ul>
      </div>
      <div>
        <FlipBookViewer pdfUrl="/pdfs/lecture-de-plan/types-lignes.pdf" />
      </div>
    </section>
  );
}
