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
          { name: "Accueil", slug: "" },
          { name: "Quiz", slug: "quiz" },
        ]}
        currentTitle="Quiz ETA 6497"
        currentPath="/quiz/eta6497"
      />
      <h1 className="text-3xl font-bold text-[#E2B44F] mb-4">Quiz ETA 6497</h1>
      <p className="text-gray-300 mb-6">
        Testez vos connaissances sur le mouvement de référence de la formation AFP.
      </p>
      <ul className="space-y-4">
        {questions.map((q) => (
          <li key={q.question}>
            <h2 className="text-xl font-semibold">{q.question}</h2>
            <p className="text-gray-300">{q.answer}</p>
          </li>
        ))}
      </ul>
      <QuizSchema name="Quiz ETA 6497" questions={questions} />
    </section>
  );
}
