// Base de données technique complète - 98 mouvements réels
// Sources : ETA, Valjoux, Rolex, Omega, Patek, Seiko, etc.

// ✅ Correction : importer l'interface depuis types.ts
import type { MouvementSpecs } from './types';

export const MOUVEMENTS_DB: Record<string, MouvementSpecs> = {
  // ===== ETA / Unitas =====
  "eta2824": {
    name: "ETA 2824-2",
    frequency: 4,
    ampNorm: 310,
    powerReserve: 38,
    positions: [0, 4, 6, 8, 12, 14],
    tempCoef: 0.6,
    hairspring: "Nivarox II",
    regulator: "ETAChron",
    beatRate: 28800,
    jewels: 25,
    diameter: 25.6,
    height: 4.6,
    dateAdded: "2024-01-15",
    category: "automatic",
  },
  "eta2892": {
    name: "ETA 2892-A2",
    frequency: 4,
    ampNorm: 310,
    powerReserve: 42,
    positions: [0, 3, 5, 7, 10, 12],
    tempCoef: 0.5,
    hairspring: "Nivarox",
    regulator: "ETAChron",
    beatRate: 28800,
    jewels: 21,
    diameter: 25.6,
    height: 3.6,
    dateAdded: "2024-01-15",
    category: "automatic",
  },
  // ... (les autres mouvements restent inchangés)
};

// Helper pour obtenir un mouvement par son nom
export const getMouvement = (key: string): MouvementSpecs | undefined => {
  return MOUVEMENTS_DB[key];
};

// Export pour import dynamique si nécessaire
export default MOUVEMENTS_DB;
