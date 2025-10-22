// data/quizzes.ts
// Exemples de quiz pour HorloLearn

export const quizzes = [
  {
    id: 'echappement-suisse',
    title: 'Quiz Échappement Suisse',
    description: 'Testez vos connaissances sur l\'échappement à ancre suisse, pièce maîtresse de l\'horlogerie mécanique.',
    duration: 15,
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'Quelle est la fréquence standard d\'un mouvement ETA 2824-2 ?',
        options: [
          '21,600 alternances/heure (3 Hz)',
          '25,200 alternances/heure (3.5 Hz)',
          '28,800 alternances/heure (4 Hz)',
          '36,000 alternances/heure (5 Hz)',
        ],
        correctAnswer: 2,
        explanation: 'L\'ETA 2824-2 oscille à 28,800 alternances/heure, soit 4 Hz. C\'est la fréquence standard pour la plupart des mouvements modernes, offrant un excellent compromis entre précision et autonomie de marche.',
        difficulty: 'facile',
        category: 'Mouvements',
      },
      {
        id: 'q2',
        question: 'Combien de composants compte un échappement à ancre suisse complet ?',
        options: [
          '2 composants (ancre et roue d\'échappement)',
          '3 composants (ancre, roue d\'échappement et plateau)',
          '4 composants (ancre, roue d\'échappement, plateau et double plateau)',
          '5 composants ou plus',
        ],
        correctAnswer: 1,
        explanation: 'Un échappement à ancre suisse complet comprend 3 composants principaux : l\'ancre avec ses palettes, la roue d\'échappement avec ses dents, et le plateau (double plateau) fixé sur l\'axe du balancier avec sa cheville.',
        difficulty: 'moyen',
        category: 'Échappement',
      },
      {
        id: 'q3',
        question: 'Quel est le rôle principal de l\'échappement dans un mouvement mécanique ?',
        options: [
          'Stocker l\'énergie du barillet',
          'Réguler et entretenir les oscillations du balancier',
          'Transmettre l\'heure aux aiguilles',
          'Remonter le ressort moteur',
        ],
        correctAnswer: 1,
        explanation: 'L\'échappement a deux fonctions essentielles : diviser le temps en intervalles réguliers en contrôlant le déroulement de la force motrice, et entretenir les oscillations du balancier en lui transmettant de petites impulsions d\'énergie.',
        difficulty: 'facile',
        category: 'Théorie',
      },
      {
        id: 'q4',
        question: 'Quelle est l\'amplitude optimale d\'un balancier dans un mouvement bien réglé ?',
        options: [
          '180° à 220°',
          '220° à 270°',
          '270° à 310°',
          '310° à 360°',
        ],
        correctAnswer: 2,
        explanation: 'L\'amplitude optimale d\'un balancier se situe généralement entre 270° et 310°. Une amplitude trop faible indique un manque d\'énergie ou des frottements excessifs, tandis qu\'une amplitude trop élevée peut causer des problèmes de dégagement.',
        difficulty: 'moyen',
        category: 'Réglage',
      },
      {
        id: 'q5',
        question: 'Qu\'est-ce que le "tirage" dans un échappement à ancre ?',
        options: [
          'La force qui maintient l\'ancre contre sa butée',
          'Le mouvement de l\'ancre lors du dégagement',
          'La résistance du spiral',
          'L\'amplitude du balancier',
        ],
        correctAnswer: 0,
        explanation: 'Le tirage est la composante tangentielle de la force exercée par la dent d\'échappement sur la palette, qui maintient l\'ancre fermement contre sa butée. C\'est un élément essentiel pour la sécurité de l\'échappement.',
        difficulty: 'difficile',
        category: 'Technique avancée',
      },
      {
        id: 'q6',
        question: 'Combien de dents possède généralement une roue d\'échappement ?',
        options: [
          '12 dents',
          '15 dents',
          '18 dents',
          '20 dents',
        ],
        correctAnswer: 1,
        explanation: 'Une roue d\'échappement suisse standard possède généralement 15 dents. Ce nombre permet un bon équilibre entre la taille de la roue, la sécurité de l\'échappement et la transmission d\'énergie au balancier.',
        difficulty: 'moyen',
        category: 'Composants',
      },
      {
        id: 'q7',
        question: 'Quelle est la différence entre l\'échappement à ancre suisse et l\'échappement à cylindre ?',
        options: [
          'L\'ancre suisse est plus précis mais moins robuste',
          'Le cylindre est plus moderne et performant',
          'L\'ancre suisse offre une meilleure sécurité et moins de frottements',
          'Il n\'y a pas de différence significative',
        ],
        correctAnswer: 2,
        explanation: 'L\'échappement à ancre suisse est supérieur à l\'échappement à cylindre car il offre une meilleure sécurité (tirage), des frottements réduits (échappement à repos) et une meilleure transmission d\'énergie. C\'est pourquoi il a largement remplacé l\'échappement à cylindre.',
        difficulty: 'moyen',
        category: 'Histoire',
      },
      {
        id: 'q8',
        question: 'Quel est le couple de serrage recommandé pour visser le coq d\'un ETA 2824-2 ?',
        options: [
          '0.5 à 1.0 Ncm',
          '1.0 à 1.5 Ncm',
          '1.5 à 2.0 Ncm',
          '2.0 à 2.5 Ncm',
        ],
        correctAnswer: 1,
        explanation: 'Le couple de serrage recommandé pour les vis du coq sur un ETA 2824-2 est de 1.0 à 1.5 Ncm. Un serrage trop faible risque le desserrage, tandis qu\'un serrage excessif peut endommager le filetage ou déformer les pièces.',
        difficulty: 'difficile',
        category: 'Pratique',
      },
      {
        id: 'q9',
        question: 'Que signifie le terme "dégagement" dans un échappement ?',
        options: [
          'La libération de l\'énergie du barillet',
          'Le moment où l\'ancre libère la roue d\'échappement',
          'L\'espace entre le balancier et le coq',
          'La distance entre les palettes',
        ],
        correctAnswer: 1,
        explanation: 'Le dégagement est le moment crucial où l\'impulsion du balancier sur la cheville pousse l\'ancre, libérant ainsi la dent de la roue d\'échappement. C\'est à cet instant que la roue transmet une impulsion au balancier via la palette.',
        difficulty: 'moyen',
        category: 'Fonctionnement',
      },
      {
        id: 'q10',
        question: 'Quelle huile est généralement utilisée pour lubrifier les palettes d\'un échappement ?',
        options: [
          'Huile pour barillet (8200)',
          'Huile synthétique ultra-fluide (9010)',
          'Huile pour échappement (9415)',
          'Graisse pour rouages (9501)',
        ],
        correctAnswer: 2,
        explanation: 'L\'huile spécifique pour échappement, comme la Moebius 9415, est utilisée sur les palettes. Elle a une viscosité adaptée aux hautes vitesses et aux faibles charges de l\'échappement, tout en résistant au vieillissement.',
        difficulty: 'difficile',
        category: 'Lubrification',
      },
    ],
  },

  {
    id: 'base-horlogerie',
    title: 'Les Bases de l\'Horlogerie',
    description: 'Quiz pour débutants : vocabulaire essentiel et concepts fondamentaux de l\'horlogerie mécanique.',
    duration: 10,
    passingScore: 60,
    questions: [
      {
        id: 'b1',
        question: 'Qu\'est-ce qu\'un "calibre" en horlogerie ?',
        options: [
          'La taille du boîtier de la montre',
          'Le mouvement horloger et ses caractéristiques',
          'Le diamètre du cadran',
          'L\'épaisseur du verre saphir',
        ],
        correctAnswer: 1,
        explanation: 'Un calibre désigne le mouvement horloger dans son ensemble, avec toutes ses caractéristiques techniques : dimensions, nombre de rubis, fréquence, autonomie, complications, etc. Par exemple, "ETA 2824-2" est un calibre automatique de 25.6mm.',
        difficulty: 'facile',
        category: 'Vocabulaire',
      },
      {
        id: 'b2',
        question: 'Quelle est la fonction du barillet dans un mouvement mécanique ?',
        options: [
          'Régler l\'heure',
          'Stocker l\'énergie du ressort moteur',
          'Afficher la date',
          'Protéger le mouvement',
        ],
        correctAnswer: 1,
        explanation: 'Le barillet est un tambour cylindrique qui contient le ressort moteur. Lorsqu\'on remonte la montre, on enroule ce ressort qui stocke l\'énergie mécanique. En se déroulant progressivement, il fournit l\'énergie nécessaire au fonctionnement du mouvement.',
        difficulty: 'facile',
        category: 'Composants',
      },
      {
        id: 'b3',
        question: 'Combien de rubis (pierres) possède généralement un mouvement mécanique de qualité ?',
        options: [
          '7 rubis minimum',
          '15 à 17 rubis',
          '21 à 25 rubis',
          '30 rubis ou plus',
        ],
        correctAnswer: 1,
        explanation: 'Un mouvement mécanique de qualité possède généralement entre 15 et 17 rubis. Ces pierres synthétiques sont utilisées comme paliers pour réduire les frottements aux points de pivotement. Un ETA 2824-2 standard a 25 rubis.',
        difficulty: 'facile',
        category: 'Technique',
      },
      {
        id: 'b4',
        question: 'Quelle est la différence entre une montre "automatique" et une montre "manuelle" ?',
        options: [
          'L\'automatique fonctionne à pile',
          'L\'automatique se remonte avec les mouvements du poignet',
          'La manuelle est plus précise',
          'Il n\'y a aucune différence',
        ],
        correctAnswer: 1,
        explanation: 'Une montre automatique possède un rotor (masse oscillante) qui tourne librement avec les mouvements du poignet et remonte automatiquement le ressort moteur. Une montre manuelle nécessite un remontage quotidien via la couronne.',
        difficulty: 'facile',
        category: 'Types de montres',
      },
      {
        id: 'b5',
        question: 'Que signifie "réserve de marche" ?',
        options: [
          'Le poids de la montre',
          'La précision du mouvement',
          'L\'autonomie de fonctionnement une fois remontée',
          'La distance que parcourt l\'aiguille',
        ],
        correctAnswer: 2,
        explanation: 'La réserve de marche indique la durée pendant laquelle la montre continue de fonctionner après avoir été complètement remontée. Par exemple, l\'ETA 2824-2 offre environ 38 heures de réserve de marche.',
        difficulty: 'facile',
        category: 'Caractéristiques',
      },
    ],
  },

  {
    id: 'calibre-eta2824',
    title: 'Maîtriser l\'ETA 2824-2',
    description: 'Quiz spécialisé sur le calibre ETA 2824-2, le mouvement automatique le plus répandu en horlogerie.',
    duration: 20,
    passingScore: 75,
    questions: [
      {
        id: 'e1',
        question: 'En quelle année le calibre ETA 2824 a-t-il été introduit ?',
        options: [
          '1955',
          '1972',
          '1982',
          '1995',
        ],
        correctAnswer: 1,
        explanation: 'Le calibre ETA 2824 a été introduit en 1972 par ETA SA, basé sur le calibre Eterna 1427. La version 2824-2, qui est la plus courante aujourd\'hui, a suivi quelques années plus tard avec des améliorations techniques.',
        difficulty: 'moyen',
        category: 'Histoire',
      },
      {
        id: 'e2',
        question: 'Quel est le diamètre du calibre ETA 2824-2 ?',
        options: [
          '23.3 mm (10.5 lignes)',
          '25.6 mm (11.5 lignes)',
          '28.0 mm (12.5 lignes)',
          '30.4 mm (13.5 lignes)',
        ],
        correctAnswer: 1,
        explanation: 'Le calibre ETA 2824-2 mesure 25.6 mm de diamètre, soit 11.5 lignes françaises. Son épaisseur est de 4.6 mm. Ces dimensions en font un mouvement compact et polyvalent.',
        difficulty: 'moyen',
        category: 'Spécifications',
      },
      {
        id: 'e3',
        question: 'Dans quel sens tourne le rotor de l\'ETA 2824-2 ?',
        options: [
          'Sens horaire uniquement',
          'Sens antihoraire uniquement',
          'Bidirectionnel (remontage dans les deux sens)',
          'Il ne tourne pas',
        ],
        correctAnswer: 2,
        explanation: 'L\'ETA 2824-2 dispose d\'un système de remontage automatique bidirectionnel. Le rotor remonte le ressort moteur quelle que soit sa direction de rotation, ce qui améliore l\'efficacité du remontage automatique.',
        difficulty: 'moyen',
        category: 'Fonctionnement',
      },
      {
        id: 'e4',
        question: 'Combien de positions de réglage sont généralement effectuées sur un ETA 2824-2 de qualité chronométrique ?',
        options: [
          '2 positions',
          '3 positions',
          '5 positions',
          '6 positions',
        ],
        correctAnswer: 2,
        explanation: 'Un ETA 2824-2 de qualité chronométrique est réglé en 5 positions : cadran haut, cadran bas, couronne haut, couronne bas, couronne gauche. Certains calibres de haute précision peuvent même être réglés en 6 positions.',
        difficulty: 'difficile',
        category: 'Réglage',
      },
      {
        id: 'e5',
        question: 'Quel est le système de changement de date du 2824-2 ?',
        options: [
          'Changement instantané à minuit',
          'Changement progressif sur 2 heures',
          'Changement rapide mais non instantané',
          'Pas de fonction date',
        ],
        correctAnswer: 2,
        explanation: 'L\'ETA 2824-2 possède un système de changement de date rapide mais non instantané. Le disque de date bascule en quelques minutes autour de minuit, contrairement aux systèmes instantanés qui changent en une fraction de seconde.',
        difficulty: 'moyen',
        category: 'Complications',
      },
    ],
  },
];

