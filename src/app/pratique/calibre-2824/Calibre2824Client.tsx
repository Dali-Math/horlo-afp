'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Calibre2824Client() {
  const [isEmbeddedFullscreen, setIsEmbeddedFullscreen] = React.useState(false);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'HORLO_FULLSCREEN_CHANGE') {
        setIsEmbeddedFullscreen(!!event.data.isFullscreen);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 select-none">
      
      {/* HEADER ATELIER HORLOGER AVEC COMMUTATEUR DE CALIBRES SUISSES (Masqué en plein écran immersif) */}
      {!isEmbeddedFullscreen && (
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md transition-all">
          <div className="flex items-center gap-3">
            <Link
              href="/pratique"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Atelier</span>
            </Link>

            <span className="w-px h-5 bg-slate-800 hidden sm:inline" />

            {/* SÉLECTEUR SUISSE DE CALIBRES */}
            <div className="flex items-center bg-slate-800/80 p-1 rounded-xl text-xs font-mono border border-slate-700">
              <Link
                href="/pratique/calibre-3d"
                className="px-3 py-1 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1"
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
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Normes NIHS &amp; Moebius</span>
            </span>
            <a
              href="/eta-2824-laboratoire.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700 transition flex items-center gap-1.5 text-xs font-mono font-semibold"
              title="Ouvrir le laboratoire en plein écran natif"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Plein Écran Dédié</span>
            </a>
          </div>
        </header>
      )}

      {/* CONTAINER DU LABORATOIRE INTERACTIF 3D HAUTE FIDÉLITÉ */}
      <main className="flex-1 w-full flex flex-col">
        <iframe
          src="/eta-2824-laboratoire.html"
          title="Laboratoire ETA 2824-2 3D Haute Fidélité"
          className={`w-full flex-1 border-0 bg-[#070b14] transition-all ${
            isEmbeddedFullscreen ? 'h-screen fixed inset-0 z-50' : 'min-h-[calc(100vh-64px)]'
          }`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen *"
          allowFullScreen={true}
        />
      </main>

    </div>
  );
}
