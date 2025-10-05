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
    <div className="min-h-screen bg-black text-white">
      <HeroSectionSuisse />
      <DocumentsGuidesSuisse />
      <CarteInteractiveSuisse />
      <RessourcesSuisse />
      <GalerieVideosSuisse />
      <CitationsSuisse />
      <AttestationAFP />
      <QuizSuisse />
      <FooterSuisse />
    </div>
  );
}
