'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Award, Package, AlertCircle, 
  ChevronRight, CheckCircle2, XCircle,
  Zap, Target, TrendingUp, Info,
  Dumbbell, Clock, Users, BarChart3
} from 'lucide-react';
import type { Concept } from '../../types';

// ============================================================================
// TYPES
// ============================================================================

interface SpecsTabProps {
  concept: Concept;
}

interface SpecCardProps {
  icon: React.ElementType;
  title: string;
  items: string[];
  color: string;
  accentColor: string;
  emptyMessage?: string;
}

interface DifficultyLevel {
  level: string;
  color: string;
  bgColor: string;
  description: string;
  icon: React.ElementType;
}

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  bgColor: string;
}

// ============================================================================
// COMPONENTS
// ============================================================================

const SectionCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children, icon: Icon, className = '' }: { 
  children: React.ReactNode; 
  icon?: React.ElementType;
  className?: string;
}) => (
  <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${className}`}>
    {Icon && <Icon className="w-7 h-7" />}
    {children}
  </h2>
);

const MetricCard = ({ icon: Icon, label, value, color, bgColor }: MetricCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`${bgColor} rounded-xl p-6 border-2 ${color.replace('text-', 'border-')}`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('600', '100')} dark:${color.replace('text-', 'bg-').replace('600', '900')}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  </motion.div>
);

const SpecCard = ({ 
  icon: Icon, 
  title, 
  items, 
  color, 
  accentColor,
  emptyMessage = 'Aucune information disponible'
}: SpecCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm"
  >
    <div className={`${color} p-5 flex items-center gap-3`}>
      <div className={`p-2.5 rounded-lg ${accentColor}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    
    <div className="p-6">
      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
            >
              <ChevronRight className={`w-5 h-5 ${accentColor.replace('bg-', 'text-')} flex-shrink-0 mt-0.5`} />
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 italic text-center py-4">
          {emptyMessage}
        </p>
      )}
    </div>
  </motion.div>
);

const DifficultyBadge = ({ difficulty }: { difficulty: DifficultyLevel }) => {
  const Icon = difficulty.icon;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${difficulty.bgColor} ${difficulty.color} rounded-xl p-6 border-2 ${difficulty.color.replace('text-', 'border-')}`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-3 rounded-lg ${difficulty.color.replace('text-', 'bg-').replace('600', '100')} dark:${difficulty.color.replace('text-', 'bg-').replace('600', '900')}`}>
          <Icon className={`w-7 h-7 ${difficulty.color}`} />
        </div>
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wide">
            Niveau de Difficulté
          </p>
          <p className={`text-3xl font-bold ${difficulty.color}`}>
            {difficulty.level}
          </p>
        </div>
      </div>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
        {difficulty.description}
      </p>
    </motion.div>
  );
};

