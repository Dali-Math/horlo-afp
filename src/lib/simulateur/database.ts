import { TechnicalSpecs } from './types';

export const TECHNICAL_SPECS: Record<string, TechnicalSpecs> = {
  // ETA / Unitas
  "eta2824": { name: "ETA 2824-2", frequency: 4, ampNorm: 310, powerReserve: 38, positions: [0, 4, 6, 8, 12, 14], tempCoef: 0.6, beatRate: 28800, category: "automatic", jewels: 25, diameter: 25.6, height: 4.6 },
  "eta2892": { name: "ETA 2892-A2", frequency: 4, ampNorm: 310, powerReserve: 42, positions: [0, 3, 5, 7, 10, 12], tempCoef: 0.5, beatRate: 28800, category: "automatic", jewels: 21, diameter: 25.6, height: 3.6 },
  "eta6497": { name: "ETA/Unitas 6497-1", frequency: 2.5, ampNorm: 260, powerReserve: 46, positions: [2, 6, 8, 10, 14, 16], tempCoef: 0.7, beatRate: 18000, category: "manual", jewels: 17, diameter: 36.6, height: 4.5 },
  "eta7760": { name: "Valjoux 7760", frequency: 3, ampNorm: 300, powerReserve: 40, positions: [0, 5, 7, 9, 13, 16], tempCoef: 0.8, beatRate: 21600, category: "chronograph", jewels: 17, diameter: 30, height: 7.9 },
  "eta7750": { name: "Valjoux 7750", frequency: 3, ampNorm: 300, powerReserve: 42, positions: [0, 5, 7, 9, 13, 16], tempCoef: 0.8, beatRate: 21600, category: "chronograph", jewels: 25, diameter: 30, height: 7.9 },
  
  // ROLEX
  "rolex3135": { name: "Rolex 3135", frequency: 4, ampNorm: 320, powerReserve: 48, positions: [0, 2, 3, 4, 6, 8], tempCoef: 0.4, beatRate: 28800, category: "automatic", jewels: 31, diameter: 28.5, height: 6 },
  "rolex3130": { name: "Rolex 3130", frequency: 4, ampNorm: 320, powerReserve: 48, positions: [0, 2, 3, 4, 6, 8], tempCoef: 0.4, beatRate: 28800, category: "automatic", jewels: 31, diameter: 28.5, height: 6 },
  "rolex3235": { name: "Rolex 3235", frequency: 4, ampNorm: 315, powerReserve: 70, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.3, beatRate: 28800, category: "automatic", jewels: 31, diameter: 28.5, height: 6.5 },
  
  // PATEK PHILIPPE
  "patek240": { name: "Patek Philippe 240", frequency: 3, ampNorm: 315, powerReserve: 48, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.3, beatRate: 21600, category: "automatic", jewels: 27, diameter: 27.5, height: 2.53 },
  "patek324": { name: "Patek Philippe 324 SC", frequency: 4, ampNorm: 310, powerReserve: 45, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.35, beatRate: 28800, category: "automatic", jewels: 29, diameter: 27, height: 3.3 },
  "patek215": { name: "Patek Philippe 215", frequency: 3, ampNorm: 300, powerReserve: 44, positions: [1, 2, 3, 4, 5, 6], tempCoef: 0.4, beatRate: 21600, category: "manual", jewels: 18, diameter: 21.9, height: 2.55 },
  
  // OMEGA
  "omega8900": { name: "Omega Co-Axial 8900", frequency: 3.5, ampNorm: 315, powerReserve: 60, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.5, beatRate: 25200, category: "automatic", jewels: 39, diameter: 33, height: 5 },
  "omega3861": { name: "Omega 3861 (Speedmaster)", frequency: 3, ampNorm: 300, powerReserve: 50, positions: [0, 3, 5, 7, 10, 12], tempCoef: 0.6, beatRate: 21600, category: "manual", jewels: 26, diameter: 27, height: 6.2 },
  
  // SEIKO
  "seiko4r36": { name: "Seiko 4R36", frequency: 3, ampNorm: 280, powerReserve: 41, positions: [2, 4, 6, 8, 10, 12], tempCoef: 0.7, beatRate: 21600, category: "automatic", jewels: 24, diameter: 27.4, height: 5.3 },
  "seiko6r35": { name: "Seiko 6R35", frequency: 3, ampNorm: 285, powerReserve: 70, positions: [1, 3, 5, 7, 9, 11], tempCoef: 0.65, beatRate: 21600, category: "automatic", jewels: 24, diameter: 27.4, height: 5.3 },
  "seiko8r48": { name: "Seiko 8R48 (Chronographe)", frequency: 3.5, ampNorm: 290, powerReserve: 45, positions: [0, 4, 6, 8, 12, 14], tempCoef: 0.75, beatRate: 25200, category: "chronograph", jewels: 34, diameter: 28, height: 7.6 },
  
  // AUTRES MARQUES
  "breitling01": { name: "Breitling B01", frequency: 4, ampNorm: 310, powerReserve: 70, positions: [0, 2, 4, 6, 8, 10], tempCoef: 0.55, beatRate: 28800, category: "chronograph", jewels: 47, diameter: 30, height: 7.2 },
  "jlc889": { name: "JLC Calibre 889", frequency: 4, ampNorm: 300, powerReserve: 38, positions: [0, 2, 4, 6, 8, 10], tempCoef: 0.5, beatRate: 28800, category: "automatic", jewels: 32, diameter: 26, height: 3.25 },
  "jlc978": { name: "JLC Calibre 978 (Tourbillon)", frequency: 4, ampNorm: 280, powerReserve: 48, positions: [0, 0, 0, 0, 0, 0], tempCoef: 0.3, beatRate: 28800, category: "tourbillon", jewels: 33, diameter: 26, height: 5.5 },
  "tagheuer01": { name: "TAG Heuer Calibre 01", frequency: 4, ampNorm: 300, powerReserve: 50, positions: [0, 4, 6, 8, 10, 12], tempCoef: 0.65, beatRate: 28800, category: "chronograph", jewels: 39, diameter: 30, height: 7.75 },
  "cartier1904mc": { name: "Cartier 1904-MC", frequency: 4, ampNorm: 300, powerReserve: 48, positions: [0, 3, 5, 7, 9, 11], tempCoef: 0.6, beatRate: 28800, category: "automatic", jewels: 27, diameter: 25.6, height: 4 },
  "iwc52010": { name: "IWC 52010 (Portugeiser)", frequency: 3.5, ampNorm: 300, powerReserve: 168, positions: [0, 2, 3, 4, 5, 6], tempCoef: 0.45, beatRate: 25200, category: "automatic", jewels: 31, diameter: 30, height: 5 },
};
