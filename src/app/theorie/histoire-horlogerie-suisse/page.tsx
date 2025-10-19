'use client';

// 🔥 FORCER LE MODE DYNAMIQUE (désactive le cache)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, MapPin, Factory, Award, Users, BookOpen, Sparkles, Mountain, Globe, TrendingUp, ChevronLeft } from 'lucide-react';

export default function HistoireHorlogerieSuisse() {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header Sticky avec Bouton Retour */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link 
                href="/theorie" 
                className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Retour</span>
              </Link>
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">HorloLearn</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#histoire" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Histoire
              </a>
              <a href="#regions" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Régions
              </a>
              <a href="#manufactures" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Manufactures
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section avec Montagnes Suisses en Arrière-Plan */}
      <section className="relative py-20 overflow-hidden">
        {/* SVG Alpes Suisses en Arrière-Plan */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute bottom-0 w-full h-48 opacity-10 dark:opacity-5"
            viewBox="0 0 1200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Montagne 1 (gauche) */}
            <path
              d="M0 200 L150 80 L300 200 Z"
              className="fill-slate-400 dark:fill-slate-600"
            />
            {/* Montagne 2 (centre-gauche) */}
            <path
              d="M200 200 L400 40 L600 200 Z"
              className="fill-slate-500 dark:fill-slate-700"
            />
            {/* Montagne 3 (centre) - La plus haute */}
            <path
              d="M450 200 L650 20 L850 200 Z"
              className="fill-slate-600 dark:fill-slate-800"
            />
            {/* Montagne 4 (centre-droite) */}
            <path
              d="M700 200 L900 60 L1100 200 Z"
              className="fill-slate-500 dark:fill-slate-700"
            />
            {/* Montagne 5 (droite) */}
            <path
              d="M950 200 L1100 90 L1200 200 Z"
              className="fill-slate-400 dark:fill-slate-600"
            />
            {/* Pics de neige (sommets blancs) */}
            <path
              d="M650 20 L620 50 L680 50 Z"
              className="fill-white dark:fill-slate-300 opacity-80"
            />
            <path
              d="M400 40 L380 65 L420 65 Z"
              className="fill-white dark:fill-slate-300 opacity-70"
            />
            <path
              d="M900 60 L880 80 L920 80 Z"
              className="fill-white dark:fill-slate-300 opacity-70"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Histoire & Tradition
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              L'Histoire de l'Horlogerie Suisse
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Du XVIe siècle à nos jours, découvrez comment la Suisse est devenue la référence mondiale de l'horlogerie de luxe et de précision
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white dark:bg-slate-800 rounded-xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Ans d'histoire</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">21,7</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Milliards CHF (2019)</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">N°1</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Mondial du luxe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Interactive */}
      <section id="histoire" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">Chronologie Historique</h2>
          <p className="text-center text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Les grandes étapes qui ont façonné l'excellence horlogère suisse
          </p>

          <div className="grid gap-6">
            {/* 1541 - Les Origines */}
            <div
              onClick={() => setSelectedPeriod(selectedPeriod === '1541' ? null : '1541')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedPeriod === '1541'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                    1541
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      Les Origines : Jean Calvin et la Naissance à Genève
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Le réformateur Jean Calvin bannit le port d'objets ornementaux à Genève, forçant les orfèvres et joailliers à se reconvertir dans l'horlogerie. C'est la naissance de l'industrie horlogère suisse.
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
                </div>
                {selectedPeriod === '1541' && (
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg border-l-4 border-blue-600 dark:border-blue-400">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Contexte Historique
                    </h4>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Le règlement des orfèvres de 1566 interdit la fabrication de croix, calices et objets catholiques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Les artisans se tournent vers "la boîte de montre" : véritables bijoux incrustés de pierres précieuses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Naissance de l'horlogerie de luxe genevoise, échappant aux règles calvinistes</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* 1685 - Réfugiés Huguenots */}
            <div
              onClick={() => setSelectedPeriod(selectedPeriod === '1685' ? null : '1685')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedPeriod === '1685'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                    1685
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      Les Réfugiés Huguenots : Expansion dans l'Arc Jurassien
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      La révocation de l'Édit de Nantes provoque l'arrivée massive de réfugiés huguenots français, apportant capitaux, savoir-faire et réseaux commerciaux. L'horlogerie se développe de Genève à Schaffhouse.
                    </p>
                  </div>
                  <Mountain className="w-8 h-8 text-indigo-600 dark:text-indigo-400 shrink-0" />
                </div>
                {selectedPeriod === '1685' && (
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-lg border-l-4 border-indigo-600 dark:border-indigo-400">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Facteurs de Succès</h4>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                        <span>Main-d'œuvre disponible dans l'arc jurassien (agriculture saisonnière)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                        <span>Proximité avec les centres urbains marchands (Genève, Neuchâtel)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                        <span>Absence de corporations permettant un développement libre</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                        <span>Vertus protestantes : patience, minutie, droiture et persévérance</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* 1740 - Vallée de Joux */}
            <div
              onClick={() => setSelectedPeriod(selectedPeriod === '1740' ? null : '1740')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedPeriod === '1740'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                    1740
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      Vallée de Joux : Berceau de la Haute Horlogerie
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Les agriculteurs combiers fabriquent des pièces horlogères pendant les longs hivers. Naissance des "fermes horlogères" avec fenêtres supplémentaires pour maximiser la lumière naturelle.
                    </p>
                  </div>
                  <Factory className="w-8 h-8 text-green-600 dark:text-green-400 shrink-0" />
                </div>
                {selectedPeriod === '1740' && (
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg border-l-4 border-green-600 dark:border-green-400">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">L'Industrie Rurale</h4>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                        <span>Tradition née de l'industrie du fer, permettant la fabrication de pièces mécaniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                        <span>Paysans formés par des horlogers de la région lémanique</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                        <span>Agriculture en été, horlogerie en hiver : modèle économique unique</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                        <span>26 fermes horlogères historiques encore visibles aujourd'hui</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* XIXe siècle - Âge d'Or */}
            <div
              onClick={() => setSelectedPeriod(selectedPeriod === '1800' ? null : '1800')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedPeriod === '1800'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                    XIXe
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      L'Âge d'Or : Innovations et Production en Série
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Nouvelles techniques de fabrication, production en série, exportations massives vers les États-Unis. Apparition des montres bracelet. Invention du tourbillon par Abraham-Louis Breguet (1801).
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />
                </div>
                {selectedPeriod === '1800' && (
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 p-6 rounded-lg border-l-4 border-amber-600 dark:border-amber-400">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Innovations Majeures</h4>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                        <span>Tourbillon (1801) : compense les effets de la gravité</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                        <span>Chronographe : mesure de temps courts avec précision</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                        <span>Quantième perpétuel : gestion automatique des années bissextiles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                        <span>Répétition minutes : sonnerie acoustique des heures sur demande</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* 1929 - Grande Dépression */}
            <div
              onClick={() => setSelectedPeriod(selectedPeriod === '1929' ? null : '1929')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedPeriod === '1929'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                    1929
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      Grande Dépression : Naissance des Grands Groupes
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      La crise économique force les petites maisons à se regrouper. Création de la SSIH (Omega + Tissot, 1930) et de l'ASUAG (Longines, Mido, Hamilton, 1931).
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400 shrink-0" />
                </div>
                {selectedPeriod === '1929' && (
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 p-6 rounded-lg border-l-4 border-red-600 dark:border-red-400">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Consolidation Industrielle</h4>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                        <span>SSIH (1930) : Omega, Tissot, puis Lemania (calibres chronographes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                        <span>ASUAG (1931) : 15 marques + fabricants d'ébauches (ancêtre ETA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                        <span>Stratégie de survie : mutualisation des ressources et expertises</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* 1970-1983 - Crise du Quartz */}
            <div
              onClick={() => setSelectedPeriod(selectedPeriod === '1970' ? null : '1970')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedPeriod === '1970'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                    1970-83
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      Crise du Quartz : La Swatch Sauve l'Industrie
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Les montres à quartz japonaises font chuter les parts de marché suisses de 50% à 15%. Fusion SSIH + ASUAG = Swatch Group (1983). La montre Swatch relance l'industrie.
                    </p>
                  </div>
                  <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400 shrink-0" />
                </div>
                {selectedPeriod === '1970' && (
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg border-l-4 border-purple-600 dark:border-purple-400">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Renaissance Horlogère</h4>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                        <span>Nicolas Hayek : visionnaire de la fusion SSIH + ASUAG → SMH (Swatch Group)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                        <span>Swatch ("second watch") : montre plastique à quartz, abordable et tendance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                        <span>Ironie : une montre d'entrée de gamme sauve la haute horlogerie suisse</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                        <span>Retour à la compétitivité mondiale et préservation du savoir-faire traditionnel</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Régions Horlogères */}
      <section id="regions" className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">Les Régions Horlogères</h2>
          <p className="text-center text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Chaque région de Suisse romande a développé son propre savoir-faire et ses spécialités
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Genève */}
            <div
              onClick={() => setSelectedRegion(selectedRegion === 'geneve' ? null : 'geneve')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedRegion === 'geneve'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Genève</h3>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Berceau de l'horlogerie</span>
                  </div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                  1541
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Capitale mondiale de l'horlogerie de luxe, siège de Patek Philippe, Rolex, Vacheron Constantin. 10'300 employés (2019).
              </p>
              {selectedRegion === 'geneve' && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Manufactures emblématiques</h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                      Patek Philippe (1839)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                      Rolex (1905)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                      Vacheron Constantin (1755)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Vallée de Joux */}
            <div
              onClick={() => setSelectedRegion(selectedRegion === 'joux' ? null : 'joux')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedRegion === 'joux'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Vallée de Joux</h3>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Haute horlogerie</span>
                  </div>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                  1740
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Berceau des grandes complications horlogères. Villages du Sentier, Le Brassus, Le Chenit. 26 fermes horlogères historiques.
              </p>
              {selectedRegion === 'joux' && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Manufactures prestigieuses</h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full"></span>
                      Audemars Piguet (1875)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full"></span>
                      Jaeger-LeCoultre (1833)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full"></span>
                      Blancpain (1735)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Neuchâtel */}
            <div
              onClick={() => setSelectedRegion(selectedRegion === 'neuchatel' ? null : 'neuchatel')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedRegion === 'neuchatel'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Neuchâtel</h3>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Innovation technique</span>
                  </div>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
                  XVIIe
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Tradition horlogère dans les montagnes, notamment au village de La Sagne. Centre d'innovation et de recherche horlogère.
              </p>
              {selectedRegion === 'neuchatel' && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Spécialités</h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                      Centre d'ébauches et composants
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                      Recherche horlogère avancée
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Bienne/Biel */}
            <div
              onClick={() => setSelectedRegion(selectedRegion === 'bienne' ? null : 'bienne')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedRegion === 'bienne'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Bienne/Biel</h3>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Production industrielle</span>
                  </div>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
                  XXe
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Siège d'Omega, Swatch Group. Centre industriel majeur de l'horlogerie moderne et innovante.
              </p>
              {selectedRegion === 'bienne' && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Marques importantes</h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 dark:bg-amber-400 rounded-full"></span>
                      Omega (1848)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 dark:bg-amber-400 rounded-full"></span>
                      Swatch (1983)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* La Chaux-de-Fonds */}
            <div
              onClick={() => setSelectedRegion(selectedRegion === 'chaux' ? null : 'chaux')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedRegion === 'chaux'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">La Chaux-de-Fonds</h3>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Patrimoine UNESCO</span>
                  </div>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
                  XVIIIe
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Ville horlogère inscrite au patrimoine mondial UNESCO. Architecture urbaine dédiée à l'horlogerie.
              </p>
              {selectedRegion === 'chaux' && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Caractéristiques</h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
                      Musée international d'horlogerie
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
                      Urbanisme horloger unique
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Schaffhouse */}
            <div
              onClick={() => setSelectedRegion(selectedRegion === 'schaffhouse' ? null : 'schaffhouse')}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                selectedRegion === 'schaffhouse'
                  ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Schaffhouse</h3>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Horlogerie allemande-suisse</span>
                  </div>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-xs font-semibold">
                  XIXe
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Extrémité orientale de l'arc horloger. Siège d'IWC Schaffhausen, manufacture prestigieuse fondée par un Américain.
              </p>
              {selectedRegion === 'schaffhouse' && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Manufacture principale</h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 dark:bg-red-400 rounded-full"></span>
                      IWC Schaffhausen (1868)
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grandes Manufactures */}
      <section id="manufactures" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">Les Grandes Manufactures</h2>
          <p className="text-center text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Les marques emblématiques qui ont façonné la réputation mondiale de l'horlogerie suisse
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Manufacture</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Fondation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Lieu</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Spécialité</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Réputation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-semibold">Patek Philippe</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">1839</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Genève</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Grandes complications</td>
                    <td className="px-6 py-4">
                      <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
                        Prestige absolu
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-semibold">Rolex</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">1905</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Genève</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Montres de sport, robustesse</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                        N°1 mondial
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-semibold">Omega</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">1848</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Bienne</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Speedmaster (Lune), précision</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                        Innovation
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-semibold">Audemars Piguet</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">1875</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Le Brassus</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Royal Oak, complications</td>
                    <td className="px-6 py-4">
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
                        Haute horlogerie
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-semibold">Jaeger-LeCoultre</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">1833</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Le Sentier</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Reverso, calibres manufacture</td>
                    <td className="px-6 py-4">
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
                        Maîtrise technique
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-semibold">Vacheron Constantin</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">1755</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Genève</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Plus ancienne manufacture</td>
                    <td className="px-6 py-4">
                      <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
                        Tradition
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-semibold">Blancpain</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">1735</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Le Brassus</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Fifty Fathoms, complications</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                        Excellence
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-semibold">Breguet</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">1775</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Vallée de Joux</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Tourbillon (inventeur)</td>
                    <td className="px-6 py-4">
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-xs font-semibold">
                        Inventeur
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Complications Horlogères */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">Les Grandes Complications</h2>
          <p className="text-center text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Les prouesses techniques qui distinguent l'horlogerie suisse
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Tourbillon */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">Tourbillon</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Inventé par Abraham-Louis Breguet (1801)</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                L'organe réglant et l'échappement tournent dans une cage mobile pour compenser les effets de la gravité. Symbole de maîtrise horlogère absolue.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs">Précision</span>
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs">Prestige</span>
              </div>
            </div>

            {/* Chronographe */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">Chronographe</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Complication la plus répandue</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Mesure des temps courts via poussoirs et aiguilles additionnelles. Mécanisme de chronométrage indépendant du mouvement principal.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">Fonctionnel</span>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs">Sport</span>
              </div>
            </div>

            {/* Quantième Perpétuel */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">Quantième Perpétuel</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Calendrier automatique complet</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Gère automatiquement les jours, mois, années et années bissextiles sans intervention humaine. Complication mécanique complexe.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs">Complexité</span>
                <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-xs">Rare</span>
              </div>
            </div>

            {/* Répétition Minutes */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">Répétition Minutes</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Sonnerie acoustique sur demande</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                La montre sonne les heures, quarts et minutes par activation d'un poussoir. Condensé de miniaturisation et d'acoustique mécanique.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-xs">Rare</span>
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs">Acoustique</span>
              </div>
            </div>
          </div>

          {/* Record de complexité */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Record Mondial de Complexité</h3>
            <p className="text-blue-100 dark:text-blue-200 mb-4 max-w-2xl mx-auto">
              La Vacheron Constantin référence 57260 détient le record avec 57 complications différentes pour un poids de près d'un kilogramme.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold text-white">57</div>
                <div className="text-sm text-blue-100 dark:text-blue-200">Complications</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold text-white">~1 kg</div>
                <div className="text-sm text-blue-100 dark:text-blue-200">Poids total</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">Questions Fréquentes</h2>
          <p className="text-center text-slate-700 dark:text-slate-300 mb-12">
            Tout ce que vous devez savoir sur l'histoire horlogère suisse
          </p>

          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between">
                <span>Pourquoi l'horlogerie suisse est-elle devenue si prestigieuse ?</span>
                <span className="text-blue-600 dark:text-blue-400">▼</span>
              </summary>
              <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4">
                <p className="text-slate-700 dark:text-slate-300">
                  L'excellence horlogère suisse résulte de plusieurs facteurs : l'arrivée de réfugiés huguenots qualifiés au XVIe siècle, l'interdiction calviniste des bijoux qui a poussé les orfèvres vers l'horlogerie, la disponibilité d'une main-d'œuvre rurale minutieuse dans l'arc jurassien, l'absence de corporations permettant l'innovation libre, et une tradition continue d'excellence technique sur plus de 500 ans.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between">
                <span>Quel est le rôle de Jean Calvin dans l'horlogerie suisse ?</span>
                <span className="text-blue-600 dark:text-blue-400">▼</span>
              </summary>
              <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4">
                <p className="text-slate-700 dark:text-slate-300">
                  En 1541, Jean Calvin a banni le port d'objets ornementaux à Genève dans un souci d'austérité religieuse. Cette décision a forcé les orfèvres et joailliers genevois, réputés en Europe, à se reconvertir dans l'horlogerie. Ils ont alors créé des boîtiers de montres incrustés de pierres précieuses, échappant ainsi à l'interdiction calviniste. C'est la naissance de l'horlogerie de luxe genevoise.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between">
                <span>Comment la Suisse a-t-elle survécu à la crise du quartz ?</span>
                <span className="text-blue-600 dark:text-blue-400">▼</span>
              </summary>
              <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4">
                <p className="text-slate-700 dark:text-slate-300">
                  Dans les années 1970-80, les montres à quartz japonaises ont fait chuter la part de marché suisse de 50% à 15%. Le salut est venu de Nicolas Hayek qui a fusionné les groupes SSIH et ASUAG en 1983 pour créer le Swatch Group. Ironiquement, c'est la Swatch, une montre plastique à quartz d'entrée de gamme, qui a sauvé l'industrie suisse en générant des profits permettant de préserver le savoir-faire traditionnel de la haute horlogerie.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between">
                <span>Qu'est-ce qu'une "ferme horlogère" dans la Vallée de Joux ?</span>
                <span className="text-blue-600 dark:text-blue-400">▼</span>
              </summary>
              <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4">
                <p className="text-slate-700 dark:text-slate-300">
                  À partir de 1740, les agriculteurs de la Vallée de Joux fabriquaient des pièces horlogères pendant les longs hivers. Ils ont construit des fenêtres supplémentaires dans les greniers de leurs fermes pour maximiser la lumière naturelle, permettant un travail précis plus longtemps dans la journée. Ces "fermes horlogères" caractéristiques sont un symbole architectural unique : 26 d'entre elles sont encore visibles aujourd'hui et témoignent de cette tradition rurale.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between">
                <span>Quelle est la différence entre Genève et la Vallée de Joux ?</span>
                <span className="text-blue-600 dark:text-blue-400">▼</span>
              </summary>
              <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4">
                <p className="text-slate-700 dark:text-slate-300">
                  Genève est le berceau historique de l'horlogerie suisse (1541) et reste la capitale de l'horlogerie de luxe avec Patek Philippe, Rolex et Vacheron Constantin. La Vallée de Joux s'est spécialisée dans les grandes complications horlogères et la haute horlogerie technique avec Audemars Piguet, Jaeger-LeCoultre et Blancpain. Genève représente le prestige urbain, la Vallée de Joux incarne la maîtrise technique rurale.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Erreurs Communes et Bonnes Pratiques */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Idées Reçues & Réalités</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Erreurs Communes */}
            <div className="bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800 p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span className="text-red-600 dark:text-red-400">✗</span>
                Idées Reçues
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 dark:text-red-400 text-xl">•</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Mythe :</strong> Les Suisses ont inventé l'horlogerie mécanique
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 dark:text-red-400 text-xl">•</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Mythe :</strong> Toutes les montres suisses sont ultra-chères
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 dark:text-red-400 text-xl">•</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Mythe :</strong> La révocation de l'Édit de Nantes a créé l'horlogerie suisse
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 dark:text-red-400 text-xl">•</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Mythe :</strong> Les montres à quartz ont détruit l'horlogerie suisse
                  </span>
                </li>
              </ul>
            </div>

            {/* Bonnes Pratiques */}
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800 p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                Réalités Historiques
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 text-xl">•</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Réalité :</strong> Les Suisses ont perfectionné et industrialisé l'horlogerie
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 text-xl">•</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Réalité :</strong> La Swatch a démocratisé l'horlogerie suisse moderne
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 text-xl">•</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Réalité :</strong> Les huguenots ont accéléré un développement déjà amorcé
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 text-xl">•</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Réalité :</strong> La crise du quartz a forcé l'innovation et le renouveau
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Final */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Award className="w-4 h-4" />
                Quiz de Certification
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Testez Vos Connaissances</h2>
              <p className="text-slate-700 dark:text-slate-300">
                10 questions sur l'histoire de l'horlogerie suisse
              </p>
            </div>

            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  1. En quelle année Jean Calvin a-t-il banni les objets ornementaux à Genève ?
                </h3>
                <div className="space-y-2">
                  {['1541', '1566', '1685', '1740'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        quizAnswers[1] === option
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="q1"
                        value={option}
                        checked={quizAnswers[1] === option}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, 1: e.target.value })}
                        className="text-blue-600 dark:text-blue-400"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  2. Qui a inventé le tourbillon horloger ?
                </h3>
                <div className="space-y-2">
                  {['Abraham-Louis Breguet', 'Daniel Jean-Richard', 'Jean Calvin', 'Nicolas Hayek'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        quizAnswers[2] === option
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="q2"
                        value={option}
                        checked={quizAnswers[2] === option}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, 2: e.target.value })}
                        className="text-blue-600 dark:text-blue-400"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  3. Quelle manufacture est la plus ancienne encore en activité ?
                </h3>
                <div className="space-y-2">
                  {['Blancpain (1735)', 'Vacheron Constantin (1755)', 'Breguet (1775)', 'Patek Philippe (1839)'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        quizAnswers[3] === option
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="q3"
                        value={option}
                        checked={quizAnswers[3] === option}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, 3: e.target.value })}
                        className="text-blue-600 dark:text-blue-400"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 4 */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  4. Quel groupe horloger a été créé par la fusion SSIH + ASUAG en 1983 ?
                </h3>
                <div className="space-y-2">
                  {['Swatch Group (SMH)', 'Richemont', 'LVMH', 'Rolex SA'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        quizAnswers[4] === option
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="q4"
                        value={option}
                        checked={quizAnswers[4] === option}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, 4: e.target.value })}
                        className="text-blue-600 dark:text-blue-400"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 5 */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  5. Dans quelle région se trouvent les "fermes horlogères" à fenêtres multiples ?
                </h3>
                <div className="space-y-2">
                  {['Vallée de Joux', 'Genève', 'Neuchâtel', 'Schaffhouse'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        quizAnswers[5] === option
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="q5"
                        value={option}
                        checked={quizAnswers[5] === option}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, 5: e.target.value })}
                        className="text-blue-600 dark:text-blue-400"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                Valider mes réponses
              </button>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
                Obtenez votre certification en histoire horlogère suisse !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-blue-400" />
                <span className="text-lg font-bold">HorloLearn</span>
              </div>
              <p className="text-slate-400 text-sm">
                Votre plateforme éducative pour découvrir l'excellence de l'horlogerie suisse
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Sections</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#histoire" className="hover:text-blue-400 transition-colors">
                    Histoire
                  </a>
                </li>
                <li>
                  <a href="#regions" className="hover:text-blue-400 transition-colors">
                    Régions
                  </a>
                </li>
                <li>
                  <a href="#manufactures" className="hover:text-blue-400 transition-colors">
                    Manufactures
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Mouvements
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Complications
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Techniques
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Exportations 2019</h3>
              <div className="bg-slate-800 dark:bg-slate-900 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400 mb-1">21,7 Mia CHF</div>
                <div className="text-xs text-slate-400">+2,4% vs 2018</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 dark:border-slate-700 text-center text-sm text-slate-400">
            <p>© 2025 HorloLearn. Plateforme éducative sur l'horlogerie suisse.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
