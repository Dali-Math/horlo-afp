import HeroSectionSuisse from "./components/HeroSectionSuisse";
import DocumentsGuidesSuisse from "./components/DocumentsGuidesSuisse";
import CarteInteractiveSuisse from "./components/CarteInteractiveSuisse";
import RessourcesSuisse from "./components/RessourcesSuisse";
import GalerieVideosSuisse from "./components/GalerieVideosSuisse";
import CitationsSuisse from "./components/CitationsSuisse";
import AttestationAFP from "./components/AttestationAFP";
import QuizSuisse from "./components/QuizSuisse";
import FooterSuisse from "./components/FooterSuisse";

export default function SuissePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      {/* Sections principales */}
      <HeroSectionSuisse />
      <DocumentsGuidesSuisse />
      <CarteInteractiveSuisse />
      <RessourcesSuisse />
      <GalerieVideosSuisse />
      <CitationsSuisse />
      <AttestationAFP />
      <QuizSuisse />
      <FooterSuisse />
    </main>
  );
}
