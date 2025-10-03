import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function ReglagePrecision() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Bouton Retour */}
        <Link href="/pratique" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Retour aux ressources pratiques</span>
        </Link>

        {/* Image en-tête */}
        <div className="mb-12 rounded-lg overflow-hidden">
          <Image 
            src="/images/chronocomparateur.jpg" 
            alt="Chronocomparateur pour le réglage précis des montres suisses"
            width={1200}
            height={400}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>

        {/* Titre */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Réglage et Précision
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            L'art du réglage horloger : atteindre la précision absolue
          </p>
        </div>

        {/* Contenu principal */}
        <div className="grid gap-8 max-w-5xl mx-auto">
          {/* Introduction */}
          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-400">L'Excellence du Réglage</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Le réglage est l'opération ultime qui transforme un mouvement mécanique en garde-temps précis. 
              C'est une compétence qui distingue l'horloger qualifié et qui fait la réputation de l'horlogerie suisse.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Un mouvement bien réglé doit respecter des tolérances de marche extrêmement strictes, souvent inférieures à ±5 secondes par jour.
            </p>
          </section>

          {/* Principes fondamentaux */}
          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-purple-400">Principes Fondamentaux</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Le Balancier-Spiral</h3>
                <p className="text-slate-300">
                  Le cœur du réglage réside dans l'oscillateur : le balancier et son spiral. 
                  La fréquence d'oscillation détermine la précision de marche. Les montres suisses oscillent généralement à 28'800 alternances/heure (4 Hz).
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">La Raquette</h3>
                <p className="text-slate-300">
                  Cet organe de réglage permet d'ajuster la longueur active du spiral et donc la fréquence d'oscillation. 
                  Vers "+" pour accélérer, vers "-" pour ralentir. Un déplacement minime suffit à modifier la marche.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Les Positions</h3>
                <p className="text-slate-300">
                  Un mouvement doit être réglé dans différentes positions : cadran en haut, cadran en bas, et les quatre positions verticales. 
                  La compensation des variations garantit une précision constante au porté.
                </p>
              </div>
            </div>
          </section>

          {/* Outils de mesure */}
          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-purple-400">Outils de Mesure</h2>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-purple-300">Chronocomparateur</h3>
                <p className="text-slate-300 text-sm">
                  Instrument électronique qui capte le tic-tac du mouvement et affiche instantanément la marche en secondes/jour, 
                  l'amplitude, et l'écart de battement. Indispensable pour un réglage précis.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-purple-300">Pendule de Précision</h3>
                <p className="text-slate-300 text-sm">
                  Référence horaire ultra-précise utilisée pour mesurer la marche réelle du mouvement sur plusieurs jours. 
                  Permet de valider le réglage dans des conditions réelles.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-purple-300">Potence de Réglage</h3>
                <p className="text-slate-300 text-sm">
                  Permet de positionner le mouvement dans les différentes positions de réglage 
                  et de maintenir la montre stable pendant les mesures.
                </p>
              </div>
            </div>
          </section>

          {/* Méthode de réglage */}
          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-purple-400">Méthode de Réglage</h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">1</span>
                <div>
                  <h4 className="font-semibold mb-1">Mise en marche et stabilisation</h4>
                  <p className="text-slate-300 text-sm">Remonter complètement le mouvement et le laisser tourner 24h pour stabilisation.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">2</span>
                <div>
                  <h4 className="font-semibold mb-1">Mesure initiale</h4>
                  <p className="text-slate-300 text-sm">Relever la marche dans toutes les positions au chronocomparateur.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">3</span>
                <div>
                  <h4 className="font-semibold mb-1">Correction</h4>
                  <p className="text-slate-300 text-sm">Agir sur la raquette par mouvements infimes. Contrôler après chaque ajustement.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">4</span>
                <div>
                  <h4 className="font-semibold mb-1">Vérification</h4>
                  <p className="text-slate-300 text-sm">Valider le réglage sur plusieurs jours en conditions réelles.</p>
                </div>
              </li>
            </ol>
          </section>

          {/* Standards suisses */}
          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-400">Standards Suisses</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Les montres suisses doivent répondre à des critères stricts. La certification COSC (Contrôle Officiel Suisse des Chronomètres) 
              impose une précision de -4/+6 secondes par jour sur 15 jours de tests en 5 positions et 3 températures.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Les manufactures haut de gamme visent des tolérances encore plus resserrées, atteignant -2/+2 secondes par jour.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
