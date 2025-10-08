"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Calendar, Table, AlertCircle } from 'lucide-react';
import PlanningCalendar from './PlanningCalendar';
import { PlanningManager } from '../../lib/planning-manager';

const SmartPlanningIntelligent: React.FC = () => {
  const [planning, setPlanning] = useState<any>(null);
  const [hasExistingPlanning, setHasExistingPlanning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('calendar');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const planningManager = new PlanningManager();

  useEffect(() => {
    checkExistingPlanning();
    const savedViewMode = localStorage.getItem('planning-view-mode');
    if (savedViewMode === 'table' || savedViewMode === 'calendar') {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('planning-view-mode', viewMode);
  }, [viewMode]);

  // Function to check for existing planning
  const checkExistingPlanning = async () => {
    try {
      const parsed = await planningManager.parsePlanning();
      setHasExistingPlanning(!!parsed && parsed.courses?.length > 0);
      
      if (parsed && parsed.courses?.length > 0) {
        setPlanning(parsed);
      }
    } catch (error) {
      console.error('Error checking existing planning:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError('');

    try {
      const parsed = await planningManager.parsePlanningFromFile(file);
      if (parsed && parsed.courses && parsed.courses.length > 0) {
        setPlanning(parsed);
        setHasExistingPlanning(true);
        
        // Save to localStorage for persistence
        await planningManager.savePlanning(parsed);
      } else {
        setError('Aucun cours détecté dans le fichier PDF.');
      }
    } catch (error: any) {
      console.error('Error parsing planning:', error);
      setError(error?.message || 'Erreur lors de l\'analyse du fichier PDF.');
    } finally {
      setIsLoading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearPlanning = async () => {
    try {
      await planningManager.clearPlanning();
      setPlanning(null);
      setHasExistingPlanning(false);
      setError('');
    } catch (error) {
      console.error('Error clearing planning:', error);
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'calendar' ? 'table' : 'calendar');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-[#E2B44F] mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            📚 Planning Intelligent
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Téléchargez votre emploi du temps en PDF pour une visualisation moderne
          </motion.p>
        </div>

        {/* Upload Section */}
        {!hasExistingPlanning && (
          <motion.div 
            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="text-center">
              <Upload className="w-16 h-16 text-[#E2B44F] mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Importer votre planning</h2>
              <p className="text-gray-400 mb-6">Téléchargez votre fichier PDF d'emploi du temps</p>
              
              <button
                onClick={triggerFileInput}
                disabled={isLoading}
                className="bg-[#E2B44F] hover:bg-[#d4a043] disabled:opacity-50 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Analyse en cours...
                  </span>
                ) : (
                  'Choisir un fichier PDF'
                )}
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {error && (
              <motion.div 
                className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300">{error}</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Planning Display */}
        {hasExistingPlanning && planning && (
          <motion.div 
            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#E2B44F]">Votre Planning</h2>
              <div className="flex items-center gap-4">
                <div className="flex bg-slate-700/50 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                      viewMode === 'calendar' 
                        ? 'bg-[#E2B44F] text-black font-semibold' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Calendrier
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                      viewMode === 'table' 
                        ? 'bg-[#E2B44F] text-black font-semibold' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Table className="w-4 h-4" />
                    Tableau
                  </button>
                </div>
                <button
                  onClick={clearPlanning}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                >
                  Effacer
                </button>
                <button
                  onClick={triggerFileInput}
                  className="px-4 py-2 bg-[#E2B44F] hover:bg-[#d4a043] text-black font-semibold rounded-lg transition-all"
                >
                  Nouveau PDF
                </button>
              </div>
            </div>

            {/* Conditional View Rendering */}
            <AnimatePresence mode="wait">
              {viewMode === 'table' ? (
                <motion.div
                  key="table"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {Array.isArray((planning as any).courses) && (planning as any).courses.length > 0 ? (
                    <table className="w-full border border-gray-700 text-sm text-white mt-6">
                      <thead className="bg-[#E2B44F]/20">
                        <tr>
                          <th className="p-2 text-left">Jour</th>
                          <th className="p-2 text-left">Horaire</th>
                          <th className="p-2 text-left">Matière</th>
                          <th className="p-2 text-left">Professeur</th>
                          <th className="p-2 text-left">Salle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(planning as any).courses.map((c: any, i: number) => (
                          <tr className="border-t border-gray-700 hover:bg-[#E2B44F]/10" key={i}>
                            <td className="p-2 text-slate-300">{c.day}</td>
                            <td className="p-2 text-slate-400">{c.startTime && c.endTime ? `${c.startTime} - ${c.endTime}` : c.time || '-'}</td>
                            <td className="p-2 text-[#E2B44F] font-semibold">{c.subject}</td>
                            <td className="p-2">{c.teacher}</td>
                            <td className="p-2">{c.room || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-300">Aucun cours à afficher.</p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PlanningCalendar planning={planning as any} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SmartPlanningIntelligent;
