
import { Watch } from '@/types/types';
export const watches: Watch[] = [
  {
    id: '1',
    name: 'Complication Noire',
    collection: 'Grandes Complications',
    image: 'https://images.unsplash.com/photo-1639043722204-02252c774138?q=80&w=2574&auto=format&fit=crop',
    description: 'Tourbillon volant squelette, boîte titane DLC noir. Une vision futuriste de la tradition.',
    longDescription: "La 'Complication Noire' incarne la dualité entre l'héritage séculaire et l'avant-garde futuriste. Ce garde-temps exceptionnel dévoile un mouvement squeletté d'une finesse architecturale rare, où chaque pont a été anglé à la main avant de recevoir un traitement NAC anthracite. Le tourbillon volant, dépourvu de pont supérieur, semble flotter dans le néant, défiant la gravité avec une légèreté hypnotique. Le boîtier en titane Grade 5, traité DLC noir, offre une résistance extrême tout en conservant une légèreté surprenante au poignet.",
    features: ['Tourbillon', 'Titane Grade 5', 'Squelette'],
    technicalSpecs: {
      reference: "REF-9021-TB-BLK",
      movement: "Calibre Manufacture HL-09 à remontage manuel",
      caseMaterial: "Titane Grade 5 microbillé DLC noir",
      diameter: "42 mm",
      dial: "Squelette sur platine en saphir fumé",
      powerReserve: "72 heures",
      waterResistance: "30 mètres (3 ATM)",
      strap: "Caoutchouc vulcanisé noir",
      jewels: "19 Rubis (Synthétique)",
      caseBack: "Fond saphir vissé en titane DLC, offrant une vue panoramique sur l'architecture inversée du calibre et ses ponts anglés main. Gravure du numéro individuel de série limitée."
    },
    strapOptions: [
      { id: 'rubber', name: 'Caoutchouc Vulcanisé', material: 'rubber', color: '#1a1a1a' },
      { id: 'textile', name: 'Textile Technique', material: 'fabric', color: '#333333' },
      { id: 'alligator', name: 'Alligator Noir Mat', material: 'leather', color: '#000000' }
    ]
  },
  {
    id: '2',
    name: 'Royal Oak Heritage',
    collection: 'Icônes',
    image: 'https://images.unsplash.com/photo-1547996663-b83d34c43129?q=80&w=2574&auto=format&fit=crop',
    description: 'L\'élégance sportive par excellence. Cadran tapisserie bleu nuit, or rose 18 carats.',
    longDescription: "Hommage aux lignes audacieuses des années 70, la Royal Oak Heritage réinterprète les codes du sport-chic de luxe. Son boîtier en or rose 18 carats joue avec la lumière grâce à une alternance de surfaces satinées et polies, signature de la Manufacture. Le cadran, orné du motif 'Grande Tapisserie' dans une teinte bleu nuit profonde, est réalisé sur des machines à guillocher centenaires. Le mouvement automatique extra-plat assure une élégance discrète sous la manchette.",
    features: ['Or Rose', 'Automatique', '39mm'],
    technicalSpecs: {
      reference: "REF-15500-OR-BLU",
      movement: "Calibre Automatique 4302",
      caseMaterial: "Or Rose 18 carats",
      diameter: "39 mm",
      dial: "Bleu Nuit, motif Grande Tapisserie",
      powerReserve: "70 heures",
      waterResistance: "50 mètres (5 ATM)",
      strap: "Or Rose 18 carats",
      jewels: "32 Rubis (Synthétique)",
      caseBack: "Fond saphir avec traitement anti-reflet révélant la masse oscillante en or rose 22 carats squelettée, ornée du monogramme 'HL' et pivotant sur roulements à billes céramique."
    },
    strapOptions: [
      { id: 'gold', name: 'Bracelet Or Rose', material: 'metal', color: '#E6CB7D' },
      { id: 'leather', name: 'Alligator Bleu Nuit', material: 'leather', color: '#0a1a2a' },
      { id: 'rubber', name: 'Caoutchouc Bleu', material: 'rubber', color: '#112244' }
    ]
  },
  {
    id: '3',
    name: 'Perpetual Calendar',
    collection: 'Classique',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=2594&auto=format&fit=crop',
    description: 'Ne nécessite aucun ajustement jusqu\'en 2100. Phase de lune astronomique en aventurine.',
    longDescription: "Chef-d'œuvre de mémoire mécanique, ce Quantième Perpétuel est programmé pour suivre les caprices du calendrier grégorien sans aucune correction jusqu'au 1er mars 2100. Le cadran en aventurine évoque une nuit étoilée, toile de fond poétique pour la phase de lune astronomique de haute précision. Le boîtier en platine 950, métal le plus noble et le plus dense, confère à cette pièce un poids rassurant et un éclat blanc éternel.",
    features: ['Platine', 'Quantième Perpétuel', 'Aventurine'],
    technicalSpecs: {
      reference: "REF-26574-PT-AV",
      movement: "Calibre 5134 Extra-Plat",
      caseMaterial: "Platine 950",
      diameter: "41 mm",
      dial: "Verre Aventurine bleu",
      powerReserve: "40 heures",
      waterResistance: "20 mètres (2 ATM)",
      strap: "Alligator bleu marine",
      jewels: "38 Rubis (Synthétique)",
      caseBack: "Fond saphir cerclé de platine 950 gravé 'Quantième Perpétuel'. Permet d'admirer les Côtes de Genève circulaires et l'anglage manuel des ponts."
    },
    strapOptions: [
      { id: 'leather_blue', name: 'Alligator Bleu Marine', material: 'leather', color: '#0d1b2a' },
      { id: 'leather_black', name: 'Alligator Noir Glacé', material: 'leather', color: '#000000' },
      { id: 'platinum', name: 'Bracelet Platine', material: 'metal', color: '#e5e4e2' }
    ]
  },
];
