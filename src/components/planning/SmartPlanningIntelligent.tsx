"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, RefreshCw, Calendar, Clock, Trash2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import localforage from 'localforage';
import isEqual from 'lodash.isequal';
import { PDFParser } from '@/lib/pdf-parser';
import { PlanningCalendar } from './PlanningCalendar';
import { PlanningManager } from '@/lib/planning-manager';

export interface CourseData {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  day: string;
  color?: string;
}

export interface PlanningData {
  courses: CourseData[];
  lastUpdated: Date;
  metadata: {
    totalCourses: number;
    subjects: string[];
    teachers: string[];
    rooms: string[];
  };
}

export default function SmartPlanningIntelligent() {
  const [planning, setPlanning] = useState<PlanningData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasExistingPlanning, setHasExistingPlanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateFileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize planning manager and PDF parser
  const planningManager = new PlanningManager();
  const pdfParser = new PDFParser();

  // Load existing planning on component mount
  useEffect(() => {
    loadExistingPlanning();
  }, []);

  const loadExistingPlanning = useCallback(async () => {
    try {
      const existingPlanning = await localforage.getItem<PlanningData>('smart-planning-data');
      if (existingPlanning) {
        setPlanning(existingPlanning);
        setHasExistingPlanning(true);
      }
    } catch (error) {
      console.error('Error loading existing planning:', error);
    }
  }, []);

  const handleFileUpload = useCallback(async (file: File, isUpdate = false) => {
    if (!file || file.type !== 'application/pdf') {
      toast.error('Veuillez sélectionner un fichier PDF valide.');
      return;
    }

    const loadingText = isUpdate ? 'Mise à jour du planning...' : 'Analyse du PDF en cours...';
    setIsLoading(!isUpdate);
    setIsUpdating(isUpdate);

    try {
      // Parse PDF and extract course data
      const extractedCourses = await pdfParser.parsePDF(file);
      
      if (!extractedCourses || extractedCourses.length === 0) {
        throw new Error('Aucun cours trouvé dans le PDF');
      }

      let finalPlanning: PlanningData;

      if (isUpdate && planning) {
        // Compare and merge with existing planning
        const changes = planningManager.compareAndMerge(planning, extractedCourses);
        finalPlanning = changes.newPlanning;
        
        // Show update summary
        const { added, modified, removed } = changes.summary;
        const totalChanges = added + modified + removed;
        
        if (totalChanges === 0) {
          toast.success('Aucune modification détectée dans votre planning.');
        } else {
          toast.success(
            `Planning mis à jour ! ${added} ajouts, ${modified} modifications, ${removed} suppressions.`
          );
        }
      } else {
        // Create new planning
        finalPlanning = planningManager.createPlanning(extractedCourses);
        toast.success(
          `Planning importé avec succès ! ${extractedCourses.length} cours détectés.`
        );
      }

      // Save to local storage
      await localforage.setItem('smart-planning-data', finalPlanning);
      setPlanning(finalPlanning);
      setHasExistingPlanning(true);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du traitement du PDF';
      toast.error(errorMessage);
      console.error('PDF processing error:', error);
    } finally {
      setIsLoading(false);
      setIsUpdating(false);
      // Reset file inputs
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (updateFileInputRef.current) updateFileInputRef.current.value = '';
    }
  }, [planning, planningManager, pdfParser]);

  const handleInitialUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file, false);
  };

  const handleUpdateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file, true);
  };

  const handleReset = useCallback(async () => {
    try {
      await localforage.removeItem('smart-planning-data');
      setPlanning(null);
      setHasExistingPlanning(false);
      toast.success('Planning supprimé avec succès.');
    } catch (error) {
      toast.error('Erreur lors de la suppression du planning.');
      console.error('Reset error:', error);
    }
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerUpdateFileInput = () => {
    updateFileInputRef.current?.click();
  };

  if (!hasExistingPlanning && !planning) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <Calendar className="mx-auto mb-4 text-blue-400" size={64} />
            <h2 className="text-3xl font-bold text-white mb-4">
              Importez votre premier planning
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Téléchargez votre fichier PDF de planning scolaire pour commencer.
              Notre système analysera automatiquement vos cours, horaires et salles.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleInitialUpload}
              className="hidden"
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerFileInput}
              disabled={isLoading}
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin" size={24} />
              ) : (
                <Upload size={24} />
              )}
              <span>
                {isLoading ? 'Analyse en cours...' : '📄 Importer mon planning PDF'}
              </span>
            </motion.button>

            <div className="text-sm text-slate-400">
              Format accepté : PDF uniquement • Taille max : 10 MB
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* Planning Management Panel */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
              📅 Mon Planning
            </h2>
            {planning && (
              <div className="text-sm text-slate-300">
                Dernière mise à jour : {new Date(planning.lastUpdated).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleInitialUpload}
              className="hidden"
            />
            <input
              ref={updateFileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleUpdateUpload}
              className="hidden"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerFileInput}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              <Upload size={18} />
              <span>Importer</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerUpdateFileInput}
              disabled={isUpdating}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {isUpdating ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                <RefreshCw size={18} />
              )}
              <span>
                {isUpdating ? 'Mise à jour...' : '🔄 Mettre à jour'}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              <Trash2 size={18} />
              <span>Supprimer</span>
            </motion.button>
          </div>
        </div>

        {/* Planning Stats */}
        {planning && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/20 rounded-lg p-4 text-center">
              <FileText className="mx-auto mb-2 text-blue-400" size={24} />
              <div className="text-2xl font-bold text-white">{planning.metadata.totalCourses}</div>
              <div className="text-sm text-slate-300">Cours</div>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4 text-center">
              <CheckCircle className="mx-auto mb-2 text-green-400" size={24} />
              <div className="text-2xl font-bold text-white">{planning.metadata.subjects.length}</div>
              <div className="text-sm text-slate-300">Matières</div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4 text-center">
              <Clock className="mx-auto mb-2 text-purple-400" size={24} />
              <div className="text-2xl font-bold text-white">{planning.metadata.teachers.length}</div>
              <div className="text-sm text-slate-300">Professeurs</div>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-4 text-center">
              <AlertTriangle className="mx-auto mb-2 text-orange-400" size={24} />
              <div className="text-2xl font-bold text-white">{planning.metadata.rooms.length}</div>
              <div className="text-sm text-slate-300">Salles</div>
            </div>
          </div>
        )}
      </div>

      {/* Calendar Display */}
      {planning && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PlanningCalendar planning={planning} />
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
