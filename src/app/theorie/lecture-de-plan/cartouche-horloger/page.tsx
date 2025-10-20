'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Book, FileText, User, AlertCircle, Award, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CartoucheField {
  id: string;
  name: string;
  category: string;
  obligation: string;
  description: string;
  example: string;
  characters: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const cartoucheFieldsData: CartoucheField[] = [
  {
    id: 'entreprise',
    name: 'Nom de l\'entreprise',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Raison sociale de l\'entreprise ou logo.',
    example: 'Manufacture Horlogère SA',
    characters: '30 caractères',
    x: 10,
    y: 10,
    width: 100,
    height: 40
  },
  {
    id: 'titre',
    name: 'Titre',
    category: 'Descriptif',
    obligation: 'Obligatoire',
    description: 'Désignation de la pièce ou de l\'ensemble. Doit être clair et normalisé.',
    example: 'Platine calibre 2824 / Pont de balancier',
    characters: '25-30 caractères',
    x: 120,
    y: 10,
    width: 180,
    height: 25
  },
  {
    id: 'numero-piece',
    name: 'Numéro de pièce',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Référence unique de la pièce dans le système de gestion.',
    example: 'P-2824-001-A / MB-453-12',
    characters: '15-20 caractères',
    x: 310,
    y: 10,
    width: 90,
    height: 25
  },
  {
    id: 'materiau',
    name: 'Matériau',
    category: 'Technique',
    obligation: 'Obligatoire',
    description: 'Matière première utilisée selon nomenclature normalisée.',
    example: 'Maillechort / Laiton CuZn40 / Acier inox 316L',
    characters: '20 caractères',
    x: 120,
    y: 40,
    width: 90,
    height: 20
  },
  {
    id: 'traitement',
    name: 'Traitement de surface',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Traitements thermiques, revêtements, finitions spéciales.',
    example: 'Rhodiage / Anglage / Perlage / PVD',
    characters: '30 caractères',
    x: 215,
    y: 40,
    width: 85,
    height: 20
  },
  {
    id: 'masse',
    name: 'Masse',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Poids théorique de la pièce (important en horlogerie).',
    example: '0.45 g / 2.3 g',
    characters: '10 caractères',
    x: 310,
    y: 40,
    width: 45,
    height: 20
  },
  {
    id: 'echelle',
    name: 'Échelle',
    category: 'Représentation',
    obligation: 'Obligatoire',
    description: 'Rapport entre les dimensions du dessin et les dimensions réelles.',
    example: '1:1 / 2:1 / 5:1 / 10:1',
    characters: '10 caractères',
    x: 360,
    y: 40,
    width: 40,
    height: 20
  },
  {
    id: 'tolerance-generale',
    name: 'Tolérance générale',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Tolérances applicables aux cotes non tolérancées individuellement.',
    example: 'ISO 2768-m / ±0.1 mm',
    characters: '20 caractères',
    x: 120,
    y: 65,
    width: 90,
    height: 20
  },
  {
    id: 'projection',
    name: 'Méthode de projection',
    category: 'Représentation',
    obligation: 'Obligatoire',
    description: 'Symbole indiquant la méthode européenne (E) ou américaine (A).',
    example: 'Symbole E (1er dièdre) en Suisse',
    characters: 'Symbole',
    x: 215,
    y: 65,
    width: 40,
    height: 20
  },
  {
    id: 'format',
    name: 'Format',
    category: 'Document',
    obligation: 'Obligatoire',
    description: 'Format du plan selon ISO 5457 (A0, A1, A2, A3, A4).',
    example: 'A4 / A3',
    characters: '4 caractères',
    x: 260,
    y: 65,
    width: 40,
    height: 20
  },
  {
    id: 'indice-revision',
    name: 'Indice de révision',
    category: 'Document',
    obligation: 'Obligatoire',
    description: 'Lettre ou numéro indiquant la version du document.',
    example: 'A / B / Rev.01',
    characters: '4 caractères',
    x: 310,
    y: 65,
    width: 40,
    height: 20
  },
  {
    id: 'dessinateur',
    name: 'Dessinateur',
    category: 'Validation',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant réalisé le dessin.',
    example: 'J. Dupont / JD',
    characters: '20 caractères',
    x: 360,
    y: 65,
    width: 40,
    height: 20
  },
  {
    id: 'verificateur',
    name: 'Vérificateur',
    category: 'Validation',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant vérifié le dessin.',
    example: 'M. Martin / MM',
    characters: '20 caractères',
    x: 120,
    y: 90,
    width: 90,
    height: 20
  },
  {
    id: 'date',
    name: 'Date',
    category: 'Document',
    obligation: 'Obligatoire',
    description: 'Date de création ou de dernière modification.',
    example: '2025-01-15',
    characters: '10 caractères',
    x: 215,
    y: 90,
    width: 85,
    height: 20
  }
];

