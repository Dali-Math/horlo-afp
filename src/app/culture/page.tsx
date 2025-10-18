"use client";

import Link from "next/link";
import HeaderSection from "./HeaderSection";
import TimelineHorlogerie from "./TimelineHorlogerie";
import HistorySection from "./HistorySection";
import MuseumsSection from "./MuseumsSection";
import HorlogersHistorique from "./HorlogersHistorique";
import PersonnalitesSection from "./PersonnalitesSection";
import VideosSection from "./VideosSection";
import LibrarySection from "./LibrarySection";

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-900 text-slate-900 dark:text-light-100 transition-colors duration-500">
      {/* Hero Header */}
      <HeaderSection />

      {/* Timeline */}
      <TimelineHorlogerie />

      {/* History */}
      <HistorySection />

      {/* Museums */}
      <MuseumsSection />

      {/* Watchmakers */}
      <HorlogersHistorique />

      {/* Personnalities */}
      <PersonnalitesSection />

      {/* Videos */}
      <VideosSection />

      {/* Library */}
      <LibrarySection />

      {/* Call to Action */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="rounded-2xl bg-gradient-to-r from-gold/15 to-gold-dark/15 dark:from-gold/10 dark:to-gold-dark/10 ring-1 ring-gold/20 p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-500 hover:ring-gold/40 hover:shadow-2xl hover:shadow-gold/20">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gold-light to-gold-dark bg-clip-text text-transparent">
              Poursuivre l’exploration
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-light-200 mt-2">
              Découvrez la théorie, les outils et la pratique de l’horlogerie moderne.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <Link
              href="/theorie"
              className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-md bg-gold text-dark-900 font-semibold hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/30"
            >
              Théorie
            </Link>
            <Link
              href="/outils"
              className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-md bg-dark-800 text-light-100 hover:bg-dark-700 transition-all duration-300 hover:scale-105 ring-1 ring-white/10"
            >
              Outils
            </Link>
            <Link
              href="/pratique"
              className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-md bg-dark-800 text-light-100 hover:bg-dark-700 transition-all duration-300 hover:scale-105 ring-1 ring-white/10"
            >
              Pratique
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