// Fonction helper pour récupérer un quiz par son ID
export function getQuizById(id: string) {
  return quizzes.find(quiz => quiz.id === id);
}

// Fonction pour récupérer tous les quiz
export function getAllQuizzes() {
  return quizzes;
}

// Fonction pour récupérer les résultats depuis localStorage
export function getQuizResults(quizId: string) {
  if (typeof window === 'undefined') return [];
  
  const key = `quiz-results-${quizId}`;
  const results = localStorage.getItem(key);
  return results ? JSON.parse(results) : [];
}

// Fonction pour obtenir les statistiques globales
export function getGlobalStats() {
  if (typeof window === 'undefined') return null;
  
  const stats = {
    totalQuizzes: 0,
    totalQuestions: 0,
    averageScore: 0,
    totalTimeSpent: 0,
  };

  quizzes.forEach(quiz => {
    const results = getQuizResults(quiz.id);
    if (results.length > 0) {
      stats.totalQuizzes += results.length;
      stats.totalQuestions += results.reduce((sum: number, r: any) => sum + r.totalQuestions, 0);
      stats.averageScore += results.reduce((sum: number, r: any) => sum + r.percentage, 0);
      stats.totalTimeSpent += results.reduce((sum: number, r: any) => sum + r.timeSpent, 0);
    }
  });

  if (stats.totalQuizzes > 0) {
    stats.averageScore = Math.round(stats.averageScore / stats.totalQuizzes);
  }

  return stats;
}
