import type { Metadata } from 'next';
import Calibre3DClient from './Calibre3DClient';

export const metadata: Metadata = {
  title: 'Calibre ETA 6497 en 3D Interactive : Éclaté Mécanique & Rouage',
  description: 'Explorez le mouvement horloger mécanique ETA 6497-1 en 3D temps réel à 360°. Vue éclatée, fonctionnement pas-à-pas de l’échappement suisse et fiches d’organes d’établi.',
  keywords: [
    'calibre 3d interactif',
    'ETA 6497 3D',
    'vue éclatée mouvement horloger',
    'echappement suisse 3D',
    'balancier spiral interactif',
    'rouage montre mécanique'
  ],
  alternates: {
    canonical: 'https://www.horlolearn.ch/pratique/calibre-3d',
  },
  openGraph: {
    title: 'Calibre ETA 6497 en 3D Interactive : Éclaté Mécanique & Rouage | HorloLearn',
    description: 'Explorez le mouvement horloger mécanique ETA 6497-1 en 3D temps réel à 360°. Vue éclatée, fonctionnement pas-à-pas de l’échappement suisse et fiches d’organes d’établi.',
    url: 'https://www.horlolearn.ch/pratique/calibre-3d',
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
            'name': 'Calibre ETA 6497 en 3D Interactive',
            'description': 'Simulateur 3D interactif et vue éclatée du calibre horloger école suisse ETA 6497-1.',
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
      <Calibre3DClient />
    </>
  );
}
