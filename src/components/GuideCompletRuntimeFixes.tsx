"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SOURCE_PDF =
  "https://rnm-metallurgie.fr/wp-content/uploads/2017/07/TM439-Prof-horlogerie.pdf";

const VIEWER_URL =
  "https://docs.google.com/gview?embedded=1&url=" + encodeURIComponent(SOURCE_PDF);

export default function GuideCompletRuntimeFixes() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/materiaux/guide-complet") return;

    const repairPdf = () => {
      const frame = document.querySelector<HTMLIFrameElement>(
        'iframe[src="/pdfs/metaux-communs.pdf"]'
      );

      if (!frame) return false;

      frame.src = VIEWER_URL;
      frame.title = "Importance de la métallurgie dans la haute horlogerie";
      frame.loading = "lazy";
      frame.classList.add("guide-reference-frame");

      const parent = frame.parentElement;
      if (parent && !parent.querySelector(".guide-pdf-source-link")) {
        const sourceLink = document.createElement("a");
        sourceLink.className = "guide-pdf-source-link";
        sourceLink.href = SOURCE_PDF;
        sourceLink.target = "_blank";
        sourceLink.rel = "noopener noreferrer";
        sourceLink.textContent =
          "Document de référence · Importance de la métallurgie dans la haute horlogerie · Ouvrir le PDF ↗";
        parent.insertBefore(sourceLink, frame);
      }

      return true;
    };

    if (repairPdf()) return;

    const observer = new MutationObserver(() => {
      if (repairPdf()) observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
