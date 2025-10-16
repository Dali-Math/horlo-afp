"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

function QuizCartouche() {
  const questions = [
    {
      question: "À quoi sert le cartouche horloger ?",
      options: [
        "Mettre en page un logo d'entreprise",
        "Dessiner le mouvement",
        "Identifier, tracer et certifier le plan technique",
        "Calculer les coûts de production",
      ],
      correct: 2,
      correction:
        "Le cartouche est l'élément administratif du plan : il identifie la pièce (numéro, titre), trace les modifications et certifie la validité (signatures). Sans lui, pas de traçabilité en production horlogère.",
    },
    {
      question: "Que signifie 'Échelle 1:1' ?",
      options: [
        "Le plan est réduit de moitié",
        "Le dessin est en deux dimensions",
        "Le dessin est à taille réelle",
        "L'échelle est multipliée par 2",
      ],
      correct: 2,
      correction:
        "Échelle 1:1 = taille réelle de la pièce. En horlogerie, c'est courant pour les micro-pièces ; cela garantit une cotation précise sans conversion lors de l'usinage.",
    },
    {
      question: "Quel élément indique la matière utilisée ?",
      options: [
        "La case 'Contrôlé'",
        "Le cartouche signature",
        "La zone 'Matière'",
        "La zone 'Modification'",
      ],
      correct: 2,
      correction:
        "La zone 'Matière' (ex. : Acier Nivarox, Laiton) détermine les outils d'usinage, traitements et contrôles. Erreur ici = pièce inadaptée à son rôle (ex. : friction, corrosion).",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);

  const handleAnswer = (i: number) => {
    setSelected(i);
    setShowCorrection(true);
    if (i === questions[current].correct) setScore((s) => s + 1);
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
      <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">
        Quiz : Teste tes connaissances
      </h2>
      {showScore ? (
        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            Résultat final :{" "}
            <span className="text-[#E2B44F] font-bold">{score}</span> /{" "}
            {questions.length}
          </p>
          <button
            onClick={handleRestart}
            className="bg-[#E2B44F] hover:bg-[#d4ac3d] text-gray-900 px-6 py-2 rounded-lg font-semibold transition"
          >
            Recommencer le quiz
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="mb-4 text-gray-300 font-medium">
            {questions[current].question}
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {questions[current].options.map((option, i) => (
              <button
                key={i}
                onClick={() => !showCorrection && handleAnswer(i)}
                className={`px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between
                  ${
                    !showCorrection
                      ? "bg-[#1c2333] hover:bg-[#2c3344] text-gray-200 border border-[#2c3344]"
                      : i === questions[current].correct
                      ? "border-2 border-green-500 bg-green-900/50 text-green-300"
                      : i === selected && i !== questions[current].correct
                      ? "border-2 border-red-500 bg-red-900/50 text-red-300 line-through"
                      : "bg-[#1c2333] text-gray-400"
                  }`}
                disabled={showCorrection}
              >
                <span>{option}</span>
              </button>
            ))}
          </div>
          {showCorrection && (
            <div className="text-left bg-[#1e293b] rounded-lg p-4 border border-[#E2B44F]/30">
              <h4 className="font-bold text-[#E2B44F] mb-2">
                {selected === questions[current].correct
                  ? "✅ Bonne réponse !"
                  : "❌ Mauvaise réponse."}
              </h4>
              <p className="text-gray-200 text-sm">
                {questions[current].correction}
              </p>
            </div>
          )}
          {showCorrection && (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              {current + 1 < questions.length
                ? "Question suivante"
                : "Voir le score final"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default function CartoucheHorlogerPage() {
  const [csvContent, setCsvContent] = useState<string | null>(null);
  const [showCsv, setShowCsv] = useState(false);

  useEffect(() => {
    fetch("/docs/N-LibellZoneduCartouche-Fonctiontechniquepdagogique.csv")
      .then((res) => res.text())
      .then((data) => setCsvContent(data))
      .catch(() => console.warn("❌ Erreur de lecture du fichier CSV."));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Bouton retour */}
        <div className="mb-6">
          <Link
            href="/theorie/lecture-de-plan"
            className="text-blue-700 hover:underline flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </Link>
        </div>

        {/* Section Composition */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 leading-relaxed">
          <h2 className="text-2xl font-bold text-blue-700 mt-12 mb-6">
            Composition du Cartouche
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li><strong>1. Matière :</strong> indique la nature du matériau utilisé pour la pièce.</li>
            <li><strong>2. Acier :</strong> exemple du matériau réel spécifié dans la zone Matière.</li>
            <li><strong>3. Dessiné :</strong> signature du dessinateur responsable du plan.</li>
            <li><strong>4. Contrôlé :</strong> validation du contrôleur qualité.</li>
            <li><strong>5. Échelle :</strong> rapport entre la taille réelle et celle dessinée.</li>
            <li><strong>6. Symbole de projection :</strong> indique la méthode de vue (1er ou 3e dièdre).</li>
            <li><strong>7. Modification :</strong> historique des révisions du plan.</li>
            <li><strong>8. État de surface général :</strong> rugosité moyenne (Ra 0.8).</li>
            <li><strong>9. Tolérances générales :</strong> valeurs à respecter si non précisées.</li>
            <li><strong>10. Dimensions en mm :</strong> indique les unités utilisées.</li>
            <li><strong>11. Tolérances en µm :</strong> précisions spécifiques pour usinage de précision.</li>
          </ul>

          {/* 👁️ Bouton pour afficher/masquer la fiche CSV */}
          <div className="text-center mt-10">
            <button
              onClick={() => setShowCsv(!showCsv)}
              className="inline-block bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
            >
              {showCsv ? "Masquer la fiche CSV" : "Voir la fiche CSV"}
            </button>
          </div>

          {showCsv && csvContent && (
            <div className="mt-6 bg-gray-100 text-gray-800 p-6 rounded-xl text-sm font-mono overflow-x-auto border border-gray-300">
              <pre>{csvContent}</pre>
            </div>
          )}
        </section>

        {/* Quiz */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <QuizCartouche />
        </section>
      </div>
    </main>
  );
}
