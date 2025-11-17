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
  // États du calculateur
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
  const [activeTab, setActiveTab] = useState<'calculateur' | 'documentation'>('calculateur');

  // ... (gardez TOUT le code précédent du calculateur)

  // Export PDF
  const exportPDF = async () => {
    if (!results || !canvasRef.current) return;
    // ... code export PDF existant
  };

  // Export DXF
  const exportDXF = () => {
    if (!results) return;
    // ... code export DXF existant
  };

  return (
    <div className="container">
      <h1>Calculateur de Corne d'Âge & Spiral</h1>
      <p className="subtitle">Outil professionnel basé sur les formules de Phillips (1861) et Grossmann</p>
      
      {/* Onglets */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'calculateur' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculateur')}
        >
          Calculateur
        </button>
        <button 
          className={`tab ${activeTab === 'documentation' ? 'active' : ''}`}
          onClick={() => setActiveTab('documentation')}
        >
          Documentation API
        </button>
      </div>

      {/* Contenu de l'onglet Calculateur */}
      {activeTab === 'calculateur' && (
        <>
          <div className="warning">
            <strong>⚠️ Usage professionnel :</strong> Vérifiez toujours les calculs sur un mouvement de test avant découpes finales.
          </div>
          
          <div className="grid">
            {/* ... gardez TOUT le formulaire et résultats existants */}
          </div>
        </>
      )}

      {/* Contenu de l'onglet Documentation */}
      {activeTab === 'documentation' && (
        <div className="documentation-section">
          <h2>🚀 Documentation API</h2>
          <p>Intégrez ce calculateur dans vos logiciels professionnels</p>

          <div className="doc-block">
            <h3>Endpoint</h3>
            <code className="endpoint">POST https://www.horlolearn.ch/api/spirals/calculate</code>
          </div>

          <div className="doc-block">
            <h3>Body Request</h3>
            <pre className="code-block">{`{
  "diametre": 10.5,
  "frequence": 28800,
  "amplitude": 270,
  "materiau": "nivarox",
  "typeSpiral": "breguet"
}`}</pre>
          </div>

          <div className="doc-block">
            <h3>Tester avec curl</h3>
            <pre className="code-block">{`curl -X POST http://localhost:3000/api/spirals/calculate \\
  -H "Content-Type: application/json" \\
  -d '{"diametre":10,"frequence":28800,"amplitude":270,"materiau":"nivarox","typeSpiral":"phillips"}'`}</pre>
          </div>

          <div className="doc-block">
            <h3>Exemple Python</h3>
            <pre className="code-block">{`import requests

def calcul_spiral(diametre, frequence):
    url = "https://www.horlolearn.ch/api/spirals/calculate"
    payload = {
        "diametre": diametre,
        "frequence": frequence,
        "amplitude": 270,
        "materiau": "nivarox",
        "typeSpiral": "phillips"
    }
    response = requests.post(url, json=payload)
    return response.json()`}</pre>
          </div>

          <div className="doc-block">
            <h3>Support technique</h3>
            <p>📧 contact@horlolearn.ch</p>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Styles existants du calculateur */
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2c3e50; margin-bottom: 10px; font-size: 2.2em; }
        .subtitle { color: #7f8c8d; margin-bottom: 30px; font-size: 1.1em; }
        .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 30px; border-radius: 4px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        /* ... tout le reste de vos styles ... */

        /* NOUVEAUX STYLES pour les onglets */
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 2px solid #e0e0e0;
        }

        .tab {
          padding: 12px 24px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          color: #7f8c8d;
          transition: all 0.3s;
        }

        .tab.active {
          color: #3498db;
          border-bottom-color: #3498db;
        }

        .tab:hover {
          color: #2c3e50;
        }

        /* Styles documentation */
        .documentation-section {
          margin-top: 20px;
        }

        .doc-block {
          margin-bottom: 25px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }

        .doc-block h3 {
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .endpoint {
          background: #2c3e50;
          color: #fff;
          padding: 10px 15px;
          border-radius: 4px;
          display: inline-block;
          font-family: monospace;
        }

        .code-block {
          background: #2d3748;
          color: #e2e8f0;
          padding: 15px;
          border-radius: 6px;
          overflow-x: auto;
          font-family: monospace;
          font-size: 14px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .tabs {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
