import type { Metadata } from 'next';
import PlatineTroisQuartsClient from './PlatineTroisQuartsClient';

export const metadata: Metadata = {
  title: 'La Platine 3/4 (Trois-Quarts) : Architecture Saxonne, Maillechort & Chatons Or Vissés',
  description: 'Étude d’artisan horloger sur la platine 3/4 : genèse Ferdinand Adolph Lange (1864), maillechort non traité (German Silver), chatons d’or vissés et défi d’assemblage simultané à l’établi.',
  keywords: [
    'platine 3/4 horlogerie',
    'platine trois quarts',
    'architecture glashutte',
    'maillechort german silver',
    'chatons or vissés',
    'a lange sohne platine',
    'comparatif ponts suisses platine 3/4',
    'montage rouage simultané'
  ],
  alternates: {
    canonical: 'https://www.horlolearn.ch/theorie/mouvements/platine-3-4',
  },
  openGraph: {
    title: 'La Platine 3/4 : Architecture Saxonne & Chatons Vissés | HorloLearn',
    description: 'Étude d’artisan horloger sur la platine 3/4 : genèse Ferdinand Adolph Lange (1864), maillechort non traité (German Silver), chatons d’or vissés et défi d’assemblage simultané à l’établi.',
    url: 'https://www.horlolearn.ch/theorie/mouvements/platine-3-4',
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
            'headline': 'La Platine 3/4 (Trois-Quarts) : Architecture Saxonne, Maillechort & Chatons Or Vissés',
            'description': 'Traité technique d’horlogerie sur la platine trois-quarts de Glashütte, les chatons en or vissés et le travail du maillechort.',
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
      <PlatineTroisQuartsClient />
    </>
  );
}
