import HeroMetiers from './components/HeroMetiers';
import MetiersAFPGrid from './components/MetiersAFPGrid';
import ParcoursFormation from './components/ParcoursFormation';
import RessourcesMetiers from './components/RessourcesMetiers';
import GalerieVideosMetiers from './components/GalerieVideosMetiers';
import QuizMetiers from './components/QuizMetiers';
import CitationFinaleMetiers from './components/CitationFinaleMetiers';

export default function MetiersPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* 1. Hero Section */}
      <HeroMetiers />

      {/* 2. Métiers AFP Grid */}
      <MetiersAFPGrid />

      {/* 3. Parcours de Formation */}
      <ParcoursFormation />

      {/* 4. Ressources & Documents */}
      <RessourcesMetiers />

      {/* 5. Galerie & Vidéos */}
      <GalerieVideosMetiers />

      {/* 6. Quiz de Formation */}
      <QuizMetiers />

      {/* 7. Citation Finale */}
      <CitationFinaleMetiers />
    </main>
  );
}
