"use client"; // ← Obligatoire pour utiliser useState dans une page Next.js 14+

import { useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react"; // icons lucide-react à installer

export default function CotesEtTolerancesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const erreurs = [
    "Oublier d’indiquer une tolérance sur une cote fonctionnelle.",
    "Définir une tolérance trop serrée (augmente le coût et les rejets).",
    "Choisir une tolérance trop large (crée un jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques (parallélisme, etc.).",
    "Mélanger les unités de mesure (mm et µm) sans le préciser.",
  ];

  const bonnes = [
    "Analyser la fonction de la pièce pour définir une tolérance juste.",
    "Utiliser les symboles et la syntaxe de la norme ISO appropriée.",
    "Toujours relire la cotation en pensant à l’assemblage final.",
    "Valider la faisabilité des tolérances avec l’atelier d’usinage.",
    "Faire contrôler ses plans par un pair avant la production.",
    "Rester cohérent dans les unités et la précision sur tout le plan.",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* --- Header --- */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">
            Cotes et Tolérances <span className="text-blue-600">(ISO 129-1 & 1101)</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
            Maîtrise les règles de cotation et les tolérances indispensables à la qualité en horlogerie : assemblage, usinage et contrôle dimensionnel.
          </p>
        </header>

        {/* --- Schéma Interactif avec Modal --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Schéma Interactif</h2>

          <div className="mb-4 cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <img
              src="/images/schema-cotes-tolerances.png"
              alt="Schéma des tolérances horlogères"
              className="mx-auto rounded-lg shadow max-w-md w-full hover:scale-105 transition-transform"
              style={{ minHeight: "200px" }}
            />
            <p className="text-gray-500 text-sm mt-2">
              Cliquez sur l’image pour afficher l’explication pédagogique.
            </p>
          </div>

          {/* Modal pédagogique */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Explication pédagogique</h3>
                <img
                  src="/images/schema-cotes-tolerances.png"
                  alt="Zoom schéma pédagogique"
                  className="w-full rounded"
                />
                <p className="mt-4 text-gray-600 text-sm">
                  Ce schéma illustre les cotes nominales, les tolérances dimensionnelles, ainsi que les jeux fonctionnels attendus en horlogerie. Il est crucial de comprendre comment la précision influe sur l’assemblage et la fiabilité des composants.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* --- Bonnes pratiques & erreurs --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-10 text-center">Mémo Technique : Erreurs & Bonnes Pratiques</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-red-600 text-lg font-semibold mb-4">
                <XCircle className="w-5 h-5" /> Erreurs fréquentes
              </h3>
              <ul className="space-y-3 text-gray-700">
                {erreurs.map((e, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 mt-1 text-red-400" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-green-700 text-lg font-semibold mb-4">
                <CheckCircle className="w-5 h-5" /> Bonnes pratiques
              </h3>
              <ul className="space-y-3 text-gray-700">
                {bonnes.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 mt-1 text-green-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Quiz --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Quiz : Teste tes connaissances</h2>
          <p className="text-gray-700 font-medium mb-4">
            Qu'appelle-t-on “<strong>cote nominale</strong>” ?
          </p>
          <div className="grid gap-4">
            {[
              "La dimension idéale sans tolérance",
              "La tolérance maximale autorisée",
              "L’écart entre deux dimensions",
            ].map((option, i) => (
              <button
                key={i}
                className="text-left py-3 px-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-all"
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        {/* --- Vidéo pédagogique --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Vidéo : Tolérance & Ajustement</h2>
          <div className="aspect-video overflow-hidden rounded-md border border-gray-200">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/0ddnQpKz_gU"
              title="Tolérances et ajustement"
              allowFullScreen
            />
          </div>
        </section>

        {/* --- Historique des normes --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Contexte & Origines des Normes</h2>
          <p className="text-gray-700 leading-relaxed">
            Les normes <strong>ISO 129-1</strong> et <strong>ISO 1101</strong> ont été introduites pour
            harmoniser la manière de représenter les dimensions, tolérances et spécifications
            géométriques sur les plans techniques. En horlogerie, leur application permet de garantir
            l'interchangeabilité des pièces, la fiabilité des assemblages et la précision des mouvements.
          </p>
        </section>

        {/* --- Tableau des tolérances --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Exemples de Tolérances en Horlogerie</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase tracking-wide text-xs">
                <tr>
                  <th className="px-4 py-3 border">Type de pièce</th>
                  <th className="px-4 py-3 border">Cote nominale</th>
                  <th className="px-4 py-3 border">Tolérance</th>
                  <th className="px-4 py-3 border">Fonction</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 border">Axe de balancier</td>
                  <td className="px-4 py-3 border">Ø 0.80 mm</td>
                  <td className="px-4 py-3 border">±0.005 mm</td>
                  <td className="px-4 py-3 border">Pivotement fluide</td>
                </tr>
                <tr className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 border">Trou de rubis</td>
                  <td className="px-4 py-3 border">Ø 0.20 mm</td>
                  <td className="px-4 py-3 border">+0.002 / -0 mm</td>
                  <td className="px-4 py-3 border">Guidage précis</td>
                </tr>
                <tr className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 border">Barillet</td>
                  <td className="px-4 py-3 border">Ø 10.00 mm</td>
                  <td className="px-4 py-3 border">±0.02 mm</td>
                  <td className="px-4 py-3 border">Stockage d’énergie</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Citation motivationnelle --- */}
        <section className="bg-blue-50 border border-blue-100 shadow-sm rounded-2xl p-8 text-center">
          <blockquote className="text-xl italic text-blue-900">
            “La précision n’est pas une option, c’est une exigence en horlogerie.”
          </blockquote>
          <p className="mt-4 text-blue-700 font-medium">— Principe fondamental de la cotation ISO</p>
        </section>

        {/* --- FAQ --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Questions fréquentes (FAQ)</h2>
          <div className="space-y-5 text-gray-700">
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="cursor-pointer font-medium text-blue-700">
                Quelle est la différence entre tolérance dimensionnelle et géométrique ?
              </summary>
              <p className="mt-2">
                La tolérance dimensionnelle concerne les tailles (longueur, diamètre) tandis que la géométrique garantit la forme (planéité, perpendicularité, etc.).
              </p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="cursor-pointer font-medium text-blue-700">
                Puis-je utiliser plusieurs unités sur un même plan ?
              </summary>
              <p className="mt-2">
                Oui, mais il faut clairement indiquer le changement d’unité pour éviter toute ambiguïté lors de la fabrication.
              </p>
            </details>
          </div>
        </section>

        {/* --- Appel à l'action --- */}
        <section className="text-center py-10">
          <p className="text-gray-600 text-lg mb-4">📘 Tu veux aller plus loin ?</p>
          <a
            href="https://www.iso.org/fr/standard/70382.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
          >
            Consulter la norme ISO 129-1 complète
          </a>
        </section>

        {/* --- Footer --- */}
        <footer className="text-center text-sm text-gray-500 mt-6">
          © HorloLearn 2025 — Normes ISO 129-1 & ISO 1101.
        </footer>
      </div>
    </main>
  );
}
