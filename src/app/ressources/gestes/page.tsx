"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Download } from 'lucide-react';

export default function GestesDeBase() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Bouton Retour */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour aux ressources
        </button>

        {/* Titre */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Gestes de Base
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Maîtrisez les gestes fondamentaux de l'horlogerie suisse
          </p>
        </div>

        {/* Encadré explicatif */}
        <div className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700 mb-12">
          <div className="border-l-4 border-amber-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-amber-400">Fiche Pédagogique - Formation AFP Horlogerie</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Cette fiche présente les gestes techniques essentiels enseignés dans le cadre de la formation 
              d'Attestation Fédérale de Formation Professionnelle (AFP) en horlogerie. Elle s'adresse aux 
              apprentis de première année et couvre les manipulations de base indispensables à tout horloger.
            </p>
          </div>
        </div>

        {/* Visuel */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/images/gestes-horlogerie.jpg"
            alt="Gestes de base en horlogerie"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Liste des gestes */}
        <div className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-amber-400">Gestes Essentiels</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-slate-700/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-amber-300 mb-3">1. Manipulation des outils</h3>
              <p className="text-slate-300">Prise en main correcte des tournevis, pinces et autres instruments de précision.</p>
            </div>
            <div className="bg-slate-700/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-amber-300 mb-3">2. Ouverture du boîtier</h3>
              <p className="text-slate-300">Technique sécurisée pour ouvrir différents types de boîtiers sans endommager le mécanisme.</p>
            </div>
            <div className="bg-slate-700/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-amber-300 mb-3">3. Démontage du mouvement</h3>
              <p className="text-slate-300">Procédure méthodique pour démonter les composants dans l'ordre correct.</p>
            </div>
            <div className="bg-slate-700/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-amber-300 mb-3">4. Nettoyage des pièces</h3>
              <p className="text-slate-300">Méthodes de nettoyage adaptées aux différents composants horlogers.</p>
            </div>
          </div>
        </div>

        {/* Bouton téléchargement PDF */}
        <div className="flex justify-center">
          <a
            href="/pdfs/gestes.pdf"
            download
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <Download className="w-6 h-6" />
            Télécharger le guide PDF
          </a>
        </div>
      </div>
    </div>
  );
}
