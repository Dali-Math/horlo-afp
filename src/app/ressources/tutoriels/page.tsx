"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

export default function TutorielsGuides() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Bouton retour */}
        <Link
          className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors mb-8 group"
          href="/ressources"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour aux Ressources
        </Link>
        
        {/* Encadré pédagogique */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
            Démontage et remontage du mouvement Unitas 6497
          </h1>

          {/* Image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src="/images/unitas-6497.jpg"
              alt="Mouvement Unitas 6497 en atelier suisse"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-slate-300 leading-relaxed mb-4">
              Le mouvement Unitas 6497 est un calibre mécanique à remontage manuel emblématique de l'horlogerie suisse. 
              Ce tutoriel vous guide à travers les étapes essentielles de démontage et de remontage, en respectant 
              les bonnes pratiques professionnelles.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Vous apprendrez les techniques de désarmement, de nettoyage, d'huilage précis et de contrôle qualité 
              appliquées dans les ateliers horlogers suisses.
            </p>
          </div>

          {/* Étapes principales */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Étapes principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-3">Démontage</h3>
                <ol className="list-decimal list-inside text-slate-300 space-y-2">
                  <li>Désarmement du barillet en contrôle</li>
                  <li>Dépose du balancier-spiral</li>
                  <li>Dépose de l'ancre et de son pont</li>
                  <li>Dépose des ponts de rouage et extraction des mobiles</li>
                  <li>Ouverture du barillet</li>
                  <li>Côté cadran : dépose cadran, aiguilles et minuterie</li>
                  <li>Nettoyage complet des pièces</li>
                  <li>Contrôles de qualité (jeu, pivots, endshake)</li>
                </ol>
              </div>

              <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-3">Remontage et huilage</h3>
                <ol className="list-decimal list-inside text-slate-300 space-y-2">
                  <li>Ressort de barillet : graissage (Moebius 8217, D5)</li>
                  <li>Remontage du rouage et pose des ponts</li>
                  <li>Huilage des rouages (huiles 9010/9020)</li>
                  <li>Pose de l'ancre et test de liberté</li>
                  <li>Pose du balancier-spiral</li>
                  <li>Côté cadran : minuterie et lubrification (9501)</li>
                  <li>Réglage de base (amplitude &gt; 270°, delta &lt; 10 s/j)</li>
                  <li>Contrôle final et mise en boîte</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Bouton consultation PDF */}
          <div className="text-center">
            <a
              href="/ressources/tutoriels/Remontage_mouvement%20Unitas%206497.pdf"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
            >
              <Download className="w-5 h-5" />
              Consulter le tutoriel PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
