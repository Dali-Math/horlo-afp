"use client";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import FlipBookViewer from "./FlipbookViewer";

const DOCS: Record<
  string,
  { title: string; description: string; file: string; intro: string }
> = {
  "rapport-fhh": {
    title: "Rapport FHH 2024",
    description:
      "Rapport annuel : chiffres clés et tendances de l'industrie horlogère suisse.",
    intro:
      "Le Rapport FHH 2024 présente les chiffres clés, les tendances et les perspectives de l’industrie horlogère suisse. Il s’agit d’une ressource précieuse pour comprendre l’évolution du secteur et ses dynamiques économiques. Publié par la Fondation de la Haute Horlogerie, ce rapport met en lumière les innovations, les marchés émergents et les défis auxquels les maisons suisses font face dans un contexte mondial en mutation.",
    file: "/pdfs/rapport-fhh.pdf",
  },
  "metiers-horlogerie": {
    title: "Métiers de l'Horlogerie",
    description:
      "Guide complet des métiers horlogers suisses : formations, compétences et carrières dans l'industrie.",
    intro:
      "Le guide des Métiers de l’Horlogerie explore les différentes professions de l’industrie suisse : horlogers, polisseurs, micro-mécaniciens et concepteurs. Il offre une vision complète des formations disponibles et des opportunités offertes par ce secteur d’excellence.",
    file: "/pdfs/metiers-horlogerie.pdf",
  },
};

export default function LivrePage({ params }: { params: { slug: string } }) {
  const doc = DOCS[params.slug];

  if (!doc) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-300 bg-[#0b1220]">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">
          Document introuvable
        </h1>
        <p className="text-gray-400 mb-6">
          Le document que vous cherchez n’existe pas ou a été déplacé.
        </p>
        <Link
          href="/suisse"
          className="text-yellow-400 hover:text-white transition"
        >
          ← Retour
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Partie gauche : texte descriptif */}
        <div>
          <Link
            href="/suisse"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition mb-8"
          >
            <ArrowLeft className="w-5 h-5" /> Retour
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-yellow-400 w-7 h-7" />
            <h1 className="text-3xl font-bold text-yellow-400">{doc.title}</h1>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{doc.intro}</p>
        </div>

        {/* Partie droite : FlipBook PDF */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-yellow-500/30 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-yellow-400 w-6 h-6" />
            <h2 className="text-xl font-semibold text-yellow-400">
              {doc.description}
            </h2>
          </div>
          <FlipBookViewer file={doc.file} />
        </div>
      </div>
    </section>
  );
}
