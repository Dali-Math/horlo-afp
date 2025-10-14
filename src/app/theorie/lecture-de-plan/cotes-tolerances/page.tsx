"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";

const PlanInteractif = dynamic(() => import("@/components/PlanInteractif"), { ssr: false });

function QuizTolerance() {
  const questions = [
    {
      q: "Qu’appelle-t-on ‘cote nominale’ ?",
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
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const handleSelect = (i) => {
    setSelected(i);
    if (i === questions[idx].answer) setScore(s => s + 1);
    setTimeout(() => {
      setSelected(null);
      setIdx(idx + 1);
    }, 800);
  };
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      {idx < questions.length ? (
        <>
          <div className="font-bold mb-3">{questions[idx].q}</div>
          {questions[idx].options.map((opt, i) =>
            <button
              key={i}
              className={`block w-full mb-2 p-2 rounded border 
                ${selected !== null
                  ? (i === questions[idx].answer
                    ? "border-green-500 bg-green-100 text-black"
                    : "border-red-500 bg-red-100 text-black")
                  : "border-gray-600 hover:bg-gray-700"}`}
              disabled={selected !== null}
              onClick={() => handleSelect(i)}
            >
              {opt}
            </button>
          )}
        </>
      ) : (
        <div>
          <div className="font-bold text-lg mb-3">Score : {score} / {questions.length}</div>
          <div>Bravo ! Tu as terminé le quiz.</div>
        </div>
      )}
    </div>
  );
}

export default function CotesTolerances() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/theorie/lecture-de-plan" className="text-[#E2B44F] hover:underline flex items-center gap-2">
            ← Retour
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#E2B44F] underline mb-6 text-center">
          Cotes et Tolérances (ISO 129-1 & ISO 1101)
        </h1>

        <p className="text-gray-300 mb-6">
          Ces normes précisent les règles de cotation et les tolérances 
          <b> indispensables</b> à la qualité en horlogerie. Maîtrise-les pour comprendre 
          l’assemblage, l’usinage et le contrôle dimensionnel des montres.
        </p>

        {/* Schéma interactif */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">Schéma interactif</h2>
          <PlanInteractif />
        </div>

        {/* Quiz pédagogique */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">Quiz : Teste tes connaissances</h2>
          <QuizTolerance />
        </div>

        {/* Vidéo locale */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">Vidéo pédagogique locale</h2>
          <div className="w-full aspect-video max-w-2xl mx-auto">
            <video controls className="w-full h-full rounded">
              <source src="/videos/tolerances.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo. 
            </video>
          </div>
          <p className="text-gray-400 text-xs mt-2 text-center">Vidéo stockée localement — <span className="font-mono">public/videos/tolerances.mp4</span></p>
        </div>

        {/* Fiche synthétique PDF */}
        <div className="mb-8 text-center">
          <a 
            href="/pdfs/tolerances.pdf" 
            download 
            className="inline-block px-4 py-2 bg-[#E2B44F] text-black rounded hover:underline"
          >
            Télécharger la fiche de synthèse (PDF)
          </a>
          <p className="text-gray-400 text-xs mt-2 text-center">PDF stocké localement — <span className="font-mono">public/pdfs/tolerances.pdf</span></p>
        </div>

        {/* Liste pédagogique synthétique */}
        <ul className="list-disc pl-6 text-gray-400 space-y-2 mb-8">
          <li><strong>ISO 129-1</strong> : indication des dimensions sur plans techniques.</li>
          <li><strong>ISO 1101</strong> : tolérances géométriques des pièces.</li>
          <li>Respect des limites d’usinage et d’ajustement pour la fiabilité.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
          © HorloLearn 2025 — Résumé pédagogique basé sur les normes ISO 129-1:2018 & ISO 1101:2017.
        </p>
      </div>
    </section>
  );
}
