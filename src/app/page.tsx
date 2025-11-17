// app/page.tsx

import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

// --- MÉTADONNÉES SEO POUR LA PAGE D'ACCUEIL ---
export const metadata: Metadata = {
  title: 'HorloLearn - La Passion & Découverte Horlogère Suisse',
  description: 'Explorez librement ressources, tutoriels et savoirs horlogers partagés par des passionnés pour des passionnés. Théorie, pratique, quiz et bien plus.',
  keywords: ['horlogerie', 'montres suisses', 'apprendre l'horlogerie', 'ressources horlogères', 'forum horlogerie'],
  openGraph: {
    title: 'HorloLearn - La Passion Horlogère Suisse',
    description: 'Plongez dans l\'univers de l\'horlogerie suisse avec des cours, tutoriels et une communauté passionnée.',
    type: 'website',
    url: 'https://www.horlolearn.ch',
    images: [
      {
        url: '/images/horlolearn-home-cover.jpg', // IMPORTANT: Créez cette image
        width: 1200,
        height: 630,
        alt: 'HorloLearn - Communauté Horlogère Suisse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HorloLearn - La Passion Horlogère Suisse',
    description: 'Plongez dans l\'univers de l\'horlogerie suisse avec des cours, tutoriels et une communauté passionnée.',
    images: ['/images/horlolearn-home-cover.jpg'],
  },
};

// Le composant de la page d'accueil
export default function HomePage() {
  return <HomePageClient />;
}
