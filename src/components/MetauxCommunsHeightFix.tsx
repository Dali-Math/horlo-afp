"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MetauxCommunsHeightFix() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/materiaux/metaux-communs") return;

    let retryTimer: number | null = null;
    let frameObserver: MutationObserver | null = null;
    let documentObserver: MutationObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let frame: HTMLIFrameElement | null = null;
    let applying = false;

    const fitToVisibleReport = () => {
      if (!frame || applying) return;
      const doc = frame.contentDocument;
      if (!doc?.body) return;

      const lastVisibleSection =
        doc.querySelector<HTMLElement>(".global-section") ??
        doc.querySelector<HTMLElement>(".future-section") ??
        doc.querySelector<HTMLElement>("main > section:last-of-type, body > section:last-of-type");

      if (!lastVisibleSection) return;

      const rect = lastVisibleSection.getBoundingClientRect();
      const scrollY = doc.defaultView?.scrollY ?? 0;
      const bottom = Math.ceil(rect.bottom + scrollY);
      const wantedHeight = Math.max(1200, bottom + 2);
      const currentHeight = Math.round(frame.getBoundingClientRect().height);

      if (Math.abs(currentHeight - wantedHeight) <= 2) return;

      applying = true;
      frame.style.setProperty("height", `${wantedHeight}px`, "important");
      frame.style.setProperty("min-height", "0", "important");
      requestAnimationFrame(() => {
        applying = false;
      });
    };

    const attach = () => {
      frame = document.querySelector<HTMLIFrameElement>(".materials-report-frame");
      if (!frame?.contentDocument?.body) return false;

      fitToVisibleReport();

      frameObserver?.disconnect();
      frameObserver = new MutationObserver(() => fitToVisibleReport());
      frameObserver.observe(frame, { attributes: true, attributeFilter: ["style"] });

      documentObserver?.disconnect();
      documentObserver = new MutationObserver(() => {
        requestAnimationFrame(fitToVisibleReport);
      });
      documentObserver.observe(frame.contentDocument.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style", "src"],
      });

      resizeObserver?.disconnect();
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => fitToVisibleReport());
        const lastSection =
          frame.contentDocument.querySelector<HTMLElement>(".global-section") ??
          frame.contentDocument.body;
        resizeObserver.observe(lastSection);
      }

      frame.addEventListener("load", fitToVisibleReport);
      window.addEventListener("resize", fitToVisibleReport);

      window.setTimeout(fitToVisibleReport, 150);
      window.setTimeout(fitToVisibleReport, 600);
      window.setTimeout(fitToVisibleReport, 1400);

      return true;
    };

    const tryAttach = () => {
      if (attach()) return;
      retryTimer = window.setTimeout(tryAttach, 200);
    };

    tryAttach();

    return () => {
      if (retryTimer !== null) window.clearTimeout(retryTimer);
      frameObserver?.disconnect();
      documentObserver?.disconnect();
      resizeObserver?.disconnect();
      frame?.removeEventListener("load", fitToVisibleReport);
      window.removeEventListener("resize", fitToVisibleReport);
    };
  }, [pathname]);

  return null;
}
