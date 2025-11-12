// Utilisation TensorFlow.js pour détection défauts visuels
import * as tf from '@tensorflow/tfjs';

export interface AIInspection {
  confidence: number;
  defect: 'spiral_fracture' | 'pivot_scratch' | 'jewel_crack' | 'none';
  severity: 'minor' | 'major' | 'critical';
}

let model: tf.LayersModel | null = null;

export async function loadAIModel() {
  // Charger modèle pré-entraîné (fichier .json)
  model = await tf.loadLayersModel('/models/defect-detector/model.json');
}

export async function analyzeImage(imageData: ImageData): Promise<AIInspection> {
  if (!model) await loadAIModel();
  
  // Prétraitement image
  const tensor = tf.browser.fromPixels(imageData)
    .resizeNearestNeighbor([224, 224])
    .expandDims(0)
    .toFloat()
    .div(255.0);
  
  const prediction = model!.predict(tensor) as tf.Tensor;
  const result = prediction.dataSync();
  
  const defects = ['spiral_fracture', 'pivot_scratch', 'jewel_crack', 'none'];
  const defect = defects[result.indexOf(Math.max(...Array.from(result)))];
  
  return {
    confidence: Math.max(...Array.from(result)) * 100,
    defect,
    severity: defect === 'none' ? 'minor' : result[0] > 0.8 ? 'critical' : 'major'
  };
}
