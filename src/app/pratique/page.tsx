"use client";
import React from 'react';
import Link from 'next/link';
import { Clock, Wrench, BookOpen, Hammer, Zap, Award, Download, PlayCircle, FileText } from 'lucide-react';

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
  { id: 'tuto-debutant', title: 'Initiation: démontage-remontage d’un mouvement', video: 'https://www.youtube.com/embed/VIDEO_ID_fUpjNPkoGh8C5KQL', pdf: '/pdf/tutoriels/initiation-demontage.pdf', duration: '12:35', level: 'Débutant' },
  { id: 'tuto-intermediaire', title: 'Huilage et lubrification: bonnes pratiques', video: 'https://www.youtube.com/embed/VIDEO_ID_8w24ipBE2kE-MwfQ', pdf: '/pdf/tutoriels/huilage-bonnes-pratiques.pdf', duration: '18:20', level: 'Intermédiaire' },
  { id: 'tuto-avance', title: 'Chronographe: contrôle et réglage', video: 'https://www.youtube.com/embed/VIDEO_ID_snPlz4zkkYnBwTKl', pdf: '/pdf/tutoriels/chronographe-reglage.pdf', duration: '22:10', level: 'Avancé' },
];

const pdfCards = [
  { id: 'pdf-rodage', title: 'Guide complet du rodage', cover: '/pdf/previews/rodage-cover.jpg', href: '/pdf/rodage-guide.pdf', pages: 24 },
  { id: 'pdf-outils', title: 'Maniement des outils horlogers', cover: '/pdf/previews/outils-cover.jpg', href: '/pdf/outils-maniement.pdf', pages: 32 },
  { id: 'pdf-reglage', title: 'Réglage & précision', cover: '/pdf/previews/reglage-cover.jpg', href: '/pdf/reglage-precision.pdf', pages: 28 },
];

const categories = [
  { id: 'gestes', icon: Hammer, title: 'Gestes de base', description: 'Maîtrisez les techniques fondamentales', color: 'from-amber-500 to-yellow-600', items: ['Rodage', 'Huilage', 'Démontage', 'Remontage'], link: '/ressources/gestes' },
  { id: 'outils', icon: Wrench, title: "Maniement d'outils", description: "Apprenez à utiliser l'outillage horloger", color: 'from-blue-500 to-indigo-600', items: ['Tournevis', 'Brucelles', 'Loupe', 'Établi'], link: '/ressources/outils' },
  { id: 'regulation', icon: Clock, title: 'Réglage et précision', description: 'Techniques de réglage avancées', color: 'from-purple-500 to-pink-600', items: ["Mise à l'heure", 'Réglage précision', 'Calibrage'], link: '/ressources/reglage' },
  { id: 'complications', icon: Zap, title: 'Complications', description: 'Mécanismes complexes expliqués', color: 'from-red-500 to-orange-600', items: ['Chronographe', 'Quantième', 'Phases de lune'], link: '/ressources/complications' },
  { id: 'tutorials', icon: BookOpen, title: 'Tutoriels guidés', description: 'Pas à pas détaillés avec photos', color: 'from-green-500 to-emerald-600', items: ['Débutant', 'Intermédiaire', 'Avancé'], link: '/ressources/tutoriels' },
  { id: 'certification', icon: Award, title: 'Certification', description: 'Validez vos compétences pratiques', color: 'from-teal-500 to-cyan-600', items: ['Examens', 'Diplômes', 'Badges'], link: '/ressources/certification' },
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
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_100%_0%,rgba(255,0,0,.08),transparent_60%),radial-gradient(1000px_500px_at_0%_100%,rgba(255,255,255,.06),transparent_60%),linear-gradient(135deg,#0f172a,#0b1220)] text-white">
      {/* Banner video (local, autoplay loop, muted, no controls) */}
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

      {/* Categories grid */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-red-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 flex items-center justify-center mb-6 rounded-2xl shadow-lg bg-gradient-to-br from-red-500/20 to-red-600/10">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-300 transition-colors">{category.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{category.description}</p>
                <ul className="space-y-2 mb-6">
                  {category.items.map((item, idx) => (
                    <li className="flex items-center text-sm text-slate-300" key={idx}>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link className="block" href={category.link}>
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/40">
                    Explorer
                  </button>
                </Link>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gallery */}
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

      {/* Huilage PDF intégré */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Huilage</h3>
          <p className="text-slate-300 mb-4">
            Maîtrisez le huilage des mouvements avec notre guide interactif :
            <br />
            <a
              href="/pdfs/huilage.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-white font-medium underline"
            >
              Consulter le guide PDF
            </a>
          </p>
          <iframe
            src="/pdfs/huilage.pdf"
            width="100%"
            height="500px"
            style={{ border: '1px solid #ccc', borderRadius: '0.75rem' }}
            title="Guide huilage montre mécanique"
            className="mt-4 rounded-xl"
          />
        </div>
      </section>

      {/* Ressources PDF */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle subtitle="Téléchargez les supports illustrés en haute résolution">Ressources PDF</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pdfCards.map((pdf) => (
            <div className="group relative bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-red-400/40 transition" key={pdf.id}>
              <div className="relative aspect-[3/4] w-full">
                <img src={pdf.cover} alt={`Couverture - ${pdf.title}`} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-xs px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/10">{pdf.pages} pages</div>
              </div>
              <div className="p-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-red-300" />
                <div className="flex-1">
                  <div className="font-semibold text-white leading-tight">{pdf.title}</div>
                  <div className="text-xs text-slate-400">PDF illustré</div>
                </div>
                <Link className="inline-flex items-center gap-2 text-sm font-medium text-red-300 hover:text-white" href={pdf.href} rel="noopener" target="_blank">
                  <Download className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl p-10 border border-slate-700/50">
            <h2 className="text-3xl font-bold mb-4 text-white">Prêt à perfectionner vos compétences ?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl">Rejoignez notre communauté et accédez à des centaines de tutoriels exclusifs</p>
            <Link className="inline-block" href="/communaute">
              <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/40">
                Commencer maintenant
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
