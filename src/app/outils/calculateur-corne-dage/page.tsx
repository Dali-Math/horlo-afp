'use client';

import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { 
  calculateSpiral, 
  generateDrawingSchema, 
  generateDXF,
  SpiralParams,
  CalculatedResults 
} from '@/lib/spiral-calculator';

export default function CalculateurCorneDage() {
  // États
  const [params, setParams] = useState<SpiralParams>({
    diametre: 10.00,
    frequence: 28800,
    amplitude: 270,
    materiau: 'nivarox',
    typeSpiral: 'phillips'
  });

  const [results, setResults] = useState<CalculatedResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Gestion du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setParams(prev => ({
      ...prev,
      [id]: id === 'diametre' || id === 'frequence' || id === 'amplitude' 
        ? parseFloat(value) 
        : value
    }));
  };

  // Calcul
  const calculerSpiral = async () => {
    setIsCalculating(true);
    try {
      const calculatedResults = calculateSpiral(params);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Erreur calcul:', error);
      alert('Paramètres invalides. Vérifiez le diamètre.');
    } finally {
      setIsCalculating(false);
    }
  };

  // Dessin
  useEffect(() => {
    if (!results || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const drawingData = generateDrawingSchema(params, results);
    
    // Effacer
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Balancier
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(drawingData.centerX, drawingData.centerY, drawingData.balanceRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Spiral
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    drawingData.springPath.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    
    // Corne d'âge
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(drawingData.hornCircle.x, drawingData.hornCircle.y, drawingData.hornCircle.radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Point d'ancrage
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(drawingData.hornCircle.x, drawingData.hornCircle.y, 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Annotations
    ctx.fillStyle = '#2c3e50';
    ctx.font = '12px Arial';
    drawingData.annotations.forEach(ann => {
      ctx.fillText(ann.text, ann.x, ann.y);
    });
  }, [results, params]);

  // Export PDF
  const exportPDF = async () => {
    if (!results || !canvasRef.current) return;
    
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Rapport de Calcul - Corne d\'Âge', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Paramètres du calcul :', 20, 40);
    doc.text(`Diamètre balancier : ${params.diametre} mm`, 20, 50);
    doc.text(`Fréquence : ${params.frequence} a/h`, 20, 60);
    doc.text(`Amplitude : ${params.amplitude}°`, 20, 70);
    doc.text(`Matériau : ${params.materiau}`, 20, 80);
    
    doc.text('Résultats :', 20, 100);
    doc.text(`Longueur du spiral : ${results.longueur} mm`, 20, 110);
    doc.text(`Rayon corne d'âge : ${results.rayonCorne} mm`, 20, 120);
    doc.text(`Levée : ${results.levee} mm`, 20, 130);
    doc.text(`Spires actives : ${results.spires}`, 20, 140);
    doc.text(`Validé : ${results.validated ? '✓' : '⚠️ estimation'}`, 20, 150);
    if (results.sourceMovement) {
      doc.text(`Mouvement ref : ${results.sourceMovement}`, 20, 160);
    }
    
    // Schéma
    const imgData = canvasRef.current.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 20, 170, 80, 64);
    
    // Footer
    doc.setFontSize(10);
    doc.text('Calculé avec HorloLearn.com - Formules Phillips/Grossmann', 105, 280, { align: 'center' });
    doc.text(`Généré le : ${new Date().toLocaleDateString('fr-CH')}`, 105, 285, { align: 'center' });
    
    doc.save(`corne-d-age-${params.diametre}mm-${params.frequence}.pdf`);
  };

  // Export DXF
  const exportDXF = () => {
    if (!results) return;
    
    const dxf = generateDXF(params, results);
    const blob = new Blob([dxf], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `corne-d-age-${params.diametre}mm-${params.frequence}.dxf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Chercher mouvement
  const handleSearchMovement = async (caliber: string) => {
    // Future fonctionnalité de recherche
    console.log('Recherche:', caliber);
  };

  return (
    <div className="container">
      <h1>Calculateur de Corne d'Âge & Spiral Pro</h1>
      <p className="subtitle">Base de données {database.movements.length} mouvements • Formules certifiées</p>
      
      <div className="warning">
        <strong>⚠️ Usage professionnel :</strong> Mode expert avec validation BHI
      </div>

      <div className="search-box">
        <input 
          type="text" 
          placeholder="Entrez un calibre (ex: 3135, 2824-2)"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchMovement((e.target as HTMLInputElement).value);
            }
          }}
        />
      </div>
      
      <div className="grid">
        <div className="form-section">
          <h2>Paramètres du Balancier</h2>
          
          <div className="form-group">
            <label htmlFor="diametre">Diamètre du balancier <span className="unit">(mm)</span></label>
            <input 
              type="number" 
              id="diametre" 
              value={params.diametre}
              onChange={handleChange}
              step="0.01" 
              min="5" 
              max="20"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="frequence">Fréquence du mouvement <span className="unit">(a/h)</span></label>
            <select id="frequence" value={params.frequence} onChange={handleChange}>
              <option value="18000">18,000 a/h (5 Hz)</option>
              <option value="21600">21,600 a/h (6 Hz)</option>
              <option value="25200">25,200 a/h (7 Hz)</option>
              <option value="28800">28,800 a/h (8 Hz)</option>
              <option value="36000">36,000 a/h (10 Hz)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="amplitude">Amplitude cible <span className="unit">(°)</span></label>
            <input 
              type="number" 
              id="amplitude" 
              value={params.amplitude}
              onChange={handleChange}
              step="1" 
              min="200" 
              max="320"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="materiau">Matériau du spiral</label>
            <select id="materiau" value={params.materiau} onChange={handleChange}>
              <option value="nivarox">Nivarox (Fe-Ni-Cr)</option>
              <option value="silicium">Silicium monocristallin</option>
              <option value="acier">Acier bleui (historique)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="typeSpiral">Type de courbe terminale</label>
            <select id="typeSpiral" value={params.typeSpiral} onChange={handleChange}>
              <option value="phillips">Phillips (standard)</option>
              <option value="breguet">Breguet (surélevée)</option>
              <option value="grossmann">Grossmann (ancre mobile)</option>
            </select>
          </div>
          
          <button onClick={calculerSpiral} disabled={isCalculating}>
            {isCalculating ? 'Calcul en cours...' : '💎 Calculer le Spiral'}
          </button>
        </div>
        
        <div className="results-section">
          <h2>Résultats du Calcul</h2>
          
          {results && (
            <div className="results">
              <div className="validation-badge">
                {results.validated ? 
                  <span className="badge-valid">✓ Validé ({results.sourceMovement})</span> :
                  <span className="badge-estimate">⚠️ Estimation</span>
                }
              </div>
              
              <div className="result-item">
                <span>Longueur totale du spiral (L) :</span>
                <span className="result-value">{results.longueur} mm</span>
              </div>
              <div className="result-item">
                <span>Rayon de la corne d&apos;âge (R) :</span>
                <span className="result-value">{results.rayonCorne} mm</span>
              </div>
              <div className="result-item">
                <span>Hauteur de levée (Breguet) :</span>
                <span className="result-value">{results.levee} mm</span>
              </div>
              <div className="result-item">
                <span>Nombre de spires actives :</span>
                <span className="result-value">{results.spires}</span>
              </div>
              <div className="result-item">
                <span>Constante de raideur (K) :</span>
                <span className="result-value">{results.raideur} N·m/rad</span>
              </div>
              <div className="result-item">
                <span>Moment d&apos;inertie :</span>
                <span className="result-value">{results.inertie} kg·m²</span>
              </div>
              
              <canvas 
                ref={canvasRef} 
                width={500} 
                height={400} 
                style={{ width: '100%', maxWidth: '500px', border: '1px solid #e0e0e0', borderRadius: '6px' }}
              />
              
              <div className="export-buttons">
                <button className="export-btn pdf" onClick={exportPDF}>📄 Exporter PDF</button>
                <button className="export-btn" onClick={exportDXF}>🔧 Exporter DXF</button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
          color: #2c3e50;
          margin-bottom: 10px;
          font-size: 2.2em;
        }
        
        .subtitle {
          color: #7f8c8d;
          margin-bottom: 30px;
          font-size: 1.1em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .warning {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin-bottom: 30px;
          border-radius: 4px;
        }
        
        .search-box {
          margin-bottom: 20px;
        }
        
        .search-box input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 16px;
        }
        
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #2c3e50;
        }
        
        input, select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #3498db;
        }
        
        .unit {
          font-size: 0.9em;
          color: #7f8c8d;
          margin-left: 5px;
        }
        
        button {
          background: #3498db;
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 6px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
          width: 100%;
          margin-top: 10px;
        }
        
        button:hover {
          background: #2980b9;
        }
        
        button:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .results {
          background: #f8f9fa;
          border: 1px solid #e0e0e0;
          padding: 25px;
          border-radius: 8px;
          margin-top: 30px;
        }
        
        .validation-badge {
          margin-bottom: 20px;
        }
        
        .badge-valid {
          background: #27ae60;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.9em;
          font-weight: 600;
        }
        
        .badge-estimate {
          background: #f39c12;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.9em;
          font-weight: 600;
        }
        
        .result-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .result-item:last-child {
          border-bottom: none;
        }
        
        .result-value {
          font-weight: 600;
          color: #3498db;
        }
        
        .export-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 25px;
        }
        
        .export-btn {
          background: #27ae60;
          padding: 12px;
          font-size: 16px;
        }
        
        .export-btn.pdf {
          background: #e74c3c;
        }
        
        .export-btn:hover {
          opacity: 0.9;
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
          
          .export-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