const SafetyAlert = ({ notes }: { notes: string[] }) => {
  if (notes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-6"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
          <Shield className="w-7 h-7 text-red-600 dark:text-red-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Consignes de Sécurité Importantes
          </h3>
          <ul className="space-y-2">
            {notes.map((note, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 text-red-800 dark:text-red-200"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{note}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const ChecklistItem = ({ label, completed = false }: { label: string; completed?: boolean }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
      completed
        ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
    }`}
  >
    {completed ? (
      <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
    ) : (
      <XCircle className="w-6 h-6 text-slate-400 dark:text-slate-600 flex-shrink-0" />
    )}
    <span className={`font-medium ${
      completed 
        ? 'text-green-900 dark:text-green-100' 
        : 'text-slate-700 dark:text-slate-300'
    }`}>
      {label}
    </span>
  </motion.div>
);

const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
    <div className="flex gap-4">
      <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
      <div className="text-blue-900 dark:text-blue-100 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SpecsTab({ concept }: SpecsTabProps) {
  const specs = concept.details?.specs;
  
  // Données par défaut si specs n'existe pas
  const difficulty = specs?.difficulty || concept.level || 'Intermédiaire';
  const prerequisites = specs?.prerequisites || [];
  const equipment = specs?.equipment || [];
  const safetyNotes = specs?.safetyNotes || [];

  // Configuration des niveaux de difficulté
  const difficultyLevels: Record<string, DifficultyLevel> = {
    'Débutant': {
      level: 'Débutant',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      description: 'Accessible aux personnes ayant peu ou pas d\'expérience. Formation de base requise.',
      icon: Zap,
    },
    'Intermédiaire': {
      level: 'Intermédiaire',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      description: 'Nécessite une base solide et plusieurs mois de pratique régulière.',
      icon: Target,
    },
    'Expert': {
      level: 'Expert',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      description: 'Réservé aux gymnastes expérimentés avec plusieurs années de formation intensive.',
      icon: TrendingUp,
    },
  };

  const currentDifficulty = difficultyLevels[difficulty] || difficultyLevels['Intermédiaire'];

  // Métriques calculées
  const metrics = [
    {
      icon: BarChart3,
      label: 'Complexité Technique',
      value: difficulty,
      color: currentDifficulty.color,
      bgColor: currentDifficulty.bgColor,
    },
    {
      icon: Clock,
      label: 'Prérequis',
      value: prerequisites.length,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      icon: Package,
      label: 'Équipements',
      value: equipment.length || 'Standard',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    },
    {
      icon: Shield,
      label: 'Consignes Sécurité',
      value: safetyNotes.length,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
    },
  ];

  return (
    <div className="space-y-8">
      {/* NIVEAU DE DIFFICULTÉ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <DifficultyBadge difficulty={currentDifficulty} />
      </motion.div>

      {/* MÉTRIQUES RAPIDES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SectionCard>
          <SectionTitle icon={BarChart3}>
            Aperçu des Spécifications
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, idx) => (
              <MetricCard key={idx} {...metric} />
            ))}
          </div>
        </SectionCard>
      </motion.div>

      {/* PRÉREQUIS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <SpecCard
          icon={Award}
          title="Prérequis Techniques"
          items={prerequisites}
          color="bg-gradient-to-r from-blue-600 to-blue-500"
          accentColor="bg-blue-700"
          emptyMessage="Aucun prérequis spécifique - Niveau débutant accessible"
        />
      </motion.div>

      {/* ÉQUIPEMENT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <SpecCard
          icon={Package}
          title="Équipement Requis"
          items={equipment}
          color="bg-gradient-to-r from-purple-600 to-purple-500"
          accentColor="bg-purple-700"
          emptyMessage="Équipement standard de gymnastique"
        />
      </motion.div>

      {/* CONSIGNES DE SÉCURITÉ */}
      {safetyNotes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <SafetyAlert notes={safetyNotes} />
        </motion.div>
      )}

      {/* CHECKLIST DE PRÉPARATION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <SectionCard>
          <SectionTitle icon={CheckCircle2}>
            Checklist de Préparation
          </SectionTitle>
          <div className="space-y-3">
            <ChecklistItem 
              label="Échauffement complet (15-20 minutes minimum)" 
              completed={false}
            />
            <ChecklistItem 
              label="Vérification de l'équipement et de la zone d'entraînement" 
              completed={false}
            />
            <ChecklistItem 
              label="Présence d'un superviseur ou partenaire qualifié" 
              completed={false}
            />
            <ChecklistItem 
              label="Maîtrise des mouvements préparatoires" 
              completed={false}
            />
            <ChecklistItem 
              label="Révision des consignes de sécurité" 
              completed={false}
            />
          </div>
        </SectionCard>
      </motion.div>

      {/* INFO BOX - CONSEIL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <InfoBox>
          <p className="font-semibold mb-2">💡 Conseil de Progression</p>
          <p>
            Ne passez au niveau supérieur que lorsque vous maîtrisez parfaitement 
            tous les prérequis. La précipitation est la première cause de blessures 
            en gymnastique. Privilégiez toujours la qualité d'exécution à la quantité.
          </p>
        </InfoBox>
      </motion.div>

      {/* STATISTIQUES DE FORMATION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <SectionCard>
          <SectionTitle icon={TrendingUp}>
            Temps de Formation Estimé
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <Dumbbell className="w-10 h-10 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {difficulty === 'Débutant' ? '2-4' : difficulty === 'Intermédiaire' ? '4-8' : '8-12'}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Semaines de pratique
              </p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <Clock className="w-10 h-10 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {difficulty === 'Débutant' ? '3-4' : difficulty === 'Intermédiaire' ? '4-6' : '6-8'}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Séances par semaine
              </p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <Users className="w-10 h-10 mx-auto mb-3 text-green-600 dark:text-green-400" />
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {difficulty === 'Débutant' ? 'Optionnel' : difficulty === 'Intermédiaire' ? 'Recommandé' : 'Obligatoire'}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Encadrement coach
              </p>
            </div>
          </div>
        </SectionCard>
      </motion.div>
    </div>
  );
}
