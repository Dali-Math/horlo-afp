'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Lock,
  Play,
  Star,
  TrendingUp,
  Award,
  Zap,
  Target,
  Brain
} from 'lucide-react';

// Types
interface Chapitre {
  id: string;
  titre: string;
  description: string;
  duree: string;
  niveau: 'Débutant' | 'Intermédiaire' | 'Expert';
  statut: 'Disponible' | 'Verrouillé' | 'Complété';
  progression: number;
  chapitres?: string[];
}

// Données des cours
const coursTheorie: Chapitre[] = [
  {
    id: '1',
    titre: "Introduction à l'horlogerie",
    description: "Histoire, principes fondamentaux et terminologie de base de l'horlogerie mécanique.",
    duree: "45 min",
    niveau: "Débutant",
    statut: "Disponible",
    progression: 0,
    chapitres: [
      "L'histoire de la mesure du temps",
      "Les grandes inventions horlogères",
      "Terminologie de base",
      "Les différents types de montres"
    ]
  },
  {
    id: '2',
    titre: "Anatomie d'un mouvement",
    description: "Découvrez les composants essentiels d'un mouvement horloger et leur fonction.",
    duree: "1h 30min",
    niveau: "Débutant",
    statut: "Disponible",
    progression: 0,
    chapitres: [
      "Le barillet et la source d'énergie",
      "Le train de rouages",
      "L'échappement",
      "L'organe réglant (balancier-spiral)"
    ]
  },
  {
    id: '3',
    titre: "Le système d'échappement",
    description: "Maîtrisez le cœur du mouvement : l'échappement suisse à ancre et ses variantes.",
    duree: "2h",
    niveau: "Intermédiaire",
    statut: "Disponible",
    progression: 0,
    chapitres: [
      "Principe de l'échappement",
      "L'ancre suisse",
      "Le plateau et l'ellipse",
      "Réglage de l'échappement"
    ]
  },
  {
    id: '4',
    titre: "Calculs horlogers",
    description: "Apprenez les mathématiques appliquées à l'horlogerie : rapports, engrenages, fréquences.",
    duree: "1h 45min",
    niveau: "Intermédiaire",
    statut: "Disponible",
    progression: 0,
    chapitres: [
      "Rapport de transmission",
      "Calcul du nombre de dents",
      "Fréquence et alternances",
      "Réserve de marche"
    ]
  },
  {
    id: '5',
    titre: "Complications horlogères",
    description: "Explorez les grandes complications : chronographe, quantième perpétuel, tourbillon.",
    duree: "3h",
    niveau: "Expert",
    statut: "Verrouillé",
    progression: 0,
    chapitres: [
      "Le chronographe",
      "Le quantième perpétuel",
      "Le tourbillon",
      "La répétition minutes"
    ]
  },
  {
    id: '6',
    titre: "Métallurgie horlogère",
    description: "Propriétés des métaux et alliages utilisés en horlogerie de précision.",
    duree: "1h 30min",
    niveau: "Expert",
    statut: "Verrouillé",
    progression: 0,
    chapitres: [
      "Aciers inoxydables",
      "Alliages de laiton",
      "Métaux précieux",
      "Traitements de surface"
    ]
  }
];

const conceptsCles = [
  {
    titre: "Échappement",
    icone: "⚙️",
    definition: "Mécanisme qui régule la libération d'énergie du barillet vers l'organe réglant.",
    color: "from-blue-600 to-cyan-600"
  },
  {
    titre: "Balancier-Spiral",
    icone: "🌀",
    definition: "Organe réglant oscillant qui définit la précision du mouvement horloger.",
    color: "from-purple-600 to-pink-600"
  },
  {
    titre: "Train de Rouages",
    icone: "🔧",
    definition: "Ensemble d'engrenages transmettant l'énergie du barillet à l'échappement.",
    color: "from-orange-600 to-red-600"
  },
  {
    titre: "Réserve de Marche",
    icone: "⏱️",
    definition: "Durée pendant laquelle la montre fonctionne après remontage complet.",
    color: "from-green-600 to-emerald-600"
  }
];

