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
    title: 'Réglage de précision: spiral et échappement',
    video: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    pdf: '/pdf/tutoriels/reglage-precision.pdf',
    duration: '25:10',
    level: 'Avancé',
  },
];

export default function PratiquePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Video Banner */}
      <section className="relative h-[60vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={BANNER_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Pratique Horlogère
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-md">
              Maîtrisez les gestes et techniques de l'horlogerie traditionnelle
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <Wrench className="w-12 h-12 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">Apprentissage pratique</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Bienvenue dans la section dédiée à la pratique horlogère. Ici, vous trouverez des tutoriels vidéo,
            des fiches techniques et une galerie de gestes essentiels pour vous accompagner dans votre apprentissage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Clock className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Tutoriels progressifs</h3>
                <p className="text-gray-600 text-sm">Du niveau débutant à avancé</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Hammer className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Gestes techniques</h3>
                <p className="text-gray-600 text-sm">Galerie photo et animations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Ressources PDF</h3>
                <p className="text-gray-600 text-sm">Fiches techniques téléchargeables</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutoriels Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PlayCircle className="w-10 h-10 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-800">Tutoriels vidéo</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Suivez nos tutoriels pas à pas pour maîtriser les techniques fondamentales de l'horlogerie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tuto) => (
            <div key={tuto.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="aspect-video bg-gray-200">
                <iframe
                  src={tuto.video}
                  title={tuto.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {tuto.level}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {tuto.duration}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{tuto.title}</h3>
                <a
                  href={tuto.pdf}
                  download
                  className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Télécharger le PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Galerie Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Hammer className="w-10 h-10 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-800">Galerie de gestes</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez en images les gestes techniques essentiels de l'horlogerie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-700 font-medium text-center">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flashcards ETA 6497 Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-800">Démontage & Remontage — Mouvement ETA 6497</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cartes mémoire interactives pour maîtriser le démontage et le remontage du mouvement ETA 6497
          </p>
        </div>
        <Flashcards6497 />
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <Zap className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à vous lancer ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Explorez nos autres ressources pour compléter votre formation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/theorie"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Théorie horlogère
            </Link>
            <Link
              href="/outils"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
            >
              Outils & Ressources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
