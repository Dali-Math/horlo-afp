import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function GestesDeBase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Bouton Retour */}
        <Link href="/pratique" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Retour aux ressources pratiques</span>
        </Link>

        {/* Image en-tête */}
        <div className="mb-12 rounded-lg overflow-hidden">
          <Image 
            src="/images/atelier-horloger.jpg" 
            alt="Atelier d'horlogerie suisse avec établis et outils professionnels"
            width={1200}
            height={400}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>

        {/* Titre */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Gestes de Base
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Maîtrisez les gestes fondamentaux de l'horlogerie suisse
          </p>
        </div>

        {/* Contenu principal */}
        <div className="grid gap-8 max-w-5xl mx-auto">
          {/* Introduction */}
          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-amber-400">Les Fondamentaux</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Dans la tradition horlogère suisse, la précision des gestes est aussi importante que celle des montres elles-mêmes. 
              Chaque mouvement doit être maîtrisé, chaque manipulation effectuée avec délicatesse et rigueur.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Ces gestes de base constituent le socle de toute pratique horlogère professionnelle et sont enseignés dans toutes les écoles d'horlogerie de Suisse.
            </p>
          </section>

          {/* Gestes essentiels */}
          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-amber-400">Gestes Essentiels</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">1. Tenue des outils</h3>
                <p className="text-slate-300">
                  La pince brucelles doit être tenue comme un crayon, avec une pression légère mais ferme. 
                  Le tournevis horloger se tient entre le pouce et l'index, la rotation s'effectuant par les doigts, jamais par le poignet.
                </p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">2. Manipulation des composants</h3>
                <p className="text-slate-300">
                  Les pièces ne doivent jamais être touchées avec les doigts. Utiliser systématiquement des brucelles adaptées. 
                  Pour les composants fragiles comme les spiraux, une manipulation à l'air calme est impérative.
                </p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">3. Démontage et remontage</h3>
                <p className="text-slate-300">
                  Procéder méthodiquement, dans l'ordre prescrit. Chaque vis retirée doit être placée dans son logement du porte-pièce. 
                  Le sens de rotation pour le remontage est toujours celui des aiguilles d'une montre.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">4. Nettoyage des composants</h3>
                <p className="text-slate-300">
                  Utiliser des solvants appropriés (benzine, essence horlogère). Les pièces sont nettoyées au pinceau puis séchées avec soin. 
                  Ne jamais souffler sur les composants.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">5. Lubrification</h3>
                <p className="text-slate-300">
                  Appliquer l'huile avec parcimonie, uniquement aux points prescrits. L'outil huileur ne doit déposer qu'une infime quantité. 
                  Trop d'huile nuit au fonctionnement et à la précision.
                </p>
              </div>
            </div>
          </section>

          {/* Règles d'or */}
          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-amber-400">Règles d'Or de l'Atelier</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 text-xl">•</span>
                <span className="text-slate-300">Toujours travailler dans un environnement propre et bien éclairé</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 text-xl">•</span>
                <span className="text-slate-300">Porter une blouse et travailler sur un tapis d'horloger</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 text-xl">•</span>
                <span className="text-slate-300">Ne jamais forcer sur une pièce ou un mécanisme</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 text-xl">•</span>
                <span className="text-slate-300">Respecter les temps de séchage et de stabilisation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 text-xl">•</span>
                <span className="text-slate-300">Documenter chaque intervention dans un carnet d'atelier</span>
              </li>
            </ul>
          </section>

          {/* Perfectionnement */}
          <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-amber-400">Perfectionnement Continu</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              La maîtrise des gestes de base demande des années de pratique. Les horlogers suisses répètent inlassablement ces mouvements 
              jusqu'à ce qu'ils deviennent une seconde nature.
            </p>
            <p className="text-slate-300 leading-relaxed">
              La formation à l'AFP comprend des heures de pratique supervisée permettant d'acquérir la dextérité et la précision requises 
              par les standards de l'horlogerie suisse.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
