// Fonction Next.js requise pour export statique
export async function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

// DOCS : à placer ici avant tout import dynamique
const DOCS: Record<
  string,
  { title: string; pdf: string; description?: string }
> = {
  "metiers-horlogerie": {
    title: "Métiers de l'Horlogerie",
    pdf: "/pdfs/metiers-horlogerie.pdf",
    description:
      "Guide complet des métiers horlogers suisses : formations, compétences et carrières dans l'industrie.",
  },
  "rapport-fhh": {
    title: "Rapport FHH 2024",
    pdf: "/pdfs/rapport-fhh.pdf",
    description:
      "Rapport annuel : chiffres clés et tendances de l'industrie horlogère suisse.",
  },
};

// Page server component
import Link from "next/link";
import FlipbookViewer from "./FlipbookViewer";

// Typage Next.js
type Props = { params: { slug: string } };

export default function PdfViewerPage({ params }: Props) {
  const doc = DOCS[params.slug];

  if (!doc) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">❌ Document introuvable.</p>
          <Link
            href="/suisse"
            className="text-[#E2B44F] hover:text-[#FFD36D] transition underline"
          >
            ← Retour aux documents
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-gray-200">
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-20">
        <Link
          href="/suisse"
          className="text-[#E2B44F] hover:text-[#FFD36D] transition text-sm"
        >
          ← Retour aux documents
        </Link>
        <div className="mt-4 p-6 rounded-xl border border-[#E2B44F]/20 bg-[#0D0D0D] shadow-[0_0_20px_rgba(226,180,79,0.05)]">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-[#E2B44F]">📘</span>{" "}
            <span className="text-white">{doc.title}</span>
          </h1>
          {doc.description && (
            <p className="text-gray-400 text-base">{doc.description}</p>
          )}
        </div>
        <div className="mt-8 rounded-xl border border-[#E2B44F]/20 bg-[#0D0D0D] p-2">
          <FlipbookViewer doc={doc} />
        </div>
      </div>
    </main>
  );
}

// --- Nouveau Fichier ---
// src/app/suisse/livre/[slug]/FlipbookViewer.tsx

"use client";
import { useMemo, useState } from "react";

// Typage
type DocProps = {
  doc: { title: string; pdf: string };
};

export default function FlipbookViewer({ doc }: DocProps) {
  const [loaded, setLoaded] = useState(false);

  const viewerSrc = useMemo(() => {
    const file = encodeURIComponent(doc.pdf);
    const title = encodeURIComponent(doc.title);
    return `/pdfjs/flipbook/index.html?file=${file}&title=${title}`;
  }, [doc.pdf, doc.title]);

  return (
    <>
      {!loaded && (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="h-10 w-10 border-2 border-[#E2B44F] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400 text-sm">
            Chargement du livre en cours…
          </p>
        </div>
      )}
      <iframe
        src={viewerSrc}
        title={doc.title}
        className={`w-full ${loaded ? "h-[85vh]" : "h-0"} rounded-lg transition-all`}
        onLoad={() => setLoaded(true)}
        allowFullScreen
        loading="eager"
      />
    </>
  );
}
