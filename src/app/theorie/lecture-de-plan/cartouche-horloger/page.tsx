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

export default function CartoucheHorlogerPage() {
  // Modal pour agrandissement de l'image (x1.5)
  const [openImg, setOpenImg] = useState(false);

  // --- QUIZ Cartouche ---
  const questions: QuizQuestion[] = [
    {
      question: "Que contient le repère « Matière » dans un cartouche horloger ?",
      options: [
        "Le nom de la pièce dessinée",
        "La matière exacte (ex. : acier trempé, laiton CuZn37)",
        "La date de création du plan",
      ],
      correct: 1,
      explanation:
        "Le champ « Matière » précise le matériau : acier, laiton, alliage + référence s’il y a lieu (ex. CuZn37).",
    },
    {
      question:
        "Le champ « Dessiné » correspond généralement à…",
      options: [
        "La personne qui a vérifié le plan",
        "La personne qui a réalisé le plan (nom/initiales)",
        "La dernière révision du plan",
      ],
      correct: 1,
      explanation:
        "« Dessiné » indique la personne responsable de la réalisation du plan.",
    },
    {
      question:
        "À quoi sert le champ « Contrôlé » ?",
      options: [
        "Indiquer l’échelle du dessin",
        "Renseigner la personne qui a validé/vérifié le plan",
        "Spécifier l’état de surface général",
      ],
      correct: 1,
      explanation:
        "« Contrôlé » signale la vérification/validation (QA, responsable d’atelier, etc.).",
    },
    {
      question:
        "Quel exemple d’échelle est correctement écrit ?",
      options: ["1:01", "1:1", "1=1"],
      correct: 1,
      explanation:
        "En technique, on note l’échelle sous forme de rapport (1:1, 2:1, 1:10, etc.).",
    },
    {
      question:
        "Le symbole de projection (demi-cercle/triangle) indique…",
      options: [
        "La méthode de représentation (1er ou 3e angle)",
        "La direction du flux de matière",
        "Le sens de tolérance",
      ],
      correct: 0,
      explanation:
        "Ce symbole précise la méthode de projection utilisée (ISO, 1re ou 3e projection).",
    },
    {
      question:
        "Que représente « Ra 0,8 » inscrit dans l’état de surface général ?",
      options: [
        "La rugosité moyenne admissible",
        "La tolérance sur diamètre",
        "La dureté du matériau",
      ],
      correct: 0,
      explanation:
        "« Ra 0,8 » est une rugosité moyenne (µm) définissant l’état de surface général.",
    },
    {
      question:
        "Les « Tolérances générales ± 100 » signifient…",
      options: [
        "Une tolérance de 100 µm sur toutes les cotes sans tolérance spécifique",
        "Un coefficient d’agrandissement du plan",
        "Un numéro de document interne",
      ],
      correct: 0,
      explanation:
        "Par convention, les tolérances générales s’appliquent aux cotes sans tolérance particulière.",
    },
    {
      question:
        "Le bloc « Modifications » sert principalement à…",
      options: [
        "Lister les états de surface autorisés",
        "Historiser les révisions (indices/date/qui)",
        "Définir l’unité des cotes",
      ],
      correct: 1,
      explanation:
        "Le tableau des modifications consigne les révisions (indice, date, auteur, remarque).",
    },
    {
      question:
        "En horlogerie suisse, l’unité standard des cotes est…",
      options: ["Le pouce", "Le millimètre (mm)", "Le centimètre (cm)"],
      correct: 1,
      explanation: "On utilise exclusivement le système métrique (mm, µm).",
    },
    {
      question:
        "Où indiquer une tolérance particulière quand elle diffère des générales ?",
      options: [
        "Directement à côté de la cote concernée",
        "Dans « Dessiné »",
        "Dans « Matière »",
      ],
      correct: 0,
      explanation:
        "Une tolérance particulière s’annotera au plus près de la cote concernée.",
    },
  ];

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const onAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[qIndex].correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };
  const reset = () => {
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Bouton Retour */}
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

        {/* Titre */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">
            Cartouche Horloger <span className="text-blue-600">(Normes techniques)</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
            Le <strong>cartouche horloger</strong> regroupe les informations d’identification, de fabrication et de contrôle
            qui garantissent la traçabilité et la qualité du dessin.
          </p>
        </header>

        {/* Schéma (image cliquable x1.5) */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Schéma d’un Cartouche Horloger</h2>

          <button
            onClick={() => setOpenImg(true)}
            className="block mx-auto rounded-lg shadow hover:shadow-md transition"
            title="Cliquer pour agrandir"
          >
            <img
              src="/images/schema-cartouche-horloger.png"
              alt="Schéma du cartouche horloger"
              className="mx-auto rounded-lg max-w-2xl w-full"
            />
          </button>

          <p className="text-gray-500 text-sm mt-4">
            Exemple type d’un cartouche utilisé en horlogerie suisse.
          </p>

          {/* Modal zoom 1.5x */}
          {openImg && (
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              onClick={() => setOpenImg(false)}
            >
              <div
                className="bg-white p-3 rounded-lg shadow-xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setOpenImg(false)}
                  className="absolute -top-3 -right-3 bg-white border rounded-full p-1 shadow hover:bg-slate-50"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                <img
                  src="/images/schema-cartouche-horloger.png"
                  alt="Schéma cartouche (zoom)"
                  className="rounded-md"
                  style={{ transform: "scale(1.5)", transformOrigin: "top left" }}
                />
              </div>
            </div>
          )}
        </section>

        {/* Composition */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 leading-relaxed">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Composition du Cartouche</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><b>Titre du dessin</b> : désignation claire de la pièce (ex : Pont de balancier).</li>
            <li><b>Numéro de plan</b> : référence unique pour le suivi et la version du plan.</li>
            <li><b>Échelle</b> : rapport entre taille réelle et dessin (ex : 5:1, 1:1, 2:1).</li>
            <li><b>Nom du dessinateur</b> : personne ayant réalisé le plan.</li>
            <li><b>Date</b> : date de création ou révision.</li>
            <li><b>Matériau</b> : matière utilisée (ex : Laiton, Acier trempé).</li>
            <li><b>Traitement</b> : opérations (trempe, polissage, rhodiage).</li>
            <li><b>Tolérances générales</b> : valeurs par défaut (ex : ±0.02 mm).</li>
            <li><b>Validation</b> : signature du responsable (QA / chef d’atelier).</li>
          </ul>
        </section>

        {/* QUIZ */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Quiz : Teste tes connaissances</h2>

          {!done ? (
            <>
              <div className="text-sm text-gray-600 mb-2">
                Question {qIndex + 1} sur {questions.length}
              </div>
              <p className="text-gray-800 font-medium text-lg mb-4">{questions[qIndex].question}</p>

              <div className="grid gap-3">
                {questions[qIndex].options.map((opt, i) => {
                  const isChosen = selected === i;
                  const isCorrect = i === questions[qIndex].correct;
                  const state =
                    selected === null
                      ? "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                      : isChosen
                        ? isCorrect
                          ? "bg-green-100 border-green-500"
                          : "bg-red-100 border-red-500"
                        : isCorrect
                          ? "bg-green-100 border-green-500"
                          : "opacity-60 border-gray-200";

                  return (
                    <button
                      key={i}
                      onClick={() => onAnswer(i)}
                      disabled={selected !== null}
                      className={`text-left py-3 px-4 border rounded-lg transition ${state}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Explication :</strong> {questions[qIndex].explanation}
                  </p>
                </div>
              )}

              {selected !== null && (
                <button
                  onClick={next}
                  className="mt-4 bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-800 transition"
                >
                  {qIndex + 1 < questions.length ? "Question suivante" : "Voir les résultats"}
                </button>
              )}
            </>
          ) : (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-blue-900">Quiz terminé !</h3>
              <p className="text-lg">
                Score : <span className="font-semibold text-blue-700">{score}</span> / {questions.length}
              </p>
              <p className="text-gray-600">
                {score >= 9
                  ? "🎉 Excellent ! Tu maîtrises le cartouche."
                  : score >= 7
                  ? "👍 Très bien !"
                  : score >= 5
                  ? "👌 Correct, revois quelques points."
                  : "📚 N’hésite pas à relire la fiche au-dessus."}
              </p>
              <button
                onClick={reset}
                className="bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-800 transition"
              >
                Recommencer
              </button>
            </div>
          )}
        </section>

        {/* Vidéo pédagogique */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Vidéo : Cartouche & Lecture de plan</h2>
          <div className="aspect-video overflow-hidden rounded-md border border-gray-200">
            <iframe
              className="w-full h-full"
              // Remplacez par une vidéo plus spécialisée si vous en avez une
              src="https://www.youtube.com/embed/hE_a4JINrtM"
              title="Cartouche & lecture de plan"
              allowFullScreen
            />
          </div>
        </section>

        {/* Lien norme */}
        <section className="text-center py-10">
          <p className="text-gray-600 text-lg mb-4">📘 Pour aller plus loin :</p>
          <a
            href="https://www.iso.org/fr/standard/3362.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
          >
            Consulter la norme ISO 5457 (Cartouches techniques)
          </a>
        </section>

        <footer className="text-center text-sm text-gray-500 mt-6">
          © HorloLearn 2025 — Norme ISO 5457 / Pratiques horlogères suisses.
        </footer>
      </div>
    </main>
  );
}
