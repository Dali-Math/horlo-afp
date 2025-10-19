'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Calendar,
  Lock,
  Download,
  MessageSquare,
  FileText,
  Maximize2,
  Eye,
  AlertCircle,
  BookOpen,
  ExternalLink,
  Mail
} from 'lucide-react';
import Link from 'next/link';

export default function CommunautePage() {
  const [activeTab, setActiveTab] = useState<'planning' | 'discussions'>('planning');
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [planningUrl] = useState('/planning-horlogerie.pdf');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const STUDENT_CODE = 'HORL2025';

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === STUDENT_CODE) {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('horlo_access', 'true');
    } else {
      setAuthError('Code d\'accès invalide');
      setAccessCode('');
    }
  };

  const downloadPlanning = () => {
    const link = document.createElement('a');
    link.href = planningUrl;
    link.download = 'Planning-Horlogerie-2025-2026.pdf';
    link.click();
  };

  useEffect(() => {
    const savedAccess = sessionStorage.getItem('horlo_access');
    if (savedAccess === 'true') setIsAuthenticated(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            Espace collaboratif
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Communauté HorloLearn
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Consultez votre planning scolaire et découvrez les ressources disponibles
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-2 inline-flex gap-2 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('planning')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'planning'
                  ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Planning Scolaire
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'discussions'
                  ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Forum Communauté
            </button>
          </div>
        </div>

        {/* Planning Section */}
        {activeTab === 'planning' && (
          <section className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: <Lock className="w-10 h-10 text-blue-600 dark:text-blue-400" />, title: 'Accès sécurisé', desc: "Un code d'accès unique pour consulter le planning de votre promotion." },
                { icon: <Eye className="w-10 h-10 text-green-600 dark:text-green-400" />, title: 'Consultation en ligne', desc: "Visualisez votre planning directement dans le navigateur, sans téléchargement." },
                { icon: <Download className="w-10 h-10 text-purple-600 dark:text-purple-400" />, title: 'Téléchargement', desc: "Téléchargez le PDF pour le consulter hors ligne ou l'imprimer." },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-600 dark:border-blue-400 transition-colors duration-300">
                  {item.icon}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>

            {!isAuthenticated ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto transition-colors duration-300">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                    <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Accès au Planning
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    Entrez votre code d'accès pour consulter le planning scolaire
                  </p>
                </div>

                <form onSubmit={handleAccessSubmit} className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Code d'accès
                  </label>
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    placeholder="Entrez votre code"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    required
                  />

                  {authError && (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-3 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    Accéder au planning
                  </button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-300 font-semibold mb-2">
                    💡 Comment obtenir un code d'accès ?
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Le code vous est fourni par votre formateur en début de formation.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-6 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-4 text-white">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-6 h-6" />
                        <div>
                          <h2 className="text-xl font-bold">Planning Scolaire 2025-2026</h2>
                          <p className="text-sm">Formation modulaire en Horlogerie</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={downloadPlanning}
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Download className="w-5 h-5" />
                          Télécharger
                        </button>
                        <button
                          onClick={() => setIsFullscreen(!isFullscreen)}
                          className="p-2 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-slate-900' : 'relative'}`}>
                    {isFullscreen && (
                      <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 z-10 p-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600"
                      >
                        ✕ Fermer
                      </button>
                    )}
                    <iframe
                      src={planningUrl}
                      className={`w-full ${isFullscreen ? 'h-screen' : 'h-[800px]'} border-0`}
                      title="Planning Scolaire"
                    />
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {/* Discussions Section */}
        {activeTab === 'discussions' && (
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Forum en construction
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Cette section sera bientôt disponible pour échanger avec la communauté.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 mt-16 border-t border-slate-800 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 dark:text-slate-500">© 2025 HorloLearn – Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
