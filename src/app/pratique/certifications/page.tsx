"use client";
import React from "react";

export default function Certifications() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-gray-200 py-16 px-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-4 text-center">
        Certifications & Diplômes — Parcours Horloger
      </h1>

      <p className="text-gray-400 text-lg max-w-3xl text-center mb-10">
        Découvrez les principales certifications horlogères reconnues en Suisse et à l'international :
        AFP, CFC, FHH, WOSTEP et autres formations qualifiantes du secteur.
      </p>

      <div className="w-full max-w-4xl aspect-video mb-12">
        <iframe
          src="https://www.youtube.com/embed/mYLnPEjzW9M"
          className="w-full h-full rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
      </div>

      <div className="max-w-4xl text-center space-y-6 mb-12">
        <div className="bg-[#141414] p-6 rounded-xl border border-[#E2B44F]/20">
          <h3 className="text-xl text-[#E2B44F] mb-3 font-semibold">AFP — Attestation Fédérale de Formation Professionnelle</h3>
          <p className="text-gray-300">
            Formation de base de 2 ans permettant d'acquérir les compétences essentielles en horlogerie.
            Première étape vers une carrière dans le domaine horloger.
          </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-[#E2B44F]/20">
          <h3 className="text-xl text-[#E2B44F] mb-3 font-semibold">CFC — Certificat Fédéral de Capacité</h3>
          <p className="text-gray-300">
            Diplôme principal des horlogers en Suisse. Formation complète de 3-4 ans couvrant
            tous les aspects du métier : réparation, entretien, restauration et fabrication.
          </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-[#E2B44F]/20">
          <h3 className="text-xl text-[#E2B44F] mb-3 font-semibold">FHH — Fondation de la Haute Horlogerie</h3>
          <p className="text-gray-300">
            Organisation internationale promouvant l'excellence horlogère et proposant des
            formations spécialisées et des certifications reconnues mondialement.
          </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-[#E2B44F]/20">
          <h3 className="text-xl text-[#E2B44F] mb-3 font-semibold">WOSTEP — Watchmakers of Switzerland Training Program</h3>
          <p className="text-gray-300">
            Formation technique avancée de 3000 heures, reconnue internationalement. Forme des
            horlogers spécialisés capables de travailler sur tous types de montres mécaniques.
          </p>
        </div>
      </div>

      <div className="bg-[#141414] p-6 rounded-2xl shadow-lg max-w-md text-center border border-[#E2B44F]/30">
        <h2 className="text-xl text-[#E2B44F] mb-3 font-semibold">Mini Quiz</h2>
        <p className="mb-4 text-gray-300">
          Quelle est la durée typique d'une formation CFC en horlogerie ?
        </p>
        <ul className="space-y-2">
          <li className="cursor-pointer hover:text-[#E2B44F]">A. 1-2 ans</li>
          <li className="cursor-pointer hover:text-[#E2B44F]">B. 3-4 ans</li>
          <li className="cursor-pointer hover:text-[#E2B44F]">C. 5-6 ans</li>
        </ul>
      </div>
    </section>
  );
}
