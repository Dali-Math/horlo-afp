"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

// Import dynamique pour éviter le crash SSR
const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
}) as any;

export default function FlipBookViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState(0);
  const bookRef = useRef<any>(null);

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {numPages > 0 && (
        <HTMLFlipBook
          width={600}
          height={850}
          className="shadow-[0_0_20px_#e2b44f55] rounded-xl overflow-hidden"
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
        onLoadSuccess={(info: { numPages: number }) => setNumPages(info.numPages)}
        className="hidden"
      />

      {/* Navigation */}
      <div className="flex justify-center gap-8 mt-6">
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          className="text-yellow-400 hover:text-yellow-200 text-3xl transition-transform hover:scale-110"
        >
          ‹
        </button>
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          className="text-yellow-400 hover:text-yellow-200 text-3xl transition-transform hover:scale-110"
        >
          ›
        </button>
      </div>
    </motion.div>
  );
}
