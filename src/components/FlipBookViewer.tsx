"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Document, Page, pdfjs } from "react-pdf";

// ✅ configuration du worker PDF
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// ✅ import du flipbook côté client seulement
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

interface FlipBookViewerProps {
  file: string;
}

export default function FlipBookViewer({ file }: FlipBookViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <div className="flex flex-col items-center">
      <Document file={file} onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}>
        <div className="hidden">
          {Array.from(new Array(numPages), (_, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </div>
      </Document>

      {numPages > 0 && (
        <HTMLFlipBook width={600} height={800} className="shadow-lg rounded-lg overflow-hidden">
          {Array.from(new Array(numPages), (_, index) => (
            <div key={index} className="bg-white flex items-center justify-center text-black text-xl font-bold">
              Page {index + 1}
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
}
