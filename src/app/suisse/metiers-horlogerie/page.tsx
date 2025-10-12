"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

export default function MetiersHorlogerie() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready && typeof window !== "undefined") {
      const interval = setInterval(() => {
        if (window.$ && window.$("#flipbook").FlipBook) {
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
      <Script
        src="https://cdn.jsdelivr.net/npm/3dflipbook/dist/js/3dflipbook.min.js"
        onLoad={() => setReady(true)}
      />
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
            Métiers de l'Horlogerie
          </h1>
        </div>

        <div
          id="flipbook"
          className="w-[90%] h-[85vh] rounded-lg overflow-hidden shadow-2xl"
        >
          {!ready && (
            <p className="text-gray-400 text-center mt-10 animate-pulse">
              Chargement du livre en cours...
            </p>
          )}
        </div>
      </div>
    </>
  );
}
