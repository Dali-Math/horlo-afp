"use client";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function SymbolesNormalises() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-16 py-16 text-white bg-[#0B0B0B]">
      <div>
        <h1 className="text-4xl font-bold text-gold-400 mb-6">Symboles Normalisés</h1>
        <p className="text-lg text-gray-300 mb-4">
          Les symboles techniques sont utilisés pour représenter des états de surface, chanfreins,
          filetages et ajustements selon les normes <strong>ISO 1302</strong> et
          <strong> ISO 13715</strong>.
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Lecture des symboles de rugosité et de finition.</li>
          <li>Identification des filetages et repères d’usinage.</li>
          <li>Communication claire entre conception et fabrication.</li>
        </ul>
      </div>
      <div>
        <FlipBookViewer file="/pdfs/lecture-de-plan/symboles-normalises.pdf" />
      </div>
    </section>
  );
}
