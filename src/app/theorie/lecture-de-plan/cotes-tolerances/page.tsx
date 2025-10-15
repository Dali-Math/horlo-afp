"use client";
import { useState } from "react";
import { CheckCircle, XCircle, PlayCircle } from "lucide-react";

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
    <main className="min-h-screen bg-neutral-100 text-neutral-800 font-[Inter] px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-bold text-yellow-600 mb-3">
            Cotes et Tolérances <span className="text-neutral-600">(ISO 129-1 & ISO 1101)</span>
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Ces normes précisent les règles de cotation et les tolérances indispensables à la qualité
            en horlogerie. Maîtrise-les pour comprendre l’assemblage, l’usinage et le contrôle
            dimensionnel des montres.
          </p>
        </header>

        {/* Schéma */}
        <section className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-yellow-700 mb-4 border-l-4 border-yellow-600 pl-3">
            Schéma interactif
          </h2>
          <div className="flex justify-center">
            <img
              src="/images/cotes-tolerances/tuto.png"
              alt="Schéma des cotes et tolérances horlogères"
              className="rounded-md max-w-md w-full"
            />
          </div>
          <p className="text-sm text-neutral-500 text-center mt-3">
            Cliquez sur l'image pour afficher l'explication pédagogique.
          </p>
        </section>

        {/* Fiche erreurs & bonnes pratiques */}
        <section className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-yellow-700 mb-8 border-l-4 border-yellow-600 pl-3">
            Mémo technique : erreurs et bonnes pratiques
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Erreurs */}
            <div>
              <h3 className="flex items-center gap-2 text-red-500 text-lg font-medium mb-4">
                <XCircle size={22} /> Erreurs fréquentes
              </h3>
              <ul className="space-y-3">
                {erreurs.map((e, i) => (
                  <li key={i} className="flex gap-2 items-start text-neutral-700">
                    <XCircle size={16} className="mt-1 text-red-400" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bonnes pratiques */}
            <div>
              <h3 className="flex items-center gap-2 text-green-600 text-lg font-medium mb-4">
                <CheckCircle size={22} /> Bonnes pratiques
              </h3>
              <ul className="space-y-3">
                {bonnesPratiques.map((b, i) => (
                  <li key={i} className="flex gap-2 items-start text-neutral-700">
                    <CheckCircle size={16} className="mt-1 text-green-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-yellow-700 mb-4 border-l-4 border-yellow-600 pl-3">
            Quiz : teste tes connaissances
          </h2>
          <div className="space-y-3">
            <p className="font-medium text-neutral-700">
              Qu'appelle-t-on “cote nominale” ?
            </p>
            <div className="grid gap-2">
              <button className="text-left py-2 px-3 rounded-md border border-neutral-200 hover:bg-yellow-50 transition">
                La dimension idéale sans tolérance
              </button>
              <button className="text-left py-2 px-3 rounded-md border border-neutral-200 hover:bg-yellow-50 transition">
                La tolérance maximale autorisée
              </button>
              <button className="text-left py-2 px-3 rounded-md border border-neutral-200 hover:bg-yellow-50 transition">
                L’écart entre deux dimensions
              </button>
            </div>
          </div>
        </section>

        {/* Vidéo */}
        <section className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-yellow-700 mb-4 border-l-4 border-yellow-600 pl-3">
            Vidéo pédagogique
          </h2>
          <div className="aspect-video rounded-md overflow-hidden border border-neutral-200">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/0ddnQpKz_gU"
              title="Tolérances et ajustement"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-neutral-500 mt-10">
          © HorloLearn 2025 — Références ISO 129-1 et ISO 1101.
        </footer>
      </div>
    </main>
  );
}
