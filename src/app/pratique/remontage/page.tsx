"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useState } from "react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function RemontagePage() {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
  });

  const questions = [
    {
      question: "Quelle est la première étape lors du remontage du mouvement ETA 6497 ?",
      options: [
        "Poser le balancier",
        "Installer le barillet et le rouage",
        "Remettre les aiguilles",
        "Huiler les rubis",
      ],
      correct: 1,
    },
    {
      question: "Pourquoi faut-il huiler les rubis avant le montage final ?",
      options: [
        "Pour éviter le bruit du mouvement",
        "Pour réduire les frictions et assurer la longévité du mécanisme",
        "Pour augmenter la précision des aiguilles",
        "Pour faciliter le vissage des ponts",
      ],
      correct: 1,
    },
    {
      question: "Quelle est la dernière étape avant de refermer le boîtier ?",
      options: [
        "Régler le spiral",
        "Contrôler l’amplitude et la marche du mouvement",
        "Visser les vis du pont de rouage",
        "Nettoyer le cadran",
      ],
      correct: 1,
    },
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

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
        <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-8 text-center">
          Remontage — Mouvement ETA 6497
        </h1>

        {/* Bloc principal */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Vidéo explicative */}
          <div className="aspect-video w-full bg-black rounded-lg shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/mlo7muAlynE"
              title="Remontage mouvement ETA 6497"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          {/* FlipBook PDF */}
          <div className="bg-[#0e0e0e] border border-[#E2B44F]/40 p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#E2B44F] mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Guide de Remontage ETA 6497
            </h2>
            <div className="h-[650px] rounded-lg overflow-hidden">
              <FlipBookViewer file="/pdfs/remontage/ETA6497-Remontage.pdf" />
            </div>

            {/* Bouton retour vers Démontage */}
            <div className="text-center mt-6">
              <Link
                href="/pratique/demontage"
                className="inline-block bg-[#E2B44F] text-black font-semibold px-5 py-3 rounded-md hover:bg-yellow-300 transition"
              >
                ↩️ Retour au guide de Démontage ETA 6497
              </Link>
            </div>
          </div>
        </div>

        {/* Bloc explicatif */}
        <section className="mt-12 bg-[#1a1a1a] p-6 md:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-[#E2B44F] mb-4">
            Maîtriser le Remontage du Mouvement
          </h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Le remontage d’un mouvement horloger demande rigueur, observation et une parfaite
              propreté. Avant d’assembler, toutes les pièces doivent être nettoyées et huilées selon
              les points de lubrification prévus par le constructeur.
            </p>
            <p>
              Commencez par{" "}
              <strong className="text-[#E2B44F]">installer le barillet et le rouage</strong>. Vérifiez
              la libre rotation des roues avant de poser les ponts. Chaque vis doit être serrée avec
              douceur pour éviter toute déformation du pont.
            </p>
            <p>
              Le balancier est replacé en dernier, après contrôle du jeu axial et radial de
              l’échappement. Enfin, la marche du mouvement est vérifiée à la loupe pour assurer une
              rotation fluide et constante.
            </p>
          </div>
        </section>

        {/* Mini Quiz */}
        <section className="mt-12 bg-[#1a1a1a] p-6 md:p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#E2B44F] mb-6">
            Mini-Quiz : Vérifiez vos connaissances
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
      </div>
    </section>
  );
}
