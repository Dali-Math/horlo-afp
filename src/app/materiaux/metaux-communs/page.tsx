'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function MetauxCommunsPage() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [frameHeight, setFrameHeight] = useState(1600);

  const syncFrame = () => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!frame || !doc) return;

    let style = doc.getElementById('horlolearn-integration-style') as HTMLStyleElement | null;
    if (!style) {
      style = doc.createElement('style');
      style.id = 'horlolearn-integration-style';
      style.textContent = `
        /* HorloLearn possède déjà sa navigation globale. */
        .navbar { display: none !important; }

        html, body {
          overflow: hidden !important;
        }

        body {
          padding-top: 0 !important;
        }

        /* IMPORTANT : dans une iframe auto-ajustée, 100vh correspond à la
           hauteur totale de l'iframe. On utilise donc une vraie hauteur de
           hero afin que son contenu reste visible dès l'ouverture. */
        .hero {
          min-height: 760px !important;
          height: 760px !important;
          max-height: 760px !important;
        }

        .hero-content {
          position: relative !important;
          z-index: 2 !important;
          opacity: 1 !important;
          transform: none !important;
          animation: none !important;
          margin: 0 auto !important;
        }

        .hero-background,
        .hero-overlay {
          height: 100% !important;
        }

        .scroll-indicator {
          bottom: 28px !important;
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 660px !important;
            height: 660px !important;
            max-height: 660px !important;
          }

          .hero-content {
            padding: 1.25rem !important;
          }
        }
      `;
      doc.head.appendChild(style);
    }

    const updateHeight = () => {
      const bodyHeight = doc.body?.scrollHeight ?? 0;
      const rootHeight = doc.documentElement?.scrollHeight ?? 0;
      const nextHeight = Math.max(bodyHeight, rootHeight, 1200);
      setFrameHeight(nextHeight + 8);
    };

    updateHeight();

    resizeObserverRef.current?.disconnect();
    if (typeof ResizeObserver !== 'undefined' && doc.body) {
      resizeObserverRef.current = new ResizeObserver(updateHeight);
      resizeObserverRef.current.observe(doc.body);
    }

    doc.querySelectorAll('img').forEach((image) => {
      if (!image.complete) image.addEventListener('load', updateHeight, { once: true });
    });

    window.setTimeout(updateHeight, 150);
    window.setTimeout(updateHeight, 500);
    window.setTimeout(updateHeight, 1200);
  };

  useEffect(() => {
    return () => resizeObserverRef.current?.disconnect();
  }, []);

  return (
    <main className="materials-report-shell">
      <div className="materials-report-topbar">
        <div className="materials-report-wrap">
          <Link href="/materiaux" className="materials-report-back">
            <span aria-hidden="true">←</span>
            <span>Retour aux matériaux</span>
          </Link>
          <div className="materials-report-meta">
            Rapport complet · Matériaux horlogers suisses
          </div>
        </div>
      </div>

      <iframe
        ref={frameRef}
        src="/materiaux-horlogers-suisse.html"
        title="Excellence et innovation dans les matériaux horlogers suisses"
        className="materials-report-frame"
        style={{ height: `${frameHeight}px` }}
        onLoad={syncFrame}
      />

      <style jsx global>{`
        .materials-report-shell {
          min-height: 100vh;
          background: var(--hl-bg);
          color: var(--hl-ink);
        }

        .materials-report-topbar {
          position: relative;
          z-index: 2;
          border-top: 1px solid var(--hl-line);
          border-bottom: 1px solid var(--hl-line);
          background: var(--hl-bg);
        }

        .materials-report-wrap {
          width: min(1400px, calc(100% - 40px));
          margin: 0 auto;
          min-height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .materials-report-back {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--hl-ink);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
        }

        .materials-report-back span:first-child {
          color: var(--hl-metal);
          font-size: 18px;
        }

        .materials-report-back:hover {
          color: var(--hl-metal);
        }

        .materials-report-meta {
          color: var(--hl-muted);
          font: 9px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
          text-transform: uppercase;
          letter-spacing: .12em;
          text-align: right;
        }

        .materials-report-frame {
          display: block;
          width: 100%;
          min-height: 1200px;
          border: 0;
          background: #fff;
        }

        @media (max-width: 720px) {
          .materials-report-wrap {
            width: min(100% - 28px, 1400px);
            min-height: 54px;
          }

          .materials-report-meta {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
