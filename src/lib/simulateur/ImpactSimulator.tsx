'use client';
import { useState } from 'react';
import { simulateDrop } from '@/lib/simulateur/modules/impact';

interface Props {
  pivotWear: number;
  amplitude: number;
  onImpact: (result: any) => void;
}

export default function ImpactSimulator({ pivotWear, amplitude, onImpact }: Props) {
  const [height, setHeight] = useState(50);
  const [surface, setSurface] = useState<'wood' | 'tile' | 'concrete'>('tile');

  const handleSimulate = () => {
    const result = simulateDrop(height, surface, pivotWear, amplitude);
    onImpact(result);
    
    // Animation visuelle
    const canvas = document.getElementById('canvas-container');
    canvas?.animate([
      { transform: 'translateY(0px)' },
      { transform: 'translateY(20px)', offset: 0.3 },
      { transform: 'translateY(0px)', offset: 1 }
    ], { duration: 500, iterations: 1 });
  };

  return (
    <div className="param-group">
      <label>🔨 Simulation de Chute</label>
      <div className="param-row">
        <span>Hauteur:</span>
        <input type="range" min="10" max="200" value={height} 
          onChange={(e) => setHeight(Number(e.target.value))} />
        <span className="param-value">{height}cm</span>
      </div>
      <div className="param-row">
        <span>Surface:</span>
        <select value={surface} onChange={(e) => setSurface(e.target.value as any)}>
          <option value="wood">Bois (amortissant)</option>
          <option value="tile">Carrelage (dur)</option>
          <option value="concrete">Béton (très dur)</option>
        </select>
      </div>
      <button className="btn" onClick={handleSimulate}>💥 SIMULER CHUTE</button>
    </div>
  );
}