export default function TheoriePage() {
  const [selectedNiveau, setSelectedNiveau] = useState<string>('all');

  const coursFiltres = selectedNiveau === 'all' 
    ? coursTheorie 
    : coursTheorie.filter(c => c.niveau === selectedNiveau);

  const progressionGlobale = Math.round(
    (coursTheorie.filter(c => c.statut === 'Complété').length / coursTheorie.length) * 100
  );

  const getNiveauColor = (niveau: string) => {
    switch(niveau) {
      case 'Débutant': return 'bg-green-100 text-green-700 border-green-300';
      case 'Intermédiaire': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Expert': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-500 px-4 py-2 rounded-full text-sm font-bold uppercase">
              Excellence Horlogère
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
              🇨🇭 Formation Certifiée
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Théorie Horlogère
            <span className="block text-2xl md:text-3xl text-blue-300 mt-2">
              Maîtrisez les fondamentaux de l'excellence suisse
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 max-w-3xl">
            De l'histoire aux complications les plus avancées, parcourez un cursus complet élaboré par des professionnels de l'horlogerie suisse.
          </p>

          {/* Progression globale */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Votre progression</span>
              <span className="text-2xl font-bold">{progressionGlobale}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressionGlobale}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-200 mt-2">
              {coursTheorie.filter(c => c.statut === 'Complété').length} / {coursTheorie.length} chapitres complétés
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filtres par niveau */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Filtrer par niveau
          </h2>
          <div className="flex flex-wrap gap-3">
            {['all', 'Débutant', 'Intermédiaire', 'Expert'].map(niveau => (
              <button
                key={niveau}
                onClick={() => setSelectedNiveau(niveau)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedNiveau === niveau
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {niveau === 'all' ? 'Tous les niveaux' : niveau}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des cours */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Parcours de formation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {coursFiltres.map((cours, idx) => (
              <div
                key={cours.id}
                className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 ${
                  cours.statut === 'Verrouillé' 
                    ? 'border-slate-300 opacity-60' 
                    : cours.statut === 'Complété'
                    ? 'border-green-300'
                    : 'border-slate-200 hover:border-blue-400'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`text-4xl p-3 rounded-xl ${
                      cours.statut === 'Verrouillé' ? 'bg-slate-100' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                    }`}>
                      {cours.statut === 'Verrouillé' ? (
                        <Lock className="w-8 h-8 text-slate-400" />
                      ) : cours.statut === 'Complété' ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <BookOpen className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getNiveauColor(cours.niveau)}`}>
                        {cours.niveau}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      {cours.duree}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {cours.titre}
                </h3>
                <p className="text-slate-600 mb-4">{cours.description}</p>

                {/* Chapitres */}
                {cours.chapitres && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Contenu du cours :</p>
                    <ul className="space-y-1">
                      {cours.chapitres.slice(0, 3).map((chap, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          {chap}
                        </li>
                      ))}
                      {cours.chapitres.length > 3 && (
                        <li className="text-sm text-slate-500 italic">
                          +{cours.chapitres.length - 3} autres chapitres
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                {cours.statut === 'Verrouillé' ? (
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Lock className="w-4 h-4" />
                    Complétez les cours précédents pour déverrouiller
                  </div>
                ) : cours.statut === 'Complété' ? (
                  <Link
                    href={`/theorie/${cours.id}`}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Réviser le cours
                  </Link>
                ) : (
                  <Link
                    href={`/theorie/${cours.id}`}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors group-hover:shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    Commencer le cours
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Concepts clés */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-600" />
            Concepts clés à maîtriser
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {conceptsCles.map((concept, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-slate-200 hover:scale-105 cursor-pointer"
              >
                <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform`}>
                  {concept.icone}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{concept.titre}</h3>
                <p className="text-sm text-slate-600">{concept.definition}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Prêt à devenir expert ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Complétez tous les cours et obtenez votre certificat de maîtrise en horlogerie théorique
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            <Zap className="w-5 h-5" />
            Passer les quiz de validation
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2025 HorloLearn – Excellence Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
