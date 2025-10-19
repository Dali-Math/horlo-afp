'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Wrench, 
  Award,
  CheckCircle,
  ArrowRight,
  Bell,
  Rss,
  Clock,
  TrendingUp,
  ExternalLink,
  Heart,
  Star
} from 'lucide-react';

// ---- HERO AVEC CERCLES CANVAS ANIMÉS ----
function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particules qui forment des cercles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1
    }));

    let animationId: number;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(10, 18, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${0.3 + Math.random() * 0.4})`;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="min-h-screen bg-[#0a122a] relative overflow-hidden flex flex-col justify-center items-center px-4">
      {/* Canvas avec particules animées */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-40" 
      />

      {/* Cercles tournants CSS (backup) */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-[20%] left-[-15%] w-[600px] h-[600px] rounded-full border-[3px] border-cyan-400/30"
          style={{ animation: 'spin-slow 35s linear infinite' }}
        />
        <div 
          className="absolute top-[20%] left-[-15%] w-[500px] h-[500px] rounded-full border-[2px] border-blue-300/25"
          style={{ animation: 'spin-slower 45s linear infinite' }}
        />
        <div 
          className="absolute bottom-[15%] right-[-15%] w-[700px] h-[700px] rounded-full border-[3px] border-indigo-400/30"
          style={{ animation: 'spin-reverse 40s linear infinite' }}
        />
        <div 
          className="absolute bottom-[15%] right-[-15%] w-[550px] h-[550px] rounded-full border-[2px] border-sky-300/25"
          style={{ animation: 'spin-slow-reverse 50s linear infinite' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-800 to-sky-600/60 text-white font-medium text-xs shadow-lg backdrop-blur border border-blue-700/30">
            🔧 Bibliothèque Collaborative
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-sky-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          L&apos;horlogerie suisse<br />
          <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            n&apos;a jamais été aussi accessible
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-blue-100/90 mb-10 font-light">
          Explorez <span className="font-bold text-white">2,500+ ressources</span> partagées par des passionnés pour des passionnés
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <StatBox icon="📚" value="2,500+" label="Ressources" />
          <StatBox icon="👥" value="1,200+" label="Passionnés" color="text-green-300" />
          <StatBox icon="🎬" value="150h+" label="Vidéos" color="text-purple-300" />
          <StatBox icon="⭐" value="100%" label="Gratuit" color="text-yellow-300" />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link
            href="/theorie"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition inline-flex items-center justify-center gap-2"
          >
            ⚡ Explorer maintenant <span className="text-xl">→</span>
          </Link>
          <Link
            href="/communaute"
            className="px-8 py-4 bg-[#151f38] border border-blue-800 text-white font-bold rounded-xl hover:bg-blue-900/80 hover:scale-105 transition inline-flex items-center justify-center gap-2"
          >
            👥 Rejoindre la communauté
          </Link>
        </div>

        <div className="flex justify-center">
          <span className="px-5 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-semibold shadow-lg">
            🟢 48 passionnés en ligne
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
}

function StatBox({ icon, value, label, color = "" }: { icon: string; value: string; label: string; color?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-blue-900/30 w-36 h-24 shadow-xl transition hover:scale-105">
      <div className="text-3xl mb-2">{icon}</div>
      <div className={`text-2xl font-bold ${color || 'text-sky-300'}`}>{value}</div>
      <div className="text-xs text-blue-100 font-medium">{label}</div>
    </div>
  );
}

// ... (reste du code identique à avant)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <HeroSection />
      {/* Reste des sections */}
    </div>
  );
}
