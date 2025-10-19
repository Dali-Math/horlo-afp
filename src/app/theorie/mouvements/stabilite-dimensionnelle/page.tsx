'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function StabiliteDimensionnellePage() {
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
          Stabilité dimensionnelle
        </h1>
        
        <section className="mb-10">
          <p className="text-lg leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
            La stabilité dimensionnelle désigne la capacité de la platine et des ponts à conserver 
            leurs dimensions et leur géométrie malgré les variations de température, l'humidité, 
            les chocs et le vieillissement. C'est un facteur déterminant pour la précision à long terme.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
            Matériaux utilisés
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Laiton</h3>
              <p className="mb-2 text-slate-700 dark:text-slate-300">Alliage cuivre-zinc, matériau traditionnel</p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <li>Coefficient de dilatation : 18×10⁻⁶/°C</li>
                <li>Excellent usinable</li>
                <li>Traitement de surface : rhodiage, dorage</li>
                <li>Coût modéré</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Maillechort</h3>
              <p className="mb-2 text-slate-700 dark:text-slate-300">Alliage cuivre-nickel-zinc</p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <li>Meilleure stabilité que le laiton</li>
                <li>Couleur argentée naturelle</li>
                <li>Résistance à la corrosion</li>
                <li>Utilisé en haute horlogerie</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Alliages modernes</h3>
              <p className="mb-2 text-slate-700 dark:text-slate-300">Titane, or, platine</p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <li>Titane : léger, amagnétique, stable</li>
                <li>Or : prestige, résistance chimique</li>
                <li>Platine : densité, esthétique</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Matériaux composites</h3>
              <p className="mb-2 text-slate-700 dark:text-slate-300">Silicium, céramique</p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <li>Dilatation thermique minimale</li>
                <li>Légèreté exceptionnelle</li>
                <li>Propriétés amagnétiques</li>
                <li>Coût élevé, usinage complexe</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
            Traitements anti-déformation
          </h2>
          
          <ul className="space-y-4">
            <li className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-lg shadow-sm">
              <strong className="text-lg text-slate-900 dark:text-white">Recuit de détente</strong>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Traitement thermique à 200-250°C pour éliminer les tensions internes 
                créées par l'usinage. Stabilise la structure métallurgique.
              </p>
            </li>
            
            <li className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-lg shadow-sm">
              <strong className="text-lg text-slate-900 dark:text-white">Vieillissement artificiel</strong>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Cycles thermiques accélérés simulant plusieurs années de vieillissement 
                naturel. Prévient les déformations différées.
              </p>
            </li>
            
            <li className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-lg shadow-sm">
              <strong className="text-lg text-slate-900 dark:text-white">Finitions mécaniques</strong>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Lappage, rodage pour obtenir des surfaces parfaitement planes et parallèles. 
                Élimine les micro-contraintes de surface.
              </p>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
            Impact sur la régularité
          </h2>
          <p className="text-lg mb-3 text-slate-700 dark:text-slate-300">
            Une variation dimensionnelle de 0,01 mm sur l'entraxe des paliers peut engendrer :
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Augmentation des frottements : +15 à 30%</li>
            <li>Variation de la marche diurne : ±5 à 10 secondes/jour</li>
            <li>Usure prématurée des pivots et pierres</li>
            <li>Risque de grippage en cas de choc</li>
          </ul>
        </section>

        <section className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <h3 className="font-bold text-xl text-blue-900 dark:text-blue-300 mb-2">📌 Exemple industriel</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Les manufactures haut de gamme (Patek Philippe, Vacheron Constantin) stockent leurs 
            platines usinées pendant 6 à 12 mois avant assemblage final, permettant une stabilisation 
            naturelle complète. Les dimensions sont recontrôlées avant montage.
          </p>
        </section>
      </article>
    </main>
  );
}
