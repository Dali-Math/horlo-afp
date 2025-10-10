"use client";
import React from "react";

export default function Huilage() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-gray-200 py-16 px-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-4 text-center">
        Huilage & Lubrification — Points Critiques
      </h1>

      <p className="text-gray-400 text-lg max-w-3xl text-center mb-10">
        Maîtrisez l'art du huilage horloger : points d'application, types d'huiles,
        dosage précis et techniques pour assurer la longévité du mouvement.
      </p>

      <div className="w-full max-w-4xl aspect-video mb-12">
        <iframe
          src="https://www.youtube.com/embed/lJ7aV8pDWYg"
          className="w-full h-full rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
      </div>

      <div className="max-w-3xl text-center space-y-4 mb-12">
        <p>
          💧 Le huilage est une opération délicate qui nécessite précision et expérience.
          Chaque pivot, chaque rubis reçoit une micro-goutte d'huile adaptée à sa fonction :
          huile fine pour l'échappement, huile moyenne pour le rouage, graisse pour le barillet.
        </p>
        <p>
          ⚙️ Un excès d'huile provoque l'étalement et attire la poussière. Un manque d'huile
          accélère l'usure. L'huileur doit déposer une quantité calibrée sur chaque point
          selon le plan de graissage du mouvement. La propreté est absolue avant huilage.
        </p>
      </div>

      <div className="bg-[#141414] p-6 rounded-2xl shadow-lg max-w-md text-center border border-[#E2B44F]/30">
        <h2 className="text-xl text-[#E2B44F] mb-3 font-semibold">Mini Quiz</h2>
        <p className="mb-4 text-gray-300">
          Pourquoi faut-il éviter l'excès d'huile dans un mouvement horloger ?
        </p>
        <ul className="space-y-2">
          <li className="cursor-pointer hover:text-[#E2B44F]">A. Cela ralentit le mouvement</li>
          <li className="cursor-pointer hover:text-[#E2B44F]">B. L'huile s'étale et attire la poussière</li>
          <li className="cursor-pointer hover:text-[#E2B44F]">C. Cela n'a pas d'importance</li>
        </ul>
      </div>
    </section>
  );
}
