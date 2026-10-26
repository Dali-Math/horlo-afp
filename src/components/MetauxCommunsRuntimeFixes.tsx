"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MetauxCommunsRuntimeFixes() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/materiaux/metaux-communs") return;

    let cleanupFrame: (() => void) | null = null;

    const enhance = () => {
      const frame = document.querySelector<HTMLIFrameElement>(".materials-report-frame");
      const doc = frame?.contentDocument;
      if (!frame || !doc?.body) return false;

      const syncDarkMode = () => {
        doc.documentElement.classList.toggle(
          "horlolearn-dark",
          document.documentElement.classList.contains("dark")
        );
      };

      syncDarkMode();

      let style = doc.getElementById("horlolearn-final-materials-fixes") as HTMLStyleElement | null;
      if (!style) {
        style = doc.createElement("style");
        style.id = "horlolearn-final-materials-fixes";
        style.textContent = `
          /* HERO éditorial, proche de la direction Échappement */
          .hero {
            min-height: 720px !important;
            height: 720px !important;
            max-height: 720px !important;
            justify-content: flex-start !important;
            text-align: left !important;
            background: #090b0e !important;
            border-bottom: 1px solid rgba(194,163,109,.24) !important;
          }

          .hero-background {
            background:
              radial-gradient(circle at 78% 24%, rgba(194,163,109,.18), transparent 30%),
              linear-gradient(135deg,#090b0e 0%,#0f1317 55%,#171b21 100%) !important;
          }

          .hero-overlay {
            background:
              linear-gradient(90deg, rgba(0,0,0,.04), rgba(0,0,0,.18) 55%, rgba(0,0,0,.42)) !important;
          }

          .hero-content {
            width: min(1320px, calc(100% - 64px)) !important;
            max-width: none !important;
            margin: 0 auto !important;
            padding: 112px 0 90px !important;
            text-align: left !important;
          }

          .hero-badge {
            margin: 0 0 28px !important;
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            backdrop-filter: none !important;
            border-radius: 0 !important;
            animation: none !important;
            color: #c2a36d !important;
            font: 10px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace !important;
            letter-spacing: .16em !important;
          }

          .hero-title {
            margin: 0 0 30px !important;
            max-width: 980px !important;
          }

          .title-main {
            font-family: Georgia,'Times New Roman',serif !important;
            font-size: clamp(70px,8vw,124px) !important;
            line-height: .86 !important;
            letter-spacing: -.055em !important;
            font-weight: 500 !important;
            color: #f1ede5 !important;
            -webkit-text-fill-color: #f1ede5 !important;
          }

          .title-sub {
            display: block !important;
            margin-top: 20px !important;
            font-family: Georgia,'Times New Roman',serif !important;
            font-size: clamp(28px,3vw,46px) !important;
            line-height: 1 !important;
            font-weight: 400 !important;
            color: #c2a36d !important;
          }

          .hero-description {
            max-width: 760px !important;
            margin: 0 0 36px !important;
            font-size: 17px !important;
            line-height: 1.75 !important;
            color: #aaa49a !important;
          }

          /* Les compteurs 0/0/0 ne servent pas l'éditorial : on les remplace visuellement par une ligne sobre. */
          .hero-stats {
            display: none !important;
          }

          .hero-actions {
            justify-content: flex-start !important;
            gap: 10px !important;
          }

          .hero-actions .btn {
            border-radius: 0 !important;
            box-shadow: none !important;
            min-height: 48px !important;
          }

          .scroll-indicator { display: none !important; }

          /* Onglets : un seul contenu actif, pour toutes les familles. */
          .materials-content .tab-content,
          .timeline-content .timeline-item,
          .district-info,
          .trend-item {
            display: none !important;
          }

          .materials-content .tab-content.active,
          .timeline-content .timeline-item.active,
          .district-info.active,
          .trend-item.active {
            display: block !important;
          }

          /* Typographie et surfaces cohérentes avec HorloLearn */
          .section-title,
          .timeline-item h3,
          .material-header h3,
          .district-info h3,
          .trend-item h3,
          .company-card h3,
          .school-card h3 {
            font-family: Georgia,'Times New Roman',serif !important;
            font-weight: 500 !important;
            letter-spacing: -.02em !important;
          }

          .tab-btn {
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          .material-card,
          .timeline-details,
          .districts-details,
          .trend-details,
          .comparison-table,
          .stat-highlight {
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          /* Tableau international : vrai support clair/sombre. */
          .global-section {
            background: var(--horlo-bg) !important;
          }

          .comparison-table {
            background: var(--horlo-surface) !important;
            border-color: var(--horlo-line) !important;
          }

          .table-header {
            background: var(--horlo-metal) !important;
            color: var(--horlo-accent-ink) !important;
          }

          .table-row {
            background: var(--horlo-surface) !important;
            border-color: var(--horlo-line) !important;
          }

          .country-cell,
          .strategy-cell,
          .strengths-cell,
          .brands-cell,
          .country-name,
          .strategy-cell *,
          .strengths-cell * {
            color: var(--horlo-ink) !important;
          }

          .brand-tag {
            background: var(--horlo-metal) !important;
            color: var(--horlo-accent-ink) !important;
            border-radius: 999px !important;
          }

          .leadership-stats {
            gap: 1px !important;
            background: var(--horlo-line) !important;
          }

          .stat-highlight {
            background: var(--horlo-surface) !important;
            border: 0 !important;
          }

          .stat-large {
            color: var(--horlo-metal) !important;
            font-family: Georgia,'Times New Roman',serif !important;
          }

          .stat-description { color: var(--horlo-muted) !important; }

          /* Mode sombre forcé sur les zones qui gardaient du blanc codé en dur. */
          html.horlolearn-dark body,
          html.horlolearn-dark .executive-summary,
          html.horlolearn-dark .timeline-section,
          html.horlolearn-dark .materials-section,
          html.horlolearn-dark .innovation-section,
          html.horlolearn-dark .ecosystem-section,
          html.horlolearn-dark .formation-section,
          html.horlolearn-dark .companies-section,
          html.horlolearn-dark .future-section,
          html.horlolearn-dark .global-section {
            background: #090b0e !important;
            color: #f1ede5 !important;
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
          html.horlolearn-dark .tab-btn {
            background: #111419 !important;
            border-color: #2a2f36 !important;
            color: #f1ede5 !important;
          }

          html.horlolearn-dark .tab-btn.active,
          html.horlolearn-dark .materials-tabs .tab-btn.active,
          html.horlolearn-dark .timeline-tabs .tab-btn.active,
          html.horlolearn-dark .district-tabs .tab-btn.active,
          html.horlolearn-dark .trend-tabs .tab-btn.active {
            background: #c2a36d !important;
            border-color: #c2a36d !important;
            color: #090b0e !important;
          }

          html.horlolearn-dark .country-cell,
          html.horlolearn-dark .strategy-cell,
          html.horlolearn-dark .strengths-cell,
          html.horlolearn-dark .brands-cell,
          html.horlolearn-dark .country-name,
          html.horlolearn-dark .strategy-cell *,
          html.horlolearn-dark .strengths-cell * {
            color: #e8e2d9 !important;
          }

          html.horlolearn-dark p,
          html.horlolearn-dark li,
          html.horlolearn-dark .section-description,
          html.horlolearn-dark .stat-description {
            color: #aaa49a !important;
          }

          html.horlolearn-dark .section-title,
          html.horlolearn-dark h3,
          html.horlolearn-dark h4 {
            color: #c2a36d !important;
          }

          @media (max-width: 768px) {
            .hero { min-height: 620px !important; height: 620px !important; max-height: 620px !important; }
            .hero-content { width: min(100% - 32px,1320px) !important; padding: 72px 0 !important; }
            .title-main { font-size: clamp(54px,17vw,78px) !important; }
          }
        `;
        doc.head.appendChild(style);
      }

      const bindGroup = (selector: string, dataKey: string, contentSelector: string) => {
        doc.querySelectorAll<HTMLButtonElement>(selector).forEach((button) => {
          if (button.dataset.horlolearnFinalBound === "1") return;
          button.dataset.horlolearnFinalBound = "1";
          button.addEventListener("click", () => {
            const id = button.dataset[dataKey as keyof DOMStringMap];
            if (!id) return;
            doc.querySelectorAll(selector).forEach((item) => item.classList.remove("active"));
            doc.querySelectorAll(contentSelector).forEach((item) => item.classList.remove("active"));
            button.classList.add("active");
            doc.getElementById(id)?.classList.add("active");
          });
        });
      };

      bindGroup(".materials-tabs .tab-btn", "category", ".materials-content .tab-content");
      bindGroup(".timeline-tabs .tab-btn", "period", ".timeline-content .timeline-item");
      bindGroup(".district-tabs .tab-btn", "district", ".district-info");
      bindGroup(".trend-tabs .tab-btn", "trend", ".trend-item");

      const themeObserver = new MutationObserver(syncDarkMode);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      cleanupFrame = () => themeObserver.disconnect();
      return true;
    };

    const tryEnhance = () => {
      if (enhance()) return;
      window.setTimeout(tryEnhance, 250);
    };

    tryEnhance();

    return () => cleanupFrame?.();
  }, [pathname]);

  return null;
}
