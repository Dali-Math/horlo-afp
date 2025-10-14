"use client";
import JsonLd from "./JsonLd";
import { SITE } from "@/lib/seo";

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
    creator: {
      "@type": "Organization",
      name: SITE.organization.legalName,
      url: SITE.domain,
      logo: `${SITE.domain}${SITE.logo}`,
    },
    hasPart: questions.map((q, i) => ({
      "@type": "Question",
      position: i + 1,
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
