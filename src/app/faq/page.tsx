import { Metadata } from "next";
import FaqSchema from "@/components/FaqSchema";
import BreadcrumbsSchema from "@/components/BreadcrumbsSchema";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: `FAQ – ${SITE.name}`,
  description:
    "Questions fréquentes sur la formation horlogère suisse et les ressources HorloLearn.",
};

export default function FAQPage() {
  const items = [
    {
      question: "Qu'est-ce que la formation AFP en horlogerie ?",
      answer:
        "Cursus suisse de 2 ans centré sur les gestes de base, démontage/remontage et mouvements mécaniques (ex : ETA 6497).",
    },
    {
      question: "Quel mouvement est étudié pendant la formation AFP ?",
      answer:
        "Principalement l’ETA 6497, robuste et idéal pour l’apprentissage du démontage, du remontage et du réglage.",
    },
    {
      question: "HorloLearn est-il une ressource éducative fiable ?",
      answer:
        "Oui, plateforme indépendante avec fiches, vidéos, quiz et ressources alignées sur les référentiels AFP / CFC.",
    },
  ];

  return (
    <section className="min-h-screen bg-light-100 dark:bg-dark-900 text-slate-900 dark:text-light-100 transition-colors duration-500 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <BreadcrumbsSchema
          items={[
            { name: "Accueil", slug: "" },
            { name: "FAQ", slug: "faq" },
          ]}
        />

        <h1 className="text-4xl font-bold text-gold mb-8 text-center">
          FAQ HorloLearn
        </h1>

        <ul className="space-y-8">
          {items.map((it) => (
            <li
              key={it.question}
              className="p-6 rounded-xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 shadow-md transition-all duration-300 hover:shadow-lg hover:border-gold/50"
            >
              <h2 className="text-xl font-semibold text-gold mb-2">
                {it.question}
              </h2>
              <p className="text-slate-700 dark:text-light-200 leading-relaxed">
                {it.answer}
              </p>
            </li>
          ))}
        </ul>

        <FaqSchema items={items} />
      </div>
    </section>
  );
}
