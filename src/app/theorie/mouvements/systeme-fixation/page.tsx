'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function SystemeFixationPage() {
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
          Système de fixation
        </h1>
        
        <section className="mb-10">
          <p className="text-lg mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
            La fixation des ponts sur la platine est cruciale pour la précision du mouvement. 
            Elle doit assurer un positionnement reproductible, une stabilité dimensionnelle parfaite 
            et résister aux chocs et vibrations.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
            Types de fixations
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Vissage direct</h3>
              <p className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                Les vis traversent le pont et se vissent dans des taraudages pratiqués dans la platine.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
                <li>Vis en acier bleui (traitement thermique à 300°C)</li>
                <li>Têtes polies miroir ou satinées</li>
                <li>Fentes parfaitement centrées et polies</li>
                <li>Couple de serrage calibré pour éviter déformations</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Chatons et pierres</h3>
              <p className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                Les pivots tournent dans des pierres (rubis synthétiques) enchâssées dans des chatons.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
                <li>Pierres percées : guidage radial des pivots</li>
                <li>Contre-pivots : limitation du jeu axial</li>
                <li>Chatons vissés ou chassés dans la platine</li>
                <li>Réduction des frottements et de l'usure</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Goupilles de positionnement</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Petites goupilles coniques assurant un positionnement précis et reproductible du pont 
                avant serrage des vis. Garantit l'alignement parfait des paliers.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
            Précision dimensionnelle
          </h2>
          <p className="text-lg mb-3 text-slate-700 dark:text-slate-300">
            Les tolérances d'usinage sont extrêmement serrées :
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Planéité de la platine : ±0,005 mm</li>
            <li>Diamètre des trous de paliers : ±0,002 mm</li>
            <li>Entraxe des paliers : ±0,01 mm</li>
            <li>Perpendicularité des trous : ±0,5°</li>
          </ul>
        </section>

        <section className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-6 rounded-r-lg">
          <h3 className="font-bold text-xl text-orange-900 dark:text-orange-300 mb-2">⚠️ Impact sur la marche</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Un serrage excessif des vis déforme la platine et désaxe les paliers, augmentant 
            les frottements et dégradant la précision. Un serrage insuffisant crée du jeu et 
            des vibrations parasites. Le réglage optimal nécessite expérience et outils de mesure.
          </p>
        </section>
      </article>
    </main>
  );
}
