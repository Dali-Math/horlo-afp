'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Lightbulb, AlertTriangle, CheckCircle2, 
  TrendingUp, Zap, Info, ChevronDown, ChevronUp,
  ExternalLink, Code, Calculator, Wrench
} from 'lucide-react';
import type { Concept } from '../../types';

// ============================================================================
// TYPES
// ============================================================================

interface DescriptionTabProps {
  concept: Concept;
}

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ElementType;
  color: string;
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
  <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${className}`}>
    {Icon && <Icon className="w-6 h-6" />}
    {children}
  </h2>
);

const Badge = ({ children, variant = 'default' }: { 
  children: React.ReactNode; 
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Accordion = ({ item, isOpen, onToggle }: { 
  item: AccordionItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  const Icon = item.icon;
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <motion.button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-5 text-left transition-colors ${
          isOpen 
            ? 'bg-slate-50 dark:bg-slate-800' 
            : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${item.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg">{item.title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoBox = ({ 
  children, 
  type = 'info',
  title,
}: { 
  children: React.ReactNode; 
  type?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
}) => {
  const configs = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800',
      icon: Info,
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-950/30',
      border: 'border-green-200 dark:border-green-800',
      icon: CheckCircle2,
      iconColor: 'text-green-600 dark:text-green-400',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-950/30',
      border: 'border-red-200 dark:border-red-800',
      icon: AlertTriangle,
      iconColor: 'text-red-600 dark:text-red-400',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-5`}>
      <div className="flex gap-4">
        <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && (
            <h4 className="font-bold mb-2 text-slate-900 dark:text-slate-100">
              {title}
            </h4>
          )}
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const KeyPoint = ({ children }: { children: React.ReactNode }) => (
  <motion.li 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
  >
    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
    <span className="leading-relaxed">{children}</span>
  </motion.li>
);

const ProgressiveDisclosure = ({ 
  summary, 
  children 
}: { 
  summary: string; 
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-l-4 border-blue-500 pl-4 my-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
      >
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {summary}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 overflow-hidden"
          >
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DescriptionTab({ concept }: DescriptionTabProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // ✅ Extraction des données du concept
  const details = concept.details;
  const principle = details?.principle || concept.desc;
  const howItWorks = details?.howItWorks;
  const advantages = details?.advantages || [];
  const limitations = details?.limitations || [];
  const keyPoints = details?.keyPoints || [];
  const examples = details?.examples || [];
  const relatedConcepts = details?.relatedConcepts || [];

  // ✅ Construction des items d'accordéon
  const accordionItems: AccordionItem[] = useMemo(() => {
    const items: AccordionItem[] = [];

    if (howItWorks) {
      items.push({
        id: 'how-it-works',
        title: 'Comment ça fonctionne ?',
        icon: Wrench,
        color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
        content: (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {howItWorks}
            </p>
          </div>
        ),
      });
    }

    if (examples.length > 0) {
      items.push({
        id: 'examples',
        title: 'Exemples Pratiques',
        icon: Code,
        color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
        content: (
          <div className="space-y-4">
            {examples.map((example, idx) => (
              <div 
                key={idx}
                className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
                  Exemple {idx + 1}
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  {example}
                </p>
              </div>
            ))}
          </div>
        ),
      });
    }

    if (advantages.length > 0 || limitations.length > 0) {
      items.push({
        id: 'pros-cons',
        title: 'Avantages & Limitations',
        icon: TrendingUp,
        color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
        content: (
          <div className="grid md:grid-cols-2 gap-6">
            {advantages.length > 0 && (
              <div>
                <h4 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Avantages
                </h4>
                <ul className="space-y-2">
                  {advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {limitations.length > 0 && (
              <div>
                <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Limitations
                </h4>
                <ul className="space-y-2">
                  {limitations.map((lim, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <span className="text-amber-500 mt-1">⚠</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ),
      });
    }

    return items;
  }, [howItWorks, examples, advantages, limitations]);

  return (
    <div className="space-y-8">
      {/* PRINCIPE DE FONCTIONNEMENT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SectionCard>
          <SectionTitle icon={BookOpen}>
            Principe de Fonctionnement
          </SectionTitle>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              {principle}
            </p>
          </div>

          {keyPoints.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Points Clés à Retenir
              </h3>
              <ul className="space-y-3">
                {keyPoints.map((point, idx) => (
                  <KeyPoint key={idx}>{point}</KeyPoint>
                ))}
              </ul>
            </div>
          )}
        </SectionCard>
      </motion.div>

      {/* ACCORDÉON - SECTIONS DÉTAILLÉES */}
      {accordionItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <SectionCard>
            <SectionTitle>Informations Détaillées</SectionTitle>
            <div className="space-y-3">
              {accordionItems.map(item => (
                <Accordion
                  key={item.id}
                  item={item}
                  isOpen={openAccordion === item.id}
                  onToggle={() => setOpenAccordion(
                    openAccordion === item.id ? null : item.id
                  )}
                />
              ))}
            </div>
          </SectionCard>
        </motion.div>
      )}

      {/* CONCEPTS LIÉS */}
      {relatedConcepts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <SectionCard>
            <SectionTitle icon={ExternalLink}>
              Concepts Liés
            </SectionTitle>
            <div className="flex flex-wrap gap-3">
              {relatedConcepts.map((related, idx) => (
                <Badge key={idx} variant="info">
                  {related}
                </Badge>
              ))}
            </div>
          </SectionCard>
        </motion.div>
      )}

      {/* INFO BOX - CONSEIL PRATIQUE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <InfoBox type="success" title="💡 Conseil Pratique">
          Pour bien comprendre <strong>{concept.title}</strong>, commencez par 
          maîtriser les bases théoriques avant de passer aux applications pratiques. 
          Consultez la section <em>Spécifications</em> pour les détails techniques.
        </InfoBox>
      </motion.div>

      {/* DIVULGATION PROGRESSIVE - RESSOURCES COMPLÉMENTAIRES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <ProgressiveDisclosure summary="📚 Voir les ressources complémentaires recommandées">
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Documentation ISO officielle sur les mouvements et variantes</li>
            <li>Tutoriels vidéo pour visualiser le concept en action</li>
            <li>Articles de recherche académique sur l'optimisation</li>
            <li>Forums de discussion avec la communauté gymnastique</li>
          </ul>
        </ProgressiveDisclosure>
      </motion.div>
    </div>
  );
}
