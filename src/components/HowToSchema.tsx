"use client";
import JsonLd from "./JsonLd";

type Step = { name: string; text: string };

export default function HowToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: Step[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
  return <JsonLd data={data} />;
}
