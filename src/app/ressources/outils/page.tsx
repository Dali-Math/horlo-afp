'use client';

import React from 'react';
import { ArrowLeft, Wrench, Sparkles, Info } from 'lucide-react';
import Link from 'next/link';

export default function OutilsHorlogers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Bouton retour */}
        <Link
          href="/ressources"
          className="inline-flex items-center gap-2 mb-8 text-slate-300 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Retour aux Ressources</span>
        </Link>

        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <Wrench className="w-12 h-12 text-amber-500" />
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Outils Horlogers
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez les instruments essentiels du maître horloger : tournevis, brucelles,
            échappemètre et outils de précision pour l'assemblage et la réparation.
          </p>
        </div>

        {/* Encadré explicatif */}
        <div className="mb-12 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-blue-300 mb-3">Précision et Savoir-Faire</h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                L'horlogerie exige des outils d'une précision extrême. Chaque instrument est conçu
                pour manipuler des composants miniatures avec délicatesse et exactitude.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Du tournevis horloger aux brucelles en passant par l'échappemètre, ces outils sont
                le prolongement de la main de l'artisan et garantissent la qualité du travail.
              </p>
            </div>
          </div>
        </div>

        {/* Image test */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&auto=format&fit=crop"
            alt="Outils horlogers - Tournevis et instruments de précision"
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Liste synthétique des outils */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tournevis */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">Tournevis Horlogers</h3>
                <p className="text-slate-300 leading-relaxed">
                  Instruments de précision avec lames interchangeables, adaptés à différentes tailles
                  de vis. Essentiels pour l'ouverture des boîtiers et l'assemblage des mouvements.
                </p>
              </div>
            </div>
          </div>

          {/* Brucelles */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">Brucelles</h3>
                <p className="text-slate-300 leading-relaxed">
                  Pinces ultra-fines permettant de manipuler les pièces miniatures sans les endommager.
                  Disponibles en différentes formes : droites, courbées, antiamagnétiques.
                </p>
              </div>
            </div>
          </div>

          {/* Échappemètre */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">Échappemètre</h3>
                <p className="text-slate-300 leading-relaxed">
                  Appareil de mesure acoustique permettant de contrôler la précision du mouvement,
                  détecter les défauts d'échappement et vérifier la régularité de la marche.
                </p>
              </div>
            </div>
          </div>

          {/* Huiliers */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">Huiliers</h3>
                <p className="text-slate-300 leading-relaxed">
                  Outils de lubrification permettant de déposer des quantités infinitésimales d'huile
                  sur les pivots et rouages. Garantissent le bon fonctionnement et la longévité.
                </p>
              </div>
            </div>
          </div>

          {/* Outils à forger les dards */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">Outils à Forger les Dards</h3>
                <p className="text-slate-300 leading-relaxed">
                  Équipement spécialisé pour façonner et ajuster les dards des aiguilles. Permet de
                  créer l'ouverture précise nécessaire à leur fixation sur les axes du mouvement.
                  Nécessite maîtrise et expérience pour un travail irréprochable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
