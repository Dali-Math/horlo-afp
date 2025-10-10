"use client";
import React from "react";

export default function Outils() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-gray-200 py-16 px-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-4 text-center">
        Outils & Équipement — L'Essentiel de l'Horloger
      </h1>

      <p className="text-gray-400 text-lg max-w-3xl text-center mb-10">
        Découvrez les outils essentiels de l'horloger : tournevis, pinces,
        huileurs, loupes et plus encore. Apprenez leur usage et leur entretien.
      </p>

      <div className="w-full max-w-4xl aspect-video mb-12">
        <iframe
          src="https://www.youtube.com/embed/9g8qKJH_E6s"
          className="w-full h-full rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
      </div>

      <div className="max-w-3xl text-center space-y-4 mb-12">
        <p>
          🔧 Les outils de base incluent : tournevis de précision (différents calibres),
          brucelles (pinces fines), casse-goupilles, chasse-goupilles, et un étau d'établi.
          Chaque outil demande une manipulation délicate pour éviter d'endommager les composants.
        </p>
        <p>
          🔬 La loupe binoculaire et les verres grossissants sont indispensables pour
          observer les détails microscopiques. Les huileurs permettent de doser précisément
          l'huile sur chaque pivot. Un bon horloger entretient ses outils avec soin.
        </p>
      </div>

      <div className="bg-[#141414] p-6 rounded-2xl shadow-lg max-w-md text-center border border-[#E2B44F]/30">
        <h2 className="text-xl text-[#E2B44F] mb-3 font-semibold">Mini Quiz</h2>
        <p className="mb-4 text-gray-300">
          Quel outil utilise-t-on pour manipuler les petites pièces d'horlogerie ?
        </p>
        <ul className="space-y-2">
          <li className="cursor-pointer hover:text-[#E2B44F]">A. Un tournevis</li>
          <li className="cursor-pointer hover:text-[#E2B44F]">B. Des brucelles (pinces fines)</li>
          <li className="cursor-pointer hover:text-[#E2B44F]">C. Un huileur</li>
        </ul>
      </div>
    </section>
  );
}
