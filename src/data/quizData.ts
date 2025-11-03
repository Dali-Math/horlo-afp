// Types pour les quiz
export type Question = {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Expert';
  category: string;
};

export type Quiz = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: string;
  duration: number; // en minutes
  questionsCount: number;
  category: string;
  icon: string;
  gradient: string;
  image: string;
  questions: Question[];
  isInteractive?: boolean;
  isPersonalized?: boolean;
  component?: string;
};

// Quiz Interactifs (50 questions) - Version Documentée
export const QUIZZES_INTERACTIFS: Quiz[] = [
  {
    id: 'histoire-marques',
    title: 'Histoire des Marques Horlogères',
    subtitle: 'Les foundations des légendes suisses',
    description: 'Testez vos connaissances sur l\'histoire des grandes manufactures suisses',
    difficulty: 'Intermédiaire',
    duration: 15,
    questionsCount: 10,
    category: 'Histoire',
    icon: 'crown',
    gradient: 'from-purple-500 to-pink-500',
    image: '/images/Vacheron_Constantin_Rose_Gold_Perpetual_Calendar_Tourbillon_Watch.jpg',
    isInteractive: true,
    questions: [
      {
        id: 'hist_q1',
        prompt: 'En quelle année Vacheron Constantin a-t-elle été fondée ?',
        choices: ['1745', '1839', '1755', '1776'],
        correctIndex: 0,
        explanation: 'Vacheron Constantin est la plus ancienne manufacture horlogère encore en activité, fondée en 1745 par Jean-Marc Vacheron.',
        difficulty: 'Débutant',
        category: 'Fondations'
      },
      {
        id: 'hist_q2',
        prompt: 'Qui sont les fondateurs de Patek Philippe ?',
        choices: ['Louis Cartier & Jacques Cartier', 'Antoine Norbert de Patek & François Czapek', 'Louis Chevrolet & Gaston Chevrolet', 'Jean-Charles Chapuis & Gustave Piguet'],
        correctIndex: 1,
        explanation: 'Patek Philippe a été fondée par Antoine Norbert de Patek et François Czapek en 1839. Le nom actuel date de 1845.',
        difficulty: 'Débutant',
        category: 'Histoire'
      },
      {
        id: 'hist_q3',
        prompt: 'Où Audemars Piguet s\'est-elle établie en 1875 ?',
        choices: ['Genève', 'Vallée de Joux', 'Bienne', 'Le Locle'],
        correctIndex: 1,
        explanation: 'Audemars Piguet a été fondée dans la Vallée de Joux, région légendaire de l\'horlogerie suisse.',
        difficulty: 'Débutant',
        category: 'Géographie'
      },
      {
        id: 'hist_q4',
        prompt: 'En quelle année Rolex a-t-elle été fondée ?',
        choices: ['1905', '1886', '1839', '1895'],
        correctIndex: 0,
        explanation: 'Rolex a été fondée par Hans Wilsdorf en 1905, initialement sous le nom de Wilsdorf & Davis.',
        difficulty: 'Intermédiaire',
        category: 'Innovations'
      },
      {
        id: 'hist_q5',
        prompt: 'Qui est le créateur du design Royal Oak ?',
        choices: ['Gérald Genta', 'Jean-Charles Chapuis', 'Octave Garcia', 'Walter Lange'],
        correctIndex: 0,
        explanation: 'Gérald Genta, génie du design horloger, a créé le Royal Oak en 1972, révolutionnant l\'horlogerie.',
        difficulty: 'Intermédiaire',
        category: 'Design'
      },
      {
        id: 'hist_q6',
        prompt: 'En quelle année Jaeger-LeCoultre a-t-elle été fondée ?',
        choices: ['1903', '1910', '1931', '1912'],
        correctIndex: 1,
        explanation: 'Jaeger-LeCoultre a été fondée en 1910, fruit de la fusion de deux manufactures légendaires.',
        difficulty: 'Débutant',
        category: 'Fondations'
      },
      {
        id: 'hist_q7',
        prompt: 'Quel type de technologie moderne a révolutionné l\'horlogerie dans les années 70 ?',
        choices: ['Le quartz', 'Le mouvement automatique', 'Le Tourbillon', 'L\'électronique'],
        correctIndex: 0,
        explanation: 'Le mouvement à quartz a révolutionné l\'horlogerie dans les années 70 avec sa précision révolutionnaire.',
        difficulty: 'Intermédiaire',
        category: 'Histoire moderne'
      },
      {
        id: 'hist_q8',
        prompt: 'À partir de quelle année la maîtrise horlogère est-elle officielle en Suisse ?',
        choices: ['1601', '1701', '1801', '1901'],
        correctIndex: 0,
        explanation: 'La maîtrise horlogère est officielle en Suisse depuis 1601, marquée par les premiers règlements.',
        difficulty: 'Expert',
        category: 'Institutionnel'
      },
      {
        id: 'hist_q9',
        prompt: 'Qui est le créateur de la montre Swatch en 1983 ?',
        choices: ['Jean-Loup Dabernat', 'Nicolas Hayek', 'Jean-Pierre Savoy', 'Edmond ÉTIENNE'],
        correctIndex: 1,
        explanation: 'Nicolas Hayek a créé Swatch en 1983, révolutionnant l\'horlogerie accessible.',
        difficulty: 'Intermédiaire',
        category: 'Renaissance'
      },
      {
        id: 'hist_q10',
        prompt: 'Quelle invention de Jean Adrien Philippe a révolutionné l\'horlogerie ?',
        choices: ['Le remontage automatique', 'Le mouvement à quartz', 'Le remontoir sans clé', 'La boîte de montre'],
        correctIndex: 2,
        explanation: 'Jean Adrien Philippe a inventé le remontoir sans clé en 1842, révolutionnant le mécanisme horloger.',
        difficulty: 'Expert',
        category: 'Innovations'
      }
    ]
  },
  {
    id: 'techniques-horlogeres',
    title: 'Techniques Horlogères',
    subtitle: 'Mécanismes et complications avancées',
    description: 'Explorez les mécanismes et complications techniques de l\'horlogerie',
    difficulty: 'Expert',
    duration: 20,
    questionsCount: 10,
    category: 'Technique',
    icon: 'cog',
    gradient: 'from-blue-500 to-cyan-500',
    image: '/images/macro_precision_swiss_watch_movement_omega_coaxial.jpg',
    isInteractive: true,
    questions: [
      {
        id: 'tech_q1',
        prompt: 'Combien d\'alternances correspond une fréquence de 3 Hz ?',
        choices: ['18 000 alt/h', '21 600 alt/h', '28 800 alt/h', '36 000 alt/h'],
        correctIndex: 1,
        explanation: '3 Hz = 3 vibrations/seconde = 3 × 3600 secondes = 10 800 vibrations/heure. Mais le facteur de 2 donne 21 600 alt/h.',
        difficulty: 'Intermédiaire',
        category: 'Fréquences'
      },
      {
        id: 'tech_q2',
        prompt: 'Combien de dents la roue des phases de Lune possède-t-elle généralement ?',
        choices: ['59 dents', '63 dents', '47 dents', '61 dents'],
        correctIndex: 0,
        explanation: 'La roue des phases de Lune possède 59 dents, permettant un cycle lunaire précis de 29.5 jours.',
        difficulty: 'Expert',
        category: 'Complications'
      },
      {
        id: 'tech_q3',
        prompt: 'Quelle est la formule physique du moment de force d\'un spiral ?',
        choices: ['M = G·d·sin(φ)', 'M = F·r·cos(φ)', 'M = I·α', 'M = k·θ'],
        correctIndex: 0,
        explanation: 'Le moment de force du spiral suit la formule M = G·d·sin(φ), où G est le couple, d la distance et φ l\'angle.',
        difficulty: 'Expert',
        category: 'Physique'
      },
      {
        id: 'tech_q4',
        prompt: 'Qu\'est-ce qu\'un calibre automatique ?',
        choices: ['Un mouvement quartz', 'Un mouvement avec rotor qui se remonte automatiquement', 'Un mouvement manuelle avec complication', 'Un mouvement chronographe'],
        correctIndex: 1,
        explanation: 'Un calibre automatique se remonte grâce aux mouvements du porteur, éliminant le besoin de remontage manuel.',
        difficulty: 'Débutant',
        category: 'Mécanismes'
      },
      {
        id: 'tech_q5',
        prompt: 'Combien de types de compléments existe-t-il pour l\'échappement Swiss ?',
        choices: ['3 types', '4 types', '5 types', '6 types'],
        correctIndex: 2,
        explanation: 'L\'échappement Swiss possède 5 types de compléments pour optimiser la distribution d\'énergie.',
        difficulty: 'Expert',
        category: 'Échappement'
      },
      {
        id: 'tech_q6',
        prompt: 'Qu\'est-ce que le facteur de regulación en horlogerie ?',
        choices: ['Le rapport vitesse/poids', 'La variation de marche quotidienne', 'Le nombre de composants', 'La précision en аттестанс'],
        correctIndex: 1,
        explanation: 'Le facteur de regulación mesure la variation de marche quotidienne, critère de précision horlogère.',
        difficulty: 'Intermédiaire',
        category: 'Précision'
      },
      {
        id: 'tech_q7',
        prompt: 'Comment appelle-t-on la vitesse de rotation d\'un mouvement ?',
        choices: ['Fréquence', 'Hertz', 'Oscillation', 'Toutes ces réponses'],
        correctIndex: 3,
        explanation: 'La vitesse se mesure en hertz (Hz), nombre d\'oscillations par seconde, définissant la fréquence.',
        difficulty: 'Intermédiaire',
        category: 'Fréquences'
      },
      {
        id: 'tech_q8',
        prompt: 'Quelle température standard est utilisée pour les tests chronomètre ?',
        choices: ['20°C', '23°C', '25°C', '30°C'],
        correctIndex: 2,
        explanation: 'Les tests chronomètre se font à 25°C selon les normes internationales COSC.',
        difficulty: 'Expert',
        category: 'Normes'
      },
      {
        id: 'tech_q9',
        prompt: 'Qu\'est-ce qu\'un mouvement à remontage manuel ?',
        choices: ['Il doit être remonté quotidiennement', 'Il n\'a pas besoin de pile', 'Il s\'arrête quand il n\'est pas porté', 'Il utilise une pile'],
        correctIndex: 1,
        explanation: 'Un mouvement manuel se remonte par la couronne, n\'utilisant ni pile ni rotor.',
        difficulty: 'Débutant',
        category: 'Mécanismes'
      },
      {
        id: 'tech_q10',
        prompt: 'Que signifie la notation COSC pour un chronomètre ?',
        choices: ['Contrôle Officiel de la Certification Horlogère', 'Commission Suisse des Organismes de Certification', 'Certificats Officiels de Chronologie Suisse', 'Commission des Organismes Chronométrés'],
        correctIndex: 0,
        explanation: 'COSC = Contrôle Officiel de la Certification Horlogère, organisme certificateur suisse.',
        difficulty: 'Expert',
        category: 'Certification'
      }
    ]
  },
  {
    id: 'connaissance-marques',
    title: 'Connaissance Marques',
    subtitle: 'Modèles iconiques et caractéristiques',
    description: 'Maîtrisez les modèles iconiques et caractéristiques des grandes marques',
    difficulty: 'Intermédiaire',
    duration: 15,
    questionsCount: 10,
    category: 'Marques',
    icon: 'award',
    gradient: 'from-amber-500 to-orange-500',
    image: '/images/Patek_Philippe_Nautilus_Steel_Blue_Dial_Luxury_Watch.jpg',
    isInteractive: true,
    questions: [
      {
        id: 'marques_q1',
        prompt: 'Quel est le modèle le plus célèbre de Patek Philippe ?',
        choices: ['Nautilus', 'Calatrava', 'Aquanaut', 'Grand Complication'],
        correctIndex: 0,
        explanation: 'La Nautilus de Patek Philippe est devenue l\'icône de l\'horlogerie de luxe sportive.',
        difficulty: 'Intermédiaire',
        category: 'Modèles iconiques'
      },
      {
        id: 'marques_q2',
        prompt: 'Qui a inventé la Royal Oak ?',
        choices: ['Patek Philippe', 'Audemars Piguet', 'Vacheron Constantin', 'Rolex'],
        correctIndex: 1,
        explanation: 'Audemars Piguet a créé la Royal Oak en 1972, révolutionnant le design horloger.',
        difficulty: 'Intermédiaire',
        category: 'Innovations'
      },
      {
        id: 'marques_q3',
        prompt: 'Combien de complications la Sky Moon Tourbillon de Patek possède-t-elle ?',
        choices: ['12 complications', '16 complications', '20 complications', '24 complications'],
        correctIndex: 2,
        explanation: 'La Sky Moon Tourbillon possède 20 complications, dont le retour du calendrier perpétuel.',
        difficulty: 'Expert',
        category: 'Grandes complications'
      },
      {
        id: 'marques_q4',
        prompt: 'Quelle caractéristique distingue la Speedmaster Professional ?',
        choices: ['Boîte en or rose', 'Lunette en铝uminium', 'Étanche à 100m', 'Certified for NASA missions'],
        correctIndex: 3,
        explanation: 'La Speedmaster est la seule montre certifiée par la NASA pour les missions spatiales.',
        difficulty: 'Expert',
        category: 'Certification'
      },
      {
        id: 'marques_q5',
        prompt: 'Combien de pièces contient la Day-Date Presidential de Rolex ?',
        choices: ['Plus de 1000 pièces', 'Plus de 750 pièces', 'Plus de 500 pièces', 'Plus de 300 pièces'],
        correctIndex: 0,
        explanation: 'La Day-Date contient plus de 1000 pièces, une complejité mécanique exceptionnelle.',
        difficulty: 'Expert',
        category: 'Complejité'
      },
      {
        id: 'marques_q6',
        prompt: 'Quel métal précieux Audemars Piguet utilise-t-elle pour ses pièces uniques ?',
        choices: ['Platine', 'Or rose special', 'Palladium', 'Titane grade 5'],
        correctIndex: 1,
        explanation: 'AP utilise un or rose spécial pour ses pièces uniques, procédure secrete d\'alliage.',
        difficulty: 'Expert',
        category: 'Métaux'
      },
      {
        id: 'marques_q7',
        prompt: 'Quelle révolution la Portugieser d\'IWC a-t-elle apportée ?',
        choices: ['Le mouvement automatique', 'Le design d\'officier', 'Le calendrier perpétuel', 'Le grand format'],
        correctIndex: 3,
        explanation: 'La Portugieser a introduit le grand format en horlogerie civile en 1939.',
        difficulty: 'Intermédiaire',
        category: 'Design'
      },
    {
      id: 'marques_q8',
      prompt: 'Combien de boîtier différentes propose la Santos de Cartier ?',
      choices: ['2 versions', '3 versions', '4 versions', '5 versions'],
      correctIndex: 2,
      explanation: 'La Santos propose 4 versions : Santos Classic, Santos de Cartier, Santos Chronograph, Santos Large.',
      difficulty: 'Expert',
      category: 'Collections'
    },
    {
      id: 'marques_q9',
      prompt: 'Quelle complication rend unique le Grand Lange 1 A. Lange & Söhne ?',
      choices: ['Calendrier perpétuel', 'Grand date décentrée', 'Tourbillon', 'Chronographe'],
      correctIndex: 1,
      explanation: 'La Grand Lange 1 possède la famous Grande Date décentrée sur la gauche.',
      difficulty: 'Intermédiaire',
      category: 'Complications'
    },
    {
      id: 'marques_q10',
      prompt: 'Que signifie " Métiers d\'Art " chez Vacheron Constantin ?',
      choices: ['Art appliqués aux montres', 'Émail, gravé, кам Benoîtini', 'Revêtu en escabbergement', 'Finitions dorées'],
      correctIndex: 1,
      explanation: 'Les Métiers d\'Art regroupent les techniques ancestrales : émail, gravé, kamésの総 autres.',
      difficulty: 'Expert',
      category: 'Artisanil'
    }
    ]
  },
  {
    id: 'horlogerie-suisse',
    title: 'Horlogerie Suisse',
    subtitle: 'Traditions et innovations helvétiques',
    description: 'Découvrez les traditions et innovations de l\'horlogerie helvétique',
    difficulty: 'Intermédiaire',
    duration: 12,
    questionsCount: 10,
    category: 'Géographie',
    icon: 'map-pin',
    gradient: 'from-red-500 to-pink-500',
    image: '/images/geneva_clock_tower_swiss_architecture_horlogerie.jpg',
    isInteractive: true,
    questions: [
      {
        id: 'suisse_q1',
        prompt: 'Quelle région suisse concentre 70% de la production horlogère mondiale ?',
        choices: ['Canton du Valais', 'Vallée de Joux', 'Canton de Vaud', 'District de La Chaux-de-Fonds'],
        correctIndex: 1,
        explanation: 'La Vallée de Joux dans le canton de Vaud concentre 70% de la production mondiale horlogère.',
        difficulty: 'Intermédiaire',
        category: 'Géographie'
      },
      {
        id: 'suisse_q2',
        prompt: 'Depuis quelle année la Confédération helvétique certifie-t-elle les chronomètres ?',
        choices: ['1897', '1903', '1908', '1913'],
        correctIndex: 0,
        explanation: 'Le système de certification officielle date de 1897, première organisée mondiale.',
        difficulty: 'Expert',
        category: 'Histoire'
      },
      {
        id: 'suisse_q3',
        prompt: 'Combien de brevets horlogers la Suisse dépose-t-elle annuellement ?',
        choices: ['300 brevets', '500 brevets', '700 brevets', 'Plus de 1000 brevets'],
        correctIndex: 3,
        explanation: 'La Suisse dépose plus de 1000 brevets horlogers annuellement, garantissant l\'innovation.',
        difficulty: 'Intermédiaire',
        category: 'Innovation'
      },
      {
        id: 'suisse_q4',
        prompt: 'Quelle percentage de l\'économie suisse représente l\'horlogerie ?',
        choices: ['1,5%', '2,5%', '3,5%', '4,5%'],
        correctIndex: 2,
        explanation: 'L\'horlogerie représente 3,5% de l\'économie suisse, une influence majeure.',
        difficulty: 'Expert',
        category: 'Économie'
      },
      {
        id: 'suisse_q5',
        prompt: 'Combien d\'employés travaille-t-il dans l\'horlogerie suisse ?',
        choices: ['25 000 employés', '35 000 employés', '45 000 employés', 'Plus de 55 000 employés'],
        correctIndex: 3,
        explanation: 'Plus de 55 000 personnes travaillent dans l\'horlogerie suisse, secteur majeur.',
        difficulty: 'Expert',
        category: 'Emplois'
      },
      {
        id: 'suisse_q6',
        prompt: 'Quel événement majeur relance l\'horlogerie suisse dans les années 90 ?',
        choices: ['L\'émergence de l\'Europe', 'La révolution Swatch', 'La renaissance des mécaniques', 'L\'arrivée des quartz asiatiques'],
        correctIndex: 2,
        explanation: 'La renaissance des mécaniques dans les années 90 relança l\'horlogerie suisse.',
        difficulty: 'Intermédiaire',
        category: 'Renaissance'
      },
      {
        id: 'suisse_q7',
        prompt: 'Quelle ville suisse est surnommée "la capitale mondiale de l\'horlogerie" ?',
        choices: ['Genève', 'Lausanne', 'Bienne', 'Zurich'],
        correctIndex: 2,
        explanation: 'Bienne est surnommée la capitale mondiale de l\'horlogerie, siège de Rolex et Swatch Group.',
        difficulty: 'Intermédiaire',
        category: 'Géographie'
      },
      {
        id: 'suisse_q8',
        prompt: 'Combien de pilotes horlogers existent en Suisse ?',
        choices: ['Plus de 500', 'Plus de 700', 'Plus de 1000', 'Plus de 1500'],
        correctIndex: 2,
        explanation: 'Plus de 1000 pilotes horlogers vivent en Suisse, composant clé du savoir-faire.',
        difficulty: 'Expert',
        category: 'Formation'
      },
      {
        id: 'suisse_q9',
        prompt: 'Quelle excellente reconnaître la Swiss Made ?',
        choices: ['Borne d\'ancrage', 'Borne évolutive', 'Borne de qualité', 'Borne d\'excellence'],
        correctIndex: 0,
        explanation: 'La borne d\'ancrage définit l\'origine Swiss Made, garantissant l\'authenticité.',
        difficulty: 'Expert',
        category: 'Réglementation'
      },
      {
        id: 'suisse_q10',
        prompt: 'Dans quelles vallées se concentre la production horlogère helvétique ?',
        choices: ['Jura et Vallée de Joux', 'Alpes et Rhone', 'Plateau et Mittelland', 'Montagnes et Plaines'],
        correctIndex: 0,
        explanation: 'La production se concentre dans le Jura et la Vallée de Joux, berceau horloger.',
        difficulty: 'Intermédiaire',
        category: 'Géographie'
      }
    ]
  },
  {
    id: 'expert-complications',
    title: 'Expert Complications',
    subtitle: 'Questions ultra-techniques avancées',
    description: 'Questions ultra-techniques sur les complications avancées',
    difficulty: 'Expert',
    duration: 25,
    questionsCount: 10,
    category: 'Expert',
    icon: 'zap',
    gradient: 'from-indigo-500 to-purple-500',
    image: '/images/grand-seiko-tourbillon-watch-complication-technical-illustration.jpg',
    isInteractive: true,
    questions: [
      {
        id: 'expert_q1',
        prompt: 'Combien de composants contient le tourbillon le plus complexe au monde ?',
        choices: ['Plus de 40 composants', 'Plus de 60 composants', 'Plus de 80 composants', 'Plus de 100 composants'],
        correctIndex: 2,
        explanation: 'Le tourbillon le plus complexe contient plus de 80 composants, véritable chef-d\'œuvre.',
        difficulty: 'Expert',
        category: 'Tourbillon'
      },
      {
        id: 'expert_q2',
        prompt: 'Quel mécanisme permet le remontage automatique du quantième perpétuel ?',
        choices: ['Mécanisme à came', 'Mécanisme à ressort', 'Mécanisme à levier', 'Mécanisme à déclencheur'],
        correctIndex: 0,
        explanation: 'Le mécanisme à came gère automatiquement les sauts de dates, mois et années bissextiles.',
        difficulty: 'Expert',
        category: 'Quantième perpétuel'
      },
      {
        id: 'expert_q3',
        prompt: 'Combien de résonances produce un double tourbillon en quadrature ?',
        choices: ['1 résonance', '2 résonances', '3 résonances', '4 résonances'],
        correctIndex: 3,
        explanation: 'Le double tourbillon en quadrature produit 4 résonances, optimisation maximale.',
        difficulty: 'Expert',
        category: 'Résonances'
      },
      {
        id: 'expert_q4',
        prompt: 'Quelle précision atteint un mouvement constitue certifié COSC ?',
        choices: ['± 10 secondes/jour', '± 5 secondes/jour', '± 2 secondes/jour', '± 1 seconde/jour'],
        correctIndex: 2,
        explanation: 'La certification COSC exige une précision de ± 2 secondes/jour, précision exceptionnelle.',
        difficulty: 'Expert',
        category: 'Certification'
      },
      {
        id: 'expert_q5',
        prompt: 'Quel algorithme optimise le spiral hi-tech des montres modernes ?',
        choices: ['Spiral àutomatique', 'Spiral à частоту', 'Spiral à arqu保 зн', 'Spiral à индексации'],
        correctIndex: 2,
        explanation: 'L\'algorithme d\'arqu保 зн optimise le spiral hi-tech, maximisant l\'isochronisme.',
        difficulty: 'Expert',
        category: 'Technologie'
      },
      {
        id: 'expert_q6',
        prompt: 'Combien de tentatives de régulation le mouvement giveur d\'histoire possède-t-il ?',
        choices: ['15 tentatives', '21 tentatives', '28 tentatives', '35 tentatives'],
        correctIndex: 1,
        explanation: 'Le mouvement giveur d\'histoire possède 21 tentatives de régulation, finesse extrême.',
        difficulty: 'Expert',
        category: 'Régulation'
      },
      {
        id: 'expert_q7',
        prompt: 'Quelle technologie révolutionne les échappements modernes ?',
        choices: ['L\'échappement à souhaitez', 'L\'échappement non-magnétique', 'L\'échappement à 列 Г', 'L\'échappement dual-balance'],
        correctIndex: 1,
        explanation: 'L\'échappement non-magnétique révolutionne l\'horlogerie moderne, immunity électromagnétique.',
        difficulty: 'Expert',
        category: 'Innovation'
      },
      {
        id: 'expert_q8',
        prompt: 'Combien de types de siliconSi13 créé pour l\'horlogerie ?',
        choices: ['Plus de 20 types', 'Plus de 30 types', 'Plus de 40 types', 'Plus de 50 types'],
        correctIndex: 2,
        explanation: 'Plus de 40 types de siliconSi13 ont été créés spécifiquement pour l\'horlogerie.',
        difficulty: 'Expert',
        category: 'Matériaux'
      },
      {
        id: 'expert_q9',
        prompt: 'Quel principe physique régit la régulation des balanciers-spiraux ?',
        choices: ['La loi d\'Ohm', 'Le principe d\'Arquennes', 'La loi de Newton', 'Le théorème de résonance'],
        correctIndex: 1,
        explanation: 'Le principe d\'Arquennes régit la régulation des balanciers-spiraux, base théorique.',
        difficulty: 'Expert',
        category: 'Physique'
      },
      {
        id: 'expert_q10',
        prompt: 'Combien de diamètres le balancier perfectionné possède-t-il ?',
        choices: ['Plus de 20 diamètres', 'Plus de 30 diamètres', 'Plus de 40 diamètres', 'Plus de 50 diamètres'],
        correctIndex: 2,
        explanation: 'Le balancier perfectionné possède plus de 40 diamètres, optimization extrême.',
        difficulty: 'Expert',
        category: 'Précision'
      }
    ]
  }
];

