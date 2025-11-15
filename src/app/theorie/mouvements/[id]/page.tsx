'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, BookOpen, Award, Clock, Bookmark, ExternalLink, 
  ArrowLeft, ArrowRight, Image, AlertTriangle, Wrench, Calculator,
  PlayCircle, FileText, Link2
} from 'lucide-react';
import { modules } from '../data';
import type { Concept } from '../types';

// Type pour les onglets
type TabId = 'description' | 'specs' | 'applications' | 'resources';

// Navigation entre concepts
function getNavigation(id: string) {
  const allConcepts = modules.flatMap(m => m.concepts);
  const currentIndex = allConcepts.findIndex(c => c.id === id);
  return {
    prev: currentIndex > 0 ? allConcepts[currentIndex - 1] : null,
    next: currentIndex < allConcepts.length - 1 ? allConcepts[currentIndex + 1] : null,
  };
}

export default function ConceptDetailPage({ params }: { params: { id: string } }) {
  // ✅ CORRECTION : Trouver le concept dans les modules
  const allConcepts = modules.flatMap(m => m.concepts);
  const concept = allConcepts.find(c => c.id === params.id);
  
  // Gestion onglets
  const [activeTab, setActiveTab] = useState<TabId>('description');

  if (!concept) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-black text-slate-300 dark:text-slate-700 mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Concept non trouvé</h2>
          <Link href="/theorie/mouvements" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Retour à la référence
          </Link>
        </div>
      </main>
    );
  }

  const { prev, next } = getNavigation(params.id);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/theorie/mouvements" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à la référence
          </Link>
          <div className="text-xs text-slate-500">
            {params.id}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Infos principales */}
          <div className="md:col-span-2">
            <h1 className="text-6xl font-black mb-4">{concept.title}</h1>
            <p className="text-2xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {concept.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <span className={`px-4 py-2 rounded-full font-bold uppercase tracking-wide text-sm ${
                concept.level === 'Débutant' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                concept.level === 'Expert' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
              }`}>
                {concept.level}
              </span>
              {concept.iso && concept.iso.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">{concept.iso.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Bookmark className="w-5 h-5" />
                Sauvegarder
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <ExternalLink className="w-5 h-5" />
                Partager
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ONGLETS */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="flex gap-8 overflow-x-auto">
            {[
              { id: 'description' as TabId, label: 'Principe', icon: BookOpen },
              { id: 'specs' as TabId, label: 'Spécifications', icon: Wrench },
              { id: 'applications' as TabId, label: 'Applications', icon: Image },
              { id: 'resources' as TabId, label: 'Ressources', icon: Link2 }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-semibold' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* CONTENU ONGLETS */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Contenu principal (3/4) */}
          <div className="md:col-span-3">
            {activeTab === 'description' && (
              <div className="space-y-6">
                {/* Principe de fonctionnement */}
                {concept.details?.principle && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Principe de Fonctionnement</h2>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {concept.details.principle}
                    </p>
                  </div>
                )}

                {/* Points clés */}
                {concept.details?.materials && concept.details.materials.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Matériaux & Composants</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {concept.details.materials.map((material, idx) => (
                        <li key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-slate-700 dark:text-slate-300">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Erreurs courantes */}
                {concept.details?.commonErrors && concept.details.commonErrors.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6 text-amber-500" />
                      Erreurs Courantes
                    </h2>
                    <ul className="space-y-2">
                      {concept.details.commonErrors.map((error, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div>
                          <span className="text-slate-700 dark:text-slate-300">{error}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quiz intégré */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                  <h2 className="text-2xl font-bold mb-4">Quiz Rapide</h2>
                  <div className="space-y-4">
                    <p className="font-medium">Quel est le niveau de difficulté de ce concept ?</p>
                    <div className="grid grid-cols-3 gap-3">
                      {['Débutant', 'Intermédiaire', 'Expert'].map(level => (
                        <button
                          key={level}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            level === concept.level 
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                              : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-6">
                {/* Dimensions */}
                {concept.details?.dimensions && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Dimensions & Tolérances</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(concept.details.dimensions).map(([key, value]) => (
                        <div key={key} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{key}</div>
                          <div className="font-mono font-bold">{String(value)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outils nécessaires */}
                {concept.details?.tools && concept.details.tools.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Outils Requis</h2>
                    <div className="space-y-3">
                      {concept.details.tools.map((tool, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <Wrench className="w-5 h-5 text-blue-500" />
                          <span className="text-slate-700 dark:text-slate-300">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Procédure de réglage */}
                {concept.details?.adjustment && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Procédure de Réglage</h2>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {concept.details.adjustment}
                    </p>
                  </div>
                )}

                {/* Calculatrice (exemple pour coefficient de dilatation) */}
                {concept.id === 'dilatation-thermique' && (
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-8 text-white">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Calculator className="w-6 h-6" />
                      Calculateur de Dilatation
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                      <input type="number" placeholder="L0 (mm)" className="px-3 py-2 rounded-lg text-slate-900" />
                      <input type="number" placeholder="ΔT (°C)" className="px-3 py-2 rounded-lg text-slate-900" />
                      <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-bold">Calculer</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                {/* Galerie d'images */}
                {concept.gallery && concept.gallery.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Galerie Technique</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {concept.gallery.map((img, i) => (
                        <div key={i} className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden group cursor-pointer">
                          <div className="w-full h-full flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                            <Image className="w-12 h-12" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Montres emblématiques */}
                {concept.manufactures && concept.manufactures.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Applications dans les Montres</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {concept.manufactures.slice(0, 4).map((manufacture, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="font-bold mb-1">{manufacture}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Utilise ce concept dans ses calibres modernes
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Historique */}
                {concept.history && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Clock className="w-6 h-6" />
                      Historique
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {concept.history}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                {/* Normes ISO */}
                {concept.iso && concept.iso.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Normes ISO</h2>
                    <div className="space-y-3">
                      {concept.iso.map((iso, idx) => (
                        <a 
                          key={idx}
                          href={`https://www.iso.org/standard/${iso.split(' ')[1]}.html`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <span className="font-medium">{iso}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brevets */}
                {concept.patent && concept.patent.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Brevets Historiques</h2>
                    <div className="space-y-2">
                      {concept.patent.map((pat, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg font-mono text-sm">
                          {pat}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Concepts liés */}
                {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Concepts Liés</h2>
                    <div className="space-y-2">
                      {concept.relatedConcepts.map((relatedId) => {
                        const related = allConcepts.find(c => c.id === relatedId);
                        return related ? (
                          <Link key={relatedId} href={`/theorie/mouvements/${relatedId}`}>
                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                              <span className="font-medium">{related.title}</span>
                              <span className="text-sm text-slate-500">{related.level}</span>
                            </div>
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar (1/4) */}
          <div className="space-y-6">
            {/* Progression */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold mb-3">Progression</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Compréhension</span>
                  <span className="text-blue-600 font-bold">0%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-0"></div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">Marquer comme compris →</button>
              </div>
            </div>

            {/* Quick Quiz */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-3">Quiz Flash</h3>
              <p className="text-sm opacity-90 mb-4">Testez vos connaissances sur {concept.title}</p>
              <button className="w-full px-4 py-2 bg-white text-purple-600 rounded-lg font-bold">
                Démarrer le Quiz
              </button>
            </div>

            {/* Métadonnées */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold mb-3">Métadonnées</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tags</span>
                  <span className="font-medium">{concept.tags?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Manufactures</span>
                  <span className="font-medium">{concept.manufactures?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Normes ISO</span>
                  <span className="font-medium">{concept.iso?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION PRÉCÉDENT/SUIVANT */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex justify-between items-center py-8 border-t border-slate-200 dark:border-slate-700">
          {prev ? (
            <Link href={`/theorie/mouvements/${prev.id}`} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all max-w-xs">
              <ArrowLeft className="w-5 h-5" />
              <div>
                <div className="text-sm text-slate-500">Précédent</div>
                <div className="font-semibold">{prev.title}</div>
              </div>
            </Link>
          ) : <div></div>}

          {next ? (
            <Link href={`/theorie/mouvements/${next.id}`} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all max-w-xs text-right">
              <div>
                <div className="text-sm text-slate-500">Suivant</div>
                <div className="font-semibold">{next.title}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : <div></div>}
        </div>
      </section>
    </main>
  );
}
