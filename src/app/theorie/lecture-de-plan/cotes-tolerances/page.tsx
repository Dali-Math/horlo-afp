"use client";

import { useState } from "react";

// Icônes simples
const XCircleIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);

const CheckCircleIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

export default function CotesEtTolerancesPage() {
  const erreurs = [
    "Oublier d’indiquer une tolérance sur une cote fonctionnelle.",
    "Définir une tolérance trop serrée (augmente le coût et les rejets).",
    "Choisir une tolérance trop large (crée un jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques (parallélisme, etc.).",
    "Mélanger les unités de mesure (mm et µm) sans le préciser.",
  ];

  const bonnesPratiques = [
    "Analyser la fonction de la pièce pour définir une tolérance juste.",
    "Utiliser les symboles et la syntaxe de la norme ISO appropriée.",
    "Toujours relire la cotation en pensant à l'assemblage final.",
    "Valider la faisabilité des tolérances avec l'atelier d'usinage.",
    "Faire contrôler ses plans par un pair avant la production.",
    "Rester cohérent dans les unités et la précision sur tout le plan.",
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-gray-100 font-sans">
      <section className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <a href="#" className="text-sm text-gray-500 hover:text-yellow-400 transition">
            ← Retour
          </a>
          <h1 className="text-4xl font-semibold text-yellow-400 mt-4 mb-3 leading-tight">
            Cotes et Tolérances <span className="text-gray-400">(ISO 129-1 & ISO 1101)</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            Ces normes précisent les règles de cotation et les tolérances indispensables à la qualité
            en horlogerie. Maîtrise-les pour comprendre l’assemblage, l’usinage et le contrôle
            dimensionnel des montres.
          </p>
        </header>

        {/* Schéma */}
        <section className="mb-24">
          <h2 className="text-xl font-semibold text-yellow-400 mb-6 border-l-4 border-yellow-400 pl-3">
            Schéma de principe
          </h2>
          <figure className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <img
              src="/images/cotes-tolerances/tuto.png"
              alt="Schéma des cotes et tolérances horlogères"
              className="rounded-md w-full max-w-md mx-auto"
            />
            <figcaption className="text-sm text-gray-500 text-center mt-3 italic">
              Cotes, tolérances et jeux fonctionnels en horlogerie.
            </figcaption>
          </figure>
        </section>

        {/* Fiche Erreurs & Bonnes pratiques */}
        <section className="mb-24">
          <h2 className="text-xl font-semibold text-yellow-400 mb-10 border-l-4 border-yellow-400 pl-3">
            Mémo technique : erreurs et bonnes pratiques
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Erreurs */}
            <div>
              <h3 className="flex items-center gap-2 text-red-400 text-lg font-medium mb-5">
                <XCircleIcon className="w-5 h-5" /> Erreurs fréquentes
              </h3>
              <ul className="space-y-3">
                {erreurs.map((e, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <XCircleIcon className="w-4 h-4 mt-1 text-red-400" />
                    <span className="text-gray-300 leading-relaxed">{e}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Bonnes pratiques */}
            <div>
              <h3 className="flex items-center gap-2 text-green-400 text-lg font-medium mb-5">
                <CheckCircleIcon className="w-5 h-5" /> Bonnes pratiques
              </h3>
              <ul className="space-y-3">
                {bonnesPratiques.map((b, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircleIcon className="w-4 h-4 mt-1 text-green-400" />
                    <span className="text-gray-300 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-24">
          <h2 className="text-xl font-semibold text-yellow-400 mb-6 border-l-4 border-yellow-400 pl-3">
            Quiz : teste tes connaissances
          </h2>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-gray-300 mb-4 font-medium">
              Qu'appelle-t-on “cote nominale” ?
            </p>
            <div className="space-y-2">
              <button className="w-full text-left py-2 px-4 rounded-md border border-neutral-800 bg-neutral-950 hover:border-yellow-400 hover:bg-neutral-800 transition">
                La dimension idéale sans tolérance
              </button>
              <button className="w-full text-left py-2 px-4 rounded-md border border-neutral-800 bg-neutral-950 hover:border-yellow-400 hover:bg-neutral-800 transition">
                La tolérance maximale autorisée
              </button>
              <button className="w-full text-left py-2 px-4 rounded-md border border-neutral-800 bg-neutral-950 hover:border-yellow-400 hover:bg-neutral-800 transition">
                L’écart entre deux dimensions
              </button>
            </div>
          </div>
        </section>

        {/* Vidéo */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-yellow-400 mb-6 border-l-4 border-yellow-400 pl-3">
            Vidéo pédagogique
          </h2>
          <div className="aspect-video max-w-3xl mx-auto rounded-lg overflow-hidden border border-neutral-800 bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/0ddnQpKz_gU"
              title="Tolérances et ajustement"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <footer className="border-t border-neutral-800 pt-8 text-sm text-gray-500 text-center">
          © HorloLearn 2025 — Références ISO 129-1 et ISO 1101.
        </footer>
      </section>
    </main>
  );
}
