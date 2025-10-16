"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CartoucheHorlogerPage() {
  const [zoom, setZoom] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Bouton Retour */}
        <div className="mb-6">
          <Link
            href="/theorie/lecture-de-plan"
            className="text-blue-700 hover:underline flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </Link>
        </div>

        {/* Titre principal */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">
            Cartouche Horloger <span className="text-blue-600">(Normes techniques)</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
            Le <strong>cartouche horloger</strong> est un élément essentiel d’un plan technique.
            Il regroupe les informations d’identification, de fabrication et de contrôle qui garantissent la traçabilité et la qualité du dessin.
          </p>
        </header>

        {/* Section schéma avec zoom */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Schéma d’un Cartouche Horloger
          </h2>

          <div className="flex justify-center">
            <div
              className={`transition-transform duration-300 ease-in-out ${
                zoom ? "scale-125" : "scale-100"
              }`}
            >
              <Image
                src="/images/cartouche-horloger.jpg"
                alt="Schéma du cartouche horloger"
                width={700}
                height={350}
                className="rounded-lg border border-gray-300 shadow-md cursor-pointer hover:shadow-lg transition"
                onClick={() => setZoom(!zoom)}
              />
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            Cliquez sur l’image pour agrandir légèrement (zoom pédagogique).
          </p>
        </section>

        {/* Tableau explicatif */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
            Fiche technique – Lecture de plan : Le cartouche horloger
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-left text-sm bg-white shadow-sm rounded-lg overflow-hidden">
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
          </div>
        </section>

        {/* Astuce horlogère */}
        <section className="bg-blue-50 border border-blue-100 shadow-sm rounded-2xl p-8 text-center">
          <blockquote className="text-xl italic text-blue-900">
            “Un bon cartouche, c’est la carte d’identité du plan horloger.”
          </blockquote>
          <p className="mt-4 text-blue-700 font-medium">— Règle de base en dessin horloger</p>
        </section>

        {/* Lien ISO */}
        <section className="text-center py-10">
          <p className="text-gray-600 text-lg mb-4">📘 Pour aller plus loin :</p>
          <a
            href="https://www.iso.org/fr/standard/3362.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
          >
            Consulter la norme ISO 5457 (Cartouches techniques)
          </a>
        </section>

        <footer className="text-center text-sm text-gray-500 mt-6">
          © HorloLearn 2025 — Norme ISO 5457 / Pratiques horlogères suisses.
        </footer>
      </div>
    </main>
  );
}
