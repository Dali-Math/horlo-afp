import React from "react";

const PDF_URL = "/pdfs/metaux-communs.pdf";

export default function MetauxCommunsPdfPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
            Chapitre 2 – Métaux communs (PDF complet)
          </h1>
          <p className="text-sm sm:text-base text-zinc-600">
            Ici tu vois directement le vrai PDF de ton cours, exactement comme tu l&apos;as
            préparé pour tes élèves.
          </p>
        </header>

        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-4 py-2 font-medium text-zinc-800 hover:bg-zinc-200 transition"
          >
            Ouvrir le PDF dans un nouvel onglet
          </a>

          <a
            href={PDF_URL}
            download
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 font-medium text-white hover:bg-zinc-800 transition"
          >
            Télécharger le PDF
          </a>
        </div>

        <div className="mt-4 border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <iframe
            src={PDF_URL}
            className="w-full"
            style={{ height: "80vh" }}
          />
        </div>
      </div>
    </main>
  );
}
