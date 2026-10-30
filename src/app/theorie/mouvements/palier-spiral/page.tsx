import type { Metadata } from 'next';
import PalierSpiralClient from './PalierSpiralClient';

export const metadata: Metadata = {
  title: 'Palier de Balancier & Fixation du Spiral : Antichoc Incabloc, Virole & Lubrification NIHS',
  description: 'Étude technique d’atelier du palier amortisseur de balancier (Incabloc) et du système de fixation du spiral : virolage, piton mobile, lubrification Moebius 9010 et tolérances d’ébats NIHS.',
  keywords: [
    'palier de balancier',
    'fixation spiral horlogerie',
    'antichoc incabloc',
    'lubrification moebius 9010',
    'virole balancier',
    'piton mobile',
    'norme nihs 92-11',
    'ebat de hauteur balancier'
  ],
  alternates: {
    canonical: 'https://www.horlolearn.ch/theorie/mouvements/palier-spiral',
  },
  openGraph: {
    title: 'Palier de Balancier & Fixation du Spiral : Antichoc Incabloc & NIHS | HorloLearn',
    description: 'Étude technique d’atelier du palier amortisseur de balancier (Incabloc) et du système de fixation du spiral : virolage, piton mobile, lubrification Moebius 9010 et tolérances d’ébats NIHS.',
    url: 'https://www.horlolearn.ch/theorie/mouvements/palier-spiral',
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
            'headline': 'Palier de Balancier & Fixation du Spiral : Antichoc Incabloc, Virole & Lubrification NIHS',
            'description': 'Étude micro-mécanique et d’atelier sur les paliers antichocs de balancier, l’attache du spiral et le réglage de l’isochronisme.',
            'author': {
              '@type': 'Organization',
              'name': 'HorloLearn — Savoir-Faire Horloger d’Établi'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'HorloLearn',
              'url': 'https://www.horlolearn.ch'
            }
          }),
        }}
      />
      <PalierSpiralClient />
    </>
  );
}
