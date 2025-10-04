// Questions pour le jeu Vrai/Faux Horlogerie

export interface Question {
  id: number;
  question: string;
  correctAnswer: boolean;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Le balancier d'une montre mécanique oscille généralement à une fréquence de 28 800 alternances par heure.",
    correctAnswer: true,
    explanation: "C'est correct ! La plupart des montres mécaniques modernes ont un balancier qui oscille à 28 800 alternances/heure (4 Hz)."
  },
  {
    id: 2,
    question: "Le spiral d'une montre est toujours fabriqué en acier.",
    correctAnswer: false,
    explanation: "Faux. Bien que l'acier soit commun, les spiraux modernes peuvent être en silicium, Nivarox, ou autres alliages spéciaux."
  },
  {
    id: 3,
    question: "Un chronographe est une montre qui affiche plusieurs fuseaux horaires.",
    correctAnswer: false,
    explanation: "Faux. Un chronographe est une montre avec fonction chronomètre. C'est le GMT qui affiche plusieurs fuseaux horaires."
  },
  {
    id: 4,
    question: "La réserve de marche d'une montre automatique standard est généralement de 38 à 48 heures.",
    correctAnswer: true,
    explanation: "Correct ! La plupart des mouvements automatiques ont une réserve de marche entre 38 et 48 heures."
  },
  {
    id: 5,
    question: "Le rubis dans une montre mécanique est uniquement décoratif.",
    correctAnswer: false,
    explanation: "Faux. Les rubis synthétiques servent de paliers pour réduire les frottements et l'usure des pivots."
  },
  {
    id: 6,
    question: "Une montre certifiée chronomètre a été testée par le COSC.",
    correctAnswer: true,
    explanation: "Correct ! Le COSC (Contrôle Officiel Suisse des Chronomètres) certifie la précision des montres chronomètres."
  },
  {
    id: 7,
    question: "Le tourbillon a été inventé pour améliorer la précision des montres-bracelets.",
    correctAnswer: false,
    explanation: "Faux. Le tourbillon a été inventé par Breguet en 1795 pour les montres de gousset, afin de compenser les effets de la gravité en position verticale."
  },
  {
    id: 8,
    question: "Une montre à quartz est plus précise qu'une montre mécanique.",
    correctAnswer: true,
    explanation: "Correct ! Les montres à quartz ont une précision d'environ ±15 secondes/mois, contre plusieurs secondes/jour pour les mécaniques."
  },
  {
    id: 9,
    question: "Le remontage d'une montre automatique se fait uniquement par les mouvements du poignet.",
    correctAnswer: true,
    explanation: "Correct ! Le rotor oscillant capte l'énergie des mouvements du poignet pour remonter le ressort moteur."
  },
  {
    id: 10,
    question: "Une montre étanche à 30m peut être utilisée pour la natation.",
    correctAnswer: false,
    explanation: "Faux. 30m (3 ATM) résiste aux éclaboussures uniquement. Il faut minimum 100m (10 ATM) pour la natation."
  },
  {
    id: 11,
    question: "Le calibre d'une montre désigne la taille et le type de son mouvement.",
    correctAnswer: true,
    explanation: "Correct ! Le calibre identifie les dimensions et les caractéristiques techniques du mouvement horloger."
  },
  {
    id: 12,
    question: "Les aiguilles lumineuses modernes utilisent du radium radioactif.",
    correctAnswer: false,
    explanation: "Faux. Le radium a été remplacé par des matériaux non radioactifs comme le Super-LumiNova depuis les années 1990."
  },
  {
    id: 13,
    question: "Un mouvement manufacture signifie que tous les composants sont fabriqués en interne.",
    correctAnswer: true,
    explanation: "Correct ! Un mouvement manufacture est développé et fabriqué par la marque elle-même, de A à Z."
  },
  {
    id: 14,
    question: "Le verre saphir d'une montre est fabriqué à partir de saphir naturel.",
    correctAnswer: false,
    explanation: "Faux. Le verre saphir est du corindon synthétique (cristallisé d'oxyde d'aluminium), extrêmement résistant aux rayures."
  },
  {
    id: 15,
    question: "Une complication horlogère est un dysfonctionnement de la montre.",
    correctAnswer: false,
    explanation: "Faux. Une complication est une fonction additionnelle au-delà de l'heure simple (calendrier, phases de lune, etc.)."
  },
  {
    id: 16,
    question: "Le mouvement ETA 2824-2 est l'un des mouvements automatiques les plus utilisés.",
    correctAnswer: true,
    explanation: "Correct ! L'ETA 2824-2 est un mouvement robuste et fiable utilisé par de nombreuses marques horlogères."
  },
  {
    id: 17,
    question: "Le terme 'Genève' sur un cadran garantit que la montre est suisse.",
    correctAnswer: false,
    explanation: "Faux. Seul le Poinçon de Genève certifie l'origine et la qualité. Le mot seul n'est pas une garantie légale."
  },
  {
    id: 18,
    question: "Un échappement co-axial nécessite moins d'huile qu'un échappement à ancre suisse.",
    correctAnswer: true,
    explanation: "Correct ! L'échappement co-axial d'Omega réduit les frottements et nécessite moins de lubrification."
  },
  {
    id: 19,
    question: "La fonction GMT permet de lire l'heure de deux fuseaux horaires simultanément.",
    correctAnswer: true,
    explanation: "Correct ! Une montre GMT (Greenwich Mean Time) affiche l'heure locale et un second fuseau horaire."
  },
  {
    id: 20,
    question: "Une montre squelette montre le mouvement uniquement au dos.",
    correctAnswer: false,
    explanation: "Faux. Une montre squelette (skeleton) expose le mouvement visible par le cadran, avec des ponts ajourés."
  }
];
