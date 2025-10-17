'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Lock,
  Download,
  Users,
  MessageSquare,
  Share2,
  TrendingUp,
  BookOpen,
  AlertCircle,
  FileText,
  Maximize2,
  Eye
} from 'lucide-react';
import Link from 'next/link';

interface Discussion {
  id: string;
  author: string;
  avatar: string;
  title: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  isHot: boolean;
}

const discussions: Discussion[] = [
  {
    id: '1',
    author: 'Jean-Marc L.',
    avatar: 'JM',
    title: 'Aide : Problème avec le démontage du pont de balancier ETA 2824',
    category: 'Pratique',
    replies: 12,
    views: 245,
    lastActivity: 'Il y a 5 min',
    isHot: true
  },
  {
    id: '2',
    author: 'Sophie D.',
    avatar: 'SD',
    title: 'Partage : Mon premier remontage complet réussi ! 🎉',
    category: 'Succès',
    replies: 28,
    views: 412,
    lastActivity: 'Il y a 1h',
    isHot: true
  },
  {
    id: '3',
    author: 'Thomas B.',
    avatar: 'TB',
    title: 'Question : Différence entre spiral Nivarox et Anachron ?',
    category: 'Théorie',
    replies: 8,
    views: 156,
    lastActivity: 'Il y a 2h',
    isHot: false
  },
  {
    id: '4',
    author: 'Marie P.',
    avatar: 'MP',
    title: 'Ressources : Collection de plans techniques ETA gratuits',
    category: 'Ressources',
    replies: 45,
    views: 892,
    lastActivity: 'Il y a 3h',
    isHot: true
  },
  {
    id: '5',
    author: 'Laurent K.',
    avatar: 'LK',
    title: 'Stage : Manufacture Horlogère cherche apprenti à Neuchâtel',
    category: 'Opportunités',
    replies: 15,
    views: 523,
    lastActivity: 'Il y a 5h',
    isHot: false
  }
];

export default function CommunautePage() {
  const [activeTab, setActiveTab] = useState<'planning' | 'discussions'>('planning');
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [planningUrl] = useState('/planning-horlogerie.pdf');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Code d'accès unique pour tous les élèves
  const STUDENT_CODE = 'HORL2025';

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accessCode === STUDENT_CODE) {
      setIsAuthenticated(true);
      setAuthError('');
      // Sauvegarder dans sessionStorage (pas localStorage pour éviter la persistance)
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

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Pratique': return 'bg-blue-100 text-blue-700';
      case 'Théorie': return 'bg-purple-100 text-purple-700';
      case 'Succès': return 'bg-green-100 text-green-700';
      case 'Ressources': return 'bg-orange-100 text-orange-700';
      case 'Opportunités': return 'bg-pink-100 text-pink-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // Vérifier l'authentification au chargement (sessionStorage seulement)
  React.useEffect(() => {
    const savedAccess = sessionStorage.getItem('horlo_access');
    if (savedAccess === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Espace collaboratif
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Communauté HorloLearn
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Échangez avec d'autres apprenants, partagez vos expériences et consultez votre planning scolaire
          </p>
        </div>

        {/* Stats Section */}
        <section className="mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-blue-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">1,247</p>
              <p className="text-sm text-slate-600">Membres actifs</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">3,456</p>
              <p className="text-sm text-slate-600">Discussions</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <Share2 className="w-8 h-8 text-green-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">892</p>
              <p className="text-sm text-slate-600">Ressources partagées</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8 text-orange-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">156</p>
              <p className="text-sm text-slate-600">Cours partagés</p>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('planning')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'planning'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Planning Scolaire
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'discussions'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Discussions
            </button>
          </div>
        </div>

        {/* Planning Section */}
        {activeTab === 'planning' && (
          <section className="space-y-8">
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
                <Lock className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Accès sécurisé</h3>
                <p className="text-sm text-slate-600">
                  Un code d'accès unique pour consulter le planning de votre promotion.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600">
                <Eye className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Consultation en ligne</h3>
                <p className="text-sm text-slate-600">
                  Visualisez votre planning directement dans le navigateur, sans téléchargement.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600">
                <Download className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Téléchargement</h3>
                <p className="text-sm text-slate-600">
                  Téléchargez le PDF pour le consulter hors ligne ou l'imprimer.
                </p>
              </div>
            </div>

            {/* Access Code Section */}
            {!isAuthenticated ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Accès au Planning
                  </h2>
                  <p className="text-slate-600">
                    Entrez votre code d'accès pour consulter le planning scolaire
                  </p>
                </div>

                <form onSubmit={handleAccessSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Code d'accès
                    </label>
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      placeholder="Entrez votre code"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900"
                      required
                      autoFocus
                    />
                  </div>

                  {authError && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Accéder au planning
                  </button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900 font-semibold mb-2">
                    💡 Comment obtenir un code d'accès ?
                  </p>
                  <p className="text-sm text-blue-700">
                    Le code vous est fourni par votre formateur en début de formation. Si vous ne l'avez pas reçu, contactez l'administration.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Planning Viewer */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Header avec actions */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3 text-white">
                        <Calendar className="w-6 h-6" />
                        <div>
                          <h2 className="text-xl font-bold">Planning Scolaire 2025-2026</h2>
                          <p className="text-sm text-blue-100">
                            Formation modulaire en Horlogerie - Module de Base (HORL1_S925)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={downloadPlanning}
                          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                        >
                          <Download className="w-5 h-5" />
                          Télécharger
                        </button>
                        <button
                          onClick={() => setIsFullscreen(!isFullscreen)}
                          className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* PDF Viewer */}
                  <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'relative'}`}>
                    {isFullscreen && (
                      <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 z-10 p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
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

                {/* Informations complémentaires */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">📋 Informations</h3>
                    <ul className="space-y-3 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span><strong>Période :</strong> Septembre 2025 → Mai 2026</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span><strong>Total périodes :</strong> 701</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span><strong>Jours de cours :</strong> Variables selon les semaines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span><strong>Horaires :</strong> Généralement 17h00-21h15</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">⚙️ Options</h3>
                    <div className="space-y-3">
                      <button 
                        onClick={() => window.print()}
                        className="w-full flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-slate-900">Imprimer le planning</span>
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Lien copié ! Partagez-le avec vos collègues.');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <Share2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-slate-900">Partager le lien</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsAuthenticated(false);
                          sessionStorage.removeItem('horlo_access');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Lock className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium text-red-900">Se déconnecter</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {/* Discussions Section */}
        {activeTab === 'discussions' && (
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Discussions récentes</h2>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Nouvelle discussion
              </button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {discussion.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                              {discussion.title}
                            </h3>
                            {discussion.isHot && (
                              <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold">
                                🔥 HOT
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">
                            Par <span className="font-semibold">{discussion.author}</span> • {discussion.lastActivity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                          {discussion.category}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {discussion.replies} réponses
                          </span>
                          <span className="flex items-center gap-1">
                            👁️ {discussion.views} vues
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="bg-white text-slate-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors border border-slate-200">
                Charger plus de discussions
              </button>
            </div>
          </section>
        )}

        {/* Community Guidelines */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Règles de la communauté</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-2">🤝 Respect</h3>
              <p className="text-blue-100 text-sm">
                Soyez respectueux et courtois envers tous les membres de la communauté.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">💡 Partage</h3>
              <p className="text-blue-100 text-sm">
                Partagez vos connaissances et aidez les autres apprenants à progresser.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">🎯 Qualité</h3>
              <p className="text-blue-100 text-sm">
                Privilégiez les contenus de qualité et les discussions constructives.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2025 HorloLearn - Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
