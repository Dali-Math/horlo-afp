import type { Metadata } from 'next';
import DemagnetisationClient from './DemagnetisationClient';

export const metadata: Metadata = {
  title: 'Démagnétiser une Montre : Procédure d’Atelier & Test Boussole',
  description: 'Guide pratique et simulateur d’atelier : comment démagnétiser un spiral collé au champ alternatif (50 Hz). Test à la boussole, tracé Witschi et norme ISO 764.',
  keywords: [
    'démagnétiser une montre',
    'spiral magnétisé',
    'avance montre plusieurs minutes',
    'test boussole montre',
    'démagnétiseur horloger',
    'norme iso 764 horlogerie'
  ],
  alternates: {
    canonical: 'https://www.horlolearn.ch/theorie/mouvements/demagnetisation-procedure',
  },
  openGraph: {
    title: 'Démagnétiser une Montre : Procédure d’Atelier & Test Boussole | HorloLearn',
    description: 'Guide pratique et simulateur d’atelier : comment démagnétiser un spiral collé au champ alternatif (50 Hz). Test à la boussole, tracé Witschi et norme ISO 764.',
    url: 'https://www.horlolearn.ch/theorie/mouvements/demagnetisation-procedure',
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
            '@type': 'HowTo',
            'name': 'Comment démagnétiser une montre mécanique à l’établi',
            'description': 'Protocole horloger d’annulation du champ coercitif résiduel d’un spiral par champ alternatif sinusoïdal décroissant.',
            'step': [
              {
                '@type': 'HowToStep',
                'name': 'Positionnement',
                'text': 'Poser le mouvement ou la montre au centre de la plaque de démagnétisation.'
              },
              {
                '@type': 'HowToStep',
                'name': 'Mise sous tension',
                'text': 'Enclencher et maintenir le bouton d’impulsion pour activer le champ 50 Hz.'
              },
              {
                '@type': 'HowToStep',
                'name': 'Éloignement vertical',
                'text': 'Éloigner verticalement la montre lentement jusqu’à au moins 30-40 cm.'
              },
              {
                '@type': 'HowToStep',
                'name': 'Coupure hors champ',
                'text': 'Relâcher le bouton uniquement une fois la montre totalement hors du champ pour éviter toute remagnétisation.'
              }
            ]
          })
        }}
      />
      <DemagnetisationClient />
    </>
  );
}
