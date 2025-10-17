'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Play, Square, Settings2 } from 'lucide-react';

export default function SimulateurEchappement() {
  const [isRunning, setIsRunning] = useState(false);
  const [frequency, setFrequency] = useState(4);
  const [speed, setSpeed] = useState(1);
  const [angle, setAngle] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Roue d'échappement (15 dents)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((angle * Math.PI) / 180);

      // Corps de la roue
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Dents de la roue (15 dents)
      for (let i = 0; i < 15; i++) {
        const dAngle = (i * 360) / 15;
        ctx.save();
        ctx.rotate((dAngle * Math.PI) / 180);
        
        ctx.beginPath();
        ctx.moveTo(80, 0);
        ctx.lineTo(100, -5);
        ctx.lineTo(100, 5);
        ctx.closePath();
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
      }

      ctx.restore();

      // Ancre
      const ancreY = centerY + 120;
      const ancreSwing = Math.sin((angle * Math.PI) / 30) * 30;

      ctx.save();
      ctx.translate(centerX + ancreSwing, ancreY);

      // Corps de l'ancre
      ctx.beginPath();
      ctx.rect(-40, -10, 80, 20);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Palettes (rubis)
      [-35, 35].forEach(x => {
        ctx.beginPath();
        ctx.arc(x, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#f43f5e';
        ctx.fill();
        ctx.strokeStyle = '#e11d48';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.restore();

      // Balancier (ellipse)
      const balancierX = centerX + 150;
      const balancierAngle = Math.sin((angle * Math.PI) / 180) * 45;

      ctx.save();
      ctx.translate(balancierX, centerY);
      ctx.rotate((balancierAngle * Math.PI) / 180);

      ctx.beginPath();
      ctx.ellipse(0, 0, 60, 20, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Axe du balancier
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.lineTo(0, 30);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();

      // Info overlay
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px monospace';
      ctx.fillText(`Fréquence: ${frequency} Hz`, 10, 25);
      ctx.fillText(`Vitesse: ${speed}x`, 10, 45);
      ctx.fillText(`Angle: ${Math.round(angle % 360)}°`, 10, 65);
    };

    const animate = () => {
      if (isRunning) {
        setAngle(prev => (prev + frequency * speed) % 360);
      }
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [angle, isRunning, frequency, speed]);

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-violet-100 p-3 rounded-xl">
          <Zap className="w-6 h-6 text-violet-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Simulateur d'Échappement Suisse</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="w-full rounded-xl border-2 border-slate-300 bg-slate-900"
          />

          <div className="mt-4 flex items-center justify-center gap-4">
            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Démarrer
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Square className="w-5 h-5" />
                Pause
              </button>
            )}
            <button
              onClick={() => setAngle(0)}
              className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="w-5 h-5 text-violet-600" />
            <h3 className="font-bold text-slate-900">Paramètres de simulation</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Fréquence (Hz)
              </label>
              <input
                type="range"
                min="2"
                max="5"
                step="0.5"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>2 Hz (Lent)</span>
                <span className="font-semibold">{frequency} Hz</span>
                <span>5 Hz (Rapide)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Vitesse d'animation
              </label>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-600"
              >
                <option value="0.1">Très lent (0.1x)</option>
                <option value="0.5">Ralenti (0.5x)</option>
                <option value="1">Temps réel (1x)</option>
                <option value="2">Rapide (2x)</option>
              </select>
            </div>
          </div>

          <div className="mt-6 bg-violet-50 border border-violet-200 rounded-lg p-4">
            <h4 className="font-semibold text-violet-900 mb-2">📚 Composants visibles :</h4>
            <ul className="text-sm text-violet-800 space-y-1">
              <li>• <span className="text-yellow-600">●</span> Roue d'échappement (15 dents)</li>
              <li>• <span className="text-red-600">●</span> Ancre suisse</li>
              <li>• <span className="text-pink-600">●</span> Palettes (rubis)</li>
              <li>• <span className="text-blue-600">●</span> Balancier-spiral</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-violet-50 rounded-lg">
            <p className="text-sm text-violet-900">
              <strong>💡 Info :</strong> Le simulateur montre le fonctionnement d'un échappement à ancre suisse. 
              Chaque oscillation du balancier libère une dent de la roue d'échappement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
