'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ArrowLeft, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Calibre2824Client() {
  const [isEmbeddedFullscreen, setIsEmbeddedFullscreen] = React.useState(false);
  const [iframeHeight, setIframeHeight] = React.useState<number>(1250);
  const { resolvedTheme } = useTheme();
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // Synchronisation du thème avec l'iframe du laboratoire
  const sendThemeToIframe = React.useCallback((theme: string | undefined) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'HORLO_THEME_CHANGE',
        theme: theme || 'dark',
      }, '*');
    }
  }, []);

  React.useEffect(() => {
    sendThemeToIframe(resolvedTheme);
  }, [resolvedTheme, sendThemeToIframe]);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data) {
        if (event.data.type === 'HORLO_FULLSCREEN_CHANGE') {
          setIsEmbeddedFullscreen(!!event.data.isFullscreen);
        } else if (event.data.type === 'HORLO_IFRAME_HEIGHT' && typeof event.data.height === 'number') {
          // Ajustement micromécanique dynamique de la hauteur pour éliminer le double scrollbar
          const newH = Math.max(Math.ceil(event.data.height), 750);
          setIframeHeight((prev) => (Math.abs(prev - newH) > 6 ? newH : prev));
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 select-none">
      
      {/* HEADER ATELIER HORLOGER AVEC COMMUTATEUR DE CALIBRES SUISSES */}
      {!isEmbeddedFullscreen && (
        <div className="pt-20 sm:pt-24 px-3 sm:px-5 lg:px-8 max-w-[1720px] mx-auto w-full transition-all pb-2">
          <header className="border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <Link
                href="/pratique"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white text-xs font-mono transition border border-slate-300 dark:border-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Atelier</span>
              </Link>

              <span className="w-px h-5 bg-slate-300 dark:bg-slate-800 hidden sm:inline" />

              {/* SÉLECTEUR SUISSE DE CALIBRES */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-mono border border-slate-300 dark:border-slate-700">
                <Link
                  href="/pratique/calibre-3d"
                  className="px-3 py-1 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition flex items-center gap-1"
                >
                  <span>ETA 6497-1 (Manuel)</span>
                </Link>
                <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold shadow-sm flex items-center gap-1">
                  <span>ETA 2824-2 (Auto)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                </span>
              </div>
            </div>

            {/* TÉLÉMÉTRIE D'ATELIER */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Normes NIHS &amp; Moebius</span>
              </span>
              <a
                href="/eta-2824-laboratoire.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 border border-slate-300 dark:border-slate-700 transition flex items-center gap-1.5 text-xs font-mono font-semibold"
                title="Ouvrir le laboratoire en page dédiée"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Page Dédiée</span>
              </a>
            </div>
          </header>
        </div>
      )}

      {/* CONTAINER DU LABORATOIRE INTERACTIF 3D HAUTE FIDÉLITÉ (SANS DOUBLE SCROLLBAR) */}
      <main className="flex-1 w-full flex flex-col">
        <iframe
          ref={iframeRef}
          src="/eta-2824-laboratoire.html"
          onLoad={() => {
            sendThemeToIframe(resolvedTheme);
            if (iframeRef.current && iframeRef.current.contentWindow) {
              iframeRef.current.contentWindow.postMessage({ type: 'HORLO_REQUEST_HEIGHT' }, '*');
            }
          }}
          title="Laboratoire ETA 2824-2 3D Haute Fidélité"
          scrolling={isEmbeddedFullscreen ? 'auto' : 'no'}
          style={{
            height: isEmbeddedFullscreen ? '100vh' : `${iframeHeight}px`,
            minHeight: isEmbeddedFullscreen ? '100vh' : `${iframeHeight}px`,
            overflow: isEmbeddedFullscreen ? 'auto' : 'hidden',
          }}
          className={`w-full border-0 bg-slate-100 dark:bg-[#070b14] transition-[height] duration-200 ${
            isEmbeddedFullscreen ? 'h-screen fixed inset-0 z-50' : 'flex-1'
          }`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen *"
          allowFullScreen={true}
        />
      </main>

      {/* CARTOUCHE D'ATTRIBUTION OFFICIEL & ÉTHIQUE HORLOGÈRE */}
      {!isEmbeddedFullscreen && (
        <section className="max-w-4xl mx-auto w-full px-4 py-8 mb-6 text-center">
          <div className="border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-sm space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">Transmission du Savoir &amp; Éthique Micromécanique Horlogère</span>
            </div>
            <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Modélisation géométrique 3D inspirée des travaux mathématiques d&apos;exception de{' '}
              <a
                href="https://ciechanow.ski/mechanical-watch/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
              >
                Bartosz Ciechanowski
              </a>{' '}
              (ciechanow.ski).
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono">
              Enrichi, réécrit et adapté par <strong className="text-slate-700 dark:text-slate-200">HorloLearn</strong> selon le référentiel horloger suisse (calibre automatique ETA 2824-2, finitions or 2N/3N, commandes d&apos;établi 3 positions, tolérances NIHS et lubrification officielle Moebius).
            </p>
          </div>
        </section>
      )}

    </div>
  );
}
