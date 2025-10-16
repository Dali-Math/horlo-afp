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

  const quizQuestions: QuizQuestion[] = [
    {
      question: 'Qu\'appelle-t-on "cote nominale" ?',
      options: [
        "La dimension idéale sans tolérance",
        "La tolérance maximale autorisée",
        "L'écart entre deux dimensions",
      ],
      correct: 0,
      explanation:
        "La cote nominale est la dimension idéale théorique d'une pièce, sans considération de tolérance.",
    },
    {
      question: "En système ISO, quelle lettre utilise-t-on pour les alésages ?",
      options: ["Des lettres minuscules", "Des lettres majuscules", "Des chiffres uniquement"],
      correct: 1,
      explanation:
        "Les alésages (contenants) utilisent des lettres majuscules, tandis que les arbres (contenus) utilisent des minuscules.",
    },
    {
      question: "Qu'est-ce qu'un arbre dans le système ISO ?",
      options: [
        "Tout ce qui est contenant",
        "Tout ce qui est contenu",
        "Un élément cylindrique uniquement",
      ],
      correct: 1,
      explanation:
        "Dans le système ISO, un arbre désigne tout élément contenu, peu importe sa forme.",
    },
    {
      question: "Qu'est-ce qu'un alésage ?",
      options: ["Un élément cylindrique creux", "Tout ce qui est contenant", "Une pièce rotative"],
      correct: 1,
      explanation: "L'alésage désigne tout élément contenant dans un assemblage.",
    },
    {
      question: "Comment calcule-t-on l'intervalle de tolérance (IT) ?",
      options: ["ES - EI (écart supérieur moins écart inférieur)", "Cote max + Cote min", "Cote nominale × 2"],
      correct: 0,
      explanation: "L'intervalle de tolérance est la différence entre l'écart supérieur et l'écart inférieur.",
    },
    {
      question: "Pour un arbre, quelles lettres utilise-t-on ?",
      options: ["Des lettres majuscules", "Des lettres minuscules", "Des symboles spéciaux"],
      correct: 1,
      explanation: "Les arbres (éléments contenus) sont désignés par des lettres minuscules.",
    },
    {
      question: "Dans la cotation Ø60 H8/f7, que représente H8 ?",
      options: ["La tolérance de l'arbre", "La tolérance de l'alésage", "La cote nominale"],
      correct: 1,
      explanation: "H8 (majuscule) désigne la tolérance de l'alésage, f7 (minuscule) celle de l'arbre.",
    },
    {
      question: "Que signifie ES pour un alésage ?",
      options: ["Écart Supérieur", "Écart Standard", "Élément Spécial"],
      correct: 0,
      explanation: "ES signifie Écart Supérieur, utilisé en majuscule pour les alésages.",
    },
    {
      question: "Que signifie ei pour un arbre ?",
      options: ["écart initial", "écart inférieur", "élément intérieur"],
      correct: 1,
      explanation: "ei (minuscule) représente l'écart inférieur pour un arbre.",
    },
    {
      question: "Quelle est la cote maximale ?",
      options: [
        "La plus petite dimension acceptable",
        "La plus grande dimension acceptable",
        "La dimension moyenne",
      ],
      correct: 1,
      explanation:
        "La cote maximale correspond à la plus grande dimension acceptable pour la pièce.",
    },
    {
      question: "Pour Ø60 F7, avec tolérances -0.030/-0.060, quelle est la cote minimale ?",
      options: ["59.940 mm", "59.970 mm", "60.030 mm"],
      correct: 0,
      explanation: "Cote minimale = 60 - 0.060 = 59.940 mm",
    },
    {
      question: "Pour Ø60 E8 avec tolérances +0.060/+0.106, quelle est la cote maximale ?",
      options: ["60.060 mm", "60.106 mm", "60.166 mm"],
      correct: 1,
      explanation: "Cote maximale = 60 + 0.106 = 60.106 mm",
    },
    {
      question: "Pourquoi utilise-t-on des tolérances prédéfinies en système ISO ?",
      options: [
        "Pour réduire les coûts uniquement",
        "Pour standardiser et faciliter l'interchangeabilité",
        "Pour compliquer la fabrication",
      ],
      correct: 1,
      explanation:
        "Les tolérances ISO standardisées permettent l'interchangeabilité des pièces et une communication universelle.",
    },
    {
      question: "Dans un assemblage, si l'arbre mesure 59.97 mm et l'alésage 60.08 mm, quel est le jeu ?",
      options: ["0.11 mm", "0.05 mm", "120.05 mm"],
      correct: 0,
      explanation: "Jeu = Alésage - Arbre = 60.08 - 59.97 = 0.11 mm",
    },
    {
      question: "Quel organisme définit le système de tolérancement ISO ?",
      options: [
        "L'Organisation Internationale de Normalisation",
        "L'Institut Suisse d'Horlogerie",
        "L'Agence Européenne de Mécanique",
      ],
      correct: 0,
      explanation:
        "ISO signifie International Organization for Standardization (Organisation Internationale de Normalisation).",
    },
  ];

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex.toString());
    setShowExplanation(true);
    if (optionIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
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
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">

        <div className="mb-6">
          <Link
            href="/theorie/lecture-de-plan"
            className="text-blue-700 hover:underline flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </Link>
        </div>

        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">
            Cotes et Tolérances <span className="text-blue-600">(ISO 129-1 & 1101)</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
            Maîtrise les règles de cotation et les tolérances indispensables à la qualité en horlogerie :
            assemblage, usinage et contrôle dimensionnel.
          </p>
        </header>

        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Schéma Interactif</h2>
          <div className="mb-4 cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <img
              src="/images/schema-cotes-tolerances.png"
              alt="Schéma des tolérances horlogères"
              className="mx-auto rounded-lg shadow max-w-md w-full hover:scale-105 transition-transform"
              style={{ minHeight: "200px" }}
            />
            <p className="text-gray-500 text-sm mt-2">Cliquez sur l'image pour afficher l'explication pédagogique.</p>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
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
                  alt="Mini schéma pédagogique"
                  className="w-28 mx-auto rounded mb-5"
                  style={{ display: "block" }}
                />
                <div className="mt-2 text-gray-700 text-left leading-relaxed text-base">
                  <b>Les cotes et tolérances</b> sont fondamentales pour garantir la qualité en horlogerie.
                  <br />
                  <br />
                  <ul className="list-disc pl-6">
                    <li>La <b>cote nominale</b> est la valeur idéale d'une dimension.</li>
                    <li>
                      La <b>tolérance</b> détermine l'intervalle admissible autour de cette cote (exemple typique :
                      ±0.02 mm pour l'ajustement précis d'un axe).
                    </li>
                    <li>
                      Un bon choix de tolérance permet de trouver le juste compromis : ni trop serré (difficulté
                      d'assemblage / coût) ni trop lâche (jeu excessif, imprécision).
                    </li>
                    <li>
                      Il faut aussi prendre en compte les <b>tolérances géométriques</b> pour garantir la forme et la
                      position (parallélisme, planéité).
                    </li>
                  </ul>
                  <br />
                  La <b>norme ISO</b> assure une lecture universelle sur les plans, facilitant la communication entre
                  conception, atelier et contrôle qualité.
                  <br />
                  <b>En horlogerie</b>, c'est la clé pour obtenir des montres précises et fiables, avec des composants
                  interchangeables et bien ajustés.
                </div>
              </div>
            </div>
          )}
        </section>

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

        {/* Quiz */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Quiz : Teste tes connaissances</h2>
          {!quizCompleted ? (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Question {currentQuestion + 1} sur {quizQuestions.length}
              </div>
              <p className="text-gray-700 font-medium mb-4 text-lg">
                {quizQuestions[currentQuestion].question}
              </p>
              <div className="grid gap-4 mb-6">
                {quizQuestions[currentQuestion].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selectedAnswer !== null}
                    className={`text-left py-3 px-4 border rounded-lg transition-all ${
                      selectedAnswer === null
                        ? "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                        : selectedAnswer === i.toString()
                        ? i === quizQuestions[currentQuestion].correct
                          ? "bg-green-100 border-green-500"
                          : "bg-red-100 border-red-500"
                        : i === quizQuestions[currentQuestion].correct
                        ? "bg-green-100 border-green-500"
                        : "border-gray-200 opacity-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {showExplanation && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Explication :</strong> {quizQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}
              {selectedAnswer !== null && (
                <button
                  onClick={handleNext}
                  className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
                >
                  {currentQuestion + 1 < quizQuestions.length ? "Question suivante" : "Voir les résultats"}
                </button>
              )}
            </>
          ) : (
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-blue-900">Quiz terminé !</h3>
              <p className="text-xl text-gray-700">
                Ton score : <span className="font-bold text-blue-700">{score}</span> sur {quizQuestions.length}
              </p>
              <p className="text-gray-600">
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
                className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
              >
                Recommencer le quiz
              </button>
            </div>
          )}
        </section>

        {/* Vidéo pédagogique */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Vidéo : Cotation et Tolérances ISO</h2>
          <div className="aspect-video overflow-hidden rounded-md border border-gray-200">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/hE_a4JINrtM"
              title="Cotation et tolérances ISO"
              allowFullScreen
            />
          </div>
        </section>

        {/* Historique des normes */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Contexte & Origines des Normes</h2>
          <p className="text-gray-700 leading-relaxed">
            Les normes <strong>ISO 129-1</strong> et <strong>ISO 1101</strong> ont été introduites pour
            harmoniser la manière de représenter les dimensions, tolérances et spécifications
            géométriques sur les plans techniques. En horlogerie, leur application permet de garantir
            l'interchangeabilité des pièces, la fiabilité des assemblages et la précision des mouvements.
          </p>
        </section>

        {/* Tableau des tolérances */}
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
                  <td className="px-4 py-3 border">Stockage d'énergie</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Citation */}
        <section className="bg-blue-50 border border-blue-100 shadow-sm rounded-2xl p-8 text-center">
          <blockquote className="text-xl italic text-blue-900">
            "La précision n'est pas une option, c'est une exigence en horlogerie."
          </blockquote>
          <p className="mt-4 text-blue-700 font-medium">— Principe fondamental de la cotation ISO</p>
        </section>

        {/* FAQ */}
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
                Oui, mais il faut clairement indiquer le changement d'unité pour éviter toute ambiguïté lors de la fabrication.
              </p>
            </details>
          </div>
        </section>

        {/* Lien ISO */}
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

        <footer className="text-center text-sm text-gray-500 mt-6">
          © HorloLearn 2025 — Normes ISO 129-1 & ISO 1101.
        </footer>
      </div>
    </main>
  );
}
