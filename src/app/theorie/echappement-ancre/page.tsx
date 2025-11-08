'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Activity, Zap, Clock, Heart, Settings2, 
  Globe, Download, Microscope, Gauge, BookOpen, 
  Award, Share2, Print, ZoomIn, RotateCw, 
  Info, AlertCircle, CheckCircle, XCircle,
  Play, Pause, SlidersHorizontal
} from 'lucide-react';
import Link from 'next/link';

// Import dynamique pour les libs optionnelles
const EscapementSimulator = dynamic(() => import('./EscapementSimulator'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex items-center justify-center text-white">
    <div className="text-center">
      <Zap className="w-12 h-12 mx-auto mb-3 text-blue-400" />
      <p className="text-lg font-medium">Simulateur 3D</p>
      <p className="text-sm text-slate-400">Chargement des bibliothèques...</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-3 px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  </div>
});

// Reste du code identique...
