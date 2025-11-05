import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Brain, FileText, HelpCircle, Scale, Target } from 'lucide-react';
import { SectionType } from '@/types';

interface NavigationProps {
  currentSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  userProgress: {
    completedQuizzes: number;
    totalScore: number;
    achievements: string[];
  };
  darkMode: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  onSectionChange,
  userProgress,
  darkMode
}) => {
  const navigationItems = [
    {
      id: 'champs' as SectionType,
      label: '14 Champs',
      icon: BookOpen,
      description: 'Apprenez les champs ISO 7200'
    },
    {
      id: 'cartouche' as SectionType,
      label: 'Cartouche',
      icon: Target,
      description: 'Schéma interactif du cartouche'
    },
    {
      id: 'quiz' as SectionType,
      label: 'Quiz',
      icon: Brain,
      description: 'Testez vos connaissances'
    },
    {
      id: 'tableaux' as SectionType,
      label: 'Tableaux',
      icon: FileText,
      description: 'Formats, matériaux, traitements'
    },
    {
      id: 'memo' as SectionType,
      label: 'Memo Tech',
      icon: Trophy,
      description: 'Bonnes pratiques et erreurs'
    },
    {
      id: 'faq' as SectionType,
      label: 'FAQ',
      icon: HelpCircle,
      description: 'Questions fréquentes'
    },
    {
      id: 'normes' as SectionType,
      label: 'Normes',
      icon: Scale,
      description: 'ISO 7200 et ISO 5457'
    }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b ${
      darkMode 
        ? 'bg-gray-900/80 border-gray-800' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Cartouche Horloger ISO</h1>
              <p className="text-sm opacity-70">Formation Complète</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              const hasAchievement = item.id === 'quiz' && userProgress.completedQuizzes > 0;
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onSectionChange(item.id)}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {hasAchievement && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* User Progress */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>{userProgress.totalScore}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4 text-blue-500" />
                <span>{userProgress.completedQuizzes}/15</span>
              </div>
            </div>
            
            <motion.button
              onClick={() => {}}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden mt-3 flex space-x-1 overflow-x-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : darkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4 mx-auto mb-1" />
                <div>{item.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
