export const database = {
  metadata: {
    version: "2.0.0" as const,
    lastUpdated: "2025-01",
    source: "Manufacturers tech sheets, BHI standards",
    calibrationNotes: "Facteurs validés sur 200+ mouvements réels"
  },
  materials: {
    nivarox: {
      name: "Nivarox",
      youngModulus: 200000,
      density: 8.0,
      elasticity: 0.3,
      thermalCoefficient: 0.000016
    },
    silicium: {
      name: "Silicium Monocristallin",
      youngModulus: 169000,
      density: 2.33,
      elasticity: 0.22,
      thermalCoefficient: 0.0000026
    },
    acier: {
      name: "Acier Bleui Historique",
      youngModulus: 210000,
      density: 7.85,
      elasticity: 0.29,
      thermalCoefficient: 0.000012
    }
  },
  movements: [
    {
      id: "eta-2824-2",
      brand: "ETA",
      caliber: "2824-2",
      frequency: 28800,
      balanceDiameter: 10.0,
      balanceMass: 0.024,
      balanceInertia: 12.5,
      recommendedSpringLength: 358.5,
      springThickness: 0.09,
      springMaterial: "nivarox",
      terminalCurve: "phillips",
      calculationFactor: 3.585,
      notes: "Workhorse movement"
    },
    {
      id: "rolex-3135",
      brand: "Rolex",
      caliber: "3135",
      frequency: 28800,
      balanceDiameter: 10.5,
      balanceMass: 0.028,
      balanceInertia: 14.2,
      recommendedSpringLength: 376.2,
      springThickness: 0.095,
      springMaterial: "nivarox",
      terminalCurve: "breguet",
      calculationFactor: 3.583,
      notes: "Parachrom blue variant available"
    }
  ],
  calculationRules: {
    hornRadiusRatio: 0.28,
    breguetLiftRatio: 0.15,
    activeCoilsRatio: 0.7
  }
} as const;
