import { useState } from "react";
const quizData = [
  {
    q: "Qu’appelle-t-on ‘cote nominale’ ?",
    options: [
      "La dimension idéale sans tolérance",
      "La tolérance maximale autorisée",
      "L’écart entre deux dimensions"
    ],
    answer: 0
  },
  {
    q: "Une tolérance trop faible peut provoquer :",
    options: [
      "Un assemblage qui coince",
      "Du jeu excessif",
      "Les deux"
    ],
    answer: 2
  }
];
export default function QuizTolerance() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const handleSelect = (i) => {
    setSelected(i);
    if (i === quizData[idx].answer) setScore((s) => s + 1);
    setTimeout(() => {
      setSelected(null);
      setIdx(idx + 1);
    }, 1200);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow max-w-xl mx-auto">
      {idx < quizData.length ? (
        <>
          <div className="font-bold mb-3">{quizData[idx].q}</div>
          {quizData[idx].options.map((opt, i) =>
            <button
              key={i}
              className={`block w-full mb-2 p-2 rounded border 
                ${selected !== null
                  ? (i === quizData[idx].answer
                    ? "border-green-500 bg-green-100 text-black"
                    : "border-red-500 bg-red-100 text-black")
                  : "border-gray-400 hover:bg-gray-100"}`}
              disabled={selected !== null}
              onClick={() => handleSelect(i)}
            >
              {opt}
            </button>
          )}
        </>
      ) : (
        <div>
          <div className="font-bold text-lg mb-3">Score : {score} / {quizData.length}</div>
          <div>Bravo, tu maîtrises les bases des cotes et tolérances !</div>
        </div>
      )}
    </div>
  );
}
