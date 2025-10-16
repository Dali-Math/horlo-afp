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

  // Mémo
  const erreurs = [
    "Oublier d'indiquer une tolérance sur une cote fonctionnelle.",
    "Définir une tolérance trop serrée (augmente le coût et les rejets).",
    "Choisir une tolérance trop large (crée un jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques (parallélisme, etc.).",
    "Mélanger les unités de mesure (mm et µm) sans le préciser."
  ];

  const bonnes = [
    "Analyser la fonction de la pièce pour définir une tolérance juste.",
    "Utiliser les symboles et la syntaxe de la norme ISO appropriée.",
    "Toujours relire la cotation en pensant à l'assemblage final.",
    "Valider la faisabilité des tolérances avec l'atelier d'usinage.",
    "Faire contrôler ses plans par un pair avant la production.",
    "Rester cohérent dans les unités et la précision sur tout le plan."
  ];

  // Quiz
  const quizQuestions: QuizQuestion[] = [
    {
      question: 'Qu\'appelle-t-on "cote nominale" ?',
      options: [
        "La dimension idéale sans tolérance",
        "La tolérance maximale autorisée",
        "L'écart entre deux dimensions"
      ],
      correct: 0,
      explanation:
        "La cote nominale est la dimension idéale théorique d'une pièce, sans considération de tolérance."
    },
    {
      question: "En système ISO, quelle lettre utilise-t-on pour les alésages ?",
      options: ["Des lettres minuscules", "Des lettres majuscules", "Des chiffres uniquement"],
      correct: 1,
      explanation:
        "Les alésages (contenants) utilisent des lettres majuscules, tandis que les arbres (contenus) utilisent des minuscules."
    },
    {
      question: "Qu'est-ce qu'un arbre dans le système ISO ?",
      options: ["Tout ce qui est contenant", "Tout ce qui est contenu", "Un élément cylindrique uniquement"],
      correct: 1,
      explanation:
        "Dans le système ISO, un arbre désigne tout élément contenu, quelle que soit sa forme."
    },
    {
      question: "Qu'est-ce qu'un alésage ?",
      options: ["Un élément cylindrique creux", "Tout ce qui est contenant", "Une pièce rotative"],
      correct: 1,
      explanation: "L'alésage désigne tout élément contenant dans un assemblage."
    },
    {
      question: "Comment calcule-t-on l'intervalle de tolérance (IT) ?",
      options: ["ES - EI (écart supérieur moins écart inférieur)", "Cote max + Cote min", "Cote nominale × 2"],
      correct: 0,
      explanation:
        "L'intervalle de tolérance est la différence entre l'écart supérieur et l'écart inférieur."
    },
    {
      question: "Pour un arbre, quelles lettres utilise-t-on ?",
      options: ["Des lettres majuscules", "Des lettres minuscules", "Des symboles spéciaux"],
      correct: 1,
      explanation: "Les arbres (éléments contenus) sont désignés par des lettres minuscules."
    },
    {
      question: "Dans la cotation Ø60 H8/f7, que représente H8 ?",
      options: ["La tolérance de l'arbre", "La tolérance de l'alésage", "La cote nominale"],
      correct: 1,
      explanation:
        "H8 (majuscule) désigne la tolérance de l'alésage, f7 (minuscule) celle de l'arbre."
    },
    {
      question: "Que signifie ES pour un alésage ?",
      options: ["Écart Supérieur", "Écart Standard", "Élément Spécial"],
      correct: 0,
      explanation: "ES = Écart Supérieur (majuscule pour les alésages)."
    },
    {
      question: "Que signifie ei pour un arbre ?",
      options: ["écart initial", "écart inférieur", "élément intérieur"],
      correct: 1,
      explanation: "ei (minuscule) représente l'écart inférieur pour un arbre."
    },
    {
      question: "Quelle est la cote maximale ?",
      options: ["La plus petite dimension acceptable", "La plus grande dimension acceptable", "La dimension moyenne"],
      correct: 1,
      explanation: "La cote maximale est la plus grande dimension acceptable pour la pièce."
    },
    {
      question: "Pour Ø60 F7, avec tolérances -0.030/-0.060, quelle est la cote minimale ?",
      options: ["59.940 mm", "59.970 mm", "60.030 mm"],
      correct: 0,
      explanation: "Cote minimale = 60 - 0.060 = 59.940 mm."
    },
    {
      question: "Pour Ø60 E8 avec tolérances +0.060/+0.106, quelle est la cote maximale ?",
      options: ["60.060 mm", "60.106 mm", "60.166 mm"],
      correct: 1,
      explanation: "Cote maximale = 60 + 0.106 = 60.106 mm."
    },
    {
      question: "Pourquoi utilise-t-on des tolérances prédéfinies en système ISO ?",
      options: [
        "Pour réduire les coûts uniquement",
        "Pour standardiser et faciliter l'interchangeabilité",
        "Pour compliquer la fabrication"
      ],
      correct: 1,
      explanation:
        "Les tolérances normalisées ISO favorisent l'interchangeabilité et une communication universelle."
    },
    {
      question: "Dans un assemblage, si l'arbre mesure 59.97 mm et l'alésage 60.08 mm, quel est le jeu ?",
      options: ["0.11 mm", "0.05 mm", "120.05 mm"],
      correct: 0,
      explanation: "Jeu = 60.08 - 59.97 = 0.11 mm."
    },
    {
      question: "Quel organisme définit le système de tolérancement ISO ?",
      options: [
        "L'Organisation Internationale de Normalisation",
        "L'Institut Suisse d'Horlogerie",
        "L'Agence Européenne de Mécanique"
      ],
      correct: 0,
      explanation:
        "ISO = International Organization for Standardization (Organisation Internationale de Normalisation)."
    }
  ];

  // Handlers
  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(String(optionIndex));
    setShowExplanation(true);
    if (optionIndex === quizQuestions[currentQuestion].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-gray-200 px-6 py-16 font-sans">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Bouton Retour (navigation explicite, pas d'historique) */}
        <div className="mb-6">
          <Link
            href="/theorie/lecture-de-plan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#151a28] text-gray-300 hover:text-white hover:bg-[#1f2637] transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </Link>
        </div>

        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#E2B44F]">
            Cotes et Tolérances <span className="text-gray-400">(ISO 129-1 & 1101)</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Maîtrise les règles de cotation et les tolérances indispensables à la qualité en horlogerie :
            assemblage, usinage et contrôle dimensionnel.
          </p>
        </header>

        {/* Schéma + modal */}
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

                <div className="text-sm leading-relaxed text-gray-300 space-y-3">
                  <p>
                    Les <b>cotes et tolérances</b> garantissent l’ajustement et la fonction correcte des composants.
                    Une tolérance bien choisie équilibre précision, coût et montage.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <b>Cote nominale</b> : valeur idéale.
                    </li>
                    <li>
                      <b>Tolérance</b> : intervalle admissible autour de la cote (p. ex. ±0.02 mm).
                    </li>
                    <li>
                      <b>Tolérances géométriques</b> : forme/position (planéité, parallélisme, etc.).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Mémo */}
        <section className="bg-[#111624] border border-[#1f2637] rounded-2xl p-10 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-10 text-center">
            Mémo Technique : Erreurs & Bonnes Pratiques
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-red-400 text-lg font-semibold mb-4">
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
              <h3 className="flex items-center gap-2 text-green-400 text-lg font-semibold mb-4">
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

        {/* Quiz */}
        <section className="bg-[#111624] border border-[#1f2637] rounded-2xl p-10 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">Quiz : Teste tes connaissances</h2>

          {!quizCompleted ? (
            <>
              <div className="mb-4 text-sm text-gray-400">
                Question {currentQuestion + 1} sur {quizQuestions.length}
              </div>

              <p className="text-gray-200 font-medium mb-4 text-lg">
                {quizQuestions[currentQuestion].question}
              </p>

              <div className="grid gap-4 mb-6">
                {quizQuestions[currentQuestion].options.map((option, i) => {
                  const isSelected = selectedAnswer === String(i);
                  const isCorrect = i === quizQuestions[currentQuestion].correct;
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={selectedAnswer !== null}
                      className={`text-left py-3 px-4 rounded-lg transition-all border
                        ${
                          selectedAnswer === null
                            ? "border-[#2a3348] bg-[#151b2a] hover:bg-[#1b2233]"
                            : isSelected
                            ? isCorrect
                              ? "border-green-500 bg-green-900/30"
                              : "border-red-500 bg-red-900/30"
                            : isCorrect
                            ? "border-green-500 bg-green-900/30"
                            : "border-[#2a3348] bg-[#151b2a] opacity-60"
                        }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="mb-6 p-4 rounded-lg border border-[#2a3348] bg-[#151b2a]">
                  <p className="text-sm text-gray-300">
                    <strong>Explication :</strong> {quizQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              {selectedAnswer !== null && (
                <button
                  onClick={handleNext}
                  className="bg-[#E2B44F] text-black font-semibold py-3 px-6 rounded-lg hover:brightness-110 transition"
                >
                  {currentQuestion + 1 < quizQuestions.length
                    ? "Question suivante"
                    : "Voir les résultats"}
                </button>
              )}
            </>
          ) : (
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-[#E2B44F]">Quiz terminé !</h3>
              <p className="text-xl text-gray-200">
                Ton score :{" "}
                <span className="font-bold text-[#E2B44F]">{score}</span> sur {quizQuestions.length}
              </p>
              <p className="text-gray-300">
                {score >= 12
                  ? "🎉 Excellent ! Tu maîtrises le sujet !"
                  : score >= 9
                  ? "👍 Très bien ! Continue comme ça !"
                  : score >= 6
                  ? "👌 Pas mal ! Révise encore un peu."
                  : "📚 Continue à apprendre, tu vas y arriver !"}
              </p>
              <button
                onClick={restartQuiz}
                className="bg-[#E2B44F] text-black font-semibold py-3 px-6 rounded-lg hover:brightness-110 transition"
              >
                Recommencer le quiz
              </button>
            </div>
          )}
        </section>

        {/* Vidéo */}
        <section className="bg-[#111624] border border-[#1f2637] rounded-2xl p-10 text-center shadow-lg">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">Vidéo : Cotation et Tolérances ISO</h2>
          <div className="aspect-video overflow-hidden rounded-md border border-[#2a3348]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/hE_a4JINrtM"
              title="Cotation et tolérances ISO"
              allowFullScreen
            />
          </div>
        </section>

        {/* Tableau */}
        <section className="bg-[#111624] border border-[#1f2637] rounded-2xl p-10 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">Exemples de Tolérances en Horlogerie</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm text-left text-gray-200">
              <thead className="bg-[#151b2a] text-gray-300 uppercase tracking-wide text-xs">
                <tr>
                  <th className="px-4 py-3 border border-[#2a3348]">Type de pièce</th>
                  <th className="px-4 py-3 border border-[#2a3348]">Cote nominale</th>
                  <th className="px-4 py-3 border border-[#2a3348]">Tolérance</th>
                  <th className="px-4 py-3 border border-[#2a3348]">Fonction</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-[#151b2a] transition">
                  <td className="px-4 py-3 border border-[#2a3348]">Axe de balancier</td>
                  <td className="px-4 py-3 border border-[#2a3348]">Ø 0.80 mm</td>
                  <td className="px-4 py-3 border border-[#2a3348]">±0.005 mm</td>
                  <td className="px-4 py-3 border border-[#2a3348]">Pivotement fluide</td>
                </tr>
                <tr className="hover:bg-[#151b2a] transition">
                  <td className="px-4 py-3 border border-[#2a3348]">Trou de rubis</td>
                  <td className="px-4 py-3 border border-[#2a3348]">Ø 0.20 mm</td>
                  <td className="px-4 py-3 border border-[#2a3348]">+0.002 / -0 mm</td>
                  <td className="px-4 py-3 border border-[#2a3348]">Guidage précis</td>
                </tr>
                <tr className="hover:bg-[#151b2a] transition">
                  <td className="px-4 py-3 border border-[#2a3348]">Barillet</td>
                  <td className="px-4 py-3 border border-[#2a3348]">Ø 10.00 mm</td>
                  <td className="px-4 py-3 border border-[#2a3348]">±0.02 mm</td>
                  <td className="px-4 py-3 border border-[#2a3348]">Stockage d'énergie</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Citation */}
        <section className="bg-[#0f1422] border border-[#1f2637] rounded-2xl p-8 text-center shadow-lg">
          <blockquote className="text-xl italic text-gray-200">
            « La précision n'est pas une option, c'est une exigence en horlogerie. »
          </blockquote>
          <p className="mt-4 text-[#E2B44F] font-medium">— Principe fondamental de la cotation ISO</p>
        </section>

        {/* FAQ */}
        <section className="bg-[#111624] border border-[#1f2637] rounded-2xl p-10 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">Questions fréquentes (FAQ)</h2>
          <div className="space-y-5 text-gray-300">
            <details className="bg-[#0f1422] rounded-lg p-4 border border-[#2a3348]">
              <summary className="cursor-pointer font-medium text-[#E2B44F]">
                Quelle est la différence entre tolérance dimensionnelle et géométrique ?
              </summary>
              <p className="mt-2">
                La tolérance dimensionnelle concerne les tailles (longueur, diamètre) tandis que la géométrique
                garantit la forme/position (planéité, perpendicularité, parallélisme, etc.).
              </p>
            </details>
            <details className="bg-[#0f1422] rounded-lg p-4 border border-[#2a3348]">
              <summary className="cursor-pointer font-medium text-[#E2B44F]">
                Puis-je utiliser plusieurs unités sur un même plan ?
              </summary>
              <p className="mt-2">
                Oui, mais indique clairement le changement (ex. mm → µm) pour éviter toute ambiguïté en production.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-10">
          <p className="text-gray-400 text-lg mb-4">📘 Tu veux aller plus loin ?</p>
          <a
            href="https://www.iso.org/fr/standard/70382.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E2B44F] text-black font-semibold py-3 px-6 rounded-lg hover:brightness-110 transition"
          >
            Consulter la norme ISO 129-1 complète
          </a>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500">
          © HorloLearn 2025 — Normes ISO 129-1 & ISO 1101.
        </footer>
      </div>
    </main>
  );
}
