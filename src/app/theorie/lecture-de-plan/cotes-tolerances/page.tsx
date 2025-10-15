"use client";
import { useState } from "react";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";

export default function CotesEtTolerancesPage() {
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
    "Valider la faisabilité des tolérances avec l'atelier d'usinage.",
    "Faire contrôler ses plans par un pair avant la production.",
    "Rester cohérent dans les unités et la précision sur tout le plan.",
  ];

  const [progress, setProgress] = useState(40); // pourcentage fictif

  return (
    <div className="flex min-h-screen bg-neutral-100 text-neutral-800 font-[Inter]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col fixed left-0 top-0 bottom-0">
        <div className="px-6 py-5 border-b border-neutral-200">
          <h2 className="font-semibold text-lg text-yellow-700">HorloLearn AFP</h2>
          <p className="text-sm text-neutral-500">Module : Lecture de plan</p>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 text-sm">
          {[
            "Introduction",
            "Symboles ISO",
            "Cotes et tolérances",
            "Ajustements ISO",
            "Tolérances géométriques",
            "Erreurs fréquentes",
            "Quiz final",
          ].map((item, i) => (
            <button
              key={i}
              className={`block w-full text-left px-3 py-2 rounded-md transition ${
                item === "Cotes et tolérances"
                  ? "bg-yellow-50 text-yellow-700 font-medium"
                  : "hover:bg-neutral-50 text-neutral-600"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="text-center text-xs text-neutral-400 py-4 border-t border-neutral-200">
          © HorloLearn 2025
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-neutral-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-yellow-700">
              Cotes et Tolérances (ISO 129-1 & ISO 1101)
            </h1>
            <p className="text-sm text-neutral-500">Chapitre 3 sur 7 — Lecture de plan horlogère</p>
          </div>
          <div className="w-56 h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-yellow-500 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </header>

        {/* Content */}
        <section className="flex-1 overflow-y-auto p-10 space-y-10">
          {/* Schéma */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-700 mb-3">Schéma interactif</h2>
            <div className="flex justify-center">
              <img
                src="/images/cotes-tolerances/tuto.png"
                alt="Schéma de tolérances horlogères"
                className="rounded-md w-full max-w-md"
              />
            </div>
            <p className="text-sm text-neutral-500 text-center mt-3">
              Cliquez sur l'image pour afficher l'explication pédagogique.
            </p>
          </div>

          {/* Erreurs & bonnes pratiques */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-700 mb-6">
              Mémo technique : erreurs & bonnes pratiques
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="flex items-center gap-2 text-red-500 text-base font-medium mb-4">
                  <XCircle size={20} /> Erreurs fréquentes
                </h3>
                <ul className="space-y-3 text-neutral-700">
                  {erreurs.map((e, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle size={15} className="mt-1 text-red-400" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-green-600 text-base font-medium mb-4">
                  <CheckCircle size={20} /> Bonnes pratiques
                </h3>
                <ul className="space-y-3 text-neutral-700">
                  {bonnes.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={15} className="mt-1 text-green-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-700 mb-4">
              Quiz : teste tes connaissances
            </h2>
            <p className="font-medium text-neutral-700 mb-3">
              Qu'appelle-t-on “cote nominale” ?
            </p>
            <div className="space-y-2">
              <button className="w-full text-left py-2 px-3 rounded-md border border-neutral-200 hover:bg-yellow-50 transition">
                La dimension idéale sans tolérance
              </button>
              <button className="w-full text-left py-2 px-3 rounded-md border border-neutral-200 hover:bg-yellow-50 transition">
                La tolérance maximale autorisée
              </button>
              <button className="w-full text-left py-2 px-3 rounded-md border border-neutral-200 hover:bg-yellow-50 transition">
                L’écart entre deux dimensions
              </button>
            </div>
          </div>

          {/* Vidéo */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-700 mb-4">
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
          </div>
        </section>

        {/* Navigation */}
        <footer className="bg-white border-t border-neutral-200 p-4 flex items-center justify-between">
          <button className="flex items-center gap-2 text-neutral-600 hover:text-yellow-600 transition">
            <ChevronLeft size={18} /> Chapitre précédent
          </button>
          <button className="flex items-center gap-2 text-yellow-700 font-medium hover:text-yellow-600 transition">
            Chapitre suivant <ChevronRight size={18} />
          </button>
        </footer>
      </main>
    </div>
  );
}
