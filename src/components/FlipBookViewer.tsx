"use client";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

// Import dynamique pour éviter le crash SSR
const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
});

export default function FlipBookViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState(0);
  const bookRef = useRef<any>(null);

  return (
    <div className="flex flex-col items-center">
      {numPages > 0 && (
        <HTMLFlipBook
          width={600}
          height={850}
          className="shadow-lg rounded-lg overflow-hidden"
          showCover={false}
          ref={bookRef}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={`page_${index + 1}`}
              className="bg-white flex justify-center items-center"
            >
              <Page
                pageNumber={index + 1}
                width={580}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </HTMLFlipBook>
      )}

      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        className="hidden"
      />

      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          className="text-yellow-400 hover:text-yellow-200 text-3xl"
        >
          ‹
        </button>
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          className="text-yellow-400 hover:text-yellow-200 text-3xl"
        >
          ›
        </button>
      </div>
    </div>
  );
}
