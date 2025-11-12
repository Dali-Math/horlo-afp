'use client';

interface Props {
  pivotWear: number;
  amplitude: number;
  onImpact: (result: any) => void;
}

export default function ImpactSimulator({ pivotWear, onImpact }: Props) {
  const dropHeight = Math.max(0, 100 - pivotWear);

  const simulate = () => {
    const result = {
      amplitudeDrop: dropHeight * 0.5,
      pivotDeformation: dropHeight * 0.01,
      jewelDamage: dropHeight > 50 ? 'critical' : 'none',
      recommendedAction: dropHeight > 50 ? 'Révision urgente' : 'Pas de dommage'
    };
    onImpact(result);
  };

  return (
    <div className="param-group">
      <label>💥 Simulation Chute</label>
      <button className="btn-danger" onClick={simulate}>
        SIMULER CHUTE ({dropHeight}cm)
      </button>
    </div>
  );
}
