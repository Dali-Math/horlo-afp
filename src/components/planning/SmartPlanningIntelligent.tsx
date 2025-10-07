"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, RefreshCw, Clock, Trash2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import localforage from 'localforage';
import { PDFParser } from '@/lib/pdf-parser';
import { PlanningCalendar } from './PlanningCalendar';
import { PlanningManager } from '@/lib/planning-manager';

export interface CourseData {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  day: string;
  startTime?: string;
  endTime?: string;
  time?: string;
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
      if (existingPlanning && Array.isArray(existingPlanning.courses)) {
        setPlanning(existingPlanning);
        setHasExistingPlanning(existingPlanning.courses.length > 0);
      } else {
        setPlanning(null);
        setHasExistingPlanning(false);
      }
    } catch (error) {
      console.error('Error loading existing planning:', error);
      setPlanning(null);
      setHasExistingPlanning(false);
    }
  }, []);

  const handleFileUpload = useCallback(
    async (file: File, isUpdate = false) => {
      if (!file || file.type !== 'application/pdf') {
        toast.error('Veuillez sélectionner un fichier PDF valide.');
        return;
      }

      setIsLoading(!isUpdate);
      setIsUpdating(isUpdate);

      let extractedCourses: CourseData[] = [];

      try {
        const arrayBuffer = await file.arrayBuffer();
        if (!arrayBuffer || (arrayBuffer as ArrayBuffer).byteLength === 0) {
          toast.error('Le fichier PDF est vide.');
          return;
        }

        // Primary parser path (existing behavior)
        const parsed = await pdfParser.parsePDF(file);

        // Force mapping to CourseData shape expected by the app
        const extracted = (parsed?.courses || []).map((c: any, i: number) => ({
          id: `course-${i + 1}`,
          subject: c.subject || '',
          teacher: c.teacher || '',
          room: c.room || '',
          time: c.time || '',
          day: c.day || '',
        })) as CourseData[];
        extractedCourses = extracted;

        // Validate parsing result before proceeding
        if (!Array.isArray(extractedCourses) || extractedCourses.length === 0) {
          toast.error('Le planning PDF est vide ou non reconnu.');
          return;
        }

        // ensure planning state reflects parsed structure for immediate UI update
        setPlanning({
          courses: extractedCourses,
          lastUpdated: new Date(),
          metadata: {
            totalCourses: extractedCourses.length,
            subjects: Array.from(new Set(extractedCourses.map(c => c.subject).filter(Boolean))),
            teachers: Array.from(new Set(extractedCourses.map(c => c.teacher).filter(Boolean))),
            rooms: Array.from(new Set(extractedCourses.map(c => c.room).filter(Boolean))),
          },
        });
      } catch (error) {
        console.error('Erreur pendant l\'analyse du PDF :', error);
        toast.error('Erreur de lecture du planning. Vérifie ton fichier PDF.');
        return;
      }

      let finalPlanning: PlanningData | undefined;
      try {
        if (isUpdate && planning) {
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
          finalPlanning = planningManager.createPlanning(extractedCourses) as PlanningData;
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
    [planning]
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

  const triggerFileInput = () => fileInputRef.current?.click();
  const triggerUpdateFileInput = () => updateFileInputRef.current?.click();

  // Render guard: avoid any map/length on undefined
  if (!planning || !Array.isArray(planning.courses) || planning.courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16">
        <p className="text-gray-300">Aucun planning chargé pour le moment.</p>
        <input type="file" accept=".pdf" className="hidden" onChange={handleInitialUpload} ref={fileInputRef} />
        <button onClick={triggerFileInput} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
          📤 Importer mon planning PDF
        </button>
      </div>
    );
  }

  // Guard: planning exists but missing totalCourses metadata entirely
  if (typeof (planning as any).metadata?.totalCourses === 'undefined') {
    toast.error('Le planning importé ne contient pas de données exploitables');
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16">
        <p className="text-gray-300">Aucun planning chargé pour le moment.</p>
        <input type="file" accept=".pdf" className="hidden" onChange={handleInitialUpload} ref={fileInputRef} />
        <button onClick={triggerFileInput} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
          📤 Importer mon planning PDF
        </button>
      </div>
    );
  }

  return (
    <motion.div className="max-w-7xl mx-auto space-y-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {/* Planning Management Panel */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">📅 Mon Planning</h2>
            <div className="text-sm text-slate-300">
              Dernière mise à jour :{' '}
              {new Date(planning.lastUpdated).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input accept=".pdf" className="hidden" onChange={handleInitialUpload} ref={fileInputRef} type="file" />
            <input accept=".pdf" className="hidden" onChange={handleUpdateUpload} ref={updateFileInputRef} type="file" />

            <motion.button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50" disabled={isLoading} onClick={triggerFileInput} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Upload size={18} />
              Importer
            </motion.button>

            <motion.button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50" disabled={isUpdating} onClick={triggerUpdateFileInput} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {isUpdating ? <RefreshCw className="animate-spin" size={18} /> : <RefreshCw size={18} />}
              {isUpdating ? 'Mise à jour...' : '🔄 Mettre à jour'}
            </motion.button>

            <motion.button className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium" onClick={handleReset} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Trash2 size={18} />
              Supprimer
            </motion.button>
          </div>
        </div>

        {/* Planning Stats */}
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

        {/* Courses Table (strict guard) */}
        {Array.isArray(planning.courses) && planning.courses.length > 0 ? (
          <table className="w-full border border-gray-700 text-sm text-white mt-6">
            <thead className="bg-[#E2B44F]/20">
              <tr>
                <th className="p-2 text-left">Matière</th>
                <th className="p-2 text-left">Professeur</th>
                <th className="p-2 text-left">Salle</th>
              </tr>
            </thead>
            <tbody>
              {planning.courses.map((c, i) => (
                <tr className="border-t border-gray-700 hover:bg-[#E2B44F]/10" key={i}>
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
      </div>

      {/* Calendar Display */}
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
          <PlanningCalendar planning={planning} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
