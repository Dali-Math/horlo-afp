import type { Metadata } from 'next';
import RoueTroisBrasClient from './RoueTroisBrasClient';

export const metadata: Metadata = {
  title: 'Roue des Secondes à 3 Bras : Calcul d’Inertie & Lubrification NIHS',
  description: 'Analyse micro-mécanique et cinématique de la roue des secondes ajourée à 3 bras à 120°. Réduction d’inertie (-40%), règles de chassage et lubrification Moebius 9010.',
  keywords: [
    'roue des secondes',
    'roue à trois bras',
    'rouage horloger',
    'calcul inertie horlogerie',
    'lubrification moebius 9010',
    'norme nihs 20-25'
  ],
  alternates: {
    canonical: 'https://www.horlolearn.ch/theorie/mouvements/roue-trois-bras',
  },
  openGraph: {
    title: 'Roue des Secondes à 3 Bras : Calcul d’Inertie & Lubrification NIHS | HorloLearn',
    description: 'Analyse micro-mécanique et cinématique de la roue des secondes ajourée à 3 bras à 120°. Réduction d’inertie (-40%), règles de chassage et lubrification Moebius 9010.',
    url: 'https://www.horlolearn.ch/theorie/mouvements/roue-trois-bras',
    type: 'article',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            'headline': 'Roue des Secondes à 3 Bras : Calcul d’Inertie & Lubrification NIHS',
            'description': 'Analyse micro-mécanique et cinématique de la roue des secondes ajourée à 3 bras à 120°. Réduction d’inertie (-40%), règles de chassage et lubrification Moebius 9010.',
            'author': {
              '@type': 'Organization',
              'name': 'HorloLearn'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'HorloLearn',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://www.horlolearn.ch/logos/Logo.jpg'
              }
            },
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': 'https://www.horlolearn.ch/theorie/mouvements/roue-trois-bras'
            }
          })
        }}
      />
      <RoueTroisBrasClient />
    </>
  );
}
