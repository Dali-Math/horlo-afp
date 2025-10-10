"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function OutilsPage() {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
  });

  const questions = [
    {
      question: "Quel est l'outil le plus essentiel pour manipuler les petites pièces d'une montre ?",
      options: [
        "Une pince à épiler",
        "Des brucelles",
        "Un tournevis",
        "Une loupe",
      ],
      correct: 1,
    },
    {
      question: "Pourquoi utilise-t-on des tournevis spécifiques en horlogerie ?",
      options: [
        "Pour éviter d'abîmer les vis de petite taille",
        "Pour aller plus vite",
        "Pour économiser de l'argent",
        "Pour impressionner les clients",
      ],
      correct: 0,
    },
    {
      question: "Quelle est la fonction principale du bergeron (porte-pièces) ?",
      options: [
        "Nettoyer les pièces",
        "Maintenir fermement une pièce pendant le travail",
        "Mesurer l'épaisseur",
        "Lubrifier les rouages",
      ],
      correct: 1,
    },
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <Link
          href="/pratique"
          className="inline-flex items-center gap-2 text-[#E2B44F] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </Link>

        {/* Titre */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-8 text-center">
          Outils & Équipement
        </h1>

        {/* Bloc vidéo */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/S8QbVzuolarE"
              title="Outils d'horlogerie essentiels"
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
            Les Outils Indispensables de l'Horloger
          </h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              L'horlogerie exige des outils spécialisés adaptés à la manipulation de composants
              minuscules et délicats. Les <strong className="text-[#E2B44F]">brucelles</strong> sont l'instrument
              le plus fondamental : ces pinces de précision existent en différentes formes
              (droites, courbées, à bouts pointus ou plats) et permettent de saisir les pièces
              sans les endommager.
            </p>
            <p>
              Les <strong className="text-[#E2B44F]">tournevis d'horloger</strong> sont conçus avec une lame
              parfaitement ajustée à la fente de chaque vis. Un tournevis mal adapté peut
              irrémédiablement abîmer une tête de vis. Le <strong className="text-[#E2B44F]">bergeron</strong> (ou étau
              d'horloger) maintient fermement les pièces pendant l'usinage ou le polissage.
            </p>
            <p>
              D'autres outils essentiels incluent la <strong className="text-[#E2B44F]">loupe monoculaire</strong> (grossissement
              2x à 10x), le <strong className="text-[#E2B44F]">chasse-goupilles</strong> pour retirer les axes de balancier,
              les <strong className="text-[#E2B44F]">huiliers</strong> pour appliquer des quantités infinitésimales de lubrifiant,
              et le <strong className="text-[#E2B44F]">pied à coulisse</strong> pour mesurer avec précision. La qualité des
              outils conditionne directement la qualité du travail et la protection des pièces.
            </p>
          </div>
        </section>

        {/* Bloc mini-quiz */}
        <section className="bg-[#1a1a1a] p-6 md:p-8 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-[#E2B44F] mb-6">
            Mini-Quiz : Testez vos connaissances
          </h2>
          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-[#0a0a0a] p-4 md:p-6 rounded-lg">
                <p className="text-white font-semibold mb-4">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = oIndex === q.correct;
                    const showResult = quizAnswers[qIndex] !== null;

                    let buttonClass =
                      "w-full text-left p-3 rounded-lg transition-all border ";

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
      </div>
    </div>
  );
}
