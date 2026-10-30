import type { Metadata } from 'next';
import CoqBalancierClient from './CoqBalancierClient';

export const metadata: Metadata = {
  title: 'Le Coq (Pont de Balancier) : Anatomie, Pose d’Établi & Réglage Micrométrique',
  description: 'Étude technique d’établi du coq horloger suisse : anatomie micromécanique, raquetterie Etachron, régulateur à col de cygne, protocole de pose sans choc et finitions Côtes de Genève.',
  keywords: [
    'le coq horlogerie',
    'pont de balancier',
    'pose du coq balancier',
    'reglage raquette etachron',
    'col de cygne horlogerie',
    'pied de coq goupilles centrage',
    'norme nihs couple serrage',
    'ETA 6497 coq'
  ],
  alternates: {
    canonical: 'https://www.horlolearn.ch/theorie/mouvements/coq-balancier',
  },
  openGraph: {
    title: 'Le Coq (Pont de Balancier) : Anatomie & Pose d’Établi | HorloLearn',
    description: 'Étude technique d’établi du coq horloger suisse : anatomie micromécanique, raquetterie Etachron, régulateur à col de cygne, protocole de pose sans choc et finitions Côtes de Genève.',
    url: 'https://www.horlolearn.ch/theorie/mouvements/coq-balancier',
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
            'headline': 'Le Coq (Pont de Balancier) : Anatomie, Pose d’Établi & Réglage Micrométrique',
            'description': 'Traité technique d’établi horloger sur le pont de balancier (coq), la raquetterie et le protocole d’assemblage sans choc.',
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
      <CoqBalancierClient />
    </>
  );
}
