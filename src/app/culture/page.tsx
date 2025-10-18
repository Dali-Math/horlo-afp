"use client";

import { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simule le chargement initial (enlève après que le contenu soit chargé)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 secondes de loader

    return () => clearTimeout(timer);
  }, []);

  // ============================================
  // SKELETON LOADER (pendant chargement)
  // ============================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-100 dark:bg-dark-900 animate-pulse">
        {/* Hero Skeleton */}
        <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 h-64 sm:h-80 mb-12"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Timeline Skeleton */}
          <div className="mb-16">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-w-[280px] h-40 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>

          {/* History Skeleton */}
          <div className="mb-16">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>

          {/* Museums Grid Skeleton */}
          <div className="mb-16">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>

          {/* Watchmakers Skeleton */}
          <div className="mb-16">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>

          {/* Videos Skeleton */}
          <div className="mb-16">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-56 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#E2B44F] mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Chargement de la Culture Horlogère...
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                ⏱️ Veuillez patienter quelques instants
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // CONTENU RÉEL (après chargement)
  // ============================================
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
              Poursuivre l'exploration
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-light-200 mt-2">
              Découvrez la théorie, les outils et la pratique de l'horlogerie moderne.
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
