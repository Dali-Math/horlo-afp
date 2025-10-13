"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

const DOCS: Record<
  string,
  { title: string; pages: string[]; description?: string }
> = {
  "metiers-horlogerie": {
    title: "Métiers de l'Horlogerie",
    description:
      "Guide complet des métiers horlogers suisses : formations, compétences et carrières dans l'industrie.",
    pages: [
      "/flipbook/metiers-horlogerie/1.jpg",
      "/flipbook/metiers-horlogerie/2.jpg",
      "/flipbook/metiers-horlogerie/3.jpg",
      "/flipbook/metiers-horlogerie/4.jpg",
    ],
  },
  "rapport-fhh": {
    title: "Rapport FHH 2024",
    description:
      "Rapport annuel : chiffres clés et tendances de l'industrie horlogère suisse.",
    pages: [
      "/flipbook/rapport-fhh/1.jpg",
      "/flipbook/rapport-fhh/2.jpg",
      "/flipbook/rapport-fhh/3.jpg",
      "/flipbook/rapport-fhh/4.jpg",
    ],
  },
};

export default function LivreFlipbook() {
  const { slug } = useParams();
  const doc = useMemo(() => DOCS[slug as string], [slug]);
  const [zoom, setZoom] = useState(1);

  if (!doc) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300">
        <p>Document introuvable 📄</p>
      </div>
    );
  }

  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 1));

  return (
    <section className="min-h-screen bg-black text-white py-12 px-6 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-[#E2B44F] mb-6 text-center">
        {doc.title}
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-2xl">
        {doc.description}
      </p>

      <div
        className="relative flex justify-center items-center w-full"
        style={{ transform: `scale(${zoom})`, transition: "transform 0.3s" }}
      >
        <HTMLFlipBook
          width={500}
          height={700}
          showCover={true}
          className="shadow-lg rounded-xl"
          mobileScrollSupport={true}
        >
          {doc.pages.map((page, i) => (
            <div key={i} className="bg-[#111] flex items-center justify-center">
              <img
                src={page}
                alt={`Page ${i + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </HTMLFlipBook>

        {/* Contrôles zoom */}
        <div className="absolute bottom-4 right-4 flex gap-3">
          <button
            onClick={zoomOut}
            className="bg-[#E2B44F]/20 hover:bg-[#E2B44F]/40 p-2 rounded-full"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={zoomIn}
            className="bg-[#E2B44F]/20 hover:bg-[#E2B44F]/40 p-2 rounded-full"
          >
            <ZoomIn size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
