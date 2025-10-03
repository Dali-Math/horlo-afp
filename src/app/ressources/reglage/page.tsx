import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download } from 'lucide-react';

export default function ReglagePrecision() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Bouton Retour */}
        <Link 
          href="/pratique" 
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour aux ressources pratiques</span>
        </Link>

        {/* Titre */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Réglage et Précision
          </h1>
        </div>

        {/* Encadré explicatif */}
        <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-400">
            L'Art du Réglage Horloger Suisse
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Le réglage est l'opération ultime qui transforme un mouvement mécanique en garde-temps précis. 
            C'est une compétence qui distingue l'horloger qualifié et qui fait la réputation de l'horlogerie suisse.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Maîtriser le réglage, c'est comprendre l'équilibre entre le balancier-spiral, ajuster la raquette 
            avec précision, et atteindre des tolérances de marche inférieures à ±5 secondes par jour.
          </p>
        </section>

        {/* Visuel chronocomparateur */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src="/images/chronocomparateur.jpg"
            alt="Chronocomparateur utilisé en réglage horloger"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Description courte */}
        <section className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700 mb-8">
          <p className="text-slate-300 leading-relaxed text-center">
            Le chronocomparateur est l'outil indispensable du régleur. Il capte le tic-tac du mouvement 
            et affiche instantanément la marche en secondes/jour, l'amplitude, et l'écart de battement.
          </p>
        </section>

        {/* Bouton téléchargement PDF */}
        <div className="flex justify-center">
          <a
            href="/pdfs/reglage.pdf"
            download
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Download className="w-6 h-6" />
            <span>Télécharger le guide PDF complet</span>
          </a>
        </div>
      </div>
    </div>
  );
}
