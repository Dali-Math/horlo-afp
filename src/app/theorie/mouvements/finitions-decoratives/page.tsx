'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function FinitionsDecorativesPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link 
            href="/theorie/mouvements" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à Architecture du Mouvement
          </Link>
        </div>
      </header>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          Finitions décoratives
        </h1>
        
        <section className="mb-10">
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            Les finitions décoratives subliment l'aspect visuel du mouvement tout en témoignant 
            du savoir-faire artisanal de la manufacture. Elles combinent valeur esthétique, 
            distinction technique et signature de marque.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
            Techniques principales
          </h2>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Perlage (Circular Graining)</h3>
              <p className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                Décor composé de cercles imbriqués couvrant les surfaces planes de la platine.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong className="text-slate-900 dark:text-white">Outil :</strong> Bâton en bois (buis) avec pâte abrasive diamant</li>
                <li><strong className="text-slate-900 dark:text-white">Technique :</strong> Rotation à 1500-3000 tr/min, pression contrôlée</li>
                <li><strong className="text-slate-900 dark:text-white">Effet :</strong> Surface mate et homogène, signature de qualité</li>
                <li><strong className="text-slate-900 dark:text-white">Durée :</strong> 30 min à 2h selon taille du mouvement</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Côtes de Genève (Geneva Stripes)</h3>
              <p className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                Rayures parallèles ondulées caractéristiques de l'horlogerie genevoise.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong className="text-slate-900 dark:text-white">Outil :</strong> Cabron (bois dur) monté sur axe rotatif</li>
                <li><strong className="text-slate-900 dark:text-white">Technique :</strong> Déplacement linéaire + rotation simultanés</li>
                <li><strong className="text-slate-900 dark:text-white">Largeur :</strong> 0,5 à 2 mm par strie</li>
                <li><strong className="text-slate-900 dark:text-white">Effet visuel :</strong> Jeu de lumière et ombres, élégance raffinée</li>
                <li><strong className="text-slate-900 dark:text-white">Manufactures emblématiques :</strong> Vacheron Constantin, Patek Philippe</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Anglage (Beveling / Chamfering)</h3>
              <p className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                Chanfrein poli miroir sur les arêtes des ponts, réalisé manuellement.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong className="text-slate-900 dark:text-white">Outil :</strong> Lime diamant à grain fin, puis papiers abrasifs</li>
                <li><strong className="text-slate-900 dark:text-white">Finition :</strong> Polissage miroir manuel (10 000 tours/min)</li>
                <li><strong className="text-slate-900 dark:text-white">Angle typique :</strong> 45° avec largeur 0,3 à 1 mm</li>
                <li><strong className="text-slate-900 dark:text-white">Difficulté :</strong> Haute ; angle constant sur toute la longueur</li>
                <li><strong className="text-slate-900 dark:text-white">Valeur :</strong> Marque d'excellence artisanale, très chronophage</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Guillochage</h3>
              <p className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                Gravure de motifs géométriques complexes par tour à guillocher.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong className="text-slate-900 dark:text-white">Machine :</strong> Tour à guillocher manuel (XVIIIᵉ siècle)</li>
                <li><strong className="text-slate-900 dark:text-white">Motifs :</strong> Vagues, paniers, damiers, soleils, etc.</li>
                <li><strong className="text-slate-900 dark:text-white">Application :</strong> Rotors, cadrans, calottes de balancier</li>
                <li><strong className="text-slate-900 dark:text-white">Exemples :</strong> Breguet (pionnier), Voutilainen, Philippe Dufour</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Satinage / Brossage</h3>
              <p className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                Finition directionnelle mate obtenue par brossage abrasif.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong className="text-slate-900 dark:text-white">Types :</strong> Circulaire, linéaire, soleil (radial)</li>
                <li><strong className="text-slate-900 dark:text-white">Grain :</strong> 400 à 1200 selon effet souhaité</li>
                <li><strong className="text-slate-900 dark:text-white">Zones :</strong> Flancs de ponts, rotor, platine périphérique</li>
                <li><strong className="text-slate-900 dark:text-white">Avantage :</strong> Masque rayures, aspect sportif/technique</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
            Outils traditionnels
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Lime</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Lime suisse à grain diamant pour angles et chanfreins précis.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Cabron</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Bâton en bois de tilleul ou buis pour Côtes de Genève.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Polissoir</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Outil en acier poli miroir pour finitions brillantes.</p>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
          <h3 className="font-bold text-xl text-amber-900 dark:text-amber-300 mb-2">✨ Exemples emblématiques</h3>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong className="text-slate-900 dark:text-white">Audemars Piguet :</strong> Finitions satinées et polies contrastées sur Royal Oak</li>
            <li><strong className="text-slate-900 dark:text-white">Breguet :</strong> Guillochage main, tradition depuis 1775</li>
            <li><strong className="text-slate-900 dark:text-white">Voutilainen :</strong> Anglage extrême, perlage d'exception</li>
            <li><strong className="text-slate-900 dark:text-white">Lange & Söhne :</strong> Platine 3/4 gravée et anglée</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
            Valeur et distinction
          </h2>
          <p className="text-lg mb-3 text-slate-700 dark:text-slate-300">
            Les finitions décoratives représentent 20 à 40% du temps de fabrication d'un mouvement 
            haut de gamme. Elles n'influencent pas la fonction mais constituent :
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Un témoignage du savoir-faire artisanal</li>
            <li>Une signature visuelle de la manufacture</li>
            <li>Un critère de valorisation et d'authenticité</li>
            <li>Un héritage technique transmis de génération en génération</li>
          </ul>
        </section>
      </article>
    </main>
  );
}
