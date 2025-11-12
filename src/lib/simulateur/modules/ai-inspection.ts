export interface AIInspection {
  confidence: number;
  defect: 'spiral_fracture' | 'pivot_scratch' | 'jewel_crack' | 'none';
  severity: 'minor' | 'major' | 'critical';
}

export async function loadAIModel() {
  return;
}

export async function analyzeImage(imageData: any): Promise<AIInspection> {
  return {
    confidence: 0,
    defect: 'none',
    severity: 'minor'
  };
}
