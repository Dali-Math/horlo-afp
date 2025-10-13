"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

export default function RapportFHH() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready && typeof window !== "undefined" && window.$) {
      const interval = setInterval(() => {
        if (window.$("#flipbook").FlipBook) {
          //@ts-ignore
          window.$("#flipbook").FlipBook({
            pdf: "/pdfs/rapport-fhh.pdf",
            template: {
              sounds: { startFlip: "https://3dflipbook.net/sounds/turn.mp3" },
            },
            controlsProps: { downloadURL: "/pdfs/rapport-fhh.pdf" },
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
        src="https://cdn.jsdelivr.net/npm/3dflipbook/dist/js/3dflipbook.min.js"
        onLoad={() => setReady(true)}
        strategy="afterInteractive"
      />

      {/* CSS du Flipbook */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/3dflipbook/dist/css/3dflipbook.min.css"
      />

      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
        <div className="w-full flex justify-between items-center mb-4">
          <Link
            href="/suisse"
            className="text-[#E2B44F] font-semibold hover:text-[#FFD700] transition"
          >
            ← Retour aux documents
          </Link>
          <h1 className="text-2xl font-bold text-[#E2B44F]">
            Rapport FHH 2024
          </h1>
        </div>

        <div
          id="flipbook"
          className="w-[90%] h-[85vh] rounded-lg overflow-hidden shadow-2xl flex items-center justify-center"
        >
          {!ready && (
            <p className="text-gray-400 text-center animate-pulse">
              Chargement du livre en cours...
            </p>
          )}
        </div>
      </div>
    </>
  );
}
