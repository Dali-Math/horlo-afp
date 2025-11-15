'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, TrendingUp, Layers, Target,
  ChevronRight, Play, Pause, RotateCcw,
  Globe, Trophy, Flame, Sparkles,
  ArrowRight, CheckCircle2, Circle,
  BookOpen, Zap, Award, Users
} from 'lucide-react';
import type { Concept } from '../../types';

// ============================================================================
// TYPES
// ============================================================================

interface ApplicationsTabProps {
  concept: Concept;
}

interface ApplicationCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  index: number;
}

interface VariationCardProps {
  title: string;
  description: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  index: number;
}

interface ProgressionStepProps {
  step: number;
  title: string;
  description: string;
  isCompleted: boolean;
  onToggle: () => void;
}

interface TimelineItemProps {
  phase: string;
  duration: string;
  objectives: string[];
  color: string;
  index: number;
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

const ApplicationCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  bgColor,
  index 
}: ApplicationCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ scale: 1.02, y: -4 }}
    className={`${bgColor} rounded-xl p-6 border-2 ${color.replace('text-', 'border-')} cursor-pointer transition-shadow hover:shadow-lg`}
  >
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('600', '100')} dark:${color.replace('text-', 'bg-').replace('600', '900')}`}>
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <div className="flex-1">
        <h3 className={`text-xl font-bold mb-2 ${color}`}>{title}</h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

const VariationCard = ({ title, description, difficulty, index }: VariationCardProps) => {
  const difficultyConfig = {
    'Facile': { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900', border: 'border-green-200 dark:border-green-800' },
    'Moyen': { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900', border: 'border-amber-200 dark:border-amber-800' },
    'Difficile': { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900', border: 'border-red-200 dark:border-red-800' },
  };

  const config = difficultyConfig[difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ x: 8 }}
      className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-6 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          {title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.color} ${config.border} border`}>
          {difficulty}
        </span>
      </div>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const ProgressionStep = ({ step, title, description, isCompleted, onToggle }: ProgressionStepProps) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: step * 0.1 }}
    className="relative"
  >
    <div className="flex items-start gap-4">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-lg transition-all ${
            isCompleted
              ? 'bg-green-600 border-green-600 text-white'
              : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <span>{step}</span>
          )}
        </motion.button>
        <div className="w-1 h-full min-h-[60px] bg-slate-200 dark:bg-slate-700 mt-2" />
      </div>

      {/* Content */}
      <div className={`flex-1 pb-8 transition-opacity ${isCompleted ? 'opacity-60' : 'opacity-100'}`}>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {title}
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({ phase, duration, objectives, color, index }: TimelineItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.15 }}
    className="relative"
  >
    <div className={`absolute left-0 top-0 bottom-0 w-1 ${color.replace('text-', 'bg-')}`} />
    <div className="pl-8">
      <div className="flex items-center gap-3 mb-2">
        <h3 className={`text-xl font-bold ${color}`}>{phase}</h3>
        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium text-slate-600 dark:text-slate-400">
          {duration}
        </span>
      </div>
      <ul className="space-y-2">
        {objectives.map((obj, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (index * 0.15) + (idx * 0.05) }}
            className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
          >
            <ChevronRight className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
            <span>{obj}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  color: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`${color.replace('text-', 'bg-').replace('600', '50')} dark:${color.replace('text-', 'bg-').replace('600', '950')}/30 rounded-xl p-6 border-2 ${color.replace('text-', 'border-')}`}
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

