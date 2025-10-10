"use client";
import React from 'react';
import Link from 'next/link';
import { Clock, Wrench, BookOpen, Hammer, Zap, Award, Download, PlayCircle, FileText } from 'lucide-react';

const BANNER_VIDEO_SRC = "/videos/Editor — Clideo.mp4";

const gallery = [
  { src: '/pratique/gestes/rodage-1.jpg', alt: 'Rodage - étape 1' },
  { src: '/pratique/gestes/huilage.gif', alt: 'Huilage - animation' },
  { src: '/pratique/gestes/demontage-1.jpg', alt: 'Démontage - platine' },
  { src: '/pratique/gestes/remontage-bridge.jpg', alt: 'Remontage - pont' },
  { src: '/pratique/gestes/precision-balance.gif', alt: 'Réglage du balancier' },
];

const tutorials = [
  {
    id: 'tuto-debutant',
    title: 'Initiation: démontage-remontage d’un mouvement',
    video: 'https://www.youtube-nocookie.com/embed/SlB9FukapN4',
    pdf: '/pdf/tutoriels/initiation-demontage.pdf',
    duration: '12:35',
    level: 'Débutant',
  },
  {
    id: 'tuto-intermediaire',
    title: 'Huilage et lubrification: bonnes pratiques',
    video: 'https://www.youtube-nocookie.com/embed/ARb8Vo4refs',
    pdf: '/pdf/tutoriels/huilage-bonnes-pratiques.pdf',
    duration: '18:20',
    level: 'Intermédiaire',
  },
  {
    id: 'tuto-avance',
    title: 'Chronographe: contrôle et réglage',
    video: 'https://www.youtube-nocookie.com/embed/eMQ6TkdEJvA',
    pdf: '/pdf/tutoriels/chronographe-reglage.pdf',
    duration: '22:10',
    level: 'Avancé',
  },
];

const pdfCards = [
  { id: 'pdf-rodage', title: 'Guide complet du rodage', cover: '/pdf/previews/rodage-cover.jpg', href: '/pdf/rodage-guide.pdf', pages: 24 },
  { id: 'pdf-outils', title: 'Maniement des outils horlogers', cover: '/pdf/previews/outils-cover.jpg', href: '/pdf/outils-maniement.pdf', pages: 32 },
  { id: 'pdf-reglage', title: 'Réglage & précision', cover: '/pdf/previews/reglage-cover.jpg', href: '/pdf/reglage-precision.pdf', pages: 28 },
];

// 🟡 Nouvelle section sous-pages interactives
const sousPages = [
  { href: "/pratique/demontage", icon: Wrench, title: "Démontage & Remontage", desc: "Étapes détaillées pour démonter et remonter un mouvement mécanique." },
  { href: "/pratique/reglage", icon: Clock, title: "Réglage & Précision", desc: "Techniques de réglage du balancier et de l’échappement pour une précision optimale." },
  { href: "/pratique/outils", icon: Hammer, title: "Outils & Équipement", desc: "Guide complet des outils essentiels et leur bonne utilisation." },
  { href: "/pratique/huilage", icon: Zap, title: "Huilage & Lubrification", desc: "Protocoles d’huilage pour assurer la longévité des mouvements." },
  { href: "/pratique/fiches", icon: BookOpen, title: "Fiches Techniques", desc: "Documents détaillés pour chaque type de mouvement." },
  { href: "/pratique/certifications", icon: Award, title: "Certifications", desc: "Standards et parcours professionnels de l’horlogerie suisse." },
];

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
        {children}
      </h2>
      {subtitle && <p className="mt-2 text-slate-300">{subtitle}</p>}
    </div>
  );
}

export default function PratiqueHorlogere() {
  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_100%_0%,rgba(255,0,0,.08),transparent_60%),radial-gradient(1000px_500px_at_0%_100%,rgba(255,255,255,.06),transparent_60%),linear-gradient(135deg,#0f172a,#0b1220)] text-white">

        {/* Banner video */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/swiss/pattern-cross.svg')] bg-[length:40px_40px]"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black">
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
            <div className="mt-4 flex items-center gap-3 text-slate-300">
              <PlayCircle className="w-5 h-5 text-red-400" />
              Vidéo d’ouverture locale — mécanique horlogère en boucle.
            </div>
          </div>
        </section>

        {/* 🟡 Sous-pages pratiques */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SectionTitle subtitle="Explorez les principales catégories de la pratique horlogère">
            Sous-pages Pratiques
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sousPages.map(({ href, icon: Icon, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-red-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20"
              >
                <div className="w-14 h-14 flex items-center justify-center mb-6 rounded-xl shadow-lg bg-gradient-to-br from-red-500/20 to-red-600/10">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-red-300 transition-colors">{title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Galerie des gestes */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <SectionTitle subtitle="Images pédagogiques HD et animations">Galerie des gestes</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {gallery.map((item, idx) => (
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10" key={idx}>
                <img src={item.src} alt={item.alt} className="object-cover w-full h-full hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* Tutoriels vidéo */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <SectionTitle subtitle="Pas à pas en vidéo avec fiches PDF téléchargeables">Tutoriels vidéo</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tuto) => (
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-red-400/40 transition" key={tuto.id}>
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src={tuto.video}
                    title={tuto.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{tuto.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-200">{tuto.level}</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">Durée ~ {tuto.duration}</p>
                  <div className="flex items-center gap-3">
                    <Link className="inline-flex items-center gap-2 text-sm font-medium text-red-300 hover:text-white" href={tuto.pdf} rel="noopener" target="_blank">
                      <Download className="w-4 h-4" /> Télécharger le PDF
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
