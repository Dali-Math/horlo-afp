"use client";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useState } from "react";

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
            Maîtrise les règles de cotation et les tolérances indispensables à la qualité
            en horlogerie : assemblage, usinage et contrôle dimensionnel.
          </p>
        </header>

        {/* --- Schéma Interactif avec Modal --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Schéma Interactif</h2>

          <div className="mb-4 cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <img
              src="/images/cotes-tolerances/tuto.png"
              alt="Schéma des tolérances horlogères"
              className="mx-auto rounded-lg shadow max-w-md w-full hover:scale-105 transition-transform"
            />
            <p className="text-gray-500 text-sm mt-2">
              Cliquez sur l’image pour afficher l’explication pédagogique.
            </p>
          </div>

          {/* Seconde image (pas dans le modal) */}
          <div className="mt-8">
            <img
              src="/images/schema-cotes-tolerances.png"
              alt="Schéma cotes et tolérances horlogères"
              className="mx-auto rounded-lg shadow max-w-3xl w-full"
            />
          </div>
        </section>

        {/* --- Modal --- */}
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
                src="/images/cotes-tolerances/tuto.png"
                alt="Zoom schéma pédagogique"
                className="w-full rounded"
              />
              <p className="mt-4 text-gray-600 text-sm">
                Ce schéma illustre les cotes nominales, les tolérances dimensionnelles, ainsi que les jeux fonctionnels attendus en horlogerie. Il est crucial de comprendre comment la précision influe sur l’assemblage et la fiabilité des composants.
              </p>
            </div>
          </div>
        )}

        {/* 👇 Le reste de ton contenu continue ici (bonnes pratiques, quiz, vidéo, etc.) */}
        {/* Tu peux le coller ici, inchangé. Si tu veux que je l’inclus aussi, dis-le. */}

      </div>
    </main>
  );
}
