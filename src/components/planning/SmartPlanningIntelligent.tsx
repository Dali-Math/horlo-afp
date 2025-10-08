"use client";
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Table, Upload, FileText, Download, Trash2 } from 'lucide-react';
import { PlanningData, PlanningState, ViewMode } from '@/types/planning';
import PlanningCalendar from './PlanningCalendar';
import * as pdfjsLib from 'pdfjs-dist';
// Configure pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface SmartPlanningIntelligentProps {
  onPlanningLoad?: (planning: PlanningData) => void;
  initialPlanning?: PlanningData;
}

const SmartPlanningIntelligent: React.FC<SmartPlanningIntelligentProps> = ({
  onPlanningLoad,
  initialPlanning,
}) => {
  const [planningState, setPlanningState] = useState<PlanningState>({
    data: initialPlanning || null,
    isLoading: false,
    error: null,
  });

  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [filters, setFilters] = useState<{
    subjects: string[];
    professors: string[];
    rooms: string[];
  }>({
    subjects: [],
    professors: [],
    rooms: [],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [planningData, setPlanningData] = useState<PlanningData | null>(null);
  const [planning, setPlanning] = useState<PlanningData | null>(null);

  const clearPlanning = useCallback(() => {
    setPlanningState({ data: null, isLoading: false, error: null });
    setPlanningData(null);
    setPlanning(null);
    setFilters({ subjects: [], professors: [], rooms: [] });
  }, []);

  const parsePDFContent = (text: string): PlanningData => {
    const lines = text.split('\n').filter(line => line.trim());
    const courses: any[] = [];
    let currentDay = '';
    
    const timePattern = /^(\d{1,2}[h:]\d{2})/;
    const dayPattern = /(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)/i;
    
    lines.forEach((line, index) => {
      const dayMatch = line.toLowerCase().match(dayPattern);
      if (dayMatch) {
        currentDay = dayMatch[1].toLowerCase();
        return;
      }
      
      const timeMatch = line.match(timePattern);
      if (timeMatch && currentDay) {
        const time = timeMatch[1].replace('h', ':');
        const restOfLine = line.replace(timeMatch[0], '').trim();
        
        if (restOfLine) {
          const parts = restOfLine.split(/[\s-]+/);
          const subject = parts[0] || 'Cours';
          const professor = parts.find(p => p.includes('Prof') || p.length > 3) || 'Non spécifié';
          const room = parts.find(p => /^[A-Z]\d+|salle/i.test(p)) || 'Non spécifiée';
          
          courses.push({
            id: `${currentDay}-${time}-${index}`,
            subject,
            professor,
            room,
            day: currentDay,
            time,
            duration: 60,
          });
        }
      }
    });
    
    return {
      courses,
      metadata: {
        totalCourses: courses.length,
        subjects: [...new Set(courses.map(c => c.subject))],
        professors: [...new Set(courses.map(c => c.professor))],
        rooms: [...new Set(courses.map(c => c.room))],
      },
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setPlanningState({ data: null, isLoading: true, error: null });

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      const parsedData = parsePDFContent(fullText);
      setPlanningData(parsedData);
      setPlanning(parsedData);
      setPlanningState({ data: parsedData, isLoading: false, error: null });
      onPlanningLoad?.(parsedData);
    } catch (error) {
      console.error('Erreur lors du traitement du PDF:', error);
      setPlanningState({
        data: null,
        isLoading: false,
        error: 'Impossible de lire le fichier PDF',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSamplePDF = () => {
    const link = document.createElement('a');
    link.href = '/manuel_horloger_1863.pdf';
    link.download = 'exemple-planning.pdf';
    link.click();
  };

  if (planningState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyse du planning en cours...</p>
        </div>
      </div>
    );
  }

  if (planningState.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-lg font-semibold mb-2">
          Erreur de chargement
        </div>
        <p className="text-red-700 mb-4">{planningState.error}</p>
        <button
          onClick={() => setPlanningState({ data: null, isLoading: false, error: null })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Planning Intelligent
            </h1>
            <p className="text-gray-600 text-lg">
              Importez votre planning PDF et visualisez-le de manière interactive
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-300">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Importez votre planning
              </h3>
              <p className="text-gray-500 mb-6">
                Glissez-déposez votre fichier PDF ou cliquez pour sélectionner
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer font-medium transition-colors duration-200 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Choisir un fichier PDF
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
                
                <button
                  onClick={downloadSamplePDF}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger un exemple
                </button>
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  viewMode === 'calendar'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendrier
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Table className="w-4 h-4 mr-2" />
                Tableau
              </button>
            </div>
          </div>

          {/* Planning Display */}
          {planning && (
            <PlanningCalendar planning={planning} viewMode={viewMode} />
          )}
          
          {/* Explicit propagation for testing */}
          {!planning && planningData && (
            <div>
              {(() => {
                console.log('planningData before render:', planningData);
                return null;
              })()}
              <PlanningCalendar planning={planningData} viewMode={viewMode} />
            </div>
          )}

          {/* Clear Planning Button */}
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearPlanning}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Supprimer le planning
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartPlanningIntelligent;
