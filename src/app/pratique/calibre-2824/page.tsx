import type { Metadata } from 'next';
import Calibre2824Client from './Calibre2824Client';

export const metadata: Metadata = {
  title: 'Calibre ETA 2824-2 en 3D Interactive : Vue Éclatée, Rotor & Quantième',
  description: 'Explorez le mouvement horloger automatique suisse ETA 2824-2 en 3D temps réel à 360°. Vue éclatée Z, automatisme à roues inverseuses, dateur instantané et lubrification Moebius officielle.',
  keywords: [
    'ETA 2824-2 3D',
    'calibre 2824 interactif',
    'vue éclatée montre automatique',
    'roues inverseuses 2824',
    'dateur instantané',
    'mouvement suisse 28800'
  ],
  alternates: {
    canonical: 'https://www.horlolearn.ch/pratique/calibre-2824',
  },
  openGraph: {
    title: 'Calibre ETA 2824-2 en 3D Interactive | HorloLearn',
    description: 'Explorez le mouvement horloger automatique suisse ETA 2824-2 en 3D temps réel à 360°. Vue éclatée Z, automatisme et fiches d’atelier.',
    url: 'https://www.horlolearn.ch/pratique/calibre-2824',
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
            '@type': 'LearningResource',
            'name': 'Calibre ETA 2824-2 en 3D Interactive',
            'description': 'Simulateur 3D interactif haute fidélité et vue éclatée du calibre automatique suisse ETA 2824-2.',
            'educationalLevel': 'Beginner to Advanced',
            'learningResourceType': 'Interactive Simulation',
            'inLanguage': 'fr-CH',
            'publisher': {
              '@type': 'Organization',
              'name': 'HorloLearn'
            }
          })
        }}
      />
      <Calibre2824Client />
    </>
  );
}
