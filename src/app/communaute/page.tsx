'use client';

import React, { useState, useCallback } from 'react';
import { 
  ChevronLeft, 
  Upload, 
  Calendar, 
  Clock, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Share2, 
  TrendingUp,
  FileText,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  type: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  day: string;
  color: string;
}

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

const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Théorie Horlogère',
    type: 'Cours',
    teacher: 'M. Dubois',
    room: 'Salle 201',
    startTime: '08:00',
    endTime: '10:00',
    day: 'Lundi',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Pratique Démontage',
    type: 'Atelier',
    teacher: 'Mme Martin',
    room: 'Atelier A',
    startTime: '10:15',
    endTime: '12:15',
    day: 'Lundi',
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Lecture de Plan',
    type: 'Cours',
    teacher: 'M. Favre',
    room: 'Salle 105',
    startTime: '13:30',
    endTime: '15:30',
    day: 'Lundi',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    title: 'Remontage ETA 2824',
    type: 'Atelier',
    teacher: 'M. Perret',
    room: 'Atelier B',
    startTime: '08:00',
    endTime: '11:00',
    day: 'Mardi',
    color: 'bg-orange-500'
  },
  {
    id: '5',
    title: 'Complications',
    type: 'Cours',
    teacher: 'Mme Rousseau',
    room: 'Salle 201',
    startTime: '13:30',
    endTime: '16:30',
    day: 'Mardi',
    color: 'bg-red-500'
  }
];

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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('Lundi');

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsAnalyzing(true);
      
      // Simulation d'analyse
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        setCourses(sampleCourses);
      }, 2500);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsAnalyzing(true);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        setCourses(sampleCourses);
      }, 2500);
    }
  }, []);

  const todayCourses = courses.filter(course => course.day === selectedDay);

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
            Échangez avec d'autres apprenants, partagez vos expériences et gérez votre planning scolaire
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
              Planning Intelligent
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

        {/* Planning Intelligent Section */}
        {activeTab === 'planning' && (
          <section className="space-y-8">
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
                <Upload className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Import PDF automatique</h3>
                <p className="text-sm text-slate-600">
                  Glissez-déposez votre planning scolaire PDF et laissez notre IA l'analyser automatiquement.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600">
                <RefreshCw className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Mise à jour automatique</h3>
                <p className="text-sm text-slate-600">
                  Synchronisation en temps réel avec votre établissement pour ne jamais rater un changement.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600">
                <Calendar className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Visualisation moderne</h3>
                <p className="text-sm text-slate-600">
                  Interface intuitive avec vue journalière, hebdomadaire et notifications intelligentes.
                </p>
              </div>
            </div>

            {/* Upload Section */}
            {!analysisComplete && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Upload className="w-6 h-6 text-blue-600" />
                  Importez votre planning
                </h2>
                
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
                >
                  {!isAnalyzing ? (
                    <>
                      <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-slate-900 mb-2">
                        Glissez-déposez votre PDF ici
                      </p>
                      <p className="text-sm text-slate-600 mb-4">
                        ou cliquez pour sélectionner un fichier
                      </p>
                      <label className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
                        Choisir un fichier
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-slate-500 mt-4">
                        Formats acceptés : PDF (max 5 MB)
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <RefreshCw className="w-16 h-16 text-blue-600 animate-spin mb-4" />
                      <p className="text-lg font-semibold text-slate-900 mb-2">
                        Analyse en cours...
                      </p>
                      <p className="text-sm text-slate-600">
                        Extraction des cours, horaires et salles
                      </p>
                    </div>
                  )}
                </div>

                {uploadedFile && !isAnalyzing && (
                  <div className="mt-4 bg-blue-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-semibold text-slate-900">{uploadedFile.name}</p>
                        <p className="text-sm text-slate-600">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                )}
              </div>
            )}

            {/* Planning Display */}
            {analysisComplete && (
              <div className="space-y-6">
                {/* Success Alert */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">Planning importé avec succès !</p>
                    <p className="text-sm text-green-700">
                      {courses.length} cours détectés • Mise à jour automatique activée
                    </p>
                  </div>
                </div>

                {/* Day Selector */}
                <div className="bg-white rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-4 overflow-x-auto pb-2">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                          selectedDay === day
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Courses List */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      Planning du {selectedDay}
                    </h2>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                      <Download className="w-5 h-5" />
                      Exporter
                    </button>
                  </div>

                  {todayCourses.length > 0 ? (
                    <div className="space-y-4">
                      {todayCourses.map((course) => (
                        <div
                          key={course.id}
                          className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`${course.color} rounded-lg p-3 text-white`}>
                              <Clock className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-lg font-bold text-slate-900">{course.title}</h3>
                                  <p className="text-sm text-slate-600">{course.type}</p>
                                </div>
                                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                                  {course.startTime} - {course.endTime}
                                </span>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div className="flex items-center gap-2 text-slate-600">
                                  <Users className="w-4 h-4" />
                                  <span className="text-sm">{course.teacher}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                  <MapPin className="w-4 h-4" />
                                  <span className="text-sm">{course.room}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-lg text-slate-600">Aucun cours prévu ce jour</p>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200 flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-slate-900">Actualiser le planning</span>
                  </button>
                  <button className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200 flex items-center gap-3">
                    <Download className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-slate-900">Télécharger en PDF</span>
                  </button>
                  <button className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200 flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-slate-900">Partager avec un ami</span>
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Discussions Section */}
        {activeTab === 'discussions' && (
          <section className="space-y-6">
            {/* New Discussion Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Discussions récentes</h2>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Nouvelle discussion
              </button>
            </div>

            {/* Discussions List */}
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

            {/* Load More */}
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
