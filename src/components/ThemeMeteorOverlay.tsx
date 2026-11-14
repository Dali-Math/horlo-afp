"use client";

import React, { useEffect, useRef, useState } from "react";

// Sutherland-Hodgman pour découpage de polygone convexe
function clipPolygon(
  poly: { x: number; y: number }[],
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  const newPoly: { x: number; y: number }[] = [];
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i];
    const next = poly[(i + 1) % poly.length];
    const curSide = (p2.x - p1.x) * (cur.y - p1.y) - (p2.y - p1.y) * (cur.x - p1.x);
    const nextSide = (p2.x - p1.x) * (next.y - p1.y) - (p2.y - p1.y) * (next.x - p1.x);
    if (curSide >= 0) newPoly.push(cur);
    if ((curSide >= 0 && nextSide < 0) || (curSide < 0 && nextSide >= 0)) {
      const t = curSide / (curSide - nextSide);
      newPoly.push({ x: cur.x + t * (next.x - cur.x), y: cur.y + t * (next.y - cur.y) });
    }
  }
  return newPoly;
}

// Génération du pavage de Voronoï couvrant la fenêtre
function generateVoronoiCells(width: number, height: number, cols: number, rows: number) {
  const points: { x: number; y: number }[] = [];
  const cellW = width / cols;
  const cellH = height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const px = (c + 0.5 + (Math.random() - 0.5) * 0.72) * cellW;
      const py = (r + 0.5 + (Math.random() - 0.5) * 0.72) * cellH;
      points.push({
        x: Math.max(0, Math.min(width, px)),
        y: Math.max(0, Math.min(height, py)),
      });
    }
  }

  return points.map((p, idx) => {
    let poly = [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height },
    ];

    for (let j = 0; j < points.length; j++) {
      if (idx === j) continue;
      const q = points[j];
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      if (dx * dx + dy * dy > (cellW * 3.5) ** 2 + (cellH * 3.5) ** 2) continue;

      const midX = (p.x + q.x) / 2;
      const midY = (p.y + q.y) / 2;
      const p1 = { x: midX, y: midY };
      const p2 = { x: midX - dy, y: midY + dx };
      poly = clipPolygon(poly, p1, p2);
      if (poly.length === 0) break;
    }
    return { center: p, poly };
  });
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function ThemeMeteorOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [targetIsDark, setTargetIsDark] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{
        x: number;
        y: number;
        nextIsDark: boolean;
        commitTheme?: () => void;
      }>;

      const detail = customEvent.detail;
      if (!detail) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        detail.commitTheme?.();
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;
      const originX = detail.x || width - 60;
      const originY = detail.y || 40;
      const nextIsDark = detail.nextIsDark;

      setTargetIsDark(nextIsDark);
      setOverlayOpacity(1);
      setIsActive(true);

      const canvas = canvasRef.current;
      const pathEl = pathRef.current;
      if (!canvas || !pathEl) return;

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 15 colonnes x 10 lignes de Voronoï pour une granularité identique à la maquette
      const cols = Math.max(10, Math.min(18, Math.round(width / 80)));
      const rows = Math.max(7, Math.min(12, Math.round(height / 75)));
      const voronoiGrid = generateVoronoiCells(width, height, cols, rows);

      // Durée réglée à 2500ms pour une vraie pluie continue, majestueuse et bien visible
      const TOTAL_DURATION = 2500;
      const startTime = performance.now();

      // Préparation de la pluie de météores reliée à chaque cellule Voronoï
      const meteors = voronoiGrid.map((cell) => {
        // Projection diagonale depuis le coin/bouton de déclenchement
        const dx = (width - cell.center.x) * 1.0;
        const dy = (cell.center.y) * 1.05;
        const diagDist = dx + dy;
        const normDist = Math.max(0, Math.min(1, diagDist / (width + height * 1.05)));

        // Jitter aléatoire pour faire apparaître des îlots isolés en avance
        const jitter = (Math.random() - 0.45) * 0.14;
        const progressTrigger = Math.max(0.01, Math.min(0.88, normDist + jitter));
        const impactTime = progressTrigger * (TOTAL_DURATION * 0.85);

        // Durée de vol du météore (glisse continue bien visible)
        const flightDuration = 380 + Math.random() * 260;
        const launchTime = Math.max(0, impactTime - flightDuration);

        return {
          cell,
          originX: originX + (Math.random() - 0.5) * 40,
          originY: originY + (Math.random() - 0.5) * 30,
          targetX: cell.center.x,
          targetY: cell.center.y,
          launchTime,
          impactTime,
          flightDuration,
          scale: 0,
        };
      });

      // Météores d'ambiance supplémentaires pour intensifier la cascade
      const extraMeteors = Array.from({ length: 65 }, () => {
        const launchT = Math.random() * (TOTAL_DURATION * 0.82);
        const dur = 340 + Math.random() * 280;
        const startX = originX + (Math.random() - 0.5) * 140;
        const startY = originY + (Math.random() - 0.5) * 90;
        const angle = Math.PI * 0.76 + (Math.random() - 0.5) * 0.45;
        const len = 400 + Math.random() * 750;

        return {
          x1: startX,
          y1: startY,
          x2: startX + Math.cos(angle) * len,
          y2: startY + Math.sin(angle) * len,
          launchTime: launchT,
          duration: dur,
          headSize: 2.0 + Math.random() * 1.6,
        };
      });

      let themeCommitted = false;

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / TOTAL_DURATION);

        // BASCULE DU SITE À 88% : Lorsque 90% de l'écran est déjà recouvert de facettes
        if (!themeCommitted && progress >= 0.88) {
          themeCommitted = true;
          if (detail.commitTheme) {
            detail.commitTheme();
          }
        }

        // 1. DÉCOUPE PROGRESSIVE VORONOÏ
        let svgPath = "";
        meteors.forEach((m) => {
          if (elapsed >= m.impactTime) {
            const cellAge = elapsed - m.impactTime;
            const cellProgress = Math.min(1, cellAge / 450);
            m.scale = easeOutCubic(cellProgress);

            const poly = m.cell.poly;
            const cx = m.cell.center.x;
            const cy = m.cell.center.y;
            const s = m.scale;

            if (poly.length >= 3 && s > 0.01) {
              let cellD = "";
              for (let i = 0; i < poly.length; i++) {
                const px = cx + (poly[i].x - cx) * s;
                const py = cy + (poly[i].y - cy) * s;
                cellD += (i === 0 ? `M ${px.toFixed(1)} ${py.toFixed(1)} ` : `L ${px.toFixed(1)} ${py.toFixed(1)} `);
              }
              cellD += "Z ";
              svgPath += cellD;
            }
          }
        });

        // Couverture totale à la fin
        if (progress >= 0.96) {
          svgPath += `M 0 0 H ${width} V ${height} H 0 Z `;
        }

        pathEl.setAttribute("d", svgPath || "M 0 0 Z");

        // 2. RENDU CANVAS DE LA PLUIE DE MÉTÉORITES EN CHUTE CONTINUE
        ctx.clearRect(0, 0, width, height);

        meteors.forEach((m) => {
          if (elapsed >= m.launchTime && elapsed <= m.impactTime + 120) {
            const flightRatio = Math.min(1, (elapsed - m.launchTime) / m.flightDuration);
            const curX = m.originX + (m.targetX - m.originX) * flightRatio;
            const curY = m.originY + (m.targetY - m.originY) * flightRatio;

            const tailRatio = Math.max(0, flightRatio - 0.38);
            const tailX = m.originX + (m.targetX - m.originX) * tailRatio;
            const tailY = m.originY + (m.targetY - m.originY) * tailRatio;

            ctx.save();
            const grad = ctx.createLinearGradient(curX, curY, tailX, tailY);
            if (nextIsDark) {
              // Météorites d'acier bleui & corindon violet (vers Mode Sombre)
              grad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
              grad.addColorStop(0.35, "rgba(167, 139, 250, 0.9)");
              grad.addColorStop(0.7, "rgba(129, 140, 248, 0.45)");
              grad.addColorStop(1, "rgba(99, 102, 241, 0)");
            } else {
              // Météorites solaires dorées de laiton horloger (vers Mode Clair)
              grad.addColorStop(0, "rgba(255, 255, 235, 0.98)");
              grad.addColorStop(0.35, "rgba(251, 191, 36, 0.95)");
              grad.addColorStop(0.7, "rgba(234, 141, 36, 0.45)");
              grad.addColorStop(1, "rgba(234, 141, 36, 0)");
            }

            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.0;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(curX, curY);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();

            // Tête lumineuse étincelante
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = nextIsDark ? "#a78bfa" : "#fbbf24";
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(curX, curY, 2.6, 0, Math.PI * 2);
            ctx.fill();

            // Halo diffus
            ctx.fillStyle = nextIsDark ? "rgba(167, 139, 250, 0.45)" : "rgba(251, 191, 36, 0.45)";
            ctx.beginPath();
            ctx.arc(curX, curY, 6.0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Étincelles à l'impact
            if (flightRatio >= 0.94) {
              ctx.fillStyle = nextIsDark ? "#c4b5fd" : "#fde68a";
              for (let s = 0; s < 3; s++) {
                const sparkAngle = Math.random() * Math.PI * 2;
                const sparkDist = 2 + Math.random() * 8;
                ctx.beginPath();
                ctx.arc(
                  curX + Math.cos(sparkAngle) * sparkDist,
                  curY + Math.sin(sparkAngle) * sparkDist,
                  1.2,
                  0,
                  Math.PI * 2
                );
                ctx.fill();
              }
            }
          }
        });

        // Météores secondaires d'ambiance
        extraMeteors.forEach((em) => {
          if (elapsed >= em.launchTime && elapsed <= em.launchTime + em.duration) {
            const r = (elapsed - em.launchTime) / em.duration;
            const curX = em.x1 + (em.x2 - em.x1) * r;
            const curY = em.y1 + (em.y2 - em.y1) * r;
            const tailX = em.x1 + (em.x2 - em.x1) * Math.max(0, r - 0.25);
            const tailY = em.y1 + (em.y2 - em.y1) * Math.max(0, r - 0.25);

            ctx.save();
            ctx.strokeStyle = nextIsDark
              ? "rgba(167, 139, 250, 0.7)"
              : "rgba(251, 191, 36, 0.7)";
            ctx.lineWidth = em.headSize;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(curX, curY);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = nextIsDark ? "#a78bfa" : "#fbbf24";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(curX, curY, em.headSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Fondu de sortie ultra doux
          setOverlayOpacity(0);
          setTimeout(() => {
            ctx.clearRect(0, 0, width, height);
            pathEl.setAttribute("d", "M 0 0 Z");
            setIsActive(false);
          }, 250);
        }
      };

      requestAnimationFrame(animate);
    };

    window.addEventListener("horlo:trigger-theme-transition", handleTrigger);
    return () => window.removeEventListener("horlo:trigger-theme-transition", handleTrigger);
  }, []);

  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-opacity duration-300"
      style={{ zIndex: 999999, opacity: overlayOpacity }}
      aria-hidden="true"
    >
      {/* Masque vectoriel SVG Voronoï */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="horloVoronoiClip" clipPathUnits="userSpaceOnUse">
            <path ref={pathRef} d="M 0 0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Calque de révélation Voronoï découpé */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: "url(#horloVoronoiClip)",
          WebkitClipPath: "url(#horloVoronoiClip)",
          backgroundColor: targetIsDark ? "#090b0e" : "#f3efe7",
        }}
      >
        {targetIsDark ? (
          /* Carte céleste horlogère pour le mode sombre */
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute rounded-full border border-violet-500/15"
              style={{ width: "900px", height: "900px", top: "-180px", right: "-120px" }}
            />
            <div
              className="absolute rounded-full border border-dashed border-indigo-400/12"
              style={{ width: "1350px", height: "1350px", top: "-280px", right: "-250px" }}
            />
            <div
              className="absolute rounded-full border border-violet-500/10"
              style={{ width: "1800px", height: "1800px", top: "-400px", right: "-400px" }}
            />
            {/* Étoiles célestes */}
            <div className="absolute w-1 h-1 rounded-full bg-white opacity-60 shadow-[0_0_6px_#a78bfa]" style={{ top: "120px", right: "320px" }} />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-80 shadow-[0_0_8px_#a78bfa]" style={{ top: "240px", right: "200px" }} />
            <div className="absolute w-1 h-1 rounded-full bg-white opacity-50 shadow-[0_0_6px_#818cf8]" style={{ top: "350px", right: "480px" }} />
            <div className="absolute w-1 h-1 rounded-full bg-white opacity-70 shadow-[0_0_6px_#a78bfa]" style={{ bottom: "180px", left: "280px" }} />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-80 shadow-[0_0_8px_#c4b5fd]" style={{ bottom: "280px", left: "420px" }} />
          </div>
        ) : (
          /* Ambiance d'atelier horloger clair et chaleureux */
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute rounded-full border border-amber-500/12"
              style={{ width: "900px", height: "900px", top: "-180px", right: "-120px" }}
            />
            <div
              className="absolute rounded-full border border-dashed border-amber-600/10"
              style={{ width: "1350px", height: "1350px", top: "-280px", right: "-250px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-transparent to-orange-100/20" />
          </div>
        )}
      </div>

      {/* Canvas haute performance des météores en chute continue */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}