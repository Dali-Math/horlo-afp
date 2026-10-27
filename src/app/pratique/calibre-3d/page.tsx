// src/app/pratique/calibre-3d/page.tsx
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  ExternalLink,
  RotateCcw,
  Layers,
  Wrench,
  Droplet,
  Compass,
  Sparkles,
  Eye,
  Sliders,
  CheckCircle2,
  Info,
  Clock
} from 'lucide-react';

export default function Calibre3DPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    if (!iframeContainerRef.current) return;

    if (!document.fullscreenElement) {
      iframeContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Erreur plein écran:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = '/calibre-3d/index.html';
    }
  };

  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 flex flex-col">
      {/* 1. Header Haute Horlogerie */}
      <header className="border-b border-amber-500/20 bg-[#0A0E17]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <Link
              href="/pratique"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Atelier Pratique</span>
            </Link>

            <span className="w-px h-4 bg-slate-800 hidden sm:inline" />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white font-serif tracking-wide flex items-center gap-2">
                  <span>Calibre École 3D Interactif</span>
                  <span className="text-amber-400 font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30">
                    ETA 6497-1 (Unitas 16½&apos;&apos;&apos;)
                  </span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                Porte-mouvement 360° • Écorché cinématique • Échappement suisse • Côté Ponts &amp; Côté Cadran
              </p>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleReload}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-400 transition"
              title="Réinitialiser la vue 3D"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <a
              href="/calibre-3d/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-400 transition"
              title="Ouvrir en plein écran dans un nouvel onglet"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Plein Écran Dédié</span>
            </a>

            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isFullscreen ? 'Quitter' : 'Mode Établi'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Zone de Visualisation 3D WebGL (Iframe interactif) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4 md:p-6 flex flex-col gap-6">
        
        <div
          ref={iframeContainerRef}
          className={`relative w-full rounded-2xl overflow-hidden border border-amber-500/30 bg-[#090D15] shadow-2xl transition-all ${
            isFullscreen ? 'h-screen rounded-none border-none' : 'h-[74vh] min-h-[580px]'
          }`}
        >
          <iframe
            ref={iframeRef}
            src="/calibre-3d/index.html"
            title="Simulateur 3D Calibre ETA 6497-1"
            className="w-full h-full border-0"
            allow="fullscreen; accelerometer; gyroscope"
          />
        </div>

        {/* 3. Bandeau d'aide & Commandes d'établi 3D */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-white font-medium mb-0.5">Rotation Libre 360°</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Clic gauche enfoncé + glisser pour faire pivoter le calibre sans aucun blocage d&apos;axe.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-white font-medium mb-0.5">Zoom &amp; Déplacement</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Molette pour zoomer au cœur des rubis. Clic droit ou Maj + glisser pour déplacer la vue (Pan).
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-white font-medium mb-0.5">Bascule Ponts / Cadran</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Cliquez sur « Retourner Calibre » pour observer les 12 appliques bâtons en or blanc et le guichet de date.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-white font-medium mb-0.5">Curseurs Cinématiques</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Ajustez l&apos;écorché vertical (Z), la transparence Rayon-X des ponts et l&apos;armage du barillet en direct.
              </p>
            </div>
          </div>

        </div>

        {/* 4. Fiches de Rhabillage & Liens Pédagogiques Associés */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-[#0A0F1A] border border-amber-500/20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Modules Pratiques Complémentaires — ETA 6497-1</span>
              </h2>
              <p className="text-xs text-slate-400">
                Poursuivez votre formation d&apos;établi sur ce calibre emblématique avec les protocoles horlogers officiels.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <Link
              href="/pratique/demontage/eta6497"
              className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 transition group"
            >
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>Guide de Démontage</span>
              </div>
              <p className="text-[11px] text-slate-400 group-hover:text-slate-300">
                Ordre méthodique de dépose des ponts, du rouage et de l&apos;organe réglant (balancier-coq).
              </p>
            </Link>

            <Link
              href="/pratique/huilage"
              className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 transition group"
            >
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
                <Droplet className="w-3.5 h-3.5" />
                <span>Plan de Huilage Moebius</span>
              </div>
              <p className="text-[11px] text-slate-400 group-hover:text-slate-300">
                Emplacements précis des huiles 9010, HP-1300 et graisse 9415 sur les rubis et levées d&apos;ancre.
              </p>
            </Link>

            <Link
              href="/outils/chronocomparateur"
              className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition group"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Contrôle au Chronocomparateur</span>
              </div>
              <p className="text-[11px] text-slate-400 group-hover:text-slate-300">
                Mesure acoustique à 18&apos;000 A/h (angle de levée 44°), calcul d&apos;amplitude et repère.
              </p>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
