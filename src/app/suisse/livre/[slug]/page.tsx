"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

// On déclare le type manuellement pour contourner la restriction de TypeScript
// car react-pageflip ne publie pas encore un type ref compatible.
const HTMLFlipBook: any = dynamic(() => import("react-pageflip"), { ssr: false });

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
  const flipRef = useRef<any>(null);
  const [zoom, setZoom] = useState(1);

  if (!doc) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300">
        <p>Document introuvable 📄</p>
      </div>
    );
  }

  const handleNext = () => flipRef.current?.pageFlip()?.flipNext();
  const handlePrev = () => flipRef.current?.pageFlip()?.flipPrev();

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
        className="relative flex justify-center items-center w-full overflow-hidden"
        style={{ transform: `scale(${zoom})`, transition: "transform 0.3s" }}
      >
        <HTMLFlipBook
          ref={flipRef}
          width={400}
          height={550}
          showCover={true}
          className="shadow-lg rounded-xl"
          mobileScrollSupport={true}
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

        {/* Boutons navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 bg-[#E2B44F]/20 hover:bg-[#E2B44F]/40 text-white p-3 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 bg-[#E2B44F]/20 hover:bg-[#E2B44F]/40 text-white p-3 rounded-full"
        >
          <ChevronRight size={24} />
        </button>

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
