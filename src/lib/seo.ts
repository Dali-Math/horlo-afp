/**
 * seo.ts
 * Utilitaires SEO et accessibilité pour Quiz Certification CFC
 * Optimisations pour référencement et expérience utilisateur premium
 */

import { Metadata } from 'next';

// Configuration SEO pour les pages de quiz
export const quizSEOConfig = {
  siteName: 'Horlo AFP - Formation Horlogerie Suisse',
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://horlo-afp.netlify.app' 
    : 'http://localhost:3000',
  
  // Mots-clés principaux pour référencement
  keywords: [
    'formation horlogerie',
    'CFC horloger',
    'quiz certification horlogerie',
    'apprentissage horlogerie suisse',
    'formation professionnelle horlogerie',
    'certification AFP horlogerie',
    'quiz technique horlogère',
    'évaluation compétences horlogerie',
    'formation continue horlogerie',
    'métiers horlogerie suisse'
  ],
  
  // Données structurées pour Rich Snippets
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Horlo AFP',
    description: 'Formation professionnelle en horlogerie avec système de quiz de certification avancé',
    url: 'https://horlo-afp.netlify.app',
    logo: 'https://horlo-afp.netlify.app/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CH'
    },
    educationalCredentialAwarded: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Certificat Fédéral de Capacité (CFC) Horloger'
    },
    offers: {
      '@type': 'Offer',
      category: 'Formation Professionnelle',
      name: 'Quiz Certification Horlogerie'
    }
  }
};

// Génération de métadonnées pour pages quiz
export function generateQuizMetadata({
  title,
  description,
  category,
  questionCount,
  difficulty
}: {
  title: string;
  description?: string;
  category?: string;
  questionCount?: number;
  difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
}): Metadata {
  const fullTitle = `${title} - Quiz Horlogerie CFC | ${quizSEOConfig.siteName}`;
  const fullDescription = description || 
    `Quiz interactif de ${questionCount || 'multiple'} questions sur ${category || 'l\'horlogerie'}. ` +
    `Niveau ${difficulty || 'adaptatif'}. Certification professionnelle CFC Horloger.`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: quizSEOConfig.keywords.join(', '),
    
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: `${quizSEOConfig.baseUrl}/quiz-certification`,
      siteName: quizSEOConfig.siteName,
      type: 'website',
      locale: 'fr_CH',
      images: [{
        url: `${quizSEOConfig.baseUrl}/og-quiz.jpg`,
        width: 1200,
        height: 630,
        alt: 'Quiz Certification Horlogerie CFC'
      }]
    },
    
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [`${quizSEOConfig.baseUrl}/og-quiz.jpg`]
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    
    alternates: {
      canonical: `${quizSEOConfig.baseUrl}/quiz-certification`
    }
  };
}

// Schema.org pour quiz éducatif
export function generateQuizStructuredData({
  title,
  description,
  category,
  questionCount,
  estimatedDuration,
  difficulty
}: {
  title: string;
  description: string;
  category: string;
  questionCount: number;
  estimatedDuration?: number;
  difficulty?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: title,
    description: description,
    about: {
      '@type': 'Thing',
      name: category,
      description: `Formation en ${category}`
    },
    numberOfQuestions: questionCount,
    timeRequired: estimatedDuration ? `PT${estimatedDuration}M` : 'PT15M',
    difficulty: difficulty || 'intermédiaire',
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: 'Horlogerie',
      targetDescription: 'Formation professionnelle en horlogerie'
    },
    isPartOf: {
      '@type': 'LearningResource',
      name: 'Formation CFC Horloger',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Horlo AFP'
      }
    },
    interactivityType: 'active',
    learningResourceType: 'assessment',
    educationalUse: 'assessment'
  };
}

