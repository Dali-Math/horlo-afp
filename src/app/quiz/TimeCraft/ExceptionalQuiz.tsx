import React, { useState, useEffect } from 'react';
import { Check, X, Trophy, Sparkles, Brain, Zap } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "En quelle année a été fondée la marque Rolex ?",
    options: ["1895", "1905", "1915", "1925"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Rolex a été fondée en 1905 à Londres par Hans Wilsdorf, puis déménagée à Genève en 1919."
  },
  {
    id: 2,
    question: "Quelle marque suisse est associée au modèle Speedmaster, porté lors des missions Apollo ?",
    options: ["TAG Heuer", "Omega", "Longines", "Breitling"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "L’Omega Speedmaster Professional a accompagné la mission Apollo 11 en 1969."
  },
  {
    id: 3,
    question: "Quelle ville suisse est inscrite à l’UNESCO pour son urbanisme horloger ?",
    options: ["Genève", "La Chaux-de-Fonds", "Bienne", "Neuchâtel"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "La Chaux-de-Fonds et Le Locle sont inscrites à l’UNESCO pour leur urbanisme dédié à l’horlogerie."
  },
  {
    id: 4,
    question: "Quel label garantit l’origine et la qualité d’une montre fabriquée à Genève ?",
    options: ["COSC", "Poinçon de Genève", "Swiss Made", "Qualité Fleurier"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le Poinçon de Genève existe depuis 1886 et impose des critères techniques et esthétiques stricts."
  },
  {
    id: 5,
    question: "Quel organisme délivre la certification officielle de chronomètre en Suisse ?",
    options: ["METAS", "COSC", "OFEN", "CSEM"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le COSC teste la précision des mouvements selon une procédure normalisée en plusieurs positions et températures."
  },
  {
    id: 6,
    question: "Quelle marque suisse est célèbre pour le modèle Reverso ?",
    options: ["Jaeger-LeCoultre", "Vacheron Constantin", "Piaget", "H. Moser & Cie"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "La Reverso (1931) a été conçue pour les joueurs de polo, avec un boîtier réversible protégeant le cadran."
  },
  {
    id: 7,
    question: "La complication qui affiche les phases de la Lune s’appelle…",
    options: ["Tourbillon", "Calendrier annuel", "Phase de lune", "Répétition minutes"],
    correct: 2,
    category: "Horlogerie Suisse",
    funFact: "Un affichage de phase de lune précis peut ne nécessiter correction qu’après plus de 100 ans."
  },
  {
    id: 8,
    question: "Quelle marque a été fondée en 1839 à Genève et reste familiale ?",
    options: ["Patek Philippe", "Audemars Piguet", "Vacheron Constantin", "Blancpain"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Patek Philippe est réputée pour ses grandes complications et sa finition d’exception."
  },
  {
    id: 9,
    question: "Quel label exige des tests complets montre finie (magnétisme, puissance, étanchéité, précision) avec des tolérances strictes ?",
    options: ["Qualité Fleurier", "Master Chronometer (METAS)", "Observatoire de Genève", "ISO 3159"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Les tests METAS garantissent la performance de la montre entière, pas seulement du mouvement."
  },
  {
    id: 10,
    question: "La Chaux-de-Fonds et Le Locle sont situées dans quel canton ?",
    options: ["Vaud", "Valais", "Neuchâtel", "Jura"],
    correct: 2,
    category: "Horlogerie Suisse",
    funFact: "Le canton de Neuchâtel abrite une concentration historique de manufactures horlogères."
  },
  {
    id: 11,
    question: "Quelle est la réserve de marche typique d’une montre automatique moderne ?",
    options: ["12 heures", "24–48 heures", "7 jours", "30 jours"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "De nombreuses marques visent désormais 60 à 72 heures pour plus de confort d’usage."
  },
  {
    id: 12,
    question: "Quel type de mouvement utilise un balancier-spiral ?",
    options: ["Quartz", "Mécanique", "Solaire", "Radio-contrôlé"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le couple balancier-spiral régule les oscillations et la précision d’un mouvement mécanique."
  },
  {
    id: 13,
    question: "Quelle marque suisse est l’une des plus anciennes, fondée en 1755 ?",
    options: ["Breguet", "Vacheron Constantin", "Blancpain", "Girard-Perregaux"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Vacheron Constantin est en activité continue depuis 1755, un record remarquable."
  },
  {
    id: 14,
    question: "Le ‘tourbillon’ a été inventé pour…",
    options: ["Augmenter la réserve de marche", "Résister à l’eau", "Compenser l’effet de la gravité", "Faciliter l’assemblage"],
    correct: 2,
    category: "Horlogerie Suisse",
    funFact: "Abraham‑Louis Breguet a breveté le tourbillon en 1801 pour améliorer la régularité."
  },
  {
    id: 15,
    question: "Quel est le rôle du rotor dans un mouvement automatique ?",
    options: ["Afficher la date", "Remonter le ressort-moteur", "Indiquer les phases de lune", "Régler l’échappement"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le rotor tourne avec les mouvements du poignet et arme le barillet via un train d’engrenages."
  },
  {
    id: 16,
    question: "Quelle entreprise est historiquement liée au modèle Royal Oak (1972) ?",
    options: ["Audemars Piguet", "Patek Philippe", "IWC", "Zenith"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Dessiné par Gerald Genta, le Royal Oak a lancé la tendance de la montre sport-chic en acier."
  },
  {
    id: 17,
    question: "‘Swiss Made’ exige notamment que…",
    options: ["Le boîtier soit fabriqué en Suisse uniquement", "Le mouvement soit suisse et assemblé en Suisse", "Le bracelet soit suisse", "Le cadran soit peint à la main"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "La réglementation ‘Swiss Made’ a été durcie en 2017 pour renforcer la valeur ajoutée suisse."
  },
  {
    id: 18,
    question: "Quelle marque est associée au mouvement El Primero (1969) ?",
    options: ["Zenith", "Tissot", "Certina", "Hamilton"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "El Primero est l’un des premiers chronographes automatiques à haute fréquence (36’000 a/h)."
  },
  {
    id: 19,
    question: "Le Locle est surtout connu pour…",
    options: ["Ses lacs", "Son urbanisme viticole", "Son patrimoine horloger", "Ses mines d’or"],
    correct: 2,
    category: "Horlogerie Suisse",
    funFact: "Avec La Chaux-de-Fonds, Le Locle est un pôle historique majeur de l’horlogerie."
  },
  {
    id: 20,
    question: "Quelle complication sonne les heures, quarts et minutes à la demande ?",
    options: ["Répétition minutes", "GMT", "Calendrier perpétuel", "Chronographe flyback"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Les répétitions minutes exigent un réglage acoustique fin et une fabrication très complexe."
  },
  {
    id: 21,
    question: "Quelle marque a lancé la montre de plongée Fifty Fathoms en 1953 ?",
    options: ["Blancpain", "Rolex", "Doxa", "Longines"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "La Fifty Fathoms est parmi les premières montres modernes dédiées à la plongée."
  },
  {
    id: 22,
    question: "Le ‘spiral en silicium’ est apprécié car…",
    options: ["Il est plus lourd", "Il est amagnétique et stable", "Il s’use plus vite", "Il consomme moins de batterie"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le silicium réduit l’influence du magnétisme et des variations de température."
  },
  {
    id: 23,
    question: "Le ‘calibre’ désigne…",
    options: ["Le diamètre du boîtier", "Le bracelet", "Le modèle de mouvement", "La lunette"],
    correct: 2,
    category: "Horlogerie Suisse",
    funFact: "Chaque calibre possède sa référence et ses spécificités techniques."
  },
  {
    id: 24,
    question: "Quel est le rôle du barillet ?",
    options: ["Afficher la réserve de marche", "Stocker l’énergie du ressort-moteur", "Régler la précision", "Étanchéifier la boîte"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le barillet libère l’énergie progressivement pour alimenter le mouvement."
  },
  {
    id: 25,
    question: "La ‘Qualité Fleurier’ est un label impliquant…",
    options: ["Un test esthétique uniquement", "Des tests techniques et de fiabilité multiples", "Uniquement un test de précision", "Un test sonore de répétition"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le label Qualité Fleurier inclut notamment le test ‘Chronofiable’ et le ‘Fleuritest’."
  },
  {
    id: 26,
    question: "Quelle marque a présenté la Royal Oak Offshore (1993) ?",
    options: ["Audemars Piguet", "Hublot", "TAG Heuer", "Girard-Perregaux"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "La Offshore a renforcé l’esthétique sport-chic audacieuse du Royal Oak original."
  },
  {
    id: 27,
    question: "Le terme ‘haute fréquence’ (36’000 a/h) signifie…",
    options: ["Moins d’autonomie", "Plus d’oscillations par heure", "Plus d’étanchéité", "Moins de pièces"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Une fréquence élevée permet une mesure plus fine des fractions de seconde."
  },
  {
    id: 28,
    question: "Quelle complication affiche plusieurs fuseaux horaires ?",
    options: ["Quantième perpétuel", "GMT/Worldtimer", "Rattrapante", "Réserve de marche"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Les worldtimers affichent simultanément l’heure de plusieurs villes du monde."
  },
  {
    id: 29,
    question: "Le ‘quantième perpétuel’…",
    options: ["Affiche la lune", "Corrige automatiquement les mois et années bissextiles", "Chronomètre des temps courts", "Mesure la profondeur"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Il tient compte des variations de longueur des mois et des années bissextiles."
  },
  {
    id: 30,
    question: "‘Chronographe’ signifie…",
    options: ["Calendrier automatique", "Complication de mesure des intervalles de temps", "Affichage jour-nuit", "Affichage des marées"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Les chronographes peuvent intégrer des fonctions comme flyback ou rattrapante."
  },
  {
    id: 31,
    question: "Quelle maison est célèbre pour la montre Nautilus (1976) ?",
    options: ["Patek Philippe", "Rolex", "IWC", "Baume & Mercier"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Le Nautilus a été dessiné par Gerald Genta, comme le Royal Oak."
  },
  {
    id: 32,
    question: "Le ‘COSC’ teste…",
    options: ["Le boîtier", "Le mouvement seul", "La montre finie", "Le cadran"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Après le COSC, certaines maisons testent la montre finie avec d’autres protocoles (ex. METAS)."
  },
  {
    id: 33,
    question: "Quelle marque est liée au modèle Submariner ?",
    options: ["Rolex", "Omega", "Blancpain", "Tudor"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "La Submariner est une icône de la plongée professionnelle depuis les années 1950."
  },
  {
    id: 34,
    question: "‘Tudor’ est historiquement la filiale de…",
    options: ["Omega", "Rolex", "Longines", "IWC"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Tudor propose des montres robustes avec un positionnement tarifaire plus accessible."
  },
  {
    id: 35,
    question: "Le ‘guillochage’ est…",
    options: ["Une technique de polissage", "Une gravure mécanique répétitive", "Un traitement thermique", "Un test d’étanchéité"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Les cadrans guillochés à la main exigent un savoir‑faire rare."
  },
  {
    id: 36,
    question: "La ‘rattrapante’ permet…",
    options: ["De mesurer deux temps intermédiaires", "D’afficher les marées", "D’augmenter la réserve", "De régler le spiral"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Un deuxième aiguillon chrono se sépare pour capturer un temps partiel puis rejoint l’aiguille principale."
  },
  {
    id: 37,
    question: "Quel matériau est très employé pour ses propriétés amagnétiques ?",
    options: ["Laiton", "Acier 316L", "Silicium", "Cuivre"],
    correct: 2,
    category: "Horlogerie Suisse",
    funFact: "Le silicium est utilisé pour spiraux, ancres et roues d’échappement."
  },
  {
    id: 38,
    question: "‘Genève’ est surtout associée à…",
    options: ["La production de bracelets", "La montre connectée", "La haute horlogerie traditionnelle", "Les chronomètres de marine"],
    correct: 2,
    category: "Horlogerie Suisse",
    funFact: "Genève abrite de nombreuses maisons de haute horlogerie et le Poinçon de Genève."
  },
  {
    id: 39,
    question: "La ‘Côtes de Genève’ est…",
    options: ["Un test de précision", "Un décor ondulé sur ponts et platines", "Une certification", "Une matière de boîtier"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Décor typique sur les composants visibles à travers le fond saphir."
  },
  {
    id: 40,
    question: "Le ‘perlage’ est…",
    options: ["Un rodage", "Un décor de petits cercles chevauchés", "Un graissage", "Un chanfreinage"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Souvent appliqué sur la platine, il améliore l’esthétique et retient les particules."
  },
  {
    id: 41,
    question: "Quelle maison est réputée pour ses montres extra-plates ?",
    options: ["Panerai", "Piaget", "Breitling", "Doxa"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Piaget détient plusieurs records d’extra‑plat, tant pour les mouvements que pour les montres complètes."
  },
  {
    id: 42,
    question: "Un ‘échappement’ a pour rôle de…",
    options: ["Décorer les ponts", "Transmettre l’énergie au balancier par impulsions", "Remonter la montre", "Étanchéifier la boîte"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "L’échappement à ancre suisse est aujourd’hui le plus répandu."
  },
  {
    id: 43,
    question: "La ‘Glucydur’ est un alliage utilisé pour…",
    options: ["Le verre saphir", "Le balancier", "Le boîtier", "Le bracelet"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Glucydur offre stabilité dimensionnelle et faible dilatation thermique."
  },
  {
    id: 44,
    question: "Quelle marque a lancé la Big Bang en 2005 ?",
    options: ["Hublot", "Breitling", "Oris", "Raymond Weil"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "La Big Bang a popularisé l’esthétique ‘fusion’ de matériaux (céramique, or, carbone)."
  },
  {
    id: 45,
    question: "‘ETA’ est principalement…",
    options: ["Un label", "Un fabricant de mouvements", "Un salon horloger", "Une école"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "ETA fournit des mouvements à de nombreuses marques suisses (mécaniques et quartz)."
  },
  {
    id: 46,
    question: "‘Valjoux 7750’ est…",
    options: ["Un type de boîtier", "Un calibre chrono automatique célèbre", "Une norme ISO", "Un bracelet historique"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Très répandu, robuste, il équipe de nombreux chronographes suisses."
  },
  {
    id: 47,
    question: "Le ‘Lemanic’ désigne…",
    options: ["Un mouvement", "La région autour du lac Léman", "Une finition", "Un salon"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "La région lémanique (Genève, Vaud) est un pôle majeur de haute horlogerie."
  },
  {
    id: 48,
    question: "Le ‘chanfrein’ (anglage) consiste à…",
    options: ["Percer le pont", "Polir les arêtes en biseau", "Souder les pieds de cadran", "Bleuir les vis"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "L’anglage manuel reflète la lumière et témoigne d’un haut niveau de finition."
  },
  {
    id: 49,
    question: "Un ‘fond saphir’ est apprécié car…",
    options: ["Il magnétise le mouvement", "Il est plus lourd", "Il permet d’admirer la finition du mouvement", "Il consomme moins d’énergie"],
    correct: 2,
    category: "Horlogerie Suisse",
    funFact: "Le saphir synthétique est très dur et résistant aux rayures."
  },
  {
    id: 50,
    question: "‘Luminova/Super‑LumiNova’ sert à…",
    options: ["Décorer les ponts", "Rendre les index/aiguilles luminescents", "Augmenter l’étanchéité", "Réduire la friction"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Ces pigments photoluminescents sont non radioactifs et très efficaces."
  },
  {
    id: 51,
    question: "Quelle maison est célèbre pour la collection Portugieser ?",
    options: ["IWC Schaffhausen", "Longines", "Oris", "Baume & Mercier"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "La Portugieser est un pilier du design d’IWC, avec de grands cadrans lisibles."
  },
  {
    id: 52,
    question: "Le ‘spiral Breguet’ se distingue par…",
    options: ["Un matériau spécial", "Une courbe terminale surélevée", "Un décor perlé", "Une couleur bleue obligatoire"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "La courbe terminale améliore l’isochronisme du balancier."
  },
  {
    id: 53,
    question: "Le ‘bleuissage’ des vis est obtenu par…",
    options: ["Anodisation chimique", "Chauffe contrôlée", "Peinture", "Électrolyse cuivre"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le bleuissage décoratif se produit vers 290‑300°C selon l’acier."
  },
  {
    id: 54,
    question: "La ‘raquette’ d’un mouvement sert à…",
    options: ["Remonter la montre", "Ajuster la marche (avance/retard)", "Changer de fuseau", "Bloquer le rotor"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Elle modifie la longueur active du spiral et affecte la précision."
  },
  {
    id: 55,
    question: "Quelle maison a pour symbole la croix blanche sur le bouclier (logo rouge) ?",
    options: ["Victorinox Swiss Army", "TAG Heuer", "Tissot", "Mido"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Victorinox est aussi célèbre pour ses couteaux suisses multi‑usages."
  },
  {
    id: 56,
    question: "‘Le Locle’ est aussi une collection de…",
    options: ["Tissot", "Rolex", "Piaget", "Hublot"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Tissot rend hommage au berceau horloger avec cette collection classique."
  },
  {
    id: 57,
    question: "La ‘lunette tournante unidirectionnelle’ sert surtout…",
    options: ["À mesurer un temps de plongée", "À afficher un second fuseau", "À régler la date", "À améliorer l’acoustique"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Elle évite d’augmenter par erreur le temps restant sous l’eau."
  },
  {
    id: 58,
    question: "La ‘céramique’ en horlogerie est appréciée pour…",
    options: ["Sa conductivité électrique", "Sa résistance aux rayures", "Sa flexibilité", "Sa translucidité"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "De nombreuses lunettes et boîtiers modernes utilisent la céramique high‑tech."
  },
  {
    id: 59,
    question: "‘Mille Miglia’ est une collection emblématique de…",
    options: ["Chopard", "Parmigiani", "Corum", "Baume & Mercier"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Chopard est partenaire de la célèbre course italienne d’endurance automobile."
  },
  {
    id: 60,
    question: "‘Longines’ est basée historiquement à…",
    options: ["Genève", "Bienne", "Saint‑Imier", "Lausanne"],
    correct: 2,
    category: "Horlogerie Suisse",
    funFact: "Fondée en 1832, Longines est connue pour son sablier ailé et son patrimoine."
  },
  {
    id: 61,
    question: "‘Oris’ est une maison…",
    options: ["Du groupe Swatch", "Indépendante", "Du groupe Richemont", "Du groupe LVMH"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Oris est indépendante et réputée pour ses montres utilitaires et de plongée."
  },
  {
    id: 62,
    question: "Un ‘pont’ dans un mouvement est…",
    options: ["Un décor", "Une platine supérieure maintenant des pivots", "Un ressort", "Une pierre"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Les ponts maintiennent les axes des roues et protègent la cinématique."
  },
  {
    id: 63,
    question: "La ‘platine’ est…",
    options: ["La base structurelle du mouvement", "La roue d’échappement", "La lunette", "La tige de remontoir"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "C’est le châssis du mouvement sur lequel s’installent tous les organes."
  },
  {
    id: 64,
    question: "‘Serti neige’ concerne…",
    options: ["Le décor de la platine", "Un type de sertissage de diamants", "La trempe de l’acier", "La lubrification"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le serti neige utilise des diamètres variés de pierres pour un effet scintillant naturel."
  },
  {
    id: 65,
    question: "‘Cadran grené’ signifie…",
    options: ["Une finition granuleuse/poncée", "Un cadran laqué miroir", "Un cadran en bois", "Un cadran peint à l’huile"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Les finitions de cadran jouent énormément sur la perception de la lumière."
  },
  {
    id: 66,
    question: "‘Brevet CH’ vu sur des pièces signifie…",
    options: ["Brevet suisse", "Pièce en chrome", "Contrôle horloger", "Chiffre harmonisé"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "La Suisse a une longue tradition d’innovations horlogères brevetées."
  },
  {
    id: 67,
    question: "Le ‘sautoir de quantième’ intervient dans…",
    options: ["Le mécanisme de date", "L’échappement", "Le remontage automatique", "La sonnerie"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Il permet le saut franc de la date à minuit dans de nombreux calendriers."
  },
  {
    id: 68,
    question: "‘Micro‑rotor’ signifie…",
    options: ["Un rotor plus léger pour quartz", "Un rotor intégré au niveau de la platine", "Un rotor externe", "Un rotor manuel"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le micro‑rotor permet de réduire l’épaisseur du mouvement automatique."
  },
  {
    id: 69,
    question: "Le ‘rubis’ dans les mouvements sert principalement à…",
    options: ["Décorer", "Réduire la friction et l’usure", "Colorer le métal", "Isoler électriquement"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Ce sont des pierres synthétiques très dures utilisées comme paliers."
  },
  {
    id: 70,
    question: "‘Unisonic’/‘Accutron’ évoque…",
    options: ["Une montre solaire", "Un diapason (Bulova) et la haute précision", "Un tourbillon", "Une ancre en or"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le diapason a précédé le quartz pour la haute précision dans les années 60‑70."
  },
  {
    id: 71,
    question: "‘Chronofiable’ est…",
    options: ["Une huile", "Un protocole de tests de fiabilité", "Un décor", "Une complication"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Utilisé notamment dans le cadre de la Qualité Fleurier pour éprouver la durabilité."
  },
  {
    id: 72,
    question: "‘Gyromax’ est associé à…",
    options: ["Un type de lunette", "Un système de réglage du balancier Patek Philippe", "Un bracelet extensible", "Un affichage rétrograde"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le Gyromax règle l’inertie du balancier via de petites masselottes."
  },
  {
    id: 73,
    question: "Le ‘pont de chronographe’ supporte…",
    options: ["Le barillet", "Les mobiles de chronographe", "Le rotor", "Le quantième"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Il maintient roues et embrayages spécifiques au module chrono."
  },
  {
    id: 74,
    question: "‘Ponts en 3/4’ est une architecture popularisée par…",
    options: ["Glashütte", "Genève", "Lausanne", "Sion"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Bien que germanique, cette architecture est connue des amateurs suisses."
  },
  {
    id: 75,
    question: "‘Nivarox’ est surtout associé à…",
    options: ["Des huiles", "Des spiraux et organes réglants", "Des cadrans émaillés", "Des boîtiers céramique"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Nivarox fabrique des spiraux utilisés par de très nombreuses manufactures."
  },
  {
    id: 76,
    question: "‘Helvetia’ est…",
    options: ["Une déesse allégorique de la Suisse", "Une complication", "Une finition", "Un mouvement ETA"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Souvent représentée sur des timbres et pièces, symbole national suisse."
  },
  {
    id: 77,
    question: "‘Boîte coussin’ décrit…",
    options: ["Un système d’étanchéité", "Une forme de boîtier aux angles adoucis", "Un décor de cadran", "Un fermoir"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Très populaire au début du XXe siècle et dans certaines collections modernes."
  },
  {
    id: 78,
    question: "‘Émail grand feu’ est une technique…",
    options: ["De gravure laser", "D’émaillage à haute température", "De plaquage or", "De PVD"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Les cadrans en émail grand feu sont réputés pour leur profondeur et leur stabilité de couleur."
  },
  {
    id: 79,
    question: "‘Système sandwich’ (cadran) est popularisé par…",
    options: ["Panerai", "Rado", "Tudor", "Certina"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Deux couches de cadran avec matière luminescente entre elles pour une forte lisibilité."
  },
  {
    id: 80,
    question: "‘Antimagnetic’ en Suisse fut un argument clé car…",
    options: ["Le quartz était trop lourd", "Les champs magnétiques perturbent la marche", "Cela économise l’huile", "Cela rend la montre plus brillante"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Les aimants des sacs, smartphones, enceintes peuvent dérégler un mouvement mécanique."
  },
  {
    id: 81,
    question: "‘Perpétuel’ se réfère le plus souvent à…",
    options: ["La réserve de marche", "Le calendrier", "Le tourbillon", "Le boîtier"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Un quantième perpétuel gère automatiquement les mois et années bissextiles."
  },
  {
    id: 82,
    question: "‘Bienne/Biel’ est la ville siège historique de…",
    options: ["Omega", "Rolex", "Tudor", "Ulysse Nardin"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Omega possède un site industriel majeur à Bienne."
  },
  {
    id: 83,
    question: "‘Ulysse Nardin’ est célèbre pour…",
    options: ["Les chronomètres de marine", "Les montres de vol", "Les montres de course auto", "Les pendules comtoises"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "La marque a bâti sa réputation sur la précision en navigation."
  },
  {
    id: 84,
    question: "‘IWC’ signifie…",
    options: ["International Watch Company", "Innovative Watch Concept", "Independent Watchmakers Community", "Inter Watch Council"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "IWC Schaffhausen est fondée en 1868 par Florentine A. Jones, un Américain en Suisse."
  },
  {
    id: 85,
    question: "‘Minute track’ en français correspond à…",
    options: ["Chemin de fer des minutes", "Pont de minutes", "Axe de minutes", "Masse de minutes"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Motif typique le long du bord du cadran pour lire précisément les minutes."
  },
  {
    id: 86,
    question: "‘Vis bleuies’ sont obtenues par…",
    options: ["Peinture bleue", "Traitement thermique contrôlé", "Nitruration", "PVD bleu"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Outre l’esthétique, cela peut apporter une légère protection contre la corrosion."
  },
  {
    id: 87,
    question: "‘Pont de barillet’ supporte…",
    options: ["Le barillet", "La roue d’échappement", "Le balancier", "La tige de remontoir"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Il maintient l’axe de barillet et facilite l’assemblage/démontage."
  },
  {
    id: 88,
    question: "‘Cadran soleillé’ présente…",
    options: ["Un motif de rayons partant du centre", "Une surface mate uniforme", "Une texture sablée", "Un émail cloisonné"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Le brossage radial crée de beaux jeux de lumière."
  },
  {
    id: 89,
    question: "‘Boîte monobloc’ signifie…",
    options: ["Boîte sans fond amovible", "Boîte en deux parties", "Boîte en aluminium", "Boîte gravée"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Conception utilisée pour renforcer l’étanchéité sur certains modèles."
  },
  {
    id: 90,
    question: "‘Serti clos’ est…",
    options: ["Un graissage", "Un type de sertissage entourant totalement la pierre", "Un collage", "Un rivetage"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le métal forme une fine lèvre qui retient la pierre sur tout son pourtour."
  },
  {
    id: 91,
    question: "‘Pont de balancier’ maintient…",
    options: ["Le ressort de barillet", "Le balancier et son axe", "Le rotor", "Le canon de minuterie"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Pièce cruciale pour la stabilité de l’organe régulateur."
  },
  {
    id: 92,
    question: "‘Roue à colonnes’ est liée à…",
    options: ["La date", "Le chronographe", "La phase de lune", "Le GMT"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Pièce de commande traditionnelle des fonctions chronographes haut de gamme."
  },
  {
    id: 93,
    question: "‘Quartz’ en Suisse a déclenché…",
    options: ["La crise du quartz", "Le boom des tourbillons", "Le déclin de l’acier", "La fin du Swiss Made"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "La ‘crise du quartz’ des années 70‑80 a bouleversé l’industrie mécanique suisse."
  },
  {
    id: 94,
    question: "‘Tige de remontoir’ sert à…",
    options: ["Décorer le cadran", "Transmettre l’action de la couronne au mouvement", "Fixer le bracelet", "Étanchéifier le fond"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Elle permet le remontage, la mise à l’heure, parfois la date."
  },
  {
    id: 95,
    question: "‘Couronne vissée’ améliore…",
    options: ["La tenue du bracelet", "L’étanchéité", "La réserve de marche", "La précision"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Indispensable sur les plongeuses pour éviter les infiltrations d’eau."
  },
  {
    id: 96,
    question: "‘Railroad minute track’ est une expression anglaise pour…",
    options: ["Pont de minutes", "Chemin de fer des minutes", "Axe des minutes", "Roue des minutes"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Motif inspiré des rails de chemin de fer pour une lecture nette."
  },
  {
    id: 97,
    question: "‘Calibre maison’ signifie…",
    options: ["Mouvement acheté", "Mouvement développé/fabriqué en interne", "Mouvement vintage", "Mouvement quartz"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "De nombreuses manufactures suisses investissent pour produire leurs propres calibres."
  },
  {
    id: 98,
    question: "‘Boîtier tonneau’ décrit…",
    options: ["Un boîtier rond", "Un boîtier rectangulaire", "Un boîtier forme tonneau", "Un boîtier octogonal"],
    correct: 2,
    category: "Horlogerie Suisse",
    funFact: "La forme tonneau offre une alternative élégante au rond classique."
  },
  {
    id: 99,
    question: "‘Genève stripes’ en anglais correspond à…",
    options: ["Côtes de Genève", "Perlage", "Anglage", "Poli noir"],
    correct: 0,
    category: "Horlogerie Suisse",
    funFact: "Décor emblématique visible sur de nombreux mouvements suisses."
  },
  {
    id: 100,
    question: "‘Poli noir’ (poli miroir) est…",
    options: ["Un traitement chimique", "Un polissage manuel extrême donnant un noir en réflexion oblique", "Un dépôt PVD", "Une anodisation"],
    correct: 1,
    category: "Horlogerie Suisse",
    funFact: "Le poli noir révèle la perfection des surfaces : elles virent au noir selon l’angle d’observation."
  }
];

export default function ExceptionalQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showFunFact, setShowFunFact] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setShowResult(true);
      setShowFunFact(true);
    }, 500);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowFunFact(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
    setShowFunFact(false);
    setStreak(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "🎉 PARFAIT ! Vous êtes un génie !";
    if (percentage >= 80) return "🌟 Excellent ! Impressionnant !";
    if (percentage >= 60) return "👍 Très bien ! Continue comme ça !";
    if (percentage >= 40) return "💪 Pas mal ! On progresse !";
    return "📚 Il y a du potentiel ! Encore un effort !";
  };

  if (quizComplete) {
    return (
      return (
  <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 rounded-3xl shadow-xl mt-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform animate-pulse">
          <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Terminé !</h1>
          <div className="text-6xl font-bold text-purple-600 mb-4">
            {score}/{questions.length}
          </div>
          <p className="text-2xl text-gray-700 mb-6">{getScoreMessage()}</p>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6">
            <p className="text-lg text-gray-700">
              Score: <span className="font-bold">{((score / questions.length) * 100).toFixed(0)}%</span>
            </p>
          </div>
          <button
            onClick={restartQuiz}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:scale-105 transform transition shadow-lg"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">
              Question {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {streak >= 2 && (
              <div className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full animate-bounce">
                <Zap className="w-4 h-4" />
                <span className="font-bold">{streak}x</span>
              </div>
            )}
            <div className="bg-white/30 backdrop-blur px-4 py-2 rounded-full">
              <span className="text-white font-bold">Score: {score}</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500">
          <div className="mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {question.category}
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-8 leading-tight">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option: string, index: number) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-5 rounded-2xl text-left font-semibold text-lg transition-all transform hover:scale-102 ${
                    showCorrect
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                      : showWrong
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                      : isSelected
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && <Check className="w-6 h-6" />}
                    {showWrong && <X className="w-6 h-6" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showFunFact && (
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-purple-200 animate-pulse">
              <p className="text-sm font-semibold text-purple-600 mb-2">💡 Le saviez-vous ?</p>
              <p className="text-gray-700">{question.funFact}</p>
            </div>
          )}

          {showResult && (
            <button
              onClick={nextQuestion}
              className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl text-xl font-semibold hover:scale-105 transform transition shadow-lg"
            >
              {currentQuestion < questions.length - 1 ? 'Question Suivante →' : 'Voir les Résultats 🏆'}
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 bg-white/20 backdrop-blur-lg rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
