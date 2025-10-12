import React from 'react';
import { Metadata } from 'next';
import { HowToSchema } from '@/components/HowToSchema';
import { BreadcrumbsSchema } from '@/components/BreadcrumbsSchema';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Démontage du Balancier - Guide Pratique Horlogerie',
  description:
    'Apprenez à démonter correctement un balancier de montre mécanique sans endommager le spiral. Guide pas-à-pas avec outils et précautions.',
};

const howToSteps = [
  {
    name: 'Préparation de l’espace de travail',
    text: 'Installez-vous à un établi horloger avec une surface propre et anti-statique. Placez un coussin horloger sous le mouvement pour éviter toute rayure. Préparez une boîte de rangement pour les pièces démontées.',
  },
  {
    name: 'Vérification de l’état du mouvement',
    text: 'Examinez attentivement le balancier et le spiral à la loupe. Assurez-vous qu’il n’y a pas de déformation visible. Identifiez la position de la vis de plateau et du type de fixation utilisé.',
  },
  {
    name: 'Déblocage de la vis de plateau',
    text: 'Utilisez un tournevis horloger adapté à la fente de la vis de plateau. Tournez dans le sens anti-horaire (vissage à gauche) avec une pression constante et douce pour éviter de glisser.',
  },
  {
    name: 'Retrait du balancier',
    text: 'Une fois la vis desserrée, soulevez délicatement le balancier avec des brucelles en le tenant par l’anneau, jamais par le spiral. Éloignez-le verticalement du mouvement pour éviter tout frottement.',
  },
  {
    name: 'Rangement sécurisé',
    text: 'Placez le balancier dans un compartiment dédié, à l’abri de la poussière et des chocs. Ne jamais poser le balancier directement sur une surface dure, toujours utiliser un support matelassé ou un porte-balancier.',
  },
];

export default function DemontageBalancierPage() {
  return (
    <>
      <HowToSchema
        name="Démontage du balancier d'une montre mécanique"
        description="Guide complet pour démonter correctement un balancier de montre mécanique sans endommager le spiral ou les composants."
        totalTime="PT15M"
        estimatedCost={{
          currency: 'EUR',
          value: '0',
        }}
        tool={[
          'Tournevis horloger',
          'Brucelles fines',
          'Loupe ou binoculaire',
          'Coussin horloger',
          'Boîte de rangement',
        ]}
        supply={['Porte-balancier ou support matelassé']}
        step={howToSteps}
      />
      <BreadcrumbsSchema
        items={[
          { name: 'Accueil', url: siteConfig.siteUrl },
          { name: 'Pratique', url: `${siteConfig.siteUrl}/pratique` },
          {
            name: 'Démontage du balancier',
            url: `${siteConfig.siteUrl}/pratique/demontage-balancier`,
          },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          Démontage du Balancier d'une Montre Mécanique
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Le balancier est l'organe régulateur de la montre mécanique. Son
          démontage nécessite précaution et précision pour éviter d'endommager le
          spiral, pièce extrêmement fragile.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <h3 className="text-lg font-semibold mb-2 text-yellow-800">
            ⚠️ Précautions importantes
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Ne jamais toucher le spiral directement</li>
            <li>Travailler au-dessus d'un coussin horloger</li>
            <li>Utiliser un éclairage adapté et une loupe</li>
            <li>S'assurer que le mouvement n'est pas armé</li>
          </ul>
        </div>

        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Étapes du démontage</h2>
          {howToSteps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {step.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Outils nécessaires</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-center">
              <span className="mr-2">✔️</span> Tournevis horloger
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔️</span> Brucelles fines
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔️</span> Loupe ou binoculaire
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔️</span> Coussin horloger
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔️</span> Boîte de rangement
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔️</span> Porte-balancier ou support
              matelassé
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Pour aller plus loin</h3>
          <p className="text-gray-700 mb-4">
            Une fois le balancier démonté, vous pourrez procéder au nettoyage du
            mouvement ou au remplacement de pièces défectueuses. Le remontage
            nécessite les mêmes précautions en sens inverse.
          </p>
          <div className="flex gap-4">
            <a
              href="/pratique/remontage"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Guide de remontage
            </a>
            <a
              href="/pratique"
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Autres guides pratiques
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