// Quiz Personnalisés Utilisateur
export const QUIZZES_PERSONNALISES: Quiz[] = [
  {
    id: 'quiz-conversions',
    title: 'Quiz Conversions Horlogerie',
    subtitle: 'Maîtrisez les conversions µm ↔ mm',
    description: '200+ questions sur les conversions de précision horlogère',
    difficulty: 'Intermédiaire',
    duration: 15,
    questionsCount: 200,
    category: 'Technique',
    icon: 'ruler',
    gradient: 'from-blue-500 to-cyan-500',
    image: '/images/macro_precision_swiss_watch_movement_omega_coaxial.jpg',
    isPersonalized: true,
    component: 'QuizConversions',
    questions: [] // Questions chargées dynamiquement
  },
  {
    id: 'memory-game-6497',
    title: 'Memory Game Mouvement 6497',
    subtitle: 'Mémorisez les composants du calibre',
    description: '18 cartes de mémoire sur les pièces horlogères',
    difficulty: 'Débutant',
    duration: 8,
    questionsCount: 18,
    category: 'Mémorisation',
    icon: 'cpu',
    gradient: 'from-purple-500 to-pink-500',
    image: '/images/Patek_Philippe_Swiss_watch_movement_caliber_mechanism_technical_photo.jpg',
    isPersonalized: true,
    component: 'MemoryGame6497',
    questions: [] // Questions chargées dynamiquement
  },
  {
    id: 'atelier-horloger',
    title: 'Atelier Horloger - Tetris',
    subtitle: 'Jeu de précision avec pièces horlogères',
    description: 'Assemblez les pièces comme un maître horloger',
    difficulty: 'Expert',
    duration: 20,
    questionsCount: 7,
    category: 'Jeu',
    icon: 'settings',
    gradient: 'from-amber-500 to-orange-500',
    image: '/images/laurent-ferrier-swiss-watch-movement-macro-precision-caliber.jpg',
    isPersonalized: true,
    component: 'AtelierHorloger',
    questions: [] // Questions chargées dynamiquement
  }
];

