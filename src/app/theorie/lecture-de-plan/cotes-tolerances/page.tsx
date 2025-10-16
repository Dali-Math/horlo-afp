"use client";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export default function CotesEtTolerancesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const erreurs = [
    "Oublier d'indiquer une tolérance sur une cote fonctionnelle.",
    "Définir une tolérance trop serrée (augmente le coût et les rejets).",
    "Choisir une tolérance trop large (crée un jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques (parallélisme, etc.).",
    "Mélanger les unités de mesure (mm et µm) sans le préciser.",
  ];

  const bonnes = [
    "Analyser la fonction de la pièce pour définir une tolérance juste.",
    "Utiliser les symboles et la syntaxe de la norme ISO appropriée.",
    "Toujours relire la cotation en pensant à l'assemblage final.",
    "Valider la faisabilité des tolérances avec l'atelier d'usinage.",
    "Faire contrôler ses plans par un pair avant la production.",
    "Rester cohérent dans les unités et la précision sur tout le plan.",
  ];

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-gray-200 px-6 py-16 font-sans">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="mb-6">
          <Link
            href="/theorie/lecture-de-plan"
            className="flex items-center gap-2 px-4 py-2 bg-[#1c2230] text-gray-300 rounded-lg hover:bg-[#2a3242] hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </Link>
        </div>

        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#E2B44F]">
            Cotes et Tolérances <span className="text-gray-400">(ISO 129-1 & 1101)</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Maîtrise les règles de cotation et les tolérances indispensables à la qualité en horlogerie :
            assemblage, usinage et contrôle dimensionnel.
          </p>
        </header>

        <section className="bg-[#121826] border border-[#1f2637] rounded-2xl p-10 text-center shadow-lg">
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
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
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
                <h3 className="text-xl font-semibold text-[#E2B44F] mb-4">Explication pédagogique</h3>
                <p className="leading-relaxed text-sm">
                  Les <b>cotes et tolérances</b> assurent la précision dimensionnelle des composants.
                  Une tolérance bien choisie équilibre qualité, coût et facilité d’assemblage.
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="bg-[#121826] border border-[#1f2637] shadow-lg rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-10 text-center">
            Mémo Technique : Erreurs & Bonnes Pratiques
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-red-500 text-lg font-semibold mb-4">
                <XCircle className="w-5 h-5" /> Erreurs fréquentes
              </h3>
              <ul className="space-y-3 text-gray-300">
                {erreurs.map((e, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 mt-1 text-red-400" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-green-500 text-lg font-semibold mb-4">
                <CheckCircle className="w-5 h-5" /> Bonnes pratiques
              </h3>
              <ul className="space-y-3 text-gray-300">
                {bonnes.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 mt-1 text-green-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-[#121826] border border-[#1f2637] rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">
            Vidéo : Cotation et Tolérances ISO
          </h2>
          <div className="aspect-video overflow-hidden rounded-md border border-[#1f2637]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/hE_a4JINrtM"
              title="Cotation et tolérances ISO"
              allowFullScreen
            />
          </div>
        </section>

        <footer className="text-center text-sm text-gray-500 mt-10">
          © HorloLearn 2025 — Normes ISO 129-1 & ISO 1101.
        </footer>
      </div>
    </main>
  );
}
