"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function SchemaInteractif() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-[#111624] border border-[#1f2637] rounded-2xl p-10 text-center shadow-lg">
      <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">Schéma Interactif</h2>

      <div className="mb-4 cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <img
          src="/images/schema-cotes-tolerances.png"
          alt="Schéma des tolérances horlogères"
          className="mx-auto rounded-lg shadow-lg max-w-md w-full hover:scale-105 transition-transform"
        />
        <p className="text-gray-500 text-sm mt-2">
          Cliquez sur l’image pour afficher l’explication pédagogique.
        </p>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#1a2235] p-6 rounded-lg shadow-xl max-w-lg w-full relative text-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-semibold text-[#E2B44F] mb-4">
              Explication pédagogique
            </h3>
            <img
              src="/images/schema-cotes-tolerances.png"
              alt="Mini schéma pédagogique"
              className="w-32 mx-auto rounded mb-5"
            />
            <div className="text-sm leading-relaxed text-gray-300 space-y-2">
              <p>
                Les <b>cotes et tolérances</b> assurent l’ajustement et la fonction correcte
                des composants. Une tolérance bien choisie équilibre précision, coût et
                facilité d’assemblage.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <b>Cote nominale :</b> valeur idéale théorique.
                </li>
                <li>
                  <b>Tolérance :</b> intervalle admissible autour de la cote
                  (ex. ±0.02 mm).
                </li>
                <li>
                  <b>Tolérances géométriques :</b> exigences de forme et position
                  (planéité, parallélisme…).
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

