"use client";
import React from 'react';
import Link from 'next/link';
import { Clock, Wrench, BookOpen, Hammer, Zap, Award, Download, PlayCircle, FileText } from 'lucide-react';
import Flashcards6497 from '@/components/Flashcards6497';

// Local video path for banner
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
    title: 'Initiation: démontage-remontage d'un mouvement',
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
    video: 'https://www.youtube-nocookie.com/embed/z0qJ-vDDnqI',
    pdf: '/pdf/tutoriels/chrono-reglage.pdf',
    duration: '24:12',
    level: 'Avancé',
  },
];

const pdfCards = [
  {
    id: 'pdf-rolex',
    title: 'Démontage & remontage : Rolex 3135',
    cover: '/pdf/covers/rolex-3135-thumb.jpg',
    pages: 48,
    href: '/pdf/rolex-3135-afp.pdf',
  },
  {
    id: 'pdf-eta',
    title: 'Guide de lubrification horlogère',
    cover: '/pdf/covers/lubrification-thumb.jpg',
    pages: 32,
    href: '/pdf/guide-lubrification.pdf',
  },
  {
    id: 'pdf-outils',
    title: 'Les outils essentiels de l'horloger',
    cover: '/pdf/covers/outils-thumb.jpg',
    pages: 20,
    href: '/pdf/outils-essentiels.pdf',
  },
];

type SectionTitleProps = { children: React.ReactNode; subtitle?: string };
function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
        {children}
      </h2>
      {subtitle && <p className="text-slate-400 text-base md:text-lg">{subtitle}</p>}
    </div>
  );
}

export default function PratiquePage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Vidéo en fond */}
      <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src={BANNER_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-5 drop-shadow-2xl">
            Pratique<br />horlogère
          </h1>
          <p className="text-lg md:text-xl text-slate-200 drop-shadow-xl">
            Démontages guidés, tutoriels vidéo et ressources PDF pour perfectionner vos gestes.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
        {/* Flashcards ETA 6497 */}
        <section>
          <Flashcards6497 />
        </section>

        {/* Tutoriels vidéo */}
        <section>
          <SectionTitle subtitle="Apprenez les gestes clés en vidéo, du débutant à l'expert">
            <PlayCircle className="text-red-300" /> Tutoriels vidéo
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tuto) => (
              <div
                key={tuto.id}
                className="group relative bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-red-400/40 transition"
              >
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    src={tuto.video}
                    title={tuto.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{tuto.level}</span>
                    <span>{tuto.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white leading-tight">{tuto.title}</h3>
                  {tuto.pdf && (
                    <a
                      href={tuto.pdf}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 text-sm text-red-300 hover:text-white transition"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger le PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ressources PDF */}
        <section>
          <SectionTitle subtitle="Téléchargez les supports illustrés en haute résolution">
            <FileText className="text-red-300" /> Ressources PDF
          </SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pdfCards.map((pdf) => (
              <div
                key={pdf.id}
                className="group relative bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-red-400/40 transition"
              >
                <div className="relative aspect-[3/4] w-full">
                  <img
                    src={pdf.cover}
                    alt={`Couverture - ${pdf.title}`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-xs px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/10">
                    {pdf.pages} pages
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-red-300" />
                  <div className="flex-1">
                    <div className="font-semibold text-white leading-tight">{pdf.title}</div>
                    <div className="text-xs text-slate-400">PDF illustré</div>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 text-sm font-medium text-red-300 hover:text-white"
                    href={pdf.href}
                    rel="noopener"
                    target="_blank"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
