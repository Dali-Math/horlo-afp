import { Position } from '../types';

export const POSITIONS: Position[] = [
  // POSITIONS COSC OFFICIELLES
  { id: 'DU', name: 'Dial Up', rotation: 'FACE UP', icon: '↑' },
  { id: 'DD', name: 'Dial Down', rotation: 'FACE DOWN', icon: '↓' },
  { id: 'CH', name: 'Crown Right', rotation: 'COURONNE DROITE', icon: '→' },
  { id: 'CB', name: 'Crown Left', rotation: 'COURONNE GAUCHE', icon: '←' },
  { id: 'CL', name: 'Crown Up', rotation: 'COURONNE HAUT', icon: '↑' },
  { id: 'CLD', name: 'Crown Down', rotation: 'COURONNE BAS', icon: '↓' },
  
  // POSITIONS COMPLÉMENTAIRES
  { id: 'DU15', name: 'Dial Up 15°', rotation: '15°', icon: '↗' },
  { id: 'DU30', name: 'Dial Up 30°', rotation: '30°', icon: '↗' },
  { id: 'DU45', name: 'Dial Up 45°', rotation: '45°', icon: '↗' },
  { id: 'DU60', name: 'Dial Up 60°', rotation: '60°', icon: '↘' },
  
  { id: 'DD15', name: 'Dial Down 15°', rotation: '195°', icon: '↘' },
  { id: 'DD30', name: 'Dial Down 30°', rotation: '210°', icon: '↘' },
  { id: 'DD45', name: 'Dial Down 45°', rotation: '225°', icon: '↙' },
  { id: 'DD60', name: 'Dial Down 60°', rotation: '240°', icon: '↙' },
  
  // POSITIONS MONTRE-BRACELET
  { id: 'WRIST-FLAT', name: 'Wrist Flat', rotation: 'PORTÉE À PLAT', icon: '⌚' },
  { id: 'WRIST-PRONATED', name: 'Wrist Pronated', rotation: 'POIGNET PRONÉ', icon: '🤚' },
  { id: 'WRIST-SUPINATED', name: 'Wrist Supinated', rotation: 'POIGNET SUPINÉ', icon: '✋' },
  
  // POSITIONS SPECIFIQUES COMPLICATIONS
  { id: 'PENDANT-UP', name: 'Pendant Up', rotation: 'PENDANT HAUT', icon: '⬆' },
  { id: 'PENDANT-DOWN', name: 'Pendant Down', rotation: 'PENDANT BAS', icon: '⬇' },
  { id: 'PENDANT-LEFT', name: 'Pendant Left', rotation: 'PENDANT GAUCHE', icon: '⬅' },
  { id: 'PENDANT-RIGHT', name: 'Pendant Right', rotation: 'PENDANT DROITE', icon: '➡' },
  
  // TESTS DE SUEUR (ISO 3159)
  { id: 'HEAT-TEST', name: 'Heat Test 38°C', rotation: 'TEMPÉRATURE ÉLEVÉE', icon: '🌡' },
  { id: 'COLD-TEST', name: 'Cold Test 4°C', rotation: 'BASSE TEMPÉRATURE', icon: '❄' },
];