const InfoBanner = ({ children, icon: Icon }: { children: React.ReactNode; icon: React.ElementType }) => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-white/20 rounded-lg">
        <Icon className="w-7 h-7" />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ApplicationsTab({ concept }: ApplicationsTabProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const applications = concept.details?.applications;
  const realWorld = applications?.realWorld || [];
  const variations = applications?.variations || [];
  const progressions = applications?.progressions || [];

  // Toggle progression step completion
  const toggleStep = (step: number) => {
    setCompletedSteps(prev => 
      prev.includes(step) 
        ? prev.filter(s => s !== step)
        : [...prev, step]
    );
  };

  // Applications réelles avec icônes et couleurs
  const realWorldApps = realWorld.map((app, idx) => ({
    title: app,
    description: `Application pratique de ${concept.title} dans un contexte réel de compétition ou d'entraînement.`,
    icon: [Globe, Trophy, Flame, Sparkles][idx % 4],
    color: ['text-blue-600 dark:text-blue-400', 'text-purple-600 dark:text-purple-400', 'text-orange-600 dark:text-orange-400', 'text-pink-600 dark:text-pink-400'][idx % 4],
    bgColor: ['bg-blue-50 dark:bg-blue-950/30', 'bg-purple-50 dark:bg-purple-950/30', 'bg-orange-50 dark:bg-orange-950/30', 'bg-pink-50 dark:bg-pink-950/30'][idx % 4],
  }));

  // Variations avec niveaux de difficulté
  const variationsList = variations.map((variation, idx) => ({
    title: variation,
    description: `Variante technique de ${concept.title} pour enrichir votre répertoire.`,
    difficulty: (['Facile', 'Moyen', 'Difficile'] as const)[idx % 3],
  }));

  // Progressions structurées
  const progressionSteps = progressions.map((prog, idx) => ({
    step: idx + 1,
    title: prog,
    description: `Étape ${idx + 1} de votre progression vers la maîtrise de ${concept.title}.`,
  }));

  // Timeline d'apprentissage
  const learningTimeline = [
    {
      phase: 'Phase 1 - Initiation',
      duration: '2-4 semaines',
      objectives: [
        'Comprendre les principes fondamentaux',
        'Maîtriser les mouvements préparatoires',
        'Développer la conscience corporelle'
      ],
      color: 'text-green-600 dark:text-green-400',
    },
    {
      phase: 'Phase 2 - Développement',
      duration: '4-8 semaines',
      objectives: [
        'Enchaîner les séquences de base',
        'Améliorer la technique et la fluidité',
        'Augmenter la complexité progressivement'
      ],
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      phase: 'Phase 3 - Perfectionnement',
      duration: '8-12 semaines',
      objectives: [
        'Affiner les détails techniques',
        'Travailler les variations avancées',
        'Préparer les applications en compétition'
      ],
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      phase: 'Phase 4 - Maîtrise',
      duration: 'Continu',
      objectives: [
        'Maintenir le niveau d\'excellence',
        'Innover et créer de nouvelles combinaisons',
        'Transmettre les connaissances'
      ],
      color: 'text-amber-600 dark:text-amber-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* BANNER D'INTRODUCTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <InfoBanner icon={Lightbulb}>
          <h3 className="text-2xl font-bold mb-2">Applications Pratiques</h3>
          <p className="text-blue-100 leading-relaxed">
            Découvrez comment appliquer concrètement <strong>{concept.title}</strong> dans 
            votre entraînement, vos compétitions et votre progression technique.
          </p>
        </InfoBanner>
      </motion.div>

      {/* STATISTIQUES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SectionCard>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={Globe}
              label="Applications Réelles"
              value={realWorld.length.toString()}
              color="text-blue-600 dark:text-blue-400"
            />
            <StatCard
              icon={Layers}
              label="Variantes"
              value={variations.length.toString()}
              color="text-purple-600 dark:text-purple-400"
            />
            <StatCard
              icon={TrendingUp}
              label="Étapes Progression"
              value={progressions.length.toString()}
              color="text-green-600 dark:text-green-400"
            />
          </div>
        </SectionCard>
      </motion.div>

      {/* APPLICATIONS RÉELLES */}
      {realWorldApps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <SectionCard>
            <SectionTitle icon={Globe}>
              Applications en Situation Réelle
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {realWorldApps.map((app, idx) => (
                <ApplicationCard key={idx} {...app} index={idx} />
              ))}
            </div>
          </SectionCard>
        </motion.div>
      )}

      {/* VARIANTES */}
      {variationsList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <SectionCard>
            <SectionTitle icon={Layers}>
              Variantes et Adaptations
            </SectionTitle>
            <div className="space-y-4">
              {variationsList.map((variation, idx) => (
                <VariationCard key={idx} {...variation} index={idx} />
              ))}
            </div>
          </SectionCard>
        </motion.div>
      )}

      {/* PROGRESSION ÉTAPE PAR ÉTAPE */}
      {progressionSteps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <SectionCard>
            <SectionTitle icon={TrendingUp}>
              Plan de Progression Structuré
            </SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Cochez les étapes au fur et à mesure de votre progression
            </p>
            <div className="space-y-2">
              {progressionSteps.map((step) => (
                <ProgressionStep
                  key={step.step}
                  {...step}
                  isCompleted={completedSteps.includes(step.step)}
                  onToggle={() => toggleStep(step.step)}
                />
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Progression globale
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {Math.round((completedSteps.length / progressionSteps.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedSteps.length / progressionSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </SectionCard>
        </motion.div>
      )}

      {/* TIMELINE D'APPRENTISSAGE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <SectionCard>
          <SectionTitle icon={Target}>
            Timeline d'Apprentissage Recommandée
          </SectionTitle>
          <div className="space-y-8">
            {learningTimeline.map((item, idx) => (
              <TimelineItem key={idx} {...item} index={idx} />
            ))}
          </div>
        </SectionCard>
      </motion.div>

      {/* CALL TO ACTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white text-center">
          <Award className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h3 className="text-3xl font-bold mb-3">Prêt à Commencer ?</h3>
          <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
            Suivez le plan de progression, pratiquez régulièrement et n'oubliez pas : 
            la constance est la clé de la maîtrise !
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors inline-flex items-center gap-2"
          >
            Commencer l'Entraînement
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
