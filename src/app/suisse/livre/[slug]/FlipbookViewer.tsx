"use client";
import { useMemo, useState } from "react";

type DocProps = {
  doc: { title: string; pdf: string };
};

export default function FlipbookViewer({ doc }: DocProps) {
  const [loaded, setLoaded] = useState(false);

  const viewerSrc = useMemo(() => {
    const file = encodeURIComponent(doc.pdf);
    const title = encodeURIComponent(doc.title);
    // Correction ici : on pointe sur le nouveau nom flipbook-viewer.html
    return `/pdfjs/flipbook/flipbook-viewer.html?file=${file}&title=${title}`;
  }, [doc.pdf, doc.title]);

  return (
    <>
      {!loaded && (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="h-10 w-10 border-2 border-[#E2B44F] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400 text-sm">
            Chargement du livre en cours…
          </p>
        </div>
      )}
      <iframe
        src={viewerSrc}
        title={doc.title}
        className={`w-full ${loaded ? "h-[85vh]" : "h-0"} rounded-lg transition-all`}
        onLoad={() => setLoaded(true)}
        allowFullScreen
        loading="eager"
      />
    </>
  );
}
