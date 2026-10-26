"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SOURCE_PDF =
  "https://rnm-metallurgie.fr/wp-content/uploads/2017/07/TM439-Prof-horlogerie.pdf";

export default function GuideCompletRuntimeFixes() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/materiaux/guide-complet") return;

    const repairPdf = () => {
      const frame = document.querySelector<HTMLIFrameElement>(
        'iframe[src="/pdfs/metaux-communs.pdf"]'
      );

      if (!frame) return false;

      frame.src = SOURCE_PDF;
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
          "Document de référence · Métallurgie appliquée à l’horlogerie · Ouvrir le PDF ↗";
        parent.insertBefore(sourceLink, frame);
      }

      return true;
    };

    const syncTocPosition = () => {
      const toc = document.querySelector<HTMLElement>(".toc-fixed");
      if (!toc || window.innerWidth < 1025) return;

      const navbar = document.querySelector<HTMLElement>("header.sticky");
      let top = 0;

      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          top = Math.max(0, Math.round(rect.bottom + 8));
        }
      }

      toc.style.setProperty("--guide-toc-top", `${top}px`);
    };

    repairPdf();
    syncTocPosition();

    const observer = new MutationObserver(() => {
      repairPdf();
      syncTocPosition();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", syncTocPosition, { passive: true });
    window.addEventListener("resize", syncTocPosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncTocPosition);
      window.removeEventListener("resize", syncTocPosition);
    };
  }, [pathname]);

  return null;
}
