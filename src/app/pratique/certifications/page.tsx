"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function CertificationsPage() {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
  });

  const questions = [
    {
      question: "Quelle est la durée typique de l'AFP en horlogerie ?",
      options: ["1 an", "2 ans", "3 ans", "4 ans"],
      correct: 1,
    },
    {
      question: "Quel diplôme suit généralement l'AFP pour devenir horloger qualifié ?",
      options: ["Bac Pro", "CFC", "Master", "WOSTEP"],
      correct: 1,
    },
    {
      question: "Que signifie WOSTEP ?",
      options: [
        "World Organization for Swiss Timepiece Experts",
        "Watchmaking Schools Technical Exchange Program",
        "Worldwide Official Swiss Training for Expert Professionals",
        "Workshop for Swiss Technical Education Programs",
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
          Certifications Horlogères
        </h1>

        {/* Bloc vidéo */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/kSBFPhmsBmU"
              title="Certifications en horlogerie"
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
            Les Certifications en Horlogerie Suisse
          </h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Le parcours de formation en horlogerie suisse est structuré autour de plusieurs
              certifications reconnues internationalement. L'<strong className="text-[#E2B44F]">AFP (Attestation Fédérale de Formation Professionnelle)</strong> constitue
              la première étape, permettant d'acquérir les bases du métier en 2 ans.
            </p>
            <p>
              Le <strong className="text-[#E2B44F]">CFC (Certificat Fédéral de Capacité)</strong> est
              le diplôme standard pour devenir horloger qualifié. Cette formation de 3 à 4 ans
              combine apprentissage pratique en entreprise et cours théoriques en école professionnelle.
            </p>
            <p>
              Pour les professionnels souhaitant se spécialiser, le <strong className="text-[#E2B44F]">WOSTEP</strong> (Watchmaking
              Schools Technical Exchange Program) offre une formation intensive reconnue par les plus
              grandes manufactures horlogères. D'autres certifications comme le Brevet Fédéral ou
              le diplôme de maître horloger permettent d'accéder à des postes à responsabilité.
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