// Questions de conversions µm ↔ mm
export const QUESTIONS_CONVERSIONS: Question[] = [
  { id: "Q1", prompt: "50 µm = ... mm", choices: ["0,005 mm", "0,5 mm", "50 mm", "0,05 mm"], correctIndex: 3, explanation: "1 mm = 1000 µm → 50 ÷ 1000 = 0,05 mm.", difficulty: 'Débutant', category: 'Conversions' },
  { id: "Q2", prompt: "80 µm = ... mm", choices: ["80 mm", "0,008 mm", "0,08 mm", "0,8 mm"], correctIndex: 2, explanation: "1 mm = 1000 µm → 80 ÷ 1000 = 0,08 mm.", difficulty: 'Débutant', category: 'Conversions' },
  { id: "Q3", prompt: "100 µm = ... mm", choices: ["1 mm", "100 mm", "0,01 mm", "0,1 mm"], correctIndex: 3, explanation: "1 mm = 1000 µm → 100 ÷ 1000 = 0,1 mm.", difficulty: 'Débutant', category: 'Conversions' },
  // ... Ajout des 197 autres questions similaires
];

// Cartes pour le Memory Game (Mouvement 6497)
export const CARTES_MOUVEMENT_6497 = [
  "barillet", "balancier", "rochet", "roue-moyenne", "ancre", "spiral",
  "roue-echappement", "pont-barillet", "mobile-de-centre", "pont-balancier",
  "axe-balancier", "ressort-de-bascule", "pignon-coulant", "platine",
  "réglage-fin", "pont-roues", "rondelle-balancier", "tourillon-axe"
];

// Configuration des sections éducatives
export const SECTIONS_EDUCATIVES = [
  {
    id: 'timeline',
    title: 'Timeline Horlogerie',
    subtitle: 'De la Renaissance à 2024',
    description: 'Découvrez l\'histoire fascinante de l\'horlogerie',
    component: 'Timeline'
  },
  {
    id: 'marques',
    title: 'Marques Prestigieuses',
    subtitle: 'Les légendes horlogères suisses',
    description: 'Patek Philippe, Rolex, Audemars Piguet et plus',
    component: 'MarquesGallery'
  },
  {
    id: 'mecanismes',
    title: 'Mécanismes & Techniques',
    subtitle: 'L\'art de la précision',
    description: 'Tourbillon, chronographe, quantième perpétuel',
    component: 'MecanismesSection'
  }
];

// Export de tous les quiz combinés
export const TOUS_LES_QUIZZES = [...QUIZZES_INTERACTIFS, ...QUIZZES_PERSONNALISES];

export type QuizFinal = Quiz;
