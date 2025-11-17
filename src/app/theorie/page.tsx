import { Metadata } from 'next';
import TheoriePageClient from './TheoriePageClient';

// --- MÉTADONNÉES SEO ---
export const metadata: Metadata = {
  title: 'Théorie Horlogère - Les Fondamentaux | HorloLearn',
  description: 'Plongez dans l\'univers de la théorie horlogère. Apprenez les bases du mouvement d\'une montre, les complications et l\'histoire de l\'horlogerie avec HorloLearn.',
  keywords: ['théorie horlogère', 'mécanisme montre', 'échappement', 'balancier', 'complications', 'horlogerie suisse'],
  openGraph: {
    title: 'Théorie Horlogère - Les Fondamentaux | HorloLearn',
    description: 'Apprenez les bases du mouvement d\'une montre et des complications horlogères.',
    type: 'website',
    url: 'https://horlo-afp.vercel.app/theorie', // Mettez l'URL de votre site
    images: [
      {
        url: '/images/theorie-cover.jpg', // IMPORTANT: Créez cette image
        width: 1200,
        height: 630,
        alt: 'Théorie Horlogère sur HorloLearn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Théorie Horlogère - Les Fondamentaux | HorloLearn',
    description: 'Apprenez les bases du mouvement d\'une montre et des complications horlogères.',
    images: ['/images/theorie-cover.jpg'], // Même image que pour Open Graph
  },
};

// Le composant de la page, qui est maintenant un Server Component
export default function TheoriePage() {
  return <TheoriePageClient />;
}
