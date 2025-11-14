"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

interface FlipBookViewerProps {
  file: string;
  mode?: "vertical" | "horizontal"; // 🟡 deux modes
}

export default function FlipBookViewer({ file, mode = "vertical" }: FlipBookViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [width, setWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  // 📱 ajuste la largeur automatiquement selon l’écran
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const screenWidth = containerRef.current.offsetWidth;
        const newWidth = screenWidth < 700 ? screenWidth - 30 : 600;
        setWidth(newWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🟡 MODE HORIZONTAL : LIVRE OUVERT COMME L’IMAGE
  const horizontalConfig = {
    width: 900,     // livre large
    height: 550,    // hauteur paysage
    minWidth: 800,
    maxWidth: 1600,
    minHeight: 500,
    maxHeight: 700,
    usePortrait: false, // 🔥 mode double-page horizontal
  };

  // 🟢 MODE VERTICAL : COMME ETA 6497
  const verticalConfig = {
    width,
    height: width * 1.3,
    minWidth: 300,
    maxWidth: 900,
    minHeight: 400,
    maxHeight: 1400,
    usePortrait: true,
  };

  // choisir config
  const config = mode === "horizontal" ? horizontalConfig : verticalConfig;

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full">

      <Document
        file={file}
        onLoadSuccess={(pdf: { numPages: number }) => setNumPages(pdf.numPages)} // 🔥 FIX TYPESCRIPT
        loading={<p className="text-yellow-400 text-lg mt-10">Chargement du PDF...</p>}
        error={<p className="text-red-400 mt-10">Erreur de chargement du document.</p>}
      >
        {numPages > 0 && (
          <HTMLFlipBook
            {...config}
            size="stretch"
            showCover={false}
            mobileScrollSupport={true}
            drawShadow={true}
            className="shadow-2xl rounded-xl overflow-hidden bg-white"
          >
            {Array.from({ length: numPages }, (_, i) => (
              <div
                key={i}
                className="page bg-white flex justify-center items-center"
                style={{ width: "100%", height: "100%" }}
              >
                <Page
                  pageNumber={i + 1}
                  width={mode === "horizontal" ? 430 : width} // 🟡 430 = moitié du livre
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}
