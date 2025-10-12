"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// Map slug -> titre + chemin PDF (respecte bien /pdfs/…)
const DOCS: Record<
  string,
  { title: string; pdf: string; description?: string }
> = {
  "metiers-horlogerie": {
    title: "Métiers de l'Horlogerie",
    pdf: "/pdfs/metiers-horlogerie.pdf",
    description:
      "Guide complet des métiers horlogers suisses : formations, compétences et carrières.",
  },
  "rapport-fhh": {
    title: "Rapport FHH 2024",
    pdf: "/pdfs/rapport-fhh.pdf",
    description:
      "Rapport annuel : chiffres clés et tendances de l'industrie horlogère suisse.",
  },
};

type Props = { params: { slug: string } };

export default function PdfLivrePage({ params }: Props) {
  const doc = DOCS[params.slug];
  const [loaded, setLoaded] = useState(false);

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Document introuvable.</p>
          <Link
            href="/suisse"
            className="mt-4 inline-block text-[#E2B44F] hover:underline"
          >
            ← Retour aux documents
          </Link>
        </div>
      </div>
    );
  }

  // URL PDF.js avec thème sombre + fit page
  const viewerSrc = useMemo(() => {
    // NB : # et ? appartiennent à viewer.html (anchor pour PDF.js)
    const file = encodeURIComponent(doc.pdf);
    return `/pdfjs/web/viewer.html?file=${file}#theme=dark&zoom=page-fit&spread=auto`;
  }, [doc.pdf]);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-gray-100">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-16">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/suisse"
            className="text-[#E2B44F] hover:text-[#ffd36d] transition"
          >
            ← Retour aux documents
          </Link>
        </div>

        {/* Titre bloc */}
        <section className="rounded-xl border border-[#E2B44F]/20 bg-[#0D0D0D] px-5 py-5 shadow-[0_0_30px_rgba(226,180,79,0.05)]">
          <h1 className="text-2xl md:text-3xl font-[700] tracking-tight">
            <span className="text-[#E2B44F]">📘</span>{" "}
            <span className="text-white">{doc.title}</span>
          </h1>
          {doc.description ? (
            <p className="mt-2 text-sm md:text-base text-gray-400">
              {doc.description}
            </p>
          ) : null}
        </section>

        {/* Viewer container */}
        <section className="mt-6 rounded-xl border border-[#E2B44F]/20 bg-[#0D0D0D] p-2">
          {/* Loader */}
          {!loaded && (
            <div className="flex h-[65vh] items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#E2B44F] border-t-transparent" />
                <p className="mt-3 text-sm text-gray-400">
                  Chargement du livre en cours…
                </p>
              </div>
            </div>
          )}

          {/* IFRAME PDF.js */}
          <iframe
            title={doc.title}
            src={viewerSrc}
            className={`w-full ${
              loaded ? "h-[85vh]" : "h-0"
            } rounded-lg bg-[#0A0A0A]`}
            onLoad={() => setLoaded(true)}
            loading="eager"
            allowFullScreen
          />
        </section>
      </div>
    </main>
  );
}
