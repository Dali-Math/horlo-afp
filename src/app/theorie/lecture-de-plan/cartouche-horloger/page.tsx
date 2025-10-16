"use client";

import Image from "next/image";
import { useState } from "react";

export default function CartoucheHorloger() {
  const [zoom, setZoom] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-12 px-6">
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">
          Cartouche Horloger <span className="text-blue-500">(Normes techniques)</span>
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
          Le <strong>cartouche horloger</strong> est un élément essentiel d’un plan technique.
          Il regroupe les informations d’identification, de fabrication et de contrôle
          garantissant la traçabilité et la qualité du dessin.
        </p>
      </section>

      <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Schéma d’un Cartouche Horloger
        </h2>

        <div
          className={`relative flex justify-center transition-transform duration-300 ${
            zoom ? "scale-150" : "scale-100"
          }`}
        >
          <Image
            src="/images/cartouche-horloger.jpg"
            alt="Schéma du cartouche horloger"
            width={1000}
            height={400}
            className="rounded-lg border cursor-zoom-in hover:shadow-lg transition"
            onClick={() => setZoom(!zoom)}
          />
        </div>

        <p className="text-center text-gray-600 text-sm mt-3">
          Cliquez sur l’image pour agrandir ou réduire
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Lecture et signification des éléments du cartouche
        </h3>

        <table className="w-full border border-gray-300 text-left text-sm bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-gray-800 font-semibold">
            <tr>
              <th className="border border-gray-300 px-3 py-2 w-1/4">Repère</th>
              <th className="border border-gray-300 px-3 py-2">Signification</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-3 py-2">1. Matière</td><td className="border px-3 py-2">Indique la matière de la pièce (ex : acier, laiton, or, etc.)</td></tr>
            <tr><td className="border px-3 py-2">2. Type / Matière précise</td><td className="border px-3 py-2">Spécification détaillée du matériau utilisé</td></tr>
            <tr><td className="border px-3 py-2">3. Dessiné</td><td className="border px-3 py-2">Nom ou initiales du dessinateur technique, responsable du plan</td></tr>
            <tr><td className="border px-3 py-2">4. Contrôlé</td><td className="border px-3 py-2">Personne ayant vérifié le plan (QA, chef d’atelier, etc.)</td></tr>
            <tr><td className="border px-3 py-2">5. Échelle</td><td className="border px-3 py-2">Rapport d’échelle utilisé sur le plan (ex : 1:1, 10:1, etc.)</td></tr>
            <tr><td className="border px-3 py-2">6. Symbole normalisé</td><td className="border px-3 py-2">Symbole ISO indiquant la méthode de projection ou la vue</td></tr>
            <tr><td className="border px-3 py-2">7. Modification</td><td className="border px-3 py-2">Historique des révisions ou indices de modification (avec date)</td></tr>
            <tr><td className="border px-3 py-2">8. État de surface</td><td className="border px-3 py-2">Rugosité moyenne générale (ex : Ra 0,8 µm)</td></tr>
            <tr><td className="border px-3 py-2">9. Tolérances générales</td><td className="border px-3 py-2">Valeurs standard admises hors cotes particulières (ex : ±0,1 mm)</td></tr>
            <tr><td className="border px-3 py-2">10. Dimensions en mm</td><td className="border px-3 py-2">Unité utilisée pour toutes les cotes (obligatoire en horlogerie suisse)</td></tr>
            <tr><td className="border px-3 py-2">11. Tolérances sur dimensions</td><td className="border px-3 py-2">Tolérances spécifiques (souvent rangées par plages de dimensions)</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
