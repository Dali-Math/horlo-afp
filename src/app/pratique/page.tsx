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
  },
];

export default function PratiquePage() {
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Pratique Horlogère</h1>
      <p className="text-lg mb-8">Page de pratique horlogère avec tutoriels et galerie.</p>
      
      {/* Placeholder pour le contenu */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tutoriels</h2>
          {/* Tutoriels content */}
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Galerie</h2>
          {/* Galerie content */}
        </div>
        
        <Flashcards6497 />
      </div>
    </section>
  );
}
