"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Atelier Horloger – Neo-Tetris (UI Prototype)
 * ---------------------------------------------------------
 * - UI premium sombre & doré (HorloLearn)
 * - Panneau gauche : Etabli (points, progression, badges)
 * - Plateau central : effet verre doré + grille
 * - Panneau droit : Encyclopédie dynamique + Objectifs
 * - Animation "pièces" simulées (pas de logique de Tetris ici)
 * - Base parfaite pour brancher le moteur de jeu ensuite
 */

const DORÉ = "#E2B44F";

type FallingPiece = {
  id: string;
  x: number; // 0..9 (col)
  y: number; // -4..20 (row virtual)
  type: "barillet" | "ancre" | "balancier" | "vis" | "pont";
  speed: number; // ms per row
};

const PIECE_ICONS: Record<FallingPiece["type"], JSX.Element> = {
  barillet: (
    <svg viewBox="0 0 100 100" className="w-6 h-6">
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#f6e9b4" />
          <stop offset="60%" stopColor="#c89f3d" />
          <stop offset="100%" stopColor="#7a5b1a" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#g1)" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#2b220e" strokeWidth="6" />
      <circle cx="50" cy="50" r="5" fill="#2b220e" />
      <path
        d="M50 10 A40 40 0 0 1 90 50"
        stroke="#2b220e"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  ),
  ancre: (
    <svg viewBox="0 0 120 120" className="w-6 h-6">
      <path
        d="M60 10 v55"
        stroke="#5bb8ff"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M35 80 L60 65 L85 80"
        fill="none"
        stroke="#5bb8ff"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="60" cy="65" r="5" fill="#5bb8ff" />
    </svg>
  ),
  balancier: (
    <svg viewBox="0 0 120 120" className="w-6 h-6">
      <circle cx="60" cy="60" r="40" fill="none" stroke="#e7d58f" strokeWidth="6" />
      <circle cx="60" cy="60" r="4" fill="#2b220e" />
      <path d="M60 18 v20" stroke="#2b220e" strokeWidth="6" />
    </svg>
  ),
  vis: (
    <svg viewBox="0 0 100 100" className="w-5 h-5">
      <circle cx="50" cy="50" r="16" fill="#7fb0ff" />
      <rect
        x="38"
        y="48"
        width="24"
        height="4"
        rx="2"
        fill="#2b3d66"
      />
    </svg>
  ),
  pont: (
    <svg viewBox="0 0 140 80" className="w-7 h-7">
      <rect x="10" y="20" width="120" height="40" rx="12" fill="#b38a33" />
      <circle cx="35" cy="40" r="6" fill="#2b220e" />
      <circle cx="105" cy="40" r="6" fill="#2b220e" />
    </svg>
  ),
};

const prettify = (n: number) => n.toLocaleString("fr-CH");

