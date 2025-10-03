import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function Complications() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/pratique" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Retour aux ressources pratiques</span>
        </Link>

        <div className="mb-12 rounded-lg overflow-hidden">
          <Image 
            src="/images/mouvement-chronographe.jpg" 
            alt="Mécanisme de chronographe suisse avec roues à colonnes"
            width={1200}
            height={400}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
            Complications Horlogères
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Les fonctions additionnelles qui enrichissent l'art horloger
          </p>
        </div>

        <div className="grid gap-8 max-w-5xl mx-auto">
          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-red-400">Définition</h2>
            <p className="text-slate-300 leading-relaxed">
              Une complication horlogère est toute fonction supplémentaire à l'affichage des heures, minutes et secondes. 
              Ces mécanismes démontrent le savoir-faire technique et artistique des horlogers suisses.
            </p>
          </section>

          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-red-400">Principales Complications</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Le Chronographe</h3>
                <p className="text-slate-300 mb-2">
                  Fonction de chronométrage indépendante permettant de mesurer des durées. Le chronographe à roue à colonnes représente 
                  le summum de cette complication, offrant un déclenchement et un arrêt d'une douceur incomparable.
                </p>
                <p className="text-slate-300 text-sm italic">
                  Variantes : chronographe simple, rattrapante (double chronographe), chronographe flyback
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Le Calendrier</h3>
                <p className="text-slate-300 mb-2">
                  Du simple quantième au calendrier perpétuel, cette complication affiche la date. Le calendrier perpétuel 
                  prend en compte les mois de différentes longueurs et les années bissextiles sans correction jusqu'en 2100.
                </p>
                <p className="text-slate-300 text-sm italic">
                  Variantes : quantième simple, complet, annuel, perpétuel
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Les Phases de Lune</h3>
                <p className="text-slate-300">
                  Complication poétique reproduisant le cycle lunaire de 29,5 jours. Les plus précises ne nécessitent qu'une correction 
                  tous les 122 ans, voire 1000 ans pour les modèles d'exception.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Le Répétition Minutes</h3>
                <p className="text-slate-300">
                  Complication sonore égrenant les heures, quarts et minutes sur demande. Chef-d'œuvre de miniaturisation, 
                  elle requiert des mois d'ajustement pour obtenir une sonorité parfaite.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Le Tourbillon</h3>
                <p className="text-slate-300">
                  Inventé par Abraham-Louis Breguet en 1795, le tourbillon compense les effets de la gravité en faisant tourner 
                  l'ensemble balancier-spiral sur lui-même. Une prouesse technique fascin ante à observer.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-red-400">Complications Rares</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-300">Équation du Temps</h4>
                <p className="text-slate-300 text-sm">
                  Affiche l'écart entre le temps solaire vrai et le temps civil moyen, variant de -16 à +14 minutes selon la période de l'année.
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-300">Réserve de Marche</h4>
                <p className="text-slate-300 text-sm">
                  Indique l'autonomie restante du mouvement, généralement entre 38 et 72 heures pour les montres mécaniques classiques.
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-300">Heures Saut antes</h4>
                <p className="text-slate-300 text-sm">
                  L'heure change instantanément au passage de 59 à 00 minutes, nécessitant un mécanisme d'accumulation d'énergie.
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-300">GMT / Double Fuseau</h4>
                <p className="text-slate-300 text-sm">
                  Permet de suivre simultanément l'heure de deux fuseaux horaires, indispensable pour les voyageurs.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-red-400">Montres à Grande Complication</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Une montre cumul ant plusieurs complications ma jeures (généralement 3 ou plus parmi : chronographe, calendrier perpétuel, 
              répétition minutes, tourbillon) est qualifiée de "Grande Complication".
            </p>
            <p className="text-slate-300 leading-relaxed">
              Ces garde-temps d'exception peuvent nécessiter plusieurs années de développement et des milliers d'heures de travail. 
              Ils représentent l'apogée de l'art horloger suisse.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
