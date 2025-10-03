import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download } from 'lucide-react';

export default function GestesDeBase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Bouton Retour */}
        <Link 
          href="/ressources" 
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour aux ressources</span>
        </Link>
        
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
            <div className="bg-amber-900/20 rounded-lg p-4 mt-4">
              <p className="text-amber-200 text-sm">
                <strong>Objectifs pédagogiques :</strong> Acquérir les gestes précis et sûrs pour manipuler 
                les composants horlogers, développer la dextérité manuelle et respecter les protocoles 
                de sécurité en atelier.
              </p>
            </div>
          </div>
        </div>

        {/* Visuel PDF */}
        <div className="bg-slate-800/50 rounded-lg p-8 backdrop-blur-sm border border-slate-700 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-amber-400 mb-2">Guide Illustré des Gestes de Base</h3>
            <p className="text-slate-300">Fiche technique officielle avec illustrations détaillées</p>
          </div>
          
          {/* Aperçu du PDF */}
          <div className="relative bg-white rounded-lg shadow-2xl mx-auto max-w-2xl mb-6">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/gestes-base-preview.jpg"
                alt="Aperçu de la fiche pédagogique des gestes de base en horlogerie"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay avec icône PDF */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
                PDF
              </div>
            </div>
          </div>

          {/* Contenu de la fiche */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-300">Contenu de la fiche :</h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 text-sm">•</span>
                  <span>Tenue correcte des outils (brucelles, tournevis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 text-sm">•</span>
                  <span>Manipulation sécurisée des composants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 text-sm">•</span>
                  <span>Techniques de démontage et remontage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 text-sm">•</span>
                  <span>Procédures de nettoyage et lubrification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 text-sm">•</span>
                  <span>Règles de sécurité en atelier</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-300">Spécifications :</h4>
              <div className="bg-slate-700/50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Format :</span>
                  <span className="text-slate-300">A4 - PDF haute résolution</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pages :</span>
                  <span className="text-slate-300">6 pages illustrées</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Langue :</span>
                  <span className="text-slate-300">Français</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Niveau :</span>
                  <span className="text-slate-300">AFP 1ère année</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mise à jour :</span>
                  <span className="text-slate-300">Octobre 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bouton de téléchargement */}
          <div className="text-center">
            <button className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Download className="w-5 h-5" />
              <span>Télécharger la fiche pédagogique</span>
              <span className="text-amber-100 text-sm">(PDF - 2.3 MB)</span>
            </button>
            <p className="text-slate-400 text-sm mt-3">
              Document officiel de formation - Usage pédagogique autorisé
            </p>
          </div>
        </div>

        {/* Section complémentaire */}
        <div className="bg-slate-800/50 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-slate-700">
          <h3 className="text-2xl font-bold mb-4 text-amber-400">Compléments de Formation</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-amber-300">Ressources associées</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link href="/ressources/outils" className="text-amber-400 hover:text-amber-300 transition-colors">
                    → Guide des outils horlogers
                  </Link>
                </li>
                <li>
                  <Link href="/ressources/tutoriels" className="text-amber-400 hover:text-amber-300 transition-colors">
                    → Tutoriels vidéo pratiques
                  </Link>
                </li>
                <li>
                  <Link href="/pratique" className="text-amber-400 hover:text-amber-300 transition-colors">
                    → Exercices pratiques
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-amber-300">Prochaines étapes</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Une fois les gestes de base maîtrisés, les apprentis progressent vers l'étude 
                des complications horlogères et l'apprentissage des techniques de réglage avancées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
