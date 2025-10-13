"use client";
import { useEffect, useRef } from "react";

interface FlipBookViewerProps {
  file: string;
}

export default function FlipBookViewer({ file }: FlipBookViewerProps) {
  const viewerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.src = `/pdfjs/flipbook/flipbook-viewer.html?file=${encodeURIComponent(
        file
      )}`;
    }
  }, [file]);

  return (
    <div className="relative w-full h-[80vh] bg-black/20 rounded-xl overflow-hidden border border-yellow-500/30">
      <iframe
        ref={viewerRef}
        title="FlipBook Viewer"
        className="w-full h-full rounded-xl"
        allowFullScreen
      />
    </div>
  );
}
