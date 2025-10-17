'use client';

import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';

interface FicheData {
  calibre: string;
  type: string;
  diametre: string;
  hauteur: string;
  frequence: string;
  reserve: string;
  rubis: string;
}

export default function GenerateurFiches() {
  const [formData, setFormData] = useState<FicheData>({
    calibre: '',
    type: 'Automatique',
    diametre: '',
    hauteur: '',
    frequence: '',
    reserve: '',
    rubis: ''
  });

  const generatePDF = () => {
    // Pour une version simple, on crée un document HTML formaté
    const content = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Fiche Technique - ${formData.calibre}</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      background: #f8f9fa;
    }
    .fiche {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      color: #1e293b;
      font-size: 32px;
      margin: 0 0 10px 0;
    }
    .type {
      color: #64748b;
      font-size: 18px;
    }
    .specs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 30px 0;
    }
    .spec-item {
      padding: 15px;
      background: #f1f5f9;
      border-radius: 8px;
      border-left: 4px solid #2563eb;
    }
    .spec-label {
      color: #64748b;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }
    .spec-value {
      color: #1e293b;
      font-size: 18px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      color: #94a3b8;
      font-size: 12px;
    }
    .logo {
      color: #2563eb;
      font-weight: bold;
      font-size: 14px;
    }
    @media print {
      body { margin: 0; background: white; }
      .fiche { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="fiche">
    <div class="header">
      <h1>${formData.calibre || 'Calibre Non Spécifié'}</h1>
      <p class="type">${formData.type}</p>
    </div>
    
    <div class="specs">
      <div class="spec-item">
        <div class="spec-label">Diamètre</div>
        <div class="spec-value">${formData.diametre || 'N/A'}</div>
      </div>
      
      <div class="spec-item">
        <div class="spec-label">Hauteur</div>
        <div class="spec-value">${formData.hauteur || 'N/A'}</div>
      </div>
      
      <div class="spec-item">
        <div class="spec-label">Fréquence</div>
        <div class="spec-value">${formData.frequence ? `${formData.frequence} A/h` : 'N/A'}</div>
      </div>
      
      <div class="spec-item">
        <div class="spec-label">Réserve de marche</div>
        <div class="spec-value">${formData.reserve ? `${formData.reserve}h` : 'N/A'}</div>
      </div>
      
      <div class="spec-item">
        <div class="spec-label">Nombre de rubis</div>
        <div class="spec-value">${formData.rubis ? `${formData.rubis} jewels` : 'N/A'}</div>
      </div>
      
      <div class="spec-item">
        <div class="spec-label">Type de mouvement</div>
        <div class="spec-value">${formData.type}</div>
      </div>
    </div>
    
    <div class="footer">
      <p class="logo">HorloLearn</p>
      <p>Fiche technique générée le ${new Date().toLocaleDateString('fr-FR')}</p>
      <p>Formation Horlogère Suisse - www.horlolearn.ch</p>
    </div>
  </div>
  
  <script>
    // Auto-print on load
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
    `;

    // Ouvrir dans une nouvelle fenêtre
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
    }
  };

  const handleChange = (field: keyof FicheData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 p-3 rounded-xl">
          <FileText className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Générateur de Fiches Techniques</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Calibre du mouvement *
            </label>
            <input
              type="text"
              value={formData.calibre}
              onChange={(e) => handleChange('calibre', e.target.value)}
              placeholder="Ex: ETA 2824-2"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Type de mouvement *
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
            >
              <option>Automatique</option>
              <option>Remontage manuel</option>
              <option>Quartz</option>
              <option>Chronographe</option>
              <option>GMT</option>
              <option>Répétition minutes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Diamètre (mm)
            </label>
            <input
              type="text"
              value={formData.diametre}
              onChange={(e) => handleChange('diametre', e.target.value)}
              placeholder="Ex: 25.6 mm (11.5 lignes)"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Hauteur (mm)
            </label>
            <input
              type="text"
              value={formData.hauteur}
              onChange={(e) => handleChange('hauteur', e.target.value)}
              placeholder="Ex: 4.6 mm"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fréquence (A/h)
            </label>
            <input
              type="text"
              value={formData.frequence}
              onChange={(e) => handleChange('frequence', e.target.value)}
              placeholder="Ex: 28800"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Réserve de marche (heures)
            </label>
            <input
              type="text"
              value={formData.reserve}
              onChange={(e) => handleChange('reserve', e.target.value)}
              placeholder="Ex: 38"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nombre de rubis
            </label>
            <input
              type="text"
              value={formData.rubis}
              onChange={(e) => handleChange('rubis', e.target.value)}
              placeholder="Ex: 25"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <button
            onClick={generatePDF}
            disabled={!formData.calibre}
            className="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            Générer et Imprimer la fiche
          </button>

          <p className="text-xs text-slate-500 text-center">
            * Champs obligatoires
          </p>
        </div>

        <div>
          <div className="bg-slate-100 border-2 border-slate-300 rounded-xl p-8 h-full">
            <h3 className="font-bold text-slate-900 mb-4 text-center">Aperçu de la fiche</h3>
            <div className="bg-white rounded-lg p-6 shadow-inner">
              <div className="text-center mb-6 border-b-2 border-blue-600 pb-4">
                <h4 className="text-2xl font-bold text-slate-900 mb-2">
                  {formData.calibre || 'Calibre Non Spécifié'}
                </h4>
                <p className="text-sm text-slate-600">{formData.type}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-600">Diamètre :</span>
                  <span className="font-semibold">{formData.diametre || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-600">Hauteur :</span>
                  <span className="font-semibold">{formData.hauteur || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-600">Fréquence :</span>
                  <span className="font-semibold">
                    {formData.frequence ? `${formData.frequence} A/h` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-600">Réserve :</span>
                  <span className="font-semibold">
                    {formData.reserve ? `${formData.reserve}h` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-600">Rubis :</span>
                  <span className="font-semibold">
                    {formData.rubis ? `${formData.rubis} jewels` : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center border-t border-slate-200 pt-4">
                <p className="text-xs text-slate-500">Généré par HorloLearn</p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date().toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p className="text-sm text-emerald-900">
          <strong>💡 Astuce :</strong> La fiche sera ouverte dans une nouvelle fenêtre avec l'aperçu avant impression. 
          Vous pourrez l'enregistrer en PDF via la fonction "Imprimer en PDF" de votre navigateur.
        </p>
      </div>
    </div>
  );
}
