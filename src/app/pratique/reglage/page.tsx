"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ReglagePage() {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
  });

  const questions = [
    {
      question: "Quelle est la fonction principale du spiral dans le réglage d'une montre ?",
      options: [
        "Maintenir le barillet en place",
        "Réguler la fréquence d'oscillation du balancier",
        "Lubrifier le mouvement",
        "Protéger contre les chocs",
      ],
      correct: 1,
    },
    {
      question: "Qu'est-ce que l'amplitude dans le réglage horloger ?",
      options: [
        "L'angle de rotation du balancier",
        "La vitesse du mouvement",
        "La force du ressort",
        "Le poids de la montre",
      ],
      correct: 0,
    },
    {
      question: "Pour ajuster la marche d'une montre qui avance, il faut :",
      options: [
        "Rallonger le spiral",
        "Raccourcir le spiral",
        "Augmenter la tension du ressort",
        "Retirer du lubrifiant",
      ],
      correct: 0,
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
          Réglage & Précision
        </h1>

        {/* Bloc vidéo */}
        <section className="mb-12">
  <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg border border-[#E2B44F]/40">
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/HVxT1kQ99kg"
      title="Tutoriel Horlogerie : Comment régler la marche d’un mouvement"
      frameBorder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    ></iframe>
  </div>
  <p className="text-center text-gray-400 text-sm mt-2 italic">
    🎧 Langue audio : français
  </p>
</section>

        {/* Bloc texte pédagogique */}
        <section className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-[#E2B44F] mb-4">
            Le Réglage de Précision en Horlogerie
          </h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Le réglage d'une montre mécanique est l'art d'optimiser sa précision en ajustant
              les différents éléments du régulateur. Le cœur de ce système est le
              <strong className="text-[#E2B44F]"> balancier-spiral</strong>, dont la fréquence d'oscillation
              détermine la marche de la montre.
            </p>
            <p>
              Pour régler une montre, l'horloger agit principalement sur la <strong className="text-[#E2B44F]">raquette</strong>,
              un petit dispositif qui permet de modifier la longueur active du spiral. En déplaçant
              la raquette vers le signe "A" (Avance), on raccourcit le spiral et la montre accélère.
              Vers le "R" (Retard), on l'allonge et elle ralentit. Un réglage fin peut atteindre
              une précision de quelques secondes par jour.
            </p>
            <p>
              Le réglage moderne s'effectue à l'aide d'un <strong className="text-[#E2B44F]">chronocomparateur</strong>,
              appareil qui mesure la fréquence et l'amplitude des oscillations. L'horloger doit
              également ajuster la montre dans différentes positions (cadran en haut, couronne en
              haut, etc.) pour compenser les variations dues à la gravité. Les montres de haute
              horlogerie peuvent être réglées dans 6 positions pour une précision maximale.
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
