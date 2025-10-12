"use client";
// PDF cache fix: ensure correct paths are used
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

export default function MetiersHorlogerie() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready && typeof window !== "undefined" && window.$) {
      const interval = setInterval(() => {
        if (window.$("#flipbook").FlipBook) {
          //@ts-ignore
          window.$("#flipbook").FlipBook({
            pdf: "/pdfs/metiers-horlogerie.pdf",
            template: {
              sounds: { startFlip: "https://3dflipbook.net/sounds/turn.mp3" },
            },
            controlsProps: { downloadURL: "/pdfs/metiers-horlogerie.pdf" },
          });
          clearInterval(interval);
        }
      }, 300);
    }
  }, [ready]);

  return (
    <>
      {/* Charger jQuery d'abord */}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      {/* Charger le Flipbook après jQuery */}
      <Script
        src="https://3dflipbook.net/js/dist/3dflipbook.min.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      {/* CSS */}
      <link
        rel="stylesheet"
        href="https://3dflipbook.net/css/dist/3dflipbook.min.css"
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Barre de navigation */}
        <div className="w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/suisse"
                className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="font-medium">Retour aux documents</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* En-tête */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                📘 Métiers de l'Horlogerie
              </h1>
              <p className="text-blue-100 text-lg">
                Guide complet des métiers horlogers suisses : formations,
                compétences et carrières dans l'industrie.
              </p>
            </div>

            {/* Flipbook */}
            <div className="p-8">
              <div
                id="flipbook"
                className="w-full min-h-[600px] flex items-center justify-center bg-slate-50 rounded-xl"
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600">Chargement du livre en cours…</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
