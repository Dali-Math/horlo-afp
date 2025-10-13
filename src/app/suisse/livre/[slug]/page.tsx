"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import "react-pageflip/dist/react-pageflip.css";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

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

export default function LivreFlipbook() {
  const { slug } = useParams();
  const doc = useMemo(() => DOCS[slug as string], [slug]);

  if (!doc) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300">
        <p>Document introuvable 📄</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white py-12 px-6 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-[#E2B44F] mb-6 text-center">
        {doc.title}
      </h1>

      <p className="text-gray-400 mb-10 text-center max-w-2xl">
        {doc.description}
      </p>

      <div className="w-full flex justify-center">
        <HTMLFlipBook
          width={400}
          height={550}
          showCover={true}
          className="shadow-lg rounded-xl"
        >
          <div className="flex items-center justify-center bg-[#111] text-gray-200 p-10">
            <h2 className="text-2xl font-semibold">{doc.title}</h2>
          </div>

          <iframe
            src={doc.pdf}
            className="w-full h-full bg-white"
            title={doc.title}
          ></iframe>

          <div className="flex items-center justify-center bg-[#111] text-gray-400 p-10">
            <p>Fin du document</p>
          </div>
        </HTMLFlipBook>
      </div>
    </section>
  );
}
