"use client";
import JsonLd from "./JsonLd";

type QA = { question: string; answer: string; };

export default function FaqSchema({ items }: { items: QA[] }) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((it) => ({
      "@type": "Question",
      "name": it.question,
      "acceptedAnswer": { "@type": "Answer", "text": it.answer },
    })),
  };
  return <JsonLd data={faqData} />;
}
