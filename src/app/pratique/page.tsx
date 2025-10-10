"use client";
import React from "react";
import Link from "next/link";
import {
  Clock,
  Wrench,
  BookOpen,
  Hammer,
  Zap,
  Award,
  Download,
  PlayCircle,
} from "lucide-react";

const BANNER_VIDEO_SRC = "/videos/Editor — Clideo.mp4";

const tutorials = [
  {
    id: "tuto-debutant",
    title: "Initiation: démontage-remontage d’un mouvement",
    video: "https://www.youtube-nocookie.com/embed/SlB9FukapN4",
    pdf: "/pdf/tutoriels/initiation-demontage.pdf",
    duration: "12:35",
    level: "Débutant",
  },
  {
    id: "tuto-intermediaire",
    title: "Huilage et lubrification: bonnes pratiques",
    video: "https://www.youtube-nocookie.com/embed/ARb8Vo4refs",
    pdf: "/pdf/tutoriels/huilage-bonnes-pratiques.pdf",
    duration: "18:20",
    level: "Intermédiaire",
  },
  {
    id: "tuto-avance",
    title: "Chronographe: contrôle et réglage",
    video: "https://www.youtube-nocookie.com/embed/eMQ6TkdEJvA",
    pdf: "/pdf/tutoriels/chronographe-reglage.pdf",
    duration: "22:10",
    level: "Avancé",
  },
];

function SectionTitle({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent">
        {children}
      </h2>
      {subtitle && <p className="mt-2 text-gray-300">{subtitle}</p>}
    </div>
  );
}

export default function PratiqueHorlogere() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_100%_0%,rgba(255,255,0,.05),transparent_60%),linear-gradient(135deg,#0f172a,#0b1220)] text-white">

      {/* 🎥 Vidéo bannière */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/swiss/pattern-cross.svg')] bg-[length:40px_40px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full aspect-[16/7] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black">
            <video
              className="w-full h-full object-cover"
              src={BANNER_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              poster="/images/black-poster.png"
            />
          </div>
          <div className="mt-4 flex items-center gap-3 text-gray-400">
            <PlayCircle className="w-5 h-5 text-yellow-400" />
            Vidéo d’ouverture — mécanique horlogère.
          </div>
        </div>
      </section>

      {/* 🧱 Catégories principales */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: Wrench,
            title: "Démontage & Remontage",
            desc: "Étapes détaillées pour démonter et remonter un mouvement mécanique.",
          },
          {
            icon: Clock,
            title: "Réglage & Précision",
            desc: "Techniques de réglage du balancier et de l’échappement pour une précision optimale.",
          },
          {
            icon: Hammer,
            title: "Outils & Équipement",
            desc: "Guide complet des outils essentiels et leur bonne utilisation.",
          },
          {
            icon: Zap,
            title: "Huilage & Lubrification",
            desc: "Protocoles d’huilage pour assurer la longévité des mouvements.",
          },
          {
            icon: BookOpen,
            title: "Fiches Techniques",
            desc: "Documents détaillés pour chaque type de mouvement.",
          },
          {
            icon: Award,
            title: "Certifications",
            desc: "Standards et parcours professionnels de l’horlogerie suisse.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-yellow-400/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/20"
          >
            <item.icon className="w-10 h-10 text-yellow-400 mb-5" />
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 🧠 Cartes mémoire ETA 6497 */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle subtitle="Cartes mémoire interactives pour maîtriser le démontage et le remontage du mouvement ETA 6497.">
          Démontage & Remontage — Mouvement ETA 6497
        </SectionTitle>

        <div className="bg-black/70 rounded-3xl border border-yellow-500/30 p-12 shadow-2xl text-center">
          <h3 className="text-3xl font-bold text-yellow-400 mb-10">
            Démontage & Remontage — Mouvement ETA 6497
          </h3>

          <div className="mx-auto max-w-2xl bg-gradient-to-b from-neutral-900 to-black rounded-2xl border border-yellow-600/40 p-10 mb-8 shadow-lg hover:shadow-yellow-500/20 transition-all duration-500">
            <p
              id="flashcard-question"
              className="text-yellow-100 text-xl font-medium leading-relaxed"
            >
              Quelle est la première étape du démontage du mouvement ETA 6497 ?
            </p>
            <p
              id="flashcard-answer"
              className="hidden text-gray-300 text-lg leading-relaxed italic mt-4"
            >
              Retirer les aiguilles et le cadran avant de démonter les ponts et
              les rouages.
            </p>

            <button
              onClick={() => {
                const q = document.getElementById("flashcard-question");
                const a = document.getElementById("flashcard-answer");
                if (q && a) {
                  q.classList.toggle("hidden");
                  a.classList.toggle("hidden");
                }
              }}
              className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105"
            >
              Retourner
            </button>

            <p className="text-sm text-gray-400 mt-4">Carte 1 sur 50</p>
          </div>

          <p className="text-gray-400 text-base italic">
            Cliquez sur la carte pour la retourner — compatible mobile et
            tablette.
          </p>
        </div>
      </section>

      {/* 🎬 Tutoriels vidéo */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle subtitle="Pas à pas en vidéo avec fiches PDF téléchargeables">
          Tutoriels vidéo
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tuto) => (
            <div
              key={tuto.id}
              className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/40 transition"
            >
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={tuto.video}
                  title={tuto.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{tuto.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-200">
                    {tuto.level}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Durée ~ {tuto.duration}
                </p>
                <Link
                  href={tuto.pdf}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-yellow-300 hover:text-white"
                >
                  <Download className="w-4 h-4" /> Télécharger le PDF
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
