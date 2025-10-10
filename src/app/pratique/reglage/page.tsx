"use client";
import React from "react";

export default function Reglage() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-gray-200 py-16 px-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-4 text-center">
        Réglage & Précision — Ajustement du Balancier
      </h1>

      <p className="text-gray-400 text-lg max-w-3xl text-center mb-10">
        Techniques d'ajustement du balancier-spiral pour corriger l'avance et le retard,
        avec les méthodes de réglage en différentes positions et températures.
      </p>

      <div className="w-full max-w-4xl aspect-video mb-12">
        <iframe
          src="https://www.youtube.com/embed/N8VrhqwfSWw"
          className="w-full h-full rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
      </div>

      <div className="max-w-3xl text-center space-y-4 mb-12">
        <p>
          🎯 Le réglage horloger consiste à ajuster la marche d'une montre pour obtenir
          une précision optimale. Cela implique de modifier la longueur active du spiral
          via la raquette ou les vis de balancier.
        </p>
        <p>
          ⚖️ On teste la marche en plusieurs positions (cadran haut, cadran bas, couronne haute)
          et on ajuste progressivement jusqu'à obtenir un écart minimal. La température
          influence également la précision et doit être prise en compte.
        </p>
      </div>

      <div className="bg-[#141414] p-6 rounded-2xl shadow-lg max-w-md text-center border border-[#E2B44F]/30">
        <h2 className="text-xl text-[#E2B44F] mb-3 font-semibold">Mini Quiz</h2>
        <p className="mb-4 text-gray-300">
          Pour ralentir une montre qui avance, que faut-il faire ?
        </p>
        <ul className="space-y-2">
          <li className="cursor-pointer hover:text-[#E2B44F]">A. Raccourcir la longueur du spiral</li>
          <li className="cursor-pointer hover:text-[#E2B44F]">B. Allonger la longueur du spiral</li>
          <li className="cursor-pointer hover:text-[#E2B44F]">C. Retirer des vis du balancier</li>
        </ul>
      </div>
    </section>
  );
}
