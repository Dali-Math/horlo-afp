"use client";
import { SITE } from "@/lib/seo";
import { toAbsolute } from "@/lib/url";
import JsonLd from "./JsonLd";

interface QuizSchemaProps {
  questions: {
    question: string;
    answer: string;
  }[];
  quizName: string;
  description?: string;
}

export default function QuizSchema({
  questions,
  quizName,
  description = "Quiz de formation horlogère HorloLearn AFP",
}: QuizSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: quizName,
    description,
    url: SITE.url,
    publisher: {
      "@type": "Organization",
      name: SITE.organization.legalName,
      url: SITE.url,
      logo: toAbsolute(SITE.image),
    },
    hasPart: questions.map((q, i) => ({
      "@type": "Question",
      position: i + 1,
      name: q.question,
      acceptedAnswer: q.answer
        ? { "@type": "Answer", text: q.answer }
        : undefined,
    })),
  };

  return <JsonLd data={data} />;
}
