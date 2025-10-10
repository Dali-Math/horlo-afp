"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Flashcards6497 from "@/components/Flashcards6497";

export default function DemontagePage() {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
  });

  const questions = [
    {
      question: "Quelle est la première étape avant de démonter un mouvement ?",
      options: [
        "Retirer le balancier",
        "Laisser l'horloge tourner pour épuiser le ressort",
        "Démonter les aiguilles",
        "Retirer le barillet",
      ],
      correct: 1,
    },
    {
      question: "Pourquoi est-il important de retirer le balancier en premier ?",
      options: [
        "Pour faciliter le nettoyage",
        "Pour éviter de l'endommager lors des autres manipulations",
        "Pour accéder au cadran",
        "Pour libérer le ressort",
      ],
      correct: 1,
    },
    {
      question: "Quel outil est essentiel pour retirer les aiguilles sans les abîmer ?",
      options: [
        "Une pince standard",
        "Un tournevis plat",
        "Un tire-aiguilles",
        "Un levier en métal",
      ],
      correct: 2,
    },
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  return (
    <section className="bg-[#0a0a0a] min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-visible">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <Link href="/pratique" className="inline-flex items-center gap-2 text-[#E2B44F] hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          Retour
        </Link>

        {/* Titre principal */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-8 text-center">
          Démontage & Remontage — Mouvement ETA 6497
        </h1>

        {/* Vidéo */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-black rounded-lg shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/SlB9FukapN4"
              title="Démontage mouvement ETA 6497"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </section>

        {/* Bloc texte pédagogique */}
        <section className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-[#E2B44F] mb-4">
            Maîtriser le Démontage d'un Mouvement Mécanique
          </h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Le démontage d'un mouvement horloger est une opération délicate qui nécessite
              méthode et précision. Avant toute intervention, il est
              <strong className="text-[#E2B44F]"> crucial de laisser le mouvement tourner</strong>
              jusqu'à épuisement complet du ressort moteur, afin d'éviter tout risque de détente
              brutale pendant le démontage.
            </p>
            <p>
              La première étape consiste à <strong className="text-[#E2B44F]">retirer le balancier</strong>, pièce
              la plus fragile du mouvement. Cette précaution permet d'éviter tout choc accidentel
              lors des manipulations ultérieures. On procède ensuite au retrait des aiguilles
              avec un tire-aiguilles approprié, puis au démontage du cadran.
            </p>
            <p>
              L'échappement, le rouage, et enfin le barillet sont démontés dans cet ordre.
              Chaque pièce doit être <strong className="text-[#E2B44F]">manipulée avec des brucelles en acier</strong> ou
              en laiton pour éviter toute contamination. Un rangement méthodique dans des coupelles
              séparées facilite grandement le remontage. Le mouvement ETA 6497, présenté dans la
              vidéo, est un excellent exemple pédagogique grâce à sa taille généreuse et sa
              construction classique.
            </p>
          </div>
        </section>

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
                        buttonClass += "bg-[#E2B44F] border-[#E2B44F] text-black font-semibold";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "bg-red-900/30 border-red-500 text-gray-300";
                      } else {
                        buttonClass += "bg-[#0a0a0a] border-gray-700 text-gray-400";
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
          <Flashcards6497 />
        </section>
      </div>
    </section>
  );
}
