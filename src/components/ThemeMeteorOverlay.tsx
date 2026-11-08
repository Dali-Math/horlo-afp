"use client";

import React, { useEffect, useRef, useState } from "react";

// Algorithme Sutherland-Hodgman pour découpe de polygone convexe
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

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number; nextIsDark: boolean }>;
      const { x, y, nextIsDark } = customEvent.detail || {
        x: window.innerWidth - 60,
        y: 40,
        nextIsDark: !document.documentElement.classList.contains("dark"),
      };

      setTargetIsDark(nextIsDark);
      setIsActive(true);

      const canvas = canvasRef.current;
      const pathEl = pathRef.current;
      if (!canvas || !pathEl) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Grille adaptée aux dimensions de l'écran
      const cols = Math.max(8, Math.min(18, Math.round(width / 75)));
      const rows = Math.max(6, Math.min(12, Math.round(height / 75)));
      const voronoiGrid = generateVoronoiCells(width, height, cols, rows);

      const TOTAL_DURATION = 1350;
      const startTime = performance.now();

      // Préparation des météores liés à chaque cellule
      const meteors = voronoiGrid.map((cell) => {
        // Distance relative par rapport au point de départ du clic
        const dx = cell.center.x - x;
        const dy = cell.center.y - y;
        const dist = Math.hypot(dx, dy);
        const maxDist = Math.hypot(width, height);
        const normDist = Math.min(1, dist / maxDist);

        // Léger jitter pour faire émerger des îlots isolés en avance
        const jitter = (Math.random() - 0.45) * 0.15;
        const progressTrigger = Math.max(0.01, Math.min(0.88, normDist + jitter));
        const impactTime = progressTrigger * (TOTAL_DURATION * 0.82);

        const flightDuration = 180 + Math.random() * 140;
        const launchTime = Math.max(0, impactTime - flightDuration);

        return {
          cell,
          originX: x + (Math.random() - 0.5) * 30,
          originY: y + (Math.random() - 0.5) * 25,
          targetX: cell.center.x,
          targetY: cell.center.y,
          launchTime,
          impactTime,
          flightDuration,
          scale: 0,
        };
      });

      // Météores d'ambiance supplémentaires
      const extraMeteors = Array.from({ length: 30 }, () => {
        const launchT = Math.random() * (TOTAL_DURATION * 0.75);
        const dur = 180 + Math.random() * 150;
        const angle = Math.atan2(height * 0.7 - y, -width * 0.6) + (Math.random() - 0.5) * 0.6;
        const len = 300 + Math.random() * 600;
        const startX = x + (Math.random() - 0.5) * 80;
        const startY = y + (Math.random() - 0.5) * 50;
        return {
          x1: startX,
          y1: startY,
          x2: startX + Math.cos(angle) * len,
          y2: startY + Math.sin(angle) * len,
          launchTime: launchT,
          duration: dur,
          headSize: 1.8 + Math.random() * 1.5,
        };
      });

      let switchedDomTheme = false;

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / TOTAL_DURATION);

        // Bascule réelle du DOM à mi-parcours (environ 40%) sous le couvert des cratères Voronoï
        if (!switchedDomTheme && progress >= 0.4) {
          switchedDomTheme = true;
          if (nextIsDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
          } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
          }
          window.dispatchEvent(
            new CustomEvent("horlo:theme-changed", { detail: { isDark: nextIsDark } })
          );
        }

        // 1. MISE À JOUR DU MASQUE SVG VORONOÏ
        let svgPath = "";
        meteors.forEach((m) => {
          if (elapsed >= m.impactTime) {
            const cellAge = elapsed - m.impactTime;
            const cellProgress = Math.min(1, cellAge / 240);
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

        if (progress >= 0.95) {
          svgPath += `M 0 0 H ${width} V ${height} H 0 Z `;
        }

        pathEl.setAttribute("d", svgPath || "M 0 0 Z");

        // 2. RENDU CANVAS DES MÉTÉORITES EN CHUTE CONTINUE
        ctx.clearRect(0, 0, width, height);

        meteors.forEach((m) => {
          if (elapsed >= m.launchTime && elapsed <= m.impactTime + 70) {
            const flightRatio = Math.min(1, (elapsed - m.launchTime) / m.flightDuration);
            const curX = m.originX + (m.targetX - m.originX) * flightRatio;
            const curY = m.originY + (m.targetY - m.originY) * flightRatio;

            const tailRatio = Math.max(0, flightRatio - 0.28);
            const tailX = m.originX + (m.targetX - m.originX) * tailRatio;
            const tailY = m.originY + (m.targetY - m.originY) * tailRatio;

            ctx.save();
            const grad = ctx.createLinearGradient(curX, curY, tailX, tailY);
            if (nextIsDark) {
              grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
              grad.addColorStop(0.35, "rgba(167, 139, 250, 0.85)");
              grad.addColorStop(0.7, "rgba(129, 140, 248, 0.4)");
              grad.addColorStop(1, "rgba(99, 102, 241, 0)");
            } else {
              grad.addColorStop(0, "rgba(255, 255, 240, 0.95)");
              grad.addColorStop(0.35, "rgba(251, 191, 36, 0.9)");
              grad.addColorStop(0.7, "rgba(234, 141, 36, 0.4)");
              grad.addColorStop(1, "rgba(234, 141, 36, 0)");
            }

            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.8;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(curX, curY);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();

            // Tête étincelante
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = nextIsDark ? "#a78bfa" : "#fbbf24";
            ctx.shadowBlur = 9;
            ctx.beginPath();
            ctx.arc(curX, curY, 2.4, 0, Math.PI * 2);
            ctx.fill();

            // Halo diffus
            ctx.fillStyle = nextIsDark ? "rgba(167, 139, 250, 0.4)" : "rgba(251, 191, 36, 0.4)";
            ctx.beginPath();
            ctx.arc(curX, curY, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });

        // Météores d'ambiance
        extraMeteors.forEach((em) => {
          if (elapsed >= em.launchTime && elapsed <= em.launchTime + em.duration) {
            const r = (elapsed - em.launchTime) / em.duration;
            const curX = em.x1 + (em.x2 - em.x1) * r;
            const curY = em.y1 + (em.y2 - em.y1) * r;
            const tailX = em.x1 + (em.x2 - em.x1) * Math.max(0, r - 0.22);
            const tailY = em.y1 + (em.y2 - em.y1) * Math.max(0, r - 0.22);

            ctx.save();
            ctx.strokeStyle = nextIsDark ? "rgba(167, 139, 250, 0.6)" : "rgba(251, 191, 36, 0.6)";
            ctx.lineWidth = em.headSize;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(curX, curY);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = nextIsDark ? "#a78bfa" : "#fbbf24";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(curX, curY, em.headSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Clôture
          ctx.clearRect(0, 0, width, height);
          pathEl.setAttribute("d", "M 0 0 Z");
          setIsActive(false);
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
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 999999 }}
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
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          clipPath: "url(#horloVoronoiClip)",
          WebkitClipPath: "url(#horloVoronoiClip)",
          backgroundColor: targetIsDark ? "#090b0e" : "#f3efe7",
        }}
      >
        {targetIsDark && (
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div
              className="absolute rounded-full border border-violet-500/10"
              style={{ width: "800px", height: "800px", top: "-150px", right: "-150px" }}
            />
            <div
              className="absolute rounded-full border border-dashed border-indigo-400/10"
              style={{ width: "1200px", height: "1200px", top: "-250px", right: "-300px" }}
            />
          </div>
        )}
      </div>

      {/* Canvas pour le rendu dynamique des traînées de météorites */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}