export default function CartoucheHorlogerPage() {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuizSubmit = () => {
    const correct = quizAnswer.toLowerCase().includes('7200') || quizAnswer.toLowerCase().includes('iso 7200');
    setIsCorrect(correct);
    setQuizSubmitted(true);
  };

  const selectedFieldData = cartoucheFieldsData.find(field => field.id === selectedField);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
      {/* Animated background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translateY(${scrollY * 0.1}px)`,
        }}></div>
      </div>

      {/* Header avec animation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/theorie/lecture-de-plan" 
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 hover:gap-3 group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Retour à Lecture de Plan</span>
            </Link>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold shadow-lg animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>Version améliorée</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Hero section avec animation */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            <span>ISO 7200 & ISO 5457</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Cartouche Horloger
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Identification et traçabilité des plans techniques horlogers selon les normes ISO
          </p>
        </div>

        {/* Interactive Cartouche avec amélioration visuelle */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-1 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Schéma Interactif du Cartouche
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Cliquez sur un champ dans le schéma pour découvrir ses détails
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* SVG Cartouche interactif */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-3xl transition-shadow duration-300">
              <svg viewBox="0 0 420 120" className="w-full h-auto">
                <defs>
                  <linearGradient id="obligatoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
                  </linearGradient>
                  <linearGradient id="conditionalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>

                {/* Contour principal */}
                <rect 
                  x="5" 
                  y="5" 
                  width="410" 
                  height="110" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="text-slate-300 dark:text-slate-600"
                />

                {/* Champs interactifs */}
                {cartoucheFieldsData.map((field) => (
                  <g key={field.id}>
                    <rect
                      x={field.x}
                      y={field.y}
                      width={field.width}
                      height={field.height}
                      fill={selectedField === field.id 
                        ? 'url(#obligatoryGradient)' 
                        : field.obligation === 'Obligatoire'
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(245, 158, 11, 0.1)'
                      }
                      stroke={field.obligation === 'Obligatoire' ? '#3b82f6' : '#f59e0b'}
                      strokeWidth={selectedField === field.id ? '3' : '1'}
                      className="cursor-pointer transition-all duration-300 hover:opacity-80"
                      onClick={() => setSelectedField(field.id)}
                      filter={selectedField === field.id ? 'url(#shadow)' : undefined}
                    />
                    <text
                      x={field.x + field.width / 2}
                      y={field.y + field.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[8px] font-semibold pointer-events-none select-none fill-slate-700 dark:fill-slate-300"
                    >
                      {field.name.length > 15 ? field.name.substring(0, 15) + '...' : field.name}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Légende améliorée */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-indigo-500"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Obligatoire</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-500 to-red-500"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Conditionnel</span>
                </div>
              </div>
            </div>

            {/* Détails du champ sélectionné avec animation */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
              {selectedFieldData ? (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedFieldData.obligation === 'Obligatoire'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      }`}>
                        {selectedFieldData.obligation}
                      </div>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {selectedFieldData.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {selectedFieldData.name}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Description</p>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {selectedFieldData.description}
                      </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                      <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">Exemple</p>
                      <p className="text-slate-700 dark:text-slate-300 font-mono text-sm">
                        {selectedFieldData.example}
                      </p>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
                      <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Longueur maximale</p>
                      <p className="text-slate-700 dark:text-slate-300">
                        {selectedFieldData.characters}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center">
                    <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-lg">
                    Sélectionne un champ dans le schéma pour voir ses détails
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Liste des champs avec cards améliorées */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-1 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Liste des Champs de Données
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartoucheFieldsData.map((field, index) => (
              <div
                key={field.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                onClick={() => setSelectedField(field.id)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {field.name}
                  </h3>
                  <div className={`p-2 rounded-lg ${
                    field.obligation === 'Obligatoire'
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : 'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                    {field.obligation === 'Obligatoire' ? (
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                  {field.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {field.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    field.obligation === 'Obligatoire'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  }`}>
                    {field.obligation.charAt(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mémo Technique avec design amélioré */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-1 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Mémo Technique
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Erreurs fréquentes */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl p-8 border-2 border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Erreurs fréquentes</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-200 dark:bg-red-900/50 rounded-full flex items-center justify-center text-red-700 dark:text-red-400 text-sm font-bold group-hover:scale-110 transition-transform">✕</span>
                  <span className="text-slate-700 dark:text-slate-300">Oublier de renseigner les champs obligatoires (titre, auteur, date).</span>
                </li>
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-200 dark:bg-red-900/50 rounded-full flex items-center justify-center text-red-700 dark:text-red-400 text-sm font-bold group-hover:scale-110 transition-transform">✕</span>
                  <span className="text-slate-700 dark:text-slate-300">Ne pas mettre à jour l'indice de révision après modification.</span>
                </li>
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-200 dark:bg-red-900/50 rounded-full flex items-center justify-center text-red-700 dark:text-red-400 text-sm font-bold group-hover:scale-110 transition-transform">✕</span>
                  <span className="text-slate-700 dark:text-slate-300">Utiliser des abréviations non normalisées pour le matériau.</span>
                </li>
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-200 dark:bg-red-900/50 rounded-full flex items-center justify-center text-red-700 dark:text-red-400 text-sm font-bold group-hover:scale-110 transition-transform">✕</span>
                  <span className="text-slate-700 dark:text-slate-300">Placer le cartouche ailleurs qu'en bas à droite.</span>
                </li>
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-200 dark:bg-red-900/50 rounded-full flex items-center justify-center text-red-700 dark:text-red-400 text-sm font-bold group-hover:scale-110 transition-transform">✕</span>
                  <span className="text-slate-700 dark:text-slate-300">Omettre la méthode de projection (symbole E/A).</span>
                </li>
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-200 dark:bg-red-900/50 rounded-full flex items-center justify-center text-red-700 dark:text-red-400 text-sm font-bold group-hover:scale-110 transition-transform">✕</span>
                  <span className="text-slate-700 dark:text-slate-300">Ne pas spécifier les tolérances générales applicables.</span>
                </li>
              </ul>
            </div>

            {/* Bonnes pratiques */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-xl p-8 border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Bonnes pratiques</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-200 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 text-sm font-bold group-hover:scale-110 transition-transform">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">Remplir systématiquement tous les champs obligatoires (O) selon ISO 7200.</span>
                </li>
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-200 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 text-sm font-bold group-hover:scale-110 transition-transform">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">Utiliser des désignations normalisées pour les matériaux horlogers.</span>
                </li>
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-200 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 text-sm font-bold group-hover:scale-110 transition-transform">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">Indiquer clairement les tolérances générales (ISO 2768-m ou f).</span>
                </li>
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-200 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 text-sm font-bold group-hover:scale-110 transition-transform">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">Maintenir un tableau de révision au-dessus du cartouche.</span>
                </li>
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-200 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 text-sm font-bold group-hover:scale-110 transition-transform">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">Préciser les traitements de surface spécifiques (rhodiage, anglage, etc.).</span>
                </li>
                <li className="flex gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-200 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 text-sm font-bold group-hover:scale-110 transition-transform">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">Respecter les marges ISO 5457 pour archivage et pliage.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz interactif amélioré */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-2xl p-8 border-2 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Book className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Quiz : Teste tes connaissances</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <p className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Quelle norme ISO régit les champs de données dans les cartouches d'inscription ?
                </p>
                <input
                  type="text"
                  value={quizAnswer}
                  onChange={(e) => setQuizAnswer(e.target.value)}
                  placeholder="Tape ta réponse ici..."
                  className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                  disabled={quizSubmitted}
                />
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Vérifier ma réponse
                </button>
              ) : (
                <div className={`p-6 rounded-xl border-2 ${
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                }`}>
                  <div className="flex items-start gap-4">
                    {isCorrect ? (
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0 animate-bounce" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 animate-shake" />
                    )}
                    <div>
                      <p className={`font-bold text-lg mb-2 ${
                        isCorrect ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'
                      }`}>
                        {isCorrect ? '🎉 Bravo ! C\'est correct !' : '❌ Pas tout à fait...'}
                      </p>
                      <p className="text-slate-700 dark:text-slate-300">
                        {isCorrect
                          ? 'La norme ISO 7200 spécifie les champs de données dans les cartouches d\'inscription.'
                          : 'La bonne réponse est ISO 7200. Cette norme spécifie les champs de données à utiliser dans les cartouches d\'inscription.'
                        }
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswer('');
                      setIsCorrect(false);
                    }}
                    className="mt-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold underline transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contexte & Origines avec cards améliorées */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-1 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Contexte & Origines des Normes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-l-4 border-blue-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">ISO 7200:2004</h3>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3">Champs de données dans les cartouches</p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Cette norme spécifie les champs de données à utiliser dans les cartouches d'inscription et les têtes de documents techniques. Elle définit les noms de champ, leur contenu et leur longueur pour faciliter les échanges de documents et assurer leur cohérence internationale.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-l-4 border-indigo-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">ISO 5457:1999</h3>
              </div>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-3">Formats et présentation des dessins</p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Cette norme définit les formats de papier, les marges, les zones d'inscription et les cadres utilisés pour les plans techniques. Elle garantit la compatibilité, la reproductibilité et le pliage standardisé des documents.
              </p>
            </div>
          </div>
        </section>

        {/* Tableaux avec design moderne */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-1 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Formats Normalisés ISO 5457
          </h2>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Format</th>
                    <th className="px-6 py-4 text-left font-bold">Dimensions (mm)</th>
                    <th className="px-6 py-4 text-left font-bold">Marge minimale</th>
                    <th className="px-6 py-4 text-left font-bold">Usage horlogerie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">A4</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">210 × 297</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">10 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Pièces de mouvement, composants unitaires</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">A3</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">297 × 420</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">10 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ensembles de mouvement, platines complètes</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">A2</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">420 × 594</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">10 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Éclatés complexes, assemblages complets</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">A1</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">594 × 841</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">20 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Plans d'atelier, nomenclatures étendues</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">A0</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">841 × 1189</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">20 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Rarement utilisé en horlogerie</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Matériaux horlogers */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-1 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Matériaux Horlogers Courants
          </h2>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Désignation normalisée</th>
                    <th className="px-6 py-4 text-left font-bold">Nom courant</th>
                    <th className="px-6 py-4 text-left font-bold">Composition</th>
                    <th className="px-6 py-4 text-left font-bold">Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900 dark:text-slate-100">CuNi18Zn20</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Maillechort</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Cu-Ni 18% - Zn 20%</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Platines, ponts, leviers</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900 dark:text-slate-100">CuZn40</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Laiton</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Cu-Zn 40%</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Roues, pignons, platines</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900 dark:text-slate-100">X5CrNi18-10 (316L)</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Acier inoxydable</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Acier austénitique</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Axes, visserie, boîtiers</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900 dark:text-slate-100">Glucydur</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Glucydur</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Alliage Cu-Be</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Balanciers (antimagnétique)</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900 dark:text-slate-100">Nivaflex</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Nivaflex</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Alliage Ni-Cr-Co-Ti-Be</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Spiraux (antimagnétique)</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900 dark:text-slate-100">Rubis synthétique</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Rubis</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Corindon Al₂O₃</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Paliers, contre-pivots</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Traitements de surface */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-1 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Traitements de Surface Horlogers
          </h2>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Traitement</th>
                    <th className="px-6 py-4 text-left font-bold">Description</th>
                    <th className="px-6 py-4 text-left font-bold">Objectif</th>
                    <th className="px-6 py-4 text-left font-bold">Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Rhodiage</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Dépôt électrolytique de rhodium</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Protection, aspect blanc brillant</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Platines, ponts de luxe</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Anglage</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Polissage des arêtes à 45°</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Esthétique haute horlogerie</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ponts, leviers, bascules</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Perlage</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Motif circulaire décoratif</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Esthétique, finition noble</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Platines, ponts</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Côtes de Genève</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Rayures parallèles ondulées</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Finition traditionnelle genevoise</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ponts, masses oscillantes</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">PVD</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Dépôt physique en phase vapeur</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Dureté, résistance, couleur</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Boîtiers, composants sportifs</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Satinage</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Finition mate directionnelle</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Esthétique, anti-reflets</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Boîtiers, bracelets</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Citation avec effet de parallaxe */}
        <section className="mb-20">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                transform: `translateY(${scrollY * 0.05}px)`,
              }}></div>
            </div>
            <div className="relative z-10">
              <blockquote className="text-3xl md:text-4xl font-serif italic mb-6 leading-relaxed">
                "Le cartouche est la carte d'identité du plan technique : précision et traçabilité garanties."
              </blockquote>
              <p className="text-blue-100 font-semibold text-lg">— Principe fondamental ISO 7200</p>
            </div>
          </div>
        </section>

        {/* FAQ avec animations */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-1 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Questions fréquentes (FAQ)
          </h2>
          
          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
              <summary className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                <span className="flex items-center gap-3">
                  <span className="text-blue-600 dark:text-blue-400">❓</span>
                  Quelle est la différence entre un champ obligatoire (O) et conditionnel (C) ?
                </span>
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <div className="px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Un champ <strong className="text-blue-600 dark:text-blue-400">obligatoire (O)</strong> doit toujours être renseigné selon ISO 7200 (titre, auteur, date, format, etc.). Un champ <strong className="text-orange-600 dark:text-orange-400">conditionnel (C)</strong> n'est obligatoire que si l'information est pertinente pour le document (masse, traitement de surface, tolérance générale). En horlogerie, la masse et les traitements sont souvent considérés comme obligatoires de facto.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
              <summary className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                <span className="flex items-center gap-3">
                  <span className="text-blue-600 dark:text-blue-400">❓</span>
                  Comment gérer les révisions d'un plan technique ?
                </span>
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <div className="px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Chaque modification doit être documentée dans un <strong className="text-blue-600 dark:text-blue-400">tableau de révision</strong> au-dessus du cartouche : <strong>Indice</strong> (A, B, C...), <strong>Date</strong>, <strong>Auteur</strong>, <strong>Nature de la modification</strong> (description concise), <strong>Visa</strong> (vérificateur). L'indice dans le cartouche principal doit être mis à jour. En production, seule la dernière révision est valide.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
              <summary className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                <span className="flex items-center gap-3">
                  <span className="text-blue-600 dark:text-blue-400">❓</span>
                  Pourquoi l'échelle est-elle souvent supérieure à 1:1 en horlogerie ?
                </span>
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <div className="px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Les composants horlogers sont miniatures (pivots de 0.08 mm, rubis de 0.2 mm). Une échelle <strong className="text-blue-600 dark:text-blue-400">2:1, 5:1 ou même 10:1</strong> agrandit le dessin pour permettre une cotation lisible et précise. Le dessinateur peut ainsi spécifier des tolérances de l'ordre du micromètre. L'échelle réelle doit toujours être clairement indiquée dans le cartouche.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
              <summary className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                <span className="flex items-center gap-3">
                  <span className="text-blue-600 dark:text-blue-400">❓</span>
                  Quelles tolérances générales indiquer dans le cartouche horloger ?
                </span>
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <div className="px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  En horlogerie, on utilise généralement <strong className="text-blue-600 dark:text-blue-400">ISO 2768-m</strong> (moyenne) ou <strong className="text-blue-600 dark:text-blue-400">ISO 2768-f</strong> (fine) pour les pièces de précision. Ces normes définissent les tolérances linéaires et angulaires pour les cotes non tolérancées individuellement. Pour les mouvements haut de gamme, ISO 2768-f est préférable. Les cotes critiques doivent toujours avoir des tolérances spécifiques.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
              <summary className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                <span className="flex items-center gap-3">
                  <span className="text-blue-600 dark:text-blue-400">❓</span>
                  Peut-on personnaliser le cartouche selon l'entreprise ?
                </span>
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <div className="px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Oui, les entreprises peuvent créer des <strong className="text-blue-600 dark:text-blue-400">cartouches personnalisés</strong> tant que les <strong>champs obligatoires ISO 7200</strong> sont présents et que le cartouche reste en <strong>bas à droite</strong>. La plupart des manufactures horlogères suisses ont un modèle standardisé incluant leur logo, des champs spécifiques (n° de calibre, série, client) et des zones pour validation qualité. Le respect des normes ISO garantit néanmoins l'interchangeabilité des documents.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* CTA Final avec animation */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white inline-block shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 animate-pulse" />
              <p className="text-2xl font-bold">Tu veux aller plus loin ?</p>
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.iso.org/standard/35446.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📄 Consulter ISO 7200
              </a>
              <a 
                href="https://www.iso.org/standard/5281.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📐 Consulter ISO 5457
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer élégant */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 mt-20 border-t border-slate-800 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-lg">© 2025 HorloLearn - Passion & Découverte Horlogère Suisse</p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-slate-500">
            <span>🇨🇭 Made in Switzerland</span>
            <span>•</span>
            <span>⚙️ Precision Engineering</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
