import React, { useState } from 'react';
import { HelpCircle, Download, FileText, Settings, Eye } from 'lucide-react';

export default function GenerateurFiches() {
  const [selectedTemplate, setSelectedTemplate] = useState('caliber');
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    calibre: '',
    vitesse: '',
    reserve: '',
    complications: '',
    materiaux: '',
    dimensions: '',
    production: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const templates = {
    caliber: {
      name: 'Fiche Calibre',
      description: 'Documentation technique complète du calibre',
      fields: ['marque', 'modele', 'calibre', 'vitesse', 'reserve', 'complications']
    },
    component: {
      name: 'Fiche Composant',
      description: 'Documentation des composants individuels',
      fields: ['marque', 'modele', 'materiaux', 'dimensions']
    },
    service: {
      name: 'Fiche de Service',
      description: 'Documentation pour maintenance et réparation',
      fields: ['marque', 'modele', 'calibre', 'production']
    }
  };

  const currentTemplate = templates[selectedTemplate as keyof typeof templates];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateDocument = async () => {
    setIsGenerating(true);
    // Simulation de génération
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setPreviewMode(true);
  };

  const generateJSON = () => {
    const data = {
      documentType: currentTemplate.name,
      generatedDate: new Date().toISOString(),
      ...formData
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fiche_${selectedTemplate}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateMarkdown = () => {
    const md = `# ${currentTemplate.name}

**Marque:** ${formData.marque}  
**Modèle:** ${formData.modele}

## Informations Techniques

${Object.entries(formData).map(([key, value]) => value ? `- **${key.charAt(0).toUpperCase() + key.slice(1)}:** ${value}` : '').filter(line => line).join('\n')}

---
*Généré le ${new Date().toLocaleDateString('fr-FR')} par HorloLearn Tools*
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fiche_${selectedTemplate}_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-pink-500/20 p-3 rounded-lg">
          <HelpCircle className="w-6 h-6 text-pink-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">Générateur de Fiches</h2>
          <p className="text-slate-600 dark:text-light-400">Création automatique de fiches techniques professionnelles</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire de génération */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuration de la Fiche
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                  Modèle de Fiche
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-pink-500"
                >
                  {Object.entries(templates).map(([key, template]) => (
                    <option key={key} value={key}>{template.name}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {currentTemplate.description}
                </p>
              </div>

              {currentTemplate.fields.map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-pink-500"
                    placeholder={`Entrez ${field}...`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions de génération */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 mb-4">Génération</h3>
            <div className="space-y-3">
              <button
                onClick={generateDocument}
                disabled={isGenerating}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Prévisualiser la Fiche
                  </>
                )}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={generateJSON}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  JSON
                </button>
                <button
                  onClick={generateMarkdown}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Markdown
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Prévisualisation */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Aperçu de la Fiche
            </h3>

            {previewMode ? (
              <div className="space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-light-100 mb-2">
                    {currentTemplate.name}
                  </h4>
                  <div className="text-sm text-slate-600 dark:text-light-400">
                    Document généré le {new Date().toLocaleDateString('fr-FR')}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-slate-700 dark:text-light-300">Marque:</span>
                    <div className="mt-1 text-slate-900 dark:text-light-100">{formData.marque || 'Non spécifié'}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-700 dark:text-light-300">Modèle:</span>
                    <div className="mt-1 text-slate-900 dark:text-light-100">{formData.modele || 'Non spécifié'}</div>
                  </div>
                  {formData.calibre && (
                    <div>
                      <span className="text-sm font-medium text-slate-700 dark:text-light-300">Calibre:</span>
                      <div className="mt-1 text-slate-900 dark:text-light-100">{formData.calibre}</div>
                    </div>
                  )}
                  {formData.vitesse && (
                    <div>
                      <span className="text-sm font-medium text-slate-700 dark:text-light-300">Fréquence:</span>
                      <div className="mt-1 text-slate-900 dark:text-light-100">{formData.vitesse}</div>
                    </div>
                  )}
                  {formData.reserve && (
                    <div>
                      <span className="text-sm font-medium text-slate-700 dark:text-light-300">Réserve de Marche:</span>
                      <div className="mt-1 text-slate-900 dark:text-light-100">{formData.reserve}</div>
                    </div>
                  )}
                  {formData.complications && (
                    <div>
                      <span className="text-sm font-medium text-slate-700 dark:text-light-300">Complications:</span>
                      <div className="mt-1 text-slate-900 dark:text-light-100">{formData.complications}</div>
                    </div>
                  )}
                  {formData.materiaux && (
                    <div>
                      <span className="text-sm font-medium text-slate-700 dark:text-light-300">Matériaux:</span>
                      <div className="mt-1 text-slate-900 dark:text-light-100">{formData.materiaux}</div>
                    </div>
                  )}
                  {formData.dimensions && (
                    <div>
                      <span className="text-sm font-medium text-slate-700 dark:text-light-300">Dimensions:</span>
                      <div className="mt-1 text-slate-900 dark:text-light-100">{formData.dimensions}</div>
                    </div>
                  )}
                  {formData.production && (
                    <div>
                      <span className="text-sm font-medium text-slate-700 dark:text-light-300">Production:</span>
                      <div className="mt-1 text-slate-900 dark:text-light-100">{formData.production}</div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    © 2025 HorloLearn – Outils Professionnels Horlogers
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-light-400 mb-2">
                  Prévisualisation de la fiche
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  Remplissez le formulaire et cliquez sur "Prévisualiser"
                </p>
              </div>
            )}
          </div>

          {/* Templates disponibles */}
          <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-4">
            <h4 className="font-medium text-pink-800 dark:text-pink-200 mb-3">📋 Templates Disponibles</h4>
            <div className="space-y-2 text-sm">
              {Object.entries(templates).map(([key, template]) => (
                <div key={key} className="bg-white/60 dark:bg-white/10 rounded p-2">
                  <div className="font-medium text-pink-800 dark:text-pink-200">{template.name}</div>
                  <div className="text-xs text-pink-600 dark:text-pink-400">{template.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Informations techniques */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 Conseils d'Utilisation</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Remplissez tous les champs pour une fiche complète</li>
              <li>• Utilisez le format JSON pour intégration technique</li>
              <li>• Le format Markdown est idéal pour documentation</li>
              <li>• Les fiches peuvent être imprimées ou partagées</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}