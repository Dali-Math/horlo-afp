"use client";
import { useState } from "react";

type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export default function QuizTolérances() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [done, setDone] = useState(false);

  const quiz: QuizQuestion[] = [
    {
      question: "Qu'appelle-t-on cote nominale ?",
      options: [
        "La dimension idéale sans tolérance",
        "La tolérance maximale autorisée",
        "L’écart entre deux dimensions",
      ],
      correct: 0,
      explanation:
        "La cote nominale est la dimension idéale théorique d'une pièce, sans tolérance.",
    },
    {
      question: "Quelle lettre désigne un alésage dans le système ISO ?",
      options: ["Majuscule", "Minuscule", "Chiffre"],
      correct: 0,
      explanation:
        "Les alésages (contenants) sont notés avec des lettres majuscules (ex: H7).",
    },
    {
      question: "Comment calcule-t-on l’intervalle de tolérance ?",
      options: [
        "ES - EI (écart supérieur - écart inférieur)",
        "Cote max + Cote min",
        "Cote nominale × 2",
      ],
      correct: 0,
      explanation:
        "L’intervalle correspond à la différence entre les deux écarts limites.",
    },
  ];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setShowExplanation(true);
    if (i === quiz[current].correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 < quiz.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else setDone(true);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowExplanation(false);
    setDone(false);
  };

  return (
    <section className="bg-[#111624] border border-[#1f2637] rounded-2xl p-10 shadow-lg">
      <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">
        Quiz : Teste tes connaissances
      </h2>

      {!done ? (
        <>
          <p className="text-gray-300 mb-4">
            Question {current + 1} sur {quiz.length}
          </p>
          <h3 className="text-lg font-medium text-gray-200 mb-4">
            {quiz[current].question}
          </h3>

          <div className="grid gap-3 mb-6">
            {quiz[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`py-3 px-4 text-left rounded-lg border transition-all ${
                  selected === null
                    ? "border-[#2a3348] bg-[#151b2a] hover:bg-[#1b2233]"
                    : i === quiz[current].correct
                    ? "border-green-500 bg-green-900/30"
                    : i === selected
                    ? "border-red-500 bg-red-900/30"
                    : "border-[#2a3348] bg-[#151b2a] opacity-50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {showExplanation && (
            <p className="text-gray-400 mb-6 text-sm">
              💡 {quiz[current].explanation}
            </p>
          )}

          {selected !== null && (
            <button
              onClick={next}
              className="bg-[#E2B44F] text-black font-semibold py-3 px-6 rounded-lg hover:brightness-110"
            >
              {current + 1 < quiz.length ? "Suivant" : "Résultat"}
            </button>
          )}
        </>
      ) : (
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-[#E2B44F]">Quiz terminé !</h3>
          <p className="text-gray-300">
            Ton score : {score} / {quiz.length}
          </p>
          <button
            onClick={restart}
            className="bg-[#E2B44F] text-black font-semibold py-3 px-6 rounded-lg hover:brightness-110"
          >
            Rejouer
          </button>
        </div>
      )}
    </section>
  );
}

