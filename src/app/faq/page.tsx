import { Metadata } from "next";
import FaqSchema from "@/components/FaqSchema";
import BreadcrumbsSchema from "@/components/BreadcrumbsSchema";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: `FAQ – ${SITE.name}`,
  description: "Questions fréquentes sur la formation horlogère suisse et les ressources HorloLearn.",
};

export default function FAQPage() {
  const items = [
    {
      question: "Qu'est-ce que la formation AFP en horlogerie ?",
      answer: "Cursus suisse de 2 ans centré sur les gestes de base, démontage/remontage et mouvements mécaniques (ex : ETA 6497).",
    },
    {
      question: "Quel mouvement est étudié pendant la formation AFP ?",
      answer: "Principalement l'ETA 6497, robuste et idéal pour l'apprentissage du démontage, remontage et réglage.",
    },
    {
      question: "HorloLearn est-il une ressource éducative fiable ?",
      answer: "Oui, plateforme indépendante avec fiches, vidéos, quiz et ressources alignées à l'AFP/CFC.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto p-6">
      <BreadcrumbsSchema
        items={[
          { name: "Accueil", slug: "" },
          { name: "FAQ", slug: "faq" },
        ]}
      />

      <h1 className="text-3xl font-bold text-[#E2B44F] mb-4">FAQ HorloLearn</h1>
      <ul className="space-y-4">
        {items.map((it) => (
          <li key={it.question}>
            <h2 className="text-xl font-semibold">{it.question}</h2>
            <p className="text-gray-300">{it.answer}</p>
          </li>
        ))}
      </ul>

      <FaqSchema items={items} />
    </section>
  );
}
