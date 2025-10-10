"use client";
import React from "react";

export default function Fiches() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-gray-200 py-16 px-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-4 text-center">
        Fiches Techniques — Mouvements & Spécifications
      </h1>

      <p className="text-gray-400 text-lg max-w-3xl text-center mb-10">
        Consultez les fiches techniques détaillées des principaux mouvements horlogers :
        caractéristiques, dimensions, points de huilage et schémas explicatifs.
      </p>

      <div className="w-full max-w-4xl aspect-video mb-12">
        <iframe
          src="https://www.youtube.com/embed/508HjJjYLgk"
          className="w-full h-full rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
      </div>

      <div className="max-w-4xl text-center space-y-6 mb-12">
        <div className="bg-[#141414] p-6 rounded-xl border border-[#E2B44F]/20">
          <h3 className="text-xl text-[#E2B44F] mb-3 font-semibold">ETA 6497 / 6498</h3>
          <p className="text-gray-300">
            Mouvement mécanique à remontage manuel, 17 rubis, 21’600 alternances/heure,
            réserve de marche 42-46h. Diamètre 36,60mm, hauteur 4,50mm.
          </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-[#E2B44F]/20">
          <h3 className="text-xl text-[#E2B44F] mb-3 font-semibold">ETA 2824-2</h3>
          <p className="text-gray-300">
            Mouvement automatique, 25 rubis, 28’800 alternances/heure,
            réserve de marche 38h. Diamètre 25,60mm, hauteur 4,60mm.
          </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-[#E2B44F]/20">
          <h3 className="text-xl text-[#E2B44F] mb-3 font-semibold">Sellita SW200-1</h3>
          <p className="text-gray-300">
            Mouvement automatique compatible ETA 2824, 26 rubis, 28’800 alt/h,
            réserve de marche 38h. Alternative fiable et précise.
          </p>
        </div>
      </div>

      <div className="bg-[#141414] p-6 rounded-2xl shadow-lg max-w-md text-center border border-[#E2B44F]/30">
        <h2 className="text-xl text-[#E2B44F] mb-3 font-semibold">Mini Quiz</h2>
        <p className="mb-4 text-gray-300">
          Quelle est la fréquence d'oscillation du mouvement ETA 2824-2 ?
        </p>
        <ul className="space-y-2">
          <li className="cursor-pointer hover:text-[#E2B44F]">A. 21’600 alternances/heure</li>
          <li className="cursor-pointer hover:text-[#E2B44F]">B. 28’800 alternances/heure</li>
          <li className="cursor-pointer hover:text-[#E2B44F]">C. 36’000 alternances/heure</li>
        </ul>
      </div>
    </section>
  );
}
