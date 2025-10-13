"use client";
import { useEffect, useRef } from "react";

export default function FlipBookViewer({ file }: { file: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.src = `/pdfjs/flipbook/flipbook-viewer.html?file=${encodeURIComponent(
        file
      )}`;
    }
  }, [file]);

  return (
    <div className="relative w-full h-[80vh] bg-black/20 rounded-xl overflow-hidden border border-yellow-500/30">
      <iframe
        ref={ref}
        title="FlipBook Viewer"
        className="w-full h-full rounded-xl"
        allowFullScreen
      />
    </div>
  );
}