// Utilitaires d'accessibilité
export const a11yUtils = {
  // ARIA labels dynamiques
  getProgressLabel: (current: number, total: number, score: number) => 
    `Question ${current + 1} sur ${total}. Score actuel: ${score} bonnes réponses.`,
  
  getQuestionLabel: (questionNumber: number, category: string) => 
    `Question ${questionNumber} - Catégorie: ${category}`,
  
  getOptionLabel: (optionLetter: string, isSelected: boolean, isCorrect?: boolean) => {
    let label = `Option ${optionLetter.toUpperCase()}`;
    if (isSelected) label += ' - Sélectionnée';
    if (isCorrect !== undefined) {
      label += isCorrect ? ' - Correcte' : ' - Incorrecte';
    }
    return label;
  },
  
  getFeedbackLabel: (isCorrect: boolean, correctAnswer?: string) => 
    isCorrect 
      ? 'Bonne réponse ! Félicitations.'
      : `Mauvaise réponse. ${correctAnswer ? `La bonne réponse était : ${correctAnswer}` : ''}`,
  
  // Instructions clavier
  keyboardInstructions: {
    quiz: 'Utilisez Tab pour naviguer, Entrée ou Espace pour sélectionner une réponse, Échap pour quitter.',
    navigation: 'Utilisez les flèches ↑↓ pour naviguer entre les options, Entrée pour confirmer.',
    progress: 'Barre de progression : indique votre avancement dans le quiz.'
  }
};

// Optimisations de performance
export const performanceUtils = {
  // Préchargement des images
  preloadImages: (imagePaths: string[]) => {
    if (typeof window === 'undefined') return;
    
    imagePaths.forEach(path => {
      const img = new Image();
      img.src = path;
    });
  },
  
  // Lazy loading pour contenu non critique
  createIntersectionObserver: (callback: (entries: IntersectionObserverEntry[]) => void) => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return null;
    }
    
    return new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1
    });
  },
  
  // Debounce pour événements fréquents
  debounce: <T extends (...args: any[]) => void>(func: T, wait: number): T => {
    let timeout: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    }) as T;
  }
};

// Analytics et tracking
export const analyticsUtils = {
  // Track événements quiz
  trackQuizStart: (category: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_start', {
        event_category: 'engagement',
        event_label: category,
        custom_parameter: 'quiz_certification'
      });
    }
  },
  
  trackQuestionAnswer: (questionId: number, isCorrect: boolean, category: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'question_answered', {
        event_category: 'quiz_interaction',
        event_label: category,
        custom_parameter_1: questionId,
        custom_parameter_2: isCorrect ? 'correct' : 'incorrect'
      });
    }
  },
  
  trackQuizComplete: (score: number, total: number, category: string, duration: number) => {
    const percentage = Math.round((score / total) * 100);
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_complete', {
        event_category: 'engagement',
        event_label: category,
        value: percentage,
        custom_parameter_1: `${score}/${total}`,
        custom_parameter_2: `${duration}s`
      });
    }
  }
};

// Validation et sanitization
export const securityUtils = {
  // Sanitize user input (si nécessaire pour futures fonctionnalités)
  sanitizeInput: (input: string): string => {
    return input
      .replace(/[<>"']/g, '') // Retire caractères potentiellement dangereux
      .trim()
      .substring(0, 500); // Limite la longueur
  },
  
  // Validation des paramètres
  validateQuizParams: (params: {
    questionId?: number;
    category?: string;
    difficulty?: string;
  }) => {
    const { questionId, category, difficulty } = params;
    
    return {
      questionId: typeof questionId === 'number' && questionId >= 0 ? questionId : 0,
      category: typeof category === 'string' && category.length <= 50 ? category : 'Générale',
      difficulty: ['débutant', 'intermédiaire', 'avancé'].includes(difficulty || '') 
        ? difficulty : 'intermédiaire'
    };
  }
};

export default {
  quizSEOConfig,
  generateQuizMetadata,
  generateQuizStructuredData,
  a11yUtils,
  performanceUtils,
  analyticsUtils,
  securityUtils
};
