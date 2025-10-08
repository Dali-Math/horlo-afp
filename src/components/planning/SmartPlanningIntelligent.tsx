"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, RefreshCw, Clock, Trash2, FileText, CheckCircle, AlertTriangle, Calendar, Table } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateFileInputRef = useRef<HTMLInputElement>(null);

  // Initialize planning manager and PDF parser
  const planningManager = new PlanningManager();
  const pdfParser = new PDFParser();

  // Load existing planning on component mount (localStorage with guard)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("planning");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.courses) setPlanning(parsed);
      }
    } catch (err) {
      console.error("Error loading planning:", err);
    }
  }, []);

  // Check if planning exists
  useEffect(() => {
    const checkPlanning = async () => {
      const exists = await planningManager.hasPlanning();
      setHasExistingPlanning(exists);
    };
    checkPlanning();
  }, [planning]);

  const handleFileSelect = useCallback(async (file: File, isUpdate: boolean = false) => {
    if (isUpdate) setIsUpdating(true);
    else setIsLoading(true);

    try {
      const parsedData = await pdfParser.parsePDF(file);
      
      if (isUpdate) {
        const merged = await planningManager.updatePlanning(parsedData);
        setPlanning(merged);
        localStorage.setItem("planning", JSON.stringify(merged));
        toast.success('✅ Planning mis à jour');
      } else {
        await planningManager.savePlanning(parsedData);
        setPlanning(parsedData);
        localStorage.setItem("planning", JSON.stringify(parsedData));
        toast.success('✅ Planning importé');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors du traitement du PDF');
    } finally {
      if (isUpdate) setIsUpdating(false);
      else setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(async () => {
    try {
      await planningManager.resetPlanning();
      setPlanning(null);
      localStorage.removeItem("planning");
      toast.success('🗑️ Planning réinitialisé');
    } catch (error) {
      toast.error('Erreur lors de la réinitialisation');
    }
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-[#E2B44F]/20 to-[#E2B44F]/5 rounded-lg p-6 mb-6 border border-[#E2B44F]/30">
        <h1 className="text-3xl font-bold text-white mb-2">📅 Planning Intelligent</h1>
        <p className="text-slate-300">Importez et gérez votre planning hebdomadaire</p>
      </div>

      {!planning ? (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 rounded-lg p-8 border border-slate-700"
          >
            <div className="text-center mb-6">
              <Upload className="mx-auto mb-4 text-[#E2B44F]" size={48} />
              <h2 className="text-xl font-semibold text-white mb-2">Aucun planning détecté</h2>
              <p className="text-slate-400">Uploadez un PDF pour commencer</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full bg-[#E2B44F] hover:bg-[#E2B44F]/80 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="animate-spin" size={20} />
                  Analyse en cours...
                </span>
              ) : (
                'Importer le planning (PDF)'
              )}
            </button>
          </motion.div>
        </AnimatePresence>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mb-6"
          >
            {/* View Toggle Buttons */}
            <div className="flex gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-[#E2B44F] text-slate-900 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Table size={18} />
                Vue Tableau
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-[#E2B44F] text-slate-900 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar size={18} />
                Vue Calendrier
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <input
                ref={updateFileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], true)}
                className="hidden"
              />
              <button
                onClick={() => updateFileInputRef.current?.click()}
                disabled={isUpdating}
                className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-all border border-blue-500/30 disabled:opacity-50"
              >
                <RefreshCw className={isUpdating ? 'animate-spin' : ''} size={18} />
                {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-all border border-red-500/30"
              >
                <Trash2 size={18} />
                Réinitialiser
              </button>
            </div>
          </motion.div>

          {/* Metadata Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/20 rounded-lg p-4 text-center">
              <FileText className="mx-auto mb-2 text-blue-400" size={24} />
              <div className="text-2xl font-bold text-white">{(planning as any).metadata.totalCourses}</div>
              <div className="text-sm text-slate-300">Cours</div>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4 text-center">
              <CheckCircle className="mx-auto mb-2 text-green-400" size={24} />
              <div className="text-2xl font-bold text-white">{(planning as any).metadata.subjects.length}</div>
              <div className="text-sm text-slate-300">Matières</div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4 text-center">
              <Clock className="mx-auto mb-2 text-purple-400" size={24} />
              <div className="text-2xl font-bold text-white">{(planning as any).metadata.teachers.length}</div>
              <div className="text-sm text-slate-300">Professeurs</div>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-4 text-center">
              <AlertTriangle className="mx-auto mb-2 text-orange-400" size={24} />
              <div className="text-2xl font-bold text-white">{(planning as any).metadata.rooms.length}</div>
              <div className="text-sm text-slate-300">Salles</div>
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
        </>
      )}
    </div>
  );
}
