"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Calendar, Table, AlertCircle } from 'lucide-react';
import PlanningCalendar from './PlanningCalendar';
import { parsePDF } from '../../lib/pdf-parser';
import { ParsedSchedule, CourseData } from '../../types/planning';

const SmartPlanningIntelligent: React.FC = () => {
  const [planning, setPlanning] = useState<ParsedSchedule | null>(null);
  const [hasExistingPlanning, setHasExistingPlanning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('calendar');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkExistingPlanning();
    const savedViewMode = localStorage.getItem('planning-view-mode');
    if (savedViewMode === 'table' || savedViewMode === 'calendar') {
      setViewMode(savedViewMode as 'table' | 'calendar');
    }
  }, []);

  // Save view mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('planning-view-mode', viewMode);
  }, [viewMode]);

  // Function to check for existing planning
  const checkExistingPlanning = async () => {
    try {
      const existingData = localStorage.getItem('planning-data');
      if (existingData) {
        const parsedData = JSON.parse(existingData) as ParsedSchedule;
        setPlanning(parsedData);
        setHasExistingPlanning(true);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données existantes:', error);
    }
  };

  // Function to handle file upload and parsing
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Veuillez sélectionner un fichier PDF valide.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const result = await parsePDF(file);
      if (result) {
        // Ensure each course has a stable id and normalize structure
        const fixedCourses = result.courses.map((c, i) => ({ id: c.id ?? i.toString(), ...c }));
        const normalized: ParsedSchedule = { ...result, courses: fixedCourses };
        setPlanning(normalized);
        localStorage.setItem('planning-data', JSON.stringify(normalized));
        setHasExistingPlanning(true);
      } else {
        setError('Impossible de parser le fichier PDF.');
      }
    } catch (error) {
      console.error('Erreur lors du parsing du PDF:', error);
      setError('Erreur lors du traitement du fichier.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear planning data
  const clearPlanning = () => {
    localStorage.removeItem('planning-data');
    setPlanning(null);
    setHasExistingPlanning(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Explicit planningData propagation (for debugging/guaranteed props)
  const planningData = planning ?? { week: '', courses: [] } as unknown as ParsedSchedule;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Planning Intelligent</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Importez votre planning PDF et visualisez-le dans un calendrier interactif moderne
          </p>
        </motion.div>

        {!hasExistingPlanning ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="text-center">
              <div className="mb-6">
                <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Importer votre planning</h2>
                <p className="text-gray-600">Sélectionnez un fichier PDF contenant votre emploi du temps</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerFileInput}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Traitement en cours...' : 'Choisir un fichier PDF'}
              </motion.button>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center justify-center"
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
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
              {!planning && (
                <PlanningCalendar planning={planningData} viewMode={viewMode} />
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
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
export default SmartPlanningIntelligent;
