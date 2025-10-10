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
