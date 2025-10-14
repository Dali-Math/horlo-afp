"use client";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function CotesTolerances() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-16 py-16 text-white bg-[#0B0B0B]">
      <div>
        <h1 className="text-4xl font-bold text-gold-400 mb-6">Cotes et Tolérances</h1>
        <p className="text-lg text-gray-300 mb-4">
          Les cotes et tolérances assurent la précision d’assemblage des composants horlogers.
          Références : <strong>ISO 129-1</strong> et <strong>ISO 1101</strong>.
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Lecture des cotes nominales, limites et ajustements.</li>
          <li>Tolérances dimensionnelles et géométriques (planéité, coaxialité).</li>
          <li>Importance dans l’ajustement des mobiles et des ponts.</li>
        </ul>
      </div>
      <div>
        <FlipBookViewer file="/pdfs/lecture-de-plan/cotes-tolerances.pdf" />
      </div>
    </section>
  );
}
