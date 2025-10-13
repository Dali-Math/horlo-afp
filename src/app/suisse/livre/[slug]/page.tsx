// Fonction nécessaire pour export dynamique des chemins
export async function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

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

import Link from "next/link";
import FlipbookViewer from "./FlipbookViewer";

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
