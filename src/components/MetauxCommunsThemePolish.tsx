"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MetauxCommunsThemePolish() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/materiaux/metaux-communs") return;

    let frameThemeObserver: MutationObserver | null = null;
    let frameContentObserver: MutationObserver | null = null;
    let retryTimer: number | null = null;

    const apply = () => {
      const frame = document.querySelector<HTMLIFrameElement>(".materials-report-frame");
      const doc = frame?.contentDocument;
      if (!frame || !doc?.head || !doc.body) return false;

      const syncTheme = () => {
        doc.documentElement.classList.toggle(
          "horlolearn-dark",
          document.documentElement.classList.contains("dark")
        );
      };

      const repairImages = () => {
        const highTech = doc.querySelector<HTMLImageElement>(
          'img[alt="Matériaux High-Tech"]'
        );

        if (highTech) {
          const correctSrc = "/assets/images/materiaux_hightech_horlogerie.png";
          const fallbackSrc = "/assets/images/innovation_horlogerie_futur.png";

          if (!highTech.src.endsWith("/assets/images/materiaux_hightech_horlogerie.png")) {
            highTech.src = correctSrc;
          }

          highTech.onerror = () => {
            highTech.onerror = null;
            highTech.src = fallbackSrc;
          };
        }
      };

      syncTheme();
      repairImages();

      let style = doc.getElementById("horlolearn-theme-polish") as HTMLStyleElement | null;
      if (!style) {
        style = doc.createElement("style");
        style.id = "horlolearn-theme-polish";
        style.textContent = `
          /* Les deux CTA du hero ne sont plus nécessaires dans la nouvelle mise en page. */
          .hero-actions {
            display: none !important;
          }

          /* ---------------- MODE CLAIR ---------------- */
          html:not(.horlolearn-dark) .hero {
            background: var(--horlo-bg) !important;
            border-bottom: 1px solid var(--horlo-line) !important;
          }

          html:not(.horlolearn-dark) .hero-background {
            background:
              radial-gradient(circle at 78% 24%, rgba(156,122,67,.12), transparent 32%),
              linear-gradient(135deg, var(--horlo-bg) 0%, var(--horlo-bg-soft) 56%, var(--horlo-surface) 100%) !important;
          }

          html:not(.horlolearn-dark) .hero-overlay {
            background: linear-gradient(90deg, rgba(255,255,255,.02), rgba(255,255,255,.18)) !important;
          }

          html:not(.horlolearn-dark) .hero-badge {
            color: var(--horlo-metal) !important;
          }

          html:not(.horlolearn-dark) .title-main {
            color: var(--horlo-ink) !important;
            -webkit-text-fill-color: var(--horlo-ink) !important;
          }

          html:not(.horlolearn-dark) .title-sub {
            color: var(--horlo-metal) !important;
          }

          html:not(.horlolearn-dark) .hero-description {
            color: var(--horlo-muted) !important;
          }

          html:not(.horlolearn-dark) .executive-summary,
          html:not(.horlolearn-dark) .timeline-section,
          html:not(.horlolearn-dark) .materials-section,
          html:not(.horlolearn-dark) .innovation-section,
          html:not(.horlolearn-dark) .ecosystem-section,
          html:not(.horlolearn-dark) .formation-section,
          html:not(.horlolearn-dark) .companies-section,
          html:not(.horlolearn-dark) .future-section,
          html:not(.horlolearn-dark) .global-section {
            background: var(--horlo-bg) !important;
            color: var(--horlo-ink) !important;
          }

          html:not(.horlolearn-dark) .highlight-box,
          html:not(.horlolearn-dark) .timeline-details,
          html:not(.horlolearn-dark) .material-card,
          html:not(.horlolearn-dark) .innovation-card,
          html:not(.horlolearn-dark) .districts-details,
          html:not(.horlolearn-dark) .school-card,
          html:not(.horlolearn-dark) .career-path,
          html:not(.horlolearn-dark) .company-card,
          html:not(.horlolearn-dark) .trend-details,
          html:not(.horlolearn-dark) .comparison-table,
          html:not(.horlolearn-dark) .stat-highlight,
          html:not(.horlolearn-dark) .info-card,
          html:not(.horlolearn-dark) .feature,
          html:not(.horlolearn-dark) .benefit-item,
          html:not(.horlolearn-dark) .innovation-item {
            background: var(--horlo-surface) !important;
            color: var(--horlo-ink) !important;
            border-color: var(--horlo-line) !important;
          }

          html:not(.horlolearn-dark) .highlight-box {
            border-left: 3px solid var(--horlo-metal) !important;
          }

          html:not(.horlolearn-dark) p,
          html:not(.horlolearn-dark) li,
          html:not(.horlolearn-dark) .section-description,
          html:not(.horlolearn-dark) .stat-description,
          html:not(.horlolearn-dark) .property-label,
          html:not(.horlolearn-dark) .property-value {
            color: var(--horlo-muted) !important;
          }

          html:not(.horlolearn-dark) .section-title,
          html:not(.horlolearn-dark) h3,
          html:not(.horlolearn-dark) h4 {
            color: var(--horlo-metal) !important;
          }

          /* ---------------- MODE SOMBRE ---------------- */
          html.horlolearn-dark .hero {
            background: #090b0e !important;
          }

          html.horlolearn-dark .highlight-box,
          html.horlolearn-dark .timeline-details,
          html.horlolearn-dark .material-card,
          html.horlolearn-dark .innovation-card,
          html.horlolearn-dark .districts-details,
          html.horlolearn-dark .school-card,
          html.horlolearn-dark .career-path,
          html.horlolearn-dark .company-card,
          html.horlolearn-dark .trend-details,
          html.horlolearn-dark .comparison-table,
          html.horlolearn-dark .table-row,
          html.horlolearn-dark .stat-highlight,
          html.horlolearn-dark .info-card,
          html.horlolearn-dark .feature,
          html.horlolearn-dark .benefit-item,
          html.horlolearn-dark .innovation-item {
            background: #171b21 !important;
            border: 1px solid #3a414a !important;
            color: #f1ede5 !important;
          }

          html.horlolearn-dark .highlight-box {
            border-left: 3px solid #c2a36d !important;
          }

          html.horlolearn-dark .comparison-table {
            background: #111419 !important;
          }

          html.horlolearn-dark .table-row {
            background: #171b21 !important;
            border-bottom-color: #3a414a !important;
          }

          html.horlolearn-dark .leadership-stats {
            background: #2a2f36 !important;
          }

          html.horlolearn-dark .stat-highlight {
            min-height: 190px !important;
          }

          html.horlolearn-dark p,
          html.horlolearn-dark li,
          html.horlolearn-dark .section-description,
          html.horlolearn-dark .stat-description,
          html.horlolearn-dark .property-label,
          html.horlolearn-dark .property-value {
            color: #b9b2a8 !important;
          }

          html.horlolearn-dark .section-title,
          html.horlolearn-dark h3,
          html.horlolearn-dark h4 {
            color: #dcc18e !important;
          }

          html.horlolearn-dark .country-cell,
          html.horlolearn-dark .strategy-cell,
          html.horlolearn-dark .strengths-cell,
          html.horlolearn-dark .brands-cell,
          html.horlolearn-dark .country-name,
          html.horlolearn-dark .strategy-cell *,
          html.horlolearn-dark .strengths-cell * {
            color: #f1ede5 !important;
          }
        `;
        doc.head.appendChild(style);
      }

      frameThemeObserver?.disconnect();
      frameThemeObserver = new MutationObserver(syncTheme);
      frameThemeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      frameContentObserver?.disconnect();
      frameContentObserver = new MutationObserver(repairImages);
      frameContentObserver.observe(doc.body, {
        childList: true,
        subtree: true,
      });

      return true;
    };

    const tryApply = () => {
      if (apply()) return;
      retryTimer = window.setTimeout(tryApply, 200);
    };

    tryApply();

    return () => {
      frameThemeObserver?.disconnect();
      frameContentObserver?.disconnect();
      if (retryTimer !== null) window.clearTimeout(retryTimer);
    };
  }, [pathname]);

  return null;
}
