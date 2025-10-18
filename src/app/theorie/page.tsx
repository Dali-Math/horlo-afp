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
  Award,
  Target,
  Brain,
} from 'lucide-react';

// ==================== Données ====================
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

const coursTheorie: Chapitre[] = [
  {
    id: '1',
    titre: "Introduction à l'horlogerie",
    description:
      "Histoire, principes fondamentaux et terminologie de base de l'horlogerie mécanique.",
    duree: '45 min',
    niveau: 'Débutant',
    statut: 'Disponible',
    progression: 0,
  },
  {
    id: '2',
    titre: "Anatomie d'un mouvement",
    description:
      'Découvrez les composants essentiels d’un mouvement horloger et leur fonction.',
    duree: '1h 30min',
    niveau: 'Débutant',
    statut: 'Disponible',
    progression: 0,
  },
  {
    id: '3',
    titre: "Le système d'échappement",
    description:
      'Maîtrisez le cœur du mouvement : l’échappement suisse à ancre et ses variantes.',
    duree: '2h',
    niveau: 'Intermédiaire',
    statut: 'Disponible',
    progression: 0,
  },
  {
    id: '4',
    titre: 'Calculs horlogers',
    description:
      'Apprenez les mathématiques appliquées à l’horlogerie : rapports, engrenages, fréquences.',
    duree: '1h 45min',
    niveau: 'Intermédiaire',
    statut: 'Disponible',
    progression: 0,
  },
  {
    id: '5',
    titre: 'Complications horlogères',
    description:
      'Explorez les grandes complications : chronographe, quantième perpétuel, tourbillon.',
    duree: '3h',
    niveau: 'Expert',
    statut: 'Verrouillé',
    progression: 0,
  },
];

// ==================== Composant principal ====================
export default function TheoriePage() {
  const [niveau, setNiveau] = useState('all');
  const coursFiltres =
    niveau === 'all' ? coursTheorie : coursTheorie.filter((c) => c.niveau === niveau);

  const progressionGlobale = Math.round(
    (coursTheorie.filter((c) => c.statut === 'Complété').length / coursTheorie.length) * 100
  );

  const getNiveauColor = (n: string) => {
    switch (n) {
      case 'Débutant':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Intermédiaire':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Expert':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <main className="min-h-screen bg-light-100 dark:bg-dark-900 text-slate-900 dark:text-light-100 transition-colors duration-500">
      {/* === Header === */}
      <header className="bg-white dark:bg-dark-800 border-b border-gold/20 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-gold hover:text-gold-light transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l’accueil
          </Link>
        </div>
      </header>

      {/* === Section Héro === */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 text-light-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-2 bg-gold/20 rounded-full text-gold font-semibold mb-4">
            🇨🇭 Formation Certifiée
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Théorie Horlogère
            <span className="block text-2xl md:text-3xl text-gold mt-2">
              Maîtrisez les fondamentaux de l’excellence suisse
            </span>
          </h1>
          <p className="text-lg text-light-300 max-w-3xl mb-8">
            De l’histoire aux complications les plus avancées, parcourez un cursus complet élaboré par des professionnels.
          </p>

          {/* Progression */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 max-w-md">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Progression</span>
              <span className="text-2xl font-bold text-gold">
                {progressionGlobale}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div
                className="bg-gold h-3 rounded-full transition-all duration-700"
                style={{ width: `${progressionGlobale}%` }}
              ></div>
            </div>
            <p className="text-sm text-light-300 mt-2">
              {coursTheorie.filter((c) => c.statut === 'Complété').length} / {coursTheorie.length} chapitres
            </p>
          </div>
        </div>
      </section>

      {/* === Filtres === */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gold/20 p-6 mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gold">
            <Target className="w-5 h-5" />
            Filtrer par niveau
          </h2>
          <div className="flex flex-wrap gap-3">
            {['all', 'Débutant', 'Intermédiaire', 'Expert'].map((n) => (
              <button
                key={n}
                onClick={() => setNiveau(n)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  niveau === n
                    ? 'bg-gold text-dark-900 shadow-lg'
                    : 'bg-light-200 dark:bg-dark-700 text-slate-700 dark:text-light-200 hover:bg-gold/10'
                }`}
              >
                {n === 'all' ? 'Tous les niveaux' : n}
              </button>
            ))}
          </div>
        </div>

        {/* === Liste des cours === */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gold">
            Parcours de formation
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {coursFiltres.map((c) => (
              <div
                key={c.id}
                className={`group bg-white dark:bg-dark-800 border border-gold/20 hover:border-gold/40 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all ${
                  c.statut === 'Verrouillé' && 'opacity-70'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl ${
                        c.statut === 'Verrouillé'
                          ? 'bg-dark-700'
                          : 'bg-gradient-to-br from-gold to-gold-light'
                      }`}
                    >
                      {c.statut === 'Verrouillé' ? (
                        <Lock className="w-6 h-6 text-light-300" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-dark-900" />
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getNiveauColor(
                        c.niveau
                      )}`}
                    >
                      {c.niveau}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-light-400">
                    <Clock className="w-4 h-4" /> {c.duree}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                  {c.titre}
                </h3>
                <p className="text-sm text-slate-700 dark:text-light-300 mb-4">
                  {c.description}
                </p>

                {c.statut === 'Verrouillé' ? (
                  <div className="text-slate-500 dark:text-light-400 text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Complétez les cours précédents pour déverrouiller
                  </div>
                ) : (
                  <Link
                    href={`/theorie/${c.id}`}
                    className="inline-flex items-center gap-2 bg-gold text-dark-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-light transition-all"
                  >
                    <Play className="w-5 h-5" />
                    Commencer le cours
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* === Concepts clés === */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gold mb-8 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Concepts clés
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              'Échappement',
              'Balancier-Spiral',
              'Train de Rouages',
              'Réserve de Marche',
            ].map((concept, i) => (
              <div
                key={i}
                className="bg-white dark:bg-dark-800 border border-gold/20 rounded-xl p-6 shadow-md hover:shadow-gold/10 transition-all hover:scale-[1.03]"
              >
                <h3 className="text-lg font-bold text-gold mb-2">{concept}</h3>
                <p className="text-sm text-slate-700 dark:text-light-300">
                  Définitions et rôles de chaque composant essentiel du mouvement.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* === CTA === */}
        <section className="bg-gradient-to-r from-gold/30 to-gold/10 rounded-3xl p-12 text-center border border-gold/40">
          <Award className="w-14 h-14 mx-auto mb-6 text-gold" />
          <h2 className="text-3xl font-bold mb-4 text-gold">
            Prêt à devenir expert ?
          </h2>
          <p className="text-lg text-slate-700 dark:text-light-300 mb-8">
            Complétez tous les cours et obtenez votre certificat de maîtrise
            théorique en horlogerie.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-gold text-dark-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gold-light transition-all"
          >
            Passer les quiz de validation
          </Link>
        </section>
      </div>

      {/* === Footer === */}
      <footer className="bg-dark-900 text-light-300 py-8 mt-16 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 HorloLearn – Excellence Horlogère Suisse</p>
        </div>
      </footer>
    </main>
  );
}