export default function AtelierTetris() {
  // --- Scores & progression (UI)
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1); // Complication
  const [progress, setProgress] = useState(0); // 0..100
  const [lines, setLines] = useState(0);
  const [plays, setPlays] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  // --- Encyclopédie dynamique
  const facts = useMemo(
    () => [
      {
        title: "Le Spiral Breguet",
        text:
          "Courbe terminale relevée améliorant l’isochronisme en réduisant l’auto-contact.",
      },
      {
        title: "Rubis de pivotement",
        text:
          "Diminue le frottement et l’usure ; favorise une amplitude stable du balancier.",
      },
      {
        title: "Le Cône de tirette",
        text:
          "Assure un verrouillage net de la tige de remontoir entre remontage et mise à l’heure.",
      },
      {
        title: "Raquette à col de cygne",
        text:
          "Réglage fin de la marche grâce à une lame ressort délicate et très précise.",
      },
    ],
    []
  );
  const [factIndex, setFactIndex] = useState(0);

  // --- Plateau : animation de “fausses pièces” qui tombent (démo UI)
  const [pieces, setPieces] = useState<FallingPiece[]>([]);
  const tickRef = useRef<number | null>(null);

  // spawn aléatoire pour le rendu
  useEffect(() => {
    const spawn = () => {
      setPieces((p) => [
        ...p,
        {
          id: crypto.randomUUID(),
          x: Math.floor(Math.random() * 10),
          y: -4,
          type: (["barillet", "ancre", "balancier", "vis", "pont"] as const)[
            Math.floor(Math.random() * 5)
          ],
          speed: 90 + Math.random() * 70,
        },
      ]);
    };
    const spawnTimer = setInterval(spawn, 800);
    return () => clearInterval(spawnTimer);
  }, []);

  useEffect(() => {
    const tick = () => {
      setPieces((all) =>
        all
          .map((pi) => ({ ...pi, y: pi.y + 0.08 + (12 - pi.speed / 10) * 0.002 }))
          .filter((pi) => pi.y < 20)
      );
      tickRef.current = requestAnimationFrame(tick);
    };
    tickRef.current = requestAnimationFrame(tick);
    return () => {
      if (tickRef.current) cancelAnimationFrame(tickRef.current);
    };
  }, []);

  // Points de démo (couplés aux “lignes” virtuelles)
  useEffect(() => {
    const demo = setInterval(() => {
      setLines((l) => {
        const nl = l + Math.floor(Math.random() * 2); // 0..1
        if (nl !== l) {
          const add = 120 + Math.floor(Math.random() * 60);
          if (soundOn) {
            // petit "tick" discret (optionnel)
            try {
              const ctx = new (window.AudioContext ||
                (window as any).webkitAudioContext)();
              const o = ctx.createOscillator();
              const g = ctx.createGain();
              o.frequency.value = 760;
              o.connect(g);
              g.connect(ctx.destination);
              g.gain.value = 0.02;
              o.start();
              setTimeout(() => {
                o.stop();
                ctx.close();
              }, 80);
            } catch {}
          }
          setPoints((p) => p + add);
          setProgress((pr) => Math.min(100, pr + 3 + Math.random() * 6));
        }
        return nl;
      });
    }, 1800);
    return () => clearInterval(demo);
  }, [soundOn]);

  // Passage de niveau
  useEffect(() => {
    if (progress >= 100) {
      setLevel((lv) => lv + 1);
      setProgress(0);
      setFactIndex((i) => (i + 1) % facts.length);
    }
  }, [progress, facts.length]);

  // Reset démo
  const resetSession = () => {
    setPlays((n) => n + 1);
    setPoints(0);
    setLines(0);
    setProgress(0);
    setLevel(1);
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(65%_80%_at_50%_20%,#2b2113_0%,#0a0a0a_60%)] text-gray-100 selection:bg-yellow-200/20">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-5 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-[0.12em] text-[var(--doré)]"
              style={{ ["--doré" as any]: DORÉ }}>
            <span className="mr-3">⚙️</span>
            ATELIER HORLOGER — Neo-Tetris
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundOn((s) => !s)}
              className="px-3 py-1 rounded-lg border border-[var(--doré)]/40 text-sm hover:bg-[var(--doré)]/10 transition"
              style={{ ["--doré" as any]: DORÉ }}
              aria-label="Activer/Désactiver les sons"
            >
              {soundOn ? "🔊 Son" : "🔇 Son"}
            </button>
            <button
              onClick={resetSession}
              className="px-3 py-1 rounded-lg bg-[var(--doré)] text-black text-sm shadow hover:brightness-110 transition"
              style={{ ["--doré" as any]: DORÉ }}
            >
              Recommencer
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-5 pb-14 grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)_340px] gap-6">
        {/* ÉTABLI (gauche) */}
        <aside className="rounded-2xl border border-[var(--doré)]/35 bg-black/30 backdrop-blur-sm shadow-[0_0_40px_#E2B44F20]"
               style={{ ["--doré" as any]: DORÉ }}>
          <div className="px-5 py-4 border-b border-[var(--doré)]/25 flex items-center gap-2">
            <span className="text-xl">🧰</span>
            <h2 className="tracking-[.2em] text-sm text-gray-200 uppercase">
              Établi
            </h2>
          </div>

          <div className="p-5 space-y-5">
            {/* Points */}
            <div className="rounded-xl border border-[var(--doré)]/25 p-4 bg-[#0c0c0c]/60">
              <p className="text-xs tracking-widest text-gray-400 uppercase">Points</p>
              <p className="text-3xl font-semibold text-[var(--doré)]">{prettify(points)}</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[var(--doré)]/25 p-3 bg-[#0c0c0c]/60">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">Niveau</p>
                <p className="text-xl text-[var(--doré)]">{level}</p>
              </div>
              <div className="rounded-xl border border-[var(--doré)]/25 p-3 bg-[#0c0c0c]/60">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">Assemblages</p>
                <p className="text-xl text-[var(--doré)]">{lines}</p>
              </div>
            </div>

            {/* Progression */}
            <div className="rounded-xl border border-[var(--doré)]/25 p-4 bg-[#0c0c0c]/60">
              <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">Progression</p>
              <div className="h-3 rounded-full bg-black/50 overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--doré)]"
                  style={{ ["--doré" as any]: DORÉ }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                />
              </div>
              <p className="mt-2 text-xs text-gray-400">{Math.floor(progress)}%</p>
            </div>

            {/* Badges (placeholder) */}
            <div className="rounded-xl border border-[var(--doré)]/25 p-4 bg-[#0c0c0c]/60">
              <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">Badges</p>
              <div className="flex gap-2 flex-wrap">
                {["Apprenti", "Compagnon", "Maître"].map((b, i) => (
                  <span
                    key={b}
                    className={`px-2 py-1 text-[11px] rounded-md border ${
                      i === 0 ? "border-[var(--doré)] text-[var(--doré)]" : "border-gray-600 text-gray-400"
                    }`}
                    style={{ ["--doré" as any]: DORÉ }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats globales */}
            <div className="rounded-xl border border-[var(--doré)]/25 p-4 bg-[#0c0c0c]/60">
              <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Statistiques</p>
              <div className="text-sm space-y-1 text-gray-300">
                <p>Parties : <span className="text-[var(--doré)]">{plays}</span></p>
                <p>Total lignes : <span className="text-[var(--doré)]">{lines}</span></p>
              </div>
            </div>
          </div>
        </aside>

        {/* PLATEAU CENTRAL */}
        <section className="relative flex items-center justify-center">
          <div
            className="relative w-[320px] sm:w-[360px] md:w-[420px] lg:w-[480px] aspect-[10/20] rounded-[22px] 
                       bg-[#0d0d0d]/70 backdrop-blur-sm border border-[var(--doré)]/35 
                       shadow-[0_0_55px_#E2B44F30,0_0_0_1px_rgba(226,180,79,.15)_inset]"
            style={{ ["--doré" as any]: DORÉ }}
          >
            {/* verre */}
            <div className="absolute inset-0 rounded-[22px] pointer-events-none"
                 style={{
                   background:
                     "linear-gradient(110deg, rgba(255,255,255,.06) 10%, transparent 45%), radial-gradient(40% 60% at 10% 0%, rgba(226,180,79,.10) 0%, transparent 60%)",
                 }}
            />

            {/* Grille */}
            <div className="absolute inset-2 grid grid-cols-10 grid-rows-20 gap-[2px] opacity-40">
              {Array.from({ length: 200 }).map((_, i) => (
                <div key={i} className="bg-black/60 rounded-[3px]" />
              ))}
            </div>

            {/* Pièces qui tombent (démo) */}
            <div className="absolute inset-2">
              {pieces.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute"
                  style={{
                    left: `calc(${p.x} * (10% + 2px) + 1px)`,
                    top: `calc(${p.y} * (5% + 2px))`,
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="drop-shadow-[0_0_10px_rgba(226,180,79,.45)]">
                    {PIECE_ICONS[p.type]}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ENCYCLO + OBJECTIFS (droite) */}
        <aside className="rounded-2xl border border-[var(--doré)]/35 bg-black/30 backdrop-blur-sm shadow-[0_0_40px_#E2B44F20]"
               style={{ ["--doré" as any]: DORÉ }}>
          <div className="px-5 py-4 border-b border-[var(--doré)]/25 flex items-center gap-2">
            <span className="text-xl">📚</span>
            <h2 className="tracking-[.2em] text-sm text-gray-200 uppercase">Encyclopédie</h2>
          </div>

          <div className="p-5 space-y-5">
            <motion.div
              key={factIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border border-[var(--doré)]/25 p-4 bg-[#0c0c0c]/60"
              style={{ ["--doré" as any]: DORÉ }}
            >
              <p className="text-sm font-medium text-[var(--doré)] mb-1">
                {facts[factIndex].title}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">{facts[factIndex].text}</p>
            </motion.div>

            <div className="rounded-xl border border-[var(--doré)]/25 p-4 bg-[#0c0c0c]/60"
                 style={{ ["--doré" as any]: DORÉ }}>
              <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">Objectifs</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--doré)]" />
                  Assembler 10 lignes : <span className="text-gray-300">Apprenti</span>
                </li>
                <li className="flex items-center gap-2 opacity-70">
                  <span className="w-2 h-2 rounded-full bg-gray-600" />
                  Assembler 25 lignes : Compagnon
                </li>
                <li className="flex items-center gap-2 opacity-70">
                  <span className="w-2 h-2 rounded-full bg-gray-600" />
                  Assembler 50 lignes : Maître Horloger
                </li>
                <li className="flex items-center gap-2 opacity-70">
                  <span className="w-2 h-2 rounded-full bg-gray-600" />
                  Assembler 100 lignes : Grande Complication
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer discret */}
      <footer className="max-w-7xl mx-auto px-5 pb-8 text-xs text-gray-500/80">
        Prototype UI — Neo-Tetris Horloger · Interface & animations prêtes pour brancher le moteur de jeu.
      </footer>
    </div>
  );
}
