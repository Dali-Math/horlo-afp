"use client";
import Link from "next/link";
import HeaderSection from "./HeaderSection";
import TimelineHorlogerie from "./TimelineHorlogerie";
import HistorySection from "./HistorySection";
import MuseumsSection from "./MuseumsSection";
import HorlogersHistorique from "./HorlogersHistorique";
import VideosSection from "./VideosSection";
import LibrarySection from "./LibrarySection";

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-neutral-100">
      {/* Hero Header with visual introduction */}
      <HeaderSection />
      
      {/* Interactive Timeline of Watchmaking */}
      <TimelineHorlogerie />
      
      {/* History Section with encyclopedic resources */}
      <HistorySection />
      
      {/* Museums Section with visual cards */}
      <MuseumsSection />
      
      {/* Swiss Watchmakers Historical Section */}
      <HorlogersHistorique />
      
      {/* Videos & Documentaries Section */}
      <VideosSection />
      
      {/* Library & Reading Resources Section */}
      <LibrarySection />
      
      {/* Call to Action - Navigation to other sections */}
      <section className="container mx-auto px-4 pb-24">
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 to-fuchsia-500/20 ring-1 ring-white/10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-500 hover:ring-white/20 hover:shadow-2xl hover:shadow-amber-500/10">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-fuchsia-300 bg-clip-text text-transparent">
              Poursuivre l'exploration
            </h3>
            <p className="text-neutral-300 mt-2">
              Découvrez la théorie, les outils et la pratique de l'horlogerie moderne.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/theorie"
              className="px-5 py-2.5 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30"
            >
              Théorie
            </Link>
            <Link
              href="/outils"
              className="px-5 py-2.5 rounded-md bg-white/10 hover:bg-white/15 ring-1 ring-white/15 transition-all duration-300 hover:scale-105"
            >
              Outils
            </Link>
            <Link
              href="/pratique"
              className="px-5 py-2.5 rounded-md bg-white/10 hover:bg-white/15 ring-1 ring-white/15 transition-all duration-300 hover:scale-105"
            >
              Pratique
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
