"use client";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

export default function CartoucheHorlogerPage() {
  const [openImg, setOpenImg] = useState(false);

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
            Il regroupe les informations d’identification, de fabrication et de contrôle
            qui garantissent la traçabilité et la qualité du dessin.
          </p>
        </header>

        {/* Schéma avec zoom */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Schéma d’un Cartouche Horloger</h2>

          <button
            onClick={() => setOpenImg(true)}
            className="block mx-auto rounded-lg shadow hover:shadow-md transition"
            title="Cliquer pour agrandir"
          >
            <img
              src="/images/schema-cartouche-horloger.png"
              alt="Schéma du cartouche horloger"
              className="mx-auto rounded-lg max-w-2xl w-full border border-gray-200"
            />
          </button>

          <p className="text-gray-500 text-sm mt-4">
            Exemple type d’un cartouche utilisé en horlogerie suisse.
          </p>

          {openImg && (
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              onClick={() => setOpenImg(false)}
            >
              <div
                className="bg-white p-3 rounded-lg shadow-xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setOpenImg(false)}
                  className="absolute -top-3 -right-3 bg-white border rounded-full p-1 shadow hover:bg-slate-50"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                <img
                  src="/images/cartouche-horloger.png"
                  alt="Schéma du cartouche horloger agrandi"
                  className="rounded-md"
                  style={{ transform: "scale(1.5)", transformOrigin: "top left" }}
                />
              </div>
            </div>
          )}
        </section>

        {/* Vidéo pédagogique */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Vidéo : Cartouche & Lecture de plan
          </h2>
          <div className="aspect-video overflow-hidden rounded-md border border-gray-200">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/watch?v=tatCrJPJGl4"
              title="Cartouche & Lecture de plan"
              allowFullScreen
            />
          </div>
          <a
            href="https://www.youtube.com/watch?v=tatCrJPJGl4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-800 transition"
          >
            🔗 Ouvrir sur YouTube
          </a>
        </section>

        {/* Citation horlogère */}
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
