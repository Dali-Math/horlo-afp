import React from 'react';
import { Metadata } from 'next';
import HowToSchema from '@/components/HowToSchema';
import BreadcrumbsSchema from '@/components/BreadcrumbsSchema';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Démontage du Balancier - Guide Pratique Horlogerie',
  description:
    'Apprenez à démonter correctement un balancier de montre mécanique sans endommager le spiral. Guide pas-à-pas avec outils et précautions.',
};

const howToSteps = [
  {
    name: 'Préparation de l\'espace de travail',
    text: 'Installez-vous à un établi horloger avec une surface propre et anti-statique. Placez un coussin horloger sous le mouvement pour éviter toute rayure. Préparez une boîte de rangement pour les pièces démontées.',
  },
  {
    name: 'Vérification de l\'état du mouvement',
    text: 'Examinez attentivement le balancier et le spiral à la loupe. Assurez-vous qu\'il n\'y a pas de déformation visible. Identifiez la position de la vis de plateau et du type de fixation utilisé.',
  },
  {
    name: 'Déblocage de la vis de plateau',
    text: 'Utilisez un tournevis horloger adapté à la fente de la vis de plateau. Tournez dans le sens anti-horaire (vissage à gauche) avec une pression constante et douce pour éviter de glisser.',
  },
  {
    name: 'Retrait du balancier',
    text: 'Une fois la vis desserrée, soulevez délicatement le balancier avec des brucelles en le tenant par l\'anneau, jamais par le spiral. Éloignez-le verticalement du mouvement pour éviter tout frottement.',
  },
  {
    name: 'Rangement sécurisé',
    text: 'Placez le balancier dans un compartiment dédié, à l\'abri de la poussière et des chocs. Ne jamais poser le balancier directement sur une surface dure, toujours utiliser un support matelassé ou un porte-balancier.',
  },
];

export default function DemontageBalancierPage() {
  return (
    <>
      <HowToSchema
        name="Démontage du Balancier de Montre"
        description="Guide complet pour démonter un balancier de montre mécanique en toute sécurité."
        totalTime="PT15M"
        supply={[
          'Tournevis horloger adapté',
          'Brucelles fines',
          'Loupe ou binoculaire',
          'Coussin horloger',
          'Boîte de rangement pour pièces',
        ]}
        step={howToSteps}
      />
      <BreadcrumbsSchema
        items={[
          { name: 'Accueil', url: siteConfig.siteUrl },
          { name: 'Pratique', url: `${siteConfig.siteUrl}/pratique` },
          {
            name: 'Démontage du Balancier',
            url: `${siteConfig.siteUrl}/pratique/demontage-balancier`,
          },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Démontage du Balancier</h1>
        <p className="text-lg text-gray-600 mb-12">
          Le balancier est l'organe régulateur d'une montre mécanique. Son démontage
          nécessite précision et délicatesse pour ne pas endommager le spiral.
        </p>
        <div className="space-y-8">
          {howToSteps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {index + 1}. {step.name}
              </h2>
              <p className="text-gray-700 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
