import React from 'react';
import { Metadata } from 'next';
import FaqSchema from '@/components/FaqSchema';
import BreadcrumbsSchema from '@/components/BreadcrumbsSchema';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'FAQ - Questions Fréquentes sur l\'Horlogerie',
  description: 'Réponses aux questions les plus fréquentes sur l\'horlogerie, les mouvements mécaniques, la restauration et l\'entretien des montres.',
};

const faqItems = [
  {
    question: 'Quelle est la différence entre un mouvement ETA 6497 et 6498 ?',
    answer:
      'Le ETA 6497 a sa petite seconde à 9h, tandis que le ETA 6498 l\'a à 6h. Ce sont deux mouvements de poche manuels très similaires, de 16½ lignes (36,60 mm), souvent utilisés dans les montres-bracelets modernes.',
  },
  {
    question: 'Comment démonter un balancier sans endommager le spiral ?',
    answer:
      'Utilisez un tournevis adapté pour dévisser la vis de plateau dans le sens anti-horaire. Soulevez délicatement le balancier complet en veillant à ne pas toucher le spiral. Travaillez toujours au-dessus d\'un tapis horloger pour éviter les chutes.',
  },
  {
    question: 'Quelle est la fréquence standard d\'un mouvement mécanique ?',
    answer:
      'La plupart des mouvements mécaniques modernes oscillent à 28 800 alternances par heure (4 Hz), soit 8 battements par seconde. Certains mouvements haute fréquence atteignent 36 000 A/h (5 Hz).',
  },
  {
    question: 'Combien de temps faut-il pour apprendre l\'horlogerie ?',
    answer:
      'Une formation de base en horlogerie dure généralement 3 à 4 ans (CFC en Suisse, CAP en France). Mais la maîtrise complète des complications et de la restauration demande des années de pratique supplémentaires.',
  },
  {
    question: 'Quels outils sont essentiels pour débuter en horlogerie ?',
    answer:
      'Les outils de base incluent : tournevis horlogers, brucelles, loupe ou binoculaire, démontre-boîte, chasse-goupilles, établi avec coussin, huiles et graisses horlogères, et un écrin de rangement pour pièces.',
  },
];

export default function FaqPage() {
  return (
    <>
      <FaqSchema items={faqItems} />
      <BreadcrumbsSchema
        items={[
          { name: 'Accueil', url: siteConfig.siteUrl },
          { name: 'FAQ', url: `${siteConfig.siteUrl}/faq` },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Questions Fréquentes</h1>
        <p className="text-lg text-gray-600 mb-12">
          Retrouvez ici les réponses aux questions les plus posées sur
          l'horlogerie, les mouvements mécaniques et la restauration de montres.
        </p>
        <div className="space-y-8">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {item.question}
              </h2>
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
