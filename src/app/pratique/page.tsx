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
    title: "Initiation: démontage-remontage d'un mouvement",
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
    title: 'Réglage de précision: spirale et balancier',
    video: 'https://www.youtube-nocookie.com/embed/sj4c8IgGd54',
    pdf: '/pdf/tutoriels/reglage-precision.pdf',
    duration: '24:10',
    level: 'Avancé',
  },
];

export default function PratiquePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-950/30 to-gray-900">
      {/* Video banner fullscreen */}
      <section className="relative h-[70vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={BANNER_VIDEO_SRC}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-wide drop-shadow-lg">
              Pratique Horlogère
            </h1>
            <p className="text-xl md:text-2xl text-amber-200/90 font-light drop-shadow">
              Gestes, tutoriels et savoir-faire du métier
            </p>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-amber-900/40 to-gray-800/40 border border-amber-700/30 rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <Wrench className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-amber-100 mb-3">Démontage & Remontage</h3>
            <p className="text-amber-100/70">
              Étapes détaillées pour démonter et remonter un mouvement mécanique avec précision.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-amber-900/40 to-gray-800/40 border border-amber-700/30 rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <Clock className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-amber-100 mb-3">Réglage & Précision</h3>
            <p className="text-amber-100/70">
              Techniques de réglage du balancier, du spiral et de l'échappement pour une précision optimale.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-amber-900/40 to-gray-800/40 border border-amber-700/30 rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <Hammer className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-amber-100 mb-3">Outils & Équipement</h3>
            <p className="text-amber-100/70">
              Guide complet des outils essentiels et de leur utilisation correcte en horlogerie.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-br from-amber-900/40 to-gray-800/40 border border-amber-700/30 rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <Zap className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-amber-100 mb-3">Huilage & Lubrification</h3>
            <p className="text-amber-100/70">
              Protocoles d'huilage pour assurer la longévité et le bon fonctionnement des mouvements.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-gradient-to-br from-amber-900/40 to-gray-800/40 border border-amber-700/30 rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <BookOpen className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-amber-100 mb-3">Fiches Techniques</h3>
            <p className="text-amber-100/70">
              Documents PDF détaillés pour chaque type de mouvement et opération.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-gradient-to-br from-amber-900/40 to-gray-800/40 border border-amber-700/30 rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <Award className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-amber-100 mb-3">Certifications</h3>
            <p className="text-amber-100/70">
              Parcours de certification et standards professionnels de l'horlogerie suisse.
            </p>
          </div>
        </div>
      </section>

      {/* Video tutorials section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-amber-400 mb-12 text-center">
          Tutoriels Vidéo
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tuto) => (
            <div
              key={tuto.id}
              className="bg-gradient-to-br from-gray-800/60 to-amber-950/40 border border-amber-700/30 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-amber-500/20 transition-shadow duration-300"
            >
              {/* Video embed */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={tuto.video}
                  title={tuto.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {/* Card content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-amber-400 bg-amber-900/40 px-2 py-1 rounded">
                    {tuto.level}
                  </span>
                  <span className="text-xs text-amber-100/70 flex items-center gap-1">
                    <PlayCircle className="w-4 h-4" />
                    {tuto.duration}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-amber-100 mb-3">{tuto.title}</h3>
                <a
                  href={tuto.pdf}
                  download
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Télécharger le PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-amber-400 mb-12 text-center">
          Galerie des Gestes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {gallery.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden rounded-lg border border-amber-700/30 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <p className="text-xs text-amber-100 font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: Flashcards6497 section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-400 mb-4">
            Démontage & Remontage — Mouvement ETA 6497
          </h2>
          <p className="text-amber-100/70 text-lg max-w-3xl mx-auto">
            Cartes mémoire interactives pour maîtriser le démontage et le remontage du mouvement ETA 6497.
          </p>
        </div>
        <Flashcards6497 />
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-br from-amber-900/40 to-gray-800/40 border border-amber-700/30 rounded-lg p-12">
          <FileText className="w-16 h-16 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-amber-100 mb-4">
            Fiches Techniques Complètes
          </h2>
          <p className="text-amber-100/70 mb-8 text-lg">
            Accédez à notre bibliothèque de fiches techniques détaillées pour tous les mouvements.
          </p>
          <Link
            href="/ressources"
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Explorer les Ressources
          </Link>
        </div>
      </section>
    </div>
  );
}
