"use client";
import Link from "next/link";
import { useState } from "react";

function QuizCartouche() {
  const questions = [
    {
      question: "À quoi sert le cartouche horloger ?",
      options: [
        "Mettre en page un logo d'entreprise",
        "Dessiner le mouvement",
        "Identifier, tracer et certifier le plan technique",
        "Calculer les coûts de production"
      ],
      correct: 2,
      correction: "Le cartouche contient toutes les informations de traçabilité, d’identification et de validation : c’est la carte d’identité du plan technique.",
    },
    {
      question: "Que signifie 'Échelle 1:1' ?",
      options: [
        "Le plan est réduit de moitié",
        "Le dessin est en deux dimensions",
        "Le dessin est à taille réelle",
        "L'échelle est multipliée par 2"
      ],
      correct: 2,
      correction: "Échelle 1:1 signifie que le dessin est à la même taille que la pièce réelle : chaque côtes, mesures et proportions sont fidèles.",
    },
    {
      question: "Quel élément indique la matière utilisée ?",
      options: [
        "La case 'Contrôlé'",
        "Le cartouche signature",
        "La zone 'Matière'",
        "La zone 'Modification'"
      ],
      correct: 2,
      correction: "La zone 'Matière' détaille le matériau de la pièce : Acier, Laiton, Rubis… Cela oriente les procédés d’usinage et contrôles.",
    },
    // … Ajoute la correction pour chaque question ci-dessous !
    // Répète pour tes 15 questions !
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);

  const handleAnswer = (i: number) => {
    setSelected(i);
    setShowCorrection(true);
    if (i === questions[current].correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setShowCorrection(false);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowCorrection(false);
    setShowScore(false);
  };

  return (
    <section className="bg-[#111827] text-gray-200 rounded-2xl shadow-lg p-8 mt-10 text-center">
      <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">Quiz : Teste tes connaissances</h2>
      {showScore ? (
        <div>
          <p className="text-lg text-gray-300">
            Résultat : <span className="text-[#E2B44F] font-bold">{score}</span> / {questions.length}
          </p>
          <button
            onClick={handleRestart}
            className="mt-6 bg-[#E2B44F] hover:bg-[#d4ac3d] text-gray-900 px-6 py-2 rounded-lg font-semibold transition"
          >
            Recommencer le quiz
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-gray-300">{questions[current].question}</p>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {questions[current].options.map((option, i) => (
              <button
                key={i}
                onClick={() => !showCorrection && handleAnswer(i)}
                className={`px-4 py-2 rounded-lg transition
                  bg-[#1c2333] hover:bg-[#2c3344] text-gray-200
                  ${selected !== null
                    ? i === questions[current].correct
                      ? "border-2 border-green-500 bg-green-900"
                      : i === selected
                        ? "border-2 border-red-500 bg-red-900"
                        : ""
                    : ""
                  }`
                }
                disabled={showCorrection}
              >
                {option}
                {showCorrection && selected === i && (
                  i === questions[current].correct
                    ? <span className="ml-2">✅</span>
                    : <span className="ml-2">❌</span>
                )}
                {showCorrection && selected !== null && i === questions[current].correct && (
                  <span className="ml-2">✅</span>
                )}
              </button>
            ))}
          </div>
          {showCorrection && (
            <div className="mb-4 text-left bg-[#222b3e] rounded-lg p-3 text-sm text-[#E2B44F] font-medium">
              <span className="font-bold">
                {selected === questions[current].correct ? "Bonne réponse !" : "Mauvaise réponse."}
              </span>
              <div className="text-gray-200 mt-2">{questions[current].correction}</div>
            </div>
          )}
          {showCorrection && (
            <button
              onClick={handleNext}
              className="mt-2 bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-800 transition"
            >
              Suivant
            </button>
          )}
          <p className="mt-4 text-xs text-gray-400">
            Question {current + 1} sur {questions.length}
          </p>
        </div>
      )}
    </section>
  );
}

export default function CartoucheHorlogerPage() {
  // ... le reste inchangé, insère <QuizCartouche /> où tu veux !
}
