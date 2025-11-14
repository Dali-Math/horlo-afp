"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

interface FlipBookViewerProps {
  file: string;
}

export default function FlipBookViewer({ file }: FlipBookViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [width, setWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setWidth(w < 700 ? w - 30 : 600);
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
        onLoadSuccess={(pdf: { numPages: number }) => setNumPages(pdf.numPages)}
        loading={<p className="text-yellow-400 text-lg mt-10">Chargement…</p>}
        error={<p className="text-red-400 mt-10">Erreur.</p>}
      >
        {numPages > 0 && (
          <HTMLFlipBook
            width={width}
            height={width * 1.3}
            minWidth={300}
            maxWidth={900}
            minHeight={400}
            maxHeight={1500}
            showCover={false}
            mobileScrollSupport={true}
            usePortrait={true}
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
                  width={width}
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
