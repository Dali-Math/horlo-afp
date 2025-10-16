"use client";
import { useState } from "react";

const questions = [
  {
    question: "Quelle unité est utilisée pour les tolérances horlogères ?",
    options: ["mm", "µm", "cm", "inch"],
    correct: 1,
  },
  {
    question: "Une tolérance trop serrée entraîne :",
    options: [
      "Une réduction des coûts",
      "Un risque de blocage et de rejet",
      "Un jeu fonctionnel optimal",
      "Un assemblage plus rapide",
    ],
    correct: 1,
  },
];

export default function QuizTolerances() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questions[current].correct) setScore(score + 1);
    const next = current + 1;
    if (next < questions.length) setCurrent(next);
    else setShowScore(true);
  };

  return (
    <section className="bg-[#111827] text-gray-200 rounded-2xl shadow-lg p-8 mt-10 text-center">
      <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">Mini Quiz</h2>

      {showScore ? (
        <p className="text-lg text-gray-300">
          Résultat : <span className="text-[#E2B44F]">{score}</span> /{" "}
          {questions.length}
        </p>
      ) : (
        <div>
          <p className="mb-4 text-gray-300">{questions[current].question}</p>
          <div className="grid md:grid-cols-2 gap-3">
            {questions[current].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="bg-[#1c2333] hover:bg-[#2c3344] text-gray-200 px-4 py-2 rounded-lg transition"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
