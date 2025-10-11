"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useState } from "react";
import FlipBookViewer from "@/components/FlipBookViewer";
import Flashcards6497 from "@/components/Flashcards6497";
import FlashcardsRemontage6497 from "@/components/FlashcardsRemontage6497";

export default function RemontagePage() {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
  });

  const questions = [
    {
      question: "Quelle est la première étape du remontage d'un mouvement mécanique ?",
      options: [
        "Remettre le balancier",
        "Remettre le barillet et le rouage",
        "Poser le cadran",
        "Fixer les aiguilles",
      ],
      correct: 1,
    },
    {
      question: "Pourquoi doit-on huiler certaines zones pendant le remontage ?",
      options: [
        "Pour améliorer la précision du mouvement",
        "Pour nettoyer les pièces",
        "Pour éviter le bruit",
        "Pour faciliter le vissage",
      ],
      correct: 0,
    },
    {
      question: "Quel composant doit être remonté en dernier ?",
      options: [
        "Le balancier",
        "Le barillet",
        "Le pont d'ancre",
        "La roue moyenne",
      ],
      correct: 0,
    },
  ];

  const handleAnswer = (qIndex: number, aIndex: number) =>
    setQuizAnswers({ ...quizAnswers, [qIndex]: aIndex });

  return (
    <section className="bg-[#0a0a0a] min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-visible">
      <div className="max-w-6xl mx-auto">
        {/* Bouton retour */}
        <Link
          href="/pratique"
          className="inline-flex items-center gap-2 text-[#E2B44F] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </Link>

        {/* Titre principal */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-12 text-center">
          Remontage — Mouvement ETA 6497
        </h1>

        {/* Bloc principal deux colonnes */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Colonne gauche : vidéo + texte */}
          <div>
            <div className="aspect-video w-full bg-black rounded-lg shadow-lg mb-8">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/DL0z8a3vPRo"
                title="Remontage mouvement ETA 6497"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>

            <div className="bg-[#1a1a1a] p-6 md:p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-[#E2B44F] mb-4">
                Étapes Clés du Remontage du Mouvement
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Le remontage du mouvement ETA 6497 est une étape cruciale qui demande patience,
                  observation et précision. Chaque pièce doit être replacée avec soin dans son
                  logement sans forcer.
                </p>
                <p>
                  Commencez par remettre le{
                  <strong className="text-[#E2B44F]">barillet et le rouage</strong>, puis le pont
                  de rouage. Contrôlez à chaque étape la liberté de rotation des roues avant de
                  visser définitivement.
                </p>
                <p>
                  Enfin, remontez le{
                  <strong className="text-[#E2B44F]">balancier</strong>, en veillant à son bon
                  alignement avec l'ancre. Quelques gouttes d'huile adaptées sur les pivots
                  assureront une meilleure performance et longévité du mouvement.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite : FlipBook */}
          <div className="bg-[#111827] p-6 rounded-2xl border border-yellow-500/30 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-yellow-400 w-6 h-6" />
              <h2 className="text-xl font-semibold text-yellow-400">
                Guide de Remontage ETA 6497
              </h2>
            </div>
            <FlipBookViewer file="/pdfs/remontage/ETA-6497-Remontage.pdf" />
          </div>
        </div>

        {/* Mini Quiz */}
        <section className="bg-[#1a1a1a] p-6 md:p-8 rounded-lg mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#E2B44F] mb-6">
            Mini-Quiz : Testez vos connaissances
          </h2>
          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div className="bg-[#0a0a0a] p-4 md:p-6 rounded-lg" key={qIndex}>
                <p className="text-white font-semibold mb-4">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = oIndex === q.correct;
                    const showResult = quizAnswers[qIndex] !== null;

                    let buttonClass = "w-full text-left p-3 rounded-lg transition-all border ";
                    if (showResult) {
                      if (isCorrect) {
                        buttonClass +=
                          "bg-[#E2B44F] border-[#E2B44F] text-black font-semibold";
                      } else if (isSelected && !isCorrect) {
                        buttonClass +=
                          "bg-red-900/30 border-red-500 text-gray-300";
                      } else {
                        buttonClass +=
                          "bg-[#0a0a0a] border-gray-700 text-gray-400";
                      }
                    } else {
                      buttonClass +=
                        "bg-[#0a0a0a] border-gray-700 text-gray-300 hover:border-[#E2B44F] hover:text-white";
                    }

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswer(qIndex, oIndex)}
                        className={buttonClass}
                        disabled={showResult}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Flashcards interactives */}
        <section className="mt-12">
          <FlashcardsRemontage6497 />
        </section>
      </div>
    </section>
  );
}
