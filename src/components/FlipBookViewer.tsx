"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

interface FlipBookViewerProps {
  file: string;
}

export default function FlipBookViewer({ file }: FlipBookViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [width, setWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  // 📱 Ajuste automatiquement la largeur selon la taille d'écran
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

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full">
      <Document
        file={file}
        onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
        loading={<p className="text-yellow-400 text-lg mt-10">Chargement du PDF...</p>}
        error={<p className="text-red-400 mt-10">Erreur de chargement du document.</p>}
      >
        {numPages > 0 && (
          <HTMLFlipBook
            width={width}
            height={width * 1.3} // proportion automatique
            className="shadow-lg rounded-lg overflow-hidden bg-white"
          >
            {Array.from({ length: numPages }, (_, i) => (
              <div key={i} className="page-container bg-white flex justify-center">
                <Page
                  pageNumber={i + 1}
                  width={width}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading="lazy"
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}
