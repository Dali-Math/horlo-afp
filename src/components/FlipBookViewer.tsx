"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Document, Page, pdfjs } from "react-pdf";

// 🧩 Configuration du worker PDF (indispensable sur Vercel)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// 🧩 Chargement dynamique du flipbook (client only)
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

interface FlipBookViewerProps {
  file: string;
}

export default function FlipBookViewer({ file }: FlipBookViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <div className="flex flex-col items-center">
      {/* On charge d'abord le PDF pour en extraire les pages */}
      <Document
        file={file}
        onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
        loading={<p className="text-yellow-400 text-lg mt-10">Chargement du PDF...</p>}
        error={<p className="text-red-400 mt-10">Erreur de chargement du document.</p>}
      >
        {numPages > 0 && (
          <HTMLFlipBook
            width={600}
            height={850}
            className="shadow-lg rounded-lg overflow-hidden bg-white"
          >
            {Array.from({ length: numPages }, (_, i) => (
              <div key={i} className="page-container bg-white flex justify-center">
                <Page
                  pageNumber={i + 1}
                  width={600}
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
