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

  const handleFileUpload = useCallback(
    async (file: File, isUpdate = false) => {
      console.log('handleFileUpload start', { name: file?.name, size: file?.size, type: file?.type, isUpdate });
      if (!file || file.type !== 'application/pdf') {
        toast.error('Veuillez sélectionner un fichier PDF valide.');
        return;
      }

      setIsLoading(!isUpdate);
      setIsUpdating(isUpdate);

      let extractedCourses: CourseData[] = [];
      try {
        console.log('parsePlanning start: reading arrayBuffer');
        const arrayBuffer = await file.arrayBuffer().catch((err) => {
          console.error('arrayBuffer read error:', err);
          throw new Error('Lecture du fichier PDF impossible.');
        });

        if (!arrayBuffer || (arrayBuffer as ArrayBuffer).byteLength === 0) {
          console.warn('arrayBuffer is empty');
          toast.error('Le fichier PDF est vide.');
          return;
        }

        console.log('PDFParser.parsePDF start');
        // Primary parser path (existing behavior)
        extractedCourses = await pdfParser.parsePDF(file);
        console.log('PDFParser.parsePDF end', { count: extractedCourses?.length });

        // Validate parsing result before proceeding
        if (!Array.isArray(extractedCourses) || extractedCourses.length === 0) {
          console.error('Parsed result invalid or empty');
          toast.error('Le planning PDF est vide ou non reconnu.');
          return;
        }
      } catch (error) {
        console.error('Erreur pendant l\'analyse du PDF :', error);
        toast.error('Erreur de lecture du planning. Vérifie ton fichier PDF.');
        return;
      }

      let finalPlanning: PlanningData | undefined;
      try {
        if (isUpdate && planning) {
          console.log('compareAndMerge start');
          let changes;
          try {
            changes = planningManager.compareAndMerge(planning, extractedCourses);
          } catch (err) {
            console.error('Erreur pendant la mise à jour du planning :', err);
            toast.error('Erreur lors de la mise à jour du planning.');
            return;
          }

          finalPlanning = changes.newPlanning as PlanningData;
          const { added, modified, removed } = changes.summary || { added: 0, modified: 0, removed: 0 };
          const totalChanges = (added || 0) + (modified || 0) + (removed || 0);
          if (totalChanges === 0) {
            toast.success('Aucune modification détectée dans votre planning.');
          } else {
            toast.success(`Planning mis à jour ! ${added} ajouts, ${modified} modifications, ${removed} suppressions.`);
          }
        } else {
          console.log('createPlanning start');
          finalPlanning = planningManager.createPlanning(extractedCourses) as PlanningData;
          // Defensive check: ensure totalCourses exists before using it
          // If missing, show clear message and avoid crash
          if (!finalPlanning || typeof (finalPlanning as any).metadata?.totalCourses === 'undefined') {
            toast.error('Le planning importé ne contient pas de données exploitables');
            setIsLoading(false);
            setIsUpdating(false);
            return;
          }
          toast.success(`Planning importé avec succès ! ${(finalPlanning as any).metadata.totalCourses} cours détectés.`);
        }
      } catch (error) {
        console.error('Erreur lors de la création/mise à jour du planning :', error);
        toast.error('Erreur lors de la mise à jour du planning.');
        return;
      }

      if (!finalPlanning) {
        console.error('finalPlanning undefined - abort render');
        toast.error("Impossible d'afficher le planning.");
        return;
      }

      try {
        await localforage.setItem('smart-planning-data', finalPlanning);
        setPlanning(finalPlanning);
        setHasExistingPlanning(true);
      } catch (error) {
        console.error('Erreur de sauvegarde du planning :', error);
        toast.error('Erreur lors de la sauvegarde du planning.');
        return;
      } finally {
        setIsLoading(false);
        setIsUpdating(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (updateFileInputRef.current) updateFileInputRef.current.value = '';
      }
    },
    [planning, planningManager, pdfParser]
  );

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

  // Defensive render: before any usage of planning.metadata.totalCourses
  if (!hasExistingPlanning && !planning) {
    return (
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <Calendar className="mx-auto mb-4 text-blue-400" size={64} />
            <h2 className="text-3xl font-bold text-white mb-4">Importez votre premier planning</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Téléchargez votre fichier PDF de planning scolaire pour commencer.
              Notre système analysera automatiquement vos cours, horaires et salles.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-6">
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleInitialUpload}
              ref={fileInputRef}
            />
            <motion.button
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-50"
              disabled={isLoading}
              onClick={triggerFileInput}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? <RefreshCw className="animate-spin" size={24} /> : <Upload size={24} />}
              {isLoading ? 'Analyse en cours...' : '📄 Importer mon planning PDF'}
            </motion.button>
            <div className="text-sm text-slate-400">Format accepté : PDF uniquement • Taille max : 10 MB</div>
          </div>
        </div>
      </motion.div>
    );
  }

  // New guard when planning exists but missing totalCourses
  if (!planning || typeof (planning as any).metadata?.totalCourses === 'undefined') {
    toast.error('Le planning importé ne contient pas de données exploitables');
    return <p className="text-gray-400 mt-6">Aucun planning disponible</p>;
  }

  return (
    <motion.div className="max-w-7xl mx-auto space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Planning Management Panel */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">📅 Mon Planning</h2>
            {planning && (
              <div className="text-sm text-slate-300">
                Dernière mise à jour :
                {new Date(planning.lastUpdated).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="file" accept=".pdf" className="hidden" onChange={handleInitialUpload} ref={fileInputRef} />
            <input type="file" accept=".pdf" className="hidden" onChange={handleUpdateUpload} ref={updateFileInputRef} />
            <motion.button
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
              disabled={isLoading}
              onClick={triggerFileInput}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload size={18} />
              Importer
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
              disabled={isUpdating}
              onClick={triggerUpdateFileInput}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isUpdating ? <RefreshCw className="animate-spin" size={18} /> : <RefreshCw size={18} />}
              {isUpdating ? 'Mise à jour...' : '🔄 Mettre à jour'}
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium"
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash2 size={18} />
              Supprimer
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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
            <PlanningCalendar planning={planning} />
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
