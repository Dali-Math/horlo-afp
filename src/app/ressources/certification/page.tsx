import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Certification() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
            Certification Horlogerie Suisse
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Guide complet des certifications professionnelles en horlogerie suisse : AFP, CFC et formations spécialisées
          </p>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-16">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64">
            <Image
              src="/images/logo-certification.jpg"
              alt="Logo Certification Horlogerie Suisse"
              fill
              className="object-cover rounded-full border-4 border-teal-400 shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {/* AFP Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8 border border-slate-700/50">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-400">AFP - Attestation Fédérale de Formation Professionnelle</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">Praticien en horlogerie AFP</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Formation de base de 2 ans qui permet d'acquérir les compétences fondamentales en horlogerie. 
                  Cette attestation constitue le premier niveau de qualification professionnelle reconnu en Suisse.
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2">
                  <li>Durée : 2 ans (formation duale)</li>
                  <li>Alternance école-entreprise</li>
                  <li>Bases du démontage et remontage</li>
                  <li>Manipulation des outils de base</li>
                  <li>Contrôle qualité élémentaire</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CFC Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8 border border-slate-700/50">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-400">CFC - Certificat Fédéral de Capacité</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">Horloger de production CFC</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Formation complète de 3 ans couvrant tous les aspects de la production horlogère. 
                  Le CFC est la qualification de référence en horlogerie suisse.
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
                  <li>Durée : 3 ans (formation duale)</li>
                  <li>Maîtrise complète des techniques de production</li>
                  <li>Réglage et contrôle des montres</li>
                  <li>Maintenance des machines de production</li>
                  <li>Contrôle qualité avancé</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">Horloger praticien CFC</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Spécialisation en réparation et entretien de montres mécaniques et électroniques.
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2">
                  <li>Diagnostic et réparation</li>
                  <li>Restauration de montres anciennes</li>
                  <li>Service après-vente</li>
                  <li>Relation clientèle</li>
                </ul>
              </div>
            </div>
          </div>

          {/* WOSTEP Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8 border border-slate-700/50">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-400">WOSTEP - Formations Spécialisées</h2>
            
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                WOSTEP (Watchmakers of Switzerland Training and Educational Program) propose des formations 
                hautement spécialisées pour les horlogers expérimentés.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-cyan-400">Formation Technique</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Complications horlogères</li>
                    <li>Chronographes de haute précision</li>
                    <li>Tourbillons et échappements</li>
                    <li>Répétitions minutes</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-cyan-400">Formation Commerciale</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Gestion d'atelier</li>
                    <li>Formation de formateurs</li>
                    <li>Expertise horlogère</li>
                    <li>Certification de montres</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Débouchés Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-12 border border-slate-700/50">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-400">Débouchés Professionnels</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏭</span>
                </div>
                <h3 className="font-semibold mb-2 text-cyan-400">Industrie</h3>
                <p className="text-sm text-slate-300">Manufacture, production, assemblage</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="font-semibold mb-2 text-cyan-400">Réparation</h3>
                <p className="text-sm text-slate-300">Atelier, service après-vente</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="font-semibold mb-2 text-cyan-400">Formation</h3>
                <p className="text-sm text-slate-300">Enseignement, expertise</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/pratique">
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à la Pratique
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
