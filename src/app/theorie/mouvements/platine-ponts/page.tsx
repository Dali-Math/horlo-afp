'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function PlatinePontsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER avec bouton retour */}
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

      {/* CONTENU */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          La Platine et les Ponts
        </h1>
        
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
            Définition et rôle
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            La <strong className="text-slate-900 dark:text-white">platine</strong> est l'ossature principale du mouvement horloger. 
            Cette plaque métallique, généralement en laiton ou maillechort, occupe toute la surface du calibre 
            et supporte l'ensemble des organes : barillet, rouages, échappement et balancier.
          </p>
          <p className="mb-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            Les <strong className="text-slate-900 dark:text-white">ponts</strong> sont des éléments structurels fixés sur la platine 
            qui maintiennent les axes des mobiles. Ils forment avec la platine une cage tridimensionnelle assurant stabilité 
            et précision. Chaque pont porte généralement le nom de l'organe qu'il maintient : pont de barillet, 
            pont d'ancre, coq (pont de balancier).
          </p>
        </section>

        <section className="mb-10 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-3">💡 Le saviez-vous ?</h3>
          <p className="italic text-slate-700 dark:text-slate-300 leading-relaxed">
            Dans le Jura suisse, le pont du balancier est traditionnellement appelé le <strong className="text-slate-900 dark:text-white">"coq"</strong>, 
            en référence à sa forme élégante rappelant la silhouette d'un coq. Cette terminologie régionale 
            témoigne du riche héritage horloger des manufactures suisses.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
            Architecture et construction
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-lg text-slate-700 dark:text-slate-300">
            <li>La platine détermine les dimensions du mouvement (calibre)</li>
            <li>Les ponts assurent le guidage des pivots et maintiennent l'ébat (jeu axial)</li>
            <li>Le nombre de ponts varie selon la construction : 3/4 de platine, ponts séparés, etc.</li>
            <li>Matériaux : laiton (rhodié ou doré), maillechort, alliages spéciaux</li>
            <li>Épaisseur typique : 1 à 3 mm selon la taille du calibre</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
            Types de construction
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">Platine 3/4</h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Un seul grand pont couvre les trois-quarts de la platine. Construction typique allemande 
                (Glashütte, A. Lange & Söhne). Stabilité maximale.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">Ponts séparés</h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Plusieurs ponts individuels. Construction suisse classique permettant finitions décoratives 
                élaborées et accès facilité au rouage.
              </p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
