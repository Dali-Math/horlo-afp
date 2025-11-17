'use client';

import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';

// Types
interface SpiralParams {
  diametre: number;
  frequence: number;
  amplitude: number;
  materiau: 'nivarox' | 'silicium' | 'acier';
  typeSpiral: 'phillips' | 'breguet' | 'grossmann';
}

interface Results {
  longueur: string;
  rayonCorne: string;
  levee: string;
  spires: string;
  raideur: string;
}

// Constantes physiques
const CONSTANTES = {
  nivarox: { moduleYoung: 200000, densite: 8.0, coefficientElasticite: 0.3 },
  silicium: { moduleYoung: 169000, densite: 2.33, coefficientElasticite: 0.22 },
  acier: { moduleYoung: 210000, densite: 7.85, coefficientElasticite: 0.29 }
};

// Facteurs de longueur calibrés
const FACTEUR_LONGUEUR: Record<number, number> = {
  18000: 2.85,
  21600: 3.12,
  25200: 3.35,
  28800: 3.58,
  36000: 4.02
};

export default function CalculateurCorneDage() {
  // États du formulaire
  const [params, setParams] = useState<SpiralParams>({
    diametre: 10.00,
    frequence: 28800,
    amplitude: 270,
    materiau: 'nivarox',
    typeSpiral: 'phillips'
  });

  const [results, setResults] = useState<Results | null>(null);
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Gestion des changements de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    setParams(prev => ({
      ...prev,
      [id]: id === 'diametre' || id === 'frequence' || id === 'amplitude' 
        ? parseFloat(value) 
        : value
    }));
  };

  // Calcul principal
  const calculerSpiral = () => {
    const { diametre, frequence, amplitude, materiau, typeSpiral } = params;
    
    // Validation
    if (!diametre || diametre <= 0) {
      alert('Veuillez entrer un diamètre valide');
      return;
    }

    // 1. Période oscillatoire
    const periode = 1 / (frequence / 7200);
    
    // 2. Moment d'inertie (modèle disque plein)
    const rayon = diametre / 2;
    const masse = (Math.PI * rayon * rayon * 0.5 * 7.8) / 1000;
    const inertie = (masse * rayon * rayon) / 2;
    
    // 3. Raideur K = I·ω²
    const omega = 2 * Math.PI / periode;
    const raideur = inertie * omega * omega;
    
    // 4. Longueur du spiral (formule Grossmann simplifiée)
    const longueur = diametre * FACTEUR_LONGUEUR[frequence];
    
    // 5. Rayon de la corne d'âge (règle Phillips)
    const rayonCorne = (diametre * 0.28).toFixed(2);
    
    // 6. Hauteur de levée (Breguet)
    const levee = typeSpiral === 'breguet' ? (diametre * 0.15).toFixed(2) : '0';
    
    // 7. Nombre de spires
    const spires = Math.round(longueur / (Math.PI * diametre * 0.7)).toString();

    // Mise à jour des résultats
    const newResults: Results = {
      longueur: `${longueur.toFixed(2)} mm`,
      rayonCorne: `${rayonCorne} mm`,
      levee: `${levee} mm`,
      spires: spires,
      raideur: `${raideur.toFixed(6)} N·m/rad`
    };

    setResults(newResults);
    setShowResults(true);
  };

  // Effet pour dessiner le schéma quand les résultats changent
  useEffect(() => {
    if (!showResults) return;
    
    dessinerSchema();
  }, [showResults, params, results]);

  // Fonction de dessin
  const dessinerSchema = () => {
    const canvas = canvasRef.current;
    if (!canvas || !results) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { diametre, typeSpiral } = params;
    const rayonCorne = parseFloat(results.rayonCorne);

    // Effacer
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Centre
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 12;

    // Dessiner balancier
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, diametre * scale / 2, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Dessiner spiral
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    
    let angle = 0;
    let radius = diametre * scale / 2 + 5;
    
    for (let i = 0; i < 20; i++) {
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      angle += Math.PI / 4;
      radius += 3;
    }
    
    ctx.stroke();
    
    // Dessiner corne d'âge
    const dernierAngle = angle - Math.PI / 4;
    const dernierRadius = radius - 3;
    const corneX = centerX + Math.cos(dernierAngle) * dernierRadius;
    const corneY = centerY + Math.sin(dernierAngle) * dernierRadius;
    
    // Cercle de la corne
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(corneX, corneY, rayonCorne * scale, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Point d'ancrage
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(corneX, corneY, 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Légende
    ctx.fillStyle = '#2c3e50';
    ctx.font = '12px Arial';
    ctx.fillText(`Corne d'âge : r = ${rayonCorne}mm`, 10, 20);
    ctx.fillText(`Diamètre balancier : ${diametre}mm`, 10, 38);
    
    if (parseFloat(results.levee) > 0) {
      ctx.fillText(`Levée Breguet : ${results.levee}`, 10, 56);
    }
  };

  // Export PDF
  const exportPDF = () => {
    if (!results || !canvasRef.current) return;

    const doc = new jsPDF();
    
    // En-tête
    doc.setFontSize(16);
    doc.text('Rapport de Calcul - Corne d\'Âge', 105, 20, { align: 'center' });
    
    // Données
    doc.setFontSize(12);
    doc.text('Paramètres du calcul :', 20, 40);
    doc.text(`Longueur du spiral : ${results.longueur}`, 20, 55);
    doc.text(`Rayon corne d'âge : ${results.rayonCorne}`, 20, 65);
    doc.text(`Hauteur de levée : ${results.levee}`, 20, 75);
    doc.text(`Nombre de spires : ${results.spires}`, 20, 85);
    doc.text(`Constante de raideur : ${results.raideur}`, 20, 95);
    
    // Schéma
    const imgData = canvasRef.current.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 20, 105, 80, 64);
    
    // Footer
    doc.setFontSize(10);
    doc.text('Calculé avec HorloLearn.com - Formules Phillips/Grossmann', 105, 280, { align: 'center' });
    
    doc.save('corne-d-age-calcul.pdf');
  };

  // Export DXF
  const exportDXF = () => {
    if (!results) return;

    const { diametre } = params;
    const rayonCorne = parseFloat(results.rayonCorne);

    // Générer fichier DXF
    let dxf = `0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nTABLES\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n`;
    
    // Balancier
    dxf += `0\nCIRCLE\n8\nbalancier\n10\n0\n20\n0\n40\n${diametre/2}\n`;
    
    // Corne d'âge
    dxf += `0\nCIRCLE\n8\ncorne-d-age\n10\n${diametre/2 + 2}\n20\n0\n40\n${rayonCorne}\n`;
    
    dxf += `0\nENDSEC\n0\nEOF`;

    // Télécharger
    const blob = new Blob([dxf], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `corne-d-age-${diametre}mm.dxf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1>Calculateur de Corne d&apos;Âge & Spiral</h1>
      <p className="subtitle">Outil professionnel basé sur les formules de Phillips (1861) et Grossmann</p>
      
      <div className="warning">
        <strong>⚠️ Usage professionnel :</strong> Vérifiez toujours les calculs sur un mouvement de test avant découpes finales.
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
            <select 
              id="frequence" 
              value={params.frequence}
              onChange={handleChange}
            >
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
            <select 
              id="materiau" 
              value={params.materiau}
              onChange={handleChange}
            >
              <option value="nivarox">Nivarox (Fe-Ni-Cr)</option>
              <option value="silicium">Silicium monocristallin</option>
              <option value="acier">Acier bleui (historique)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="typeSpiral">Type de courbe terminale</label>
            <select 
              id="typeSpiral" 
              value={params.typeSpiral}
              onChange={handleChange}
            >
              <option value="phillips">Phillips (standard)</option>
              <option value="breguet">Breguet (surélevée)</option>
              <option value="grossmann">Grossmann (ancre mobile)</option>
            </select>
          </div>
          
          <button onClick={calculerSpiral}>💎 Calculer le Spiral</button>
        </div>
        
        <div className="results-section">
          <h2>Résultats du Calcul</h2>
          
          {showResults && results && (
            <div id="results" className="results">
              <div className="result-item">
                <span>Longueur totale du spiral (L) :</span>
                <span className="result-value">{results.longueur}</span>
              </div>
              <div className="result-item">
                <span>Rayon de la corne d&apos;âge (R) :</span>
                <span className="result-value">{results.rayonCorne}</span>
              </div>
              <div className="result-item">
                <span>Hauteur de levée (Breguet) :</span>
                <span className="result-value">{results.levee}</span>
              </div>
              <div className="result-item">
                <span>Nombre de spires actives :</span>
                <span className="result-value">{results.spires}</span>
              </div>
              <div className="result-item">
                <span>Constante de raideur (K) :</span>
                <span className="result-value">{results.raideur}</span>
              </div>
              
              <canvas 
                ref={canvasRef} 
                width={500} 
                height={400} 
                style={{ width: '100%', maxWidth: '500px' }}
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
        }
        
        .warning {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin-bottom: 30px;
          border-radius: 4px;
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
        }
        
        .results {
          background: #f8f9fa;
          border: 1px solid #e0e0e0;
          padding: 25px;
          border-radius: 8px;
          margin-top: 30px;
        }
        
        .results h2 {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 1.5em;
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
        
        canvas {
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          margin-top: 20px;
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
