"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function HuilagePage() {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
  });

  const questions = [
    {
      question: "Quelle est la quantité idéale d'huile à appliquer sur un pivot ?",
      options: [
        "Une goutte épaisse",
        "Une quantité microscopique, juste visible",
        "Plusieurs gouttes",
        "Aucune huile n'est nécessaire",
      ],
      correct: 1,
    },
    {
      question: "Pourquoi faut-il utiliser différentes huiles selon les zones du mouvement ?",
      options: [
        "Par tradition",
        "Pour la couleur",
        "Les vitesses et pressions varient selon les zones",
        "Pour économiser de l'argent",
      ],
      correct: 2,
    },
    {
      question: "Quelle est la conséquence d'un excès d'huile ?",
      options: [
        "Meilleure précision",
        "Risque de migration de l'huile vers d'autres pièces",
        "Aucune conséquence",
        "Protection accrue",
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
          Huilage & Lubrification
        </h1>

        {/* Bloc vidéo */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="src="https://www.youtube.com/embed/ARb8Vo4refs?si=nRyWBeHLpwyreJgg"
"
              title="Techniques de lubrification horlogère"
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
            La Lubrification Horlogère : Un Art de Précision
          </h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Le huilage est une étape cruciale dans l'entretien d'un mouvement mécanique. Une
              lubrification correcte <strong className="text-[#E2B44F]">réduit les frottements, prolonge la durée
              de vie des pièces et maintient la précision</strong> de la montre. L'horloger doit
              maîtriser l'application de quantités infinitésimales d'huile aux endroits stratégiques.
            </p>
            <p>
              Il existe plusieurs types de lubrifiants adaptés à chaque zone : les <strong className="text-[#E2B44F]">huiles
              synthétiques</strong> pour les pivots et les mobiles, les <strong className="text-[#E2B44F]">graisses</strong> pour
              les zones à forte pression comme le barillet, et les <strong className="text-[#E2B44F]">huiles spéciales</strong>
              pour l'échappement. Chaque lubrifiant a une viscosité spécifique adaptée à la vitesse
              de rotation et à la pression exercée.
            </p>
            <p>
              L'application se fait avec un <strong className="text-[#E2B44F]">huilier</strong>, outil fin terminé par une
              pointe capillaire. Une seule règle : <strong className="text-[#E2B44F]">moins, c'est mieux</strong>. Un excès
              d'huile peut migrer vers d'autres composants, attirer la poussière, ou même bloquer
              le spiral. Un huilage correct se vérifie visuellement : l'huile doit former un petit
              ménisque uniforme autour du pivot. La périodicité de révision avec nouveau huilage
              est généralement de 3 à 5 ans pour une montre mécanique.
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
