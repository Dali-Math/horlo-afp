import { Metadata } from "next";
import QuizSchema from "@/components/QuizSchema";
import BreadcrumbsSchema from "@/components/BreadcrumbsSchema";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Quiz ETA 6497 – ${SITE.name}`,
  description:
    "Testez vos connaissances sur le mouvement suisse ETA 6497 : structure, démontage, remontage et réglage.",
};

export default function QuizEta6497() {
  const questions = [
    {
      question: "Quelle est la fonction du balancier dans un mouvement ETA 6497 ?",
      answer: "Il régule la marche du mouvement en oscillant à une fréquence constante.",
    },
    {
      question: "Combien de rubis contient généralement le calibre ETA 6497 ?",
      answer: "17 rubis.",
    },
    {
      question: "Quel organe transmet l'énergie du ressort moteur à l'échappement ?",
      answer: "Le train de rouage.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto p-6">
      <BreadcrumbsSchema
        items={[
          { name: "Quiz", slug: "quiz" },
          { name: "ETA 6497", slug: "quiz/eta6497" },
        ]}
      />

      <h1 className="text-3xl font-bold text-[#E2B44F] mb-4">
        Quiz – Mouvement ETA 6497
      </h1>
      <p className="text-gray-300 mb-6">
        Répondez aux questions pour valider vos connaissances sur le mouvement ETA 6497.
      </p>

      <ul className="space-y-4 text-gray-300">
        {questions.map((q, index) => (
          <li key={index}>
            <strong>Q{index + 1}.</strong> {q.question}
          </li>
        ))}
      </ul>

      {/* Injection IA : quiz complet indexable */}
      <QuizSchema quizName="Quiz ETA 6497" questions={questions} />
    </section>
  );
}
