'use client';

import React, { useState, useEffect } from 'react';
import { Globe, X, CheckCircle2 } from 'lucide-react';

export default function TranslationNoticeBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');

  useEffect(() => {
    // Si l'utilisateur l'a déjà masqué durant cette session
    if (sessionStorage.getItem('horlolearn_en_notice_closed') === '1') {
      return;
    }

    const detectLanguage = () => {
      // 1. Détection via cookie googtrans (/fr/en, etc.)
      const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
      const isTranslated = match && match[1] && !match[1].endsWith('/fr');
      const activeLang = isTranslated ? match[1].split('/').pop() : localStorage.getItem('horlolearn_lang') || 'fr';

      // 2. Détection si la langue du navigateur est anglaise et que la page est traduite
      const isEnglish = activeLang === 'en' || (isTranslated && activeLang !== 'fr');

      if (isEnglish) {
        setCurrentLang(activeLang || 'en');
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    detectLanguage();
    const interval = setInterval(detectLanguage, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('horlolearn_en_notice_closed', '1');
  };

  const handleSwitchToFrench = () => {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    const domainParts = window.location.hostname.split('.');
    if (domainParts.length > 1) {
      const rootDomain = '.' + domainParts.slice(-2).join('.');
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain};`;
    }
    localStorage.setItem('horlolearn_lang', 'fr');
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div
      className="notranslate w-full bg-slate-900/95 dark:bg-slate-950/95 border-b border-amber-500/40 text-slate-200 px-3 sm:px-4 py-2 text-xs font-sans shadow-lg relative z-40 backdrop-blur-md pt-20 sm:pt-24 transition-all"
      translate="no"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-[260px]">
          <span className="p-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0 mt-0.5 sm:mt-0">
            <Globe className="w-3.5 h-3.5" />
          </span>
          <p className="text-[11px] sm:text-xs text-slate-300 leading-snug font-sans">
            <strong className="text-amber-400 font-semibold font-mono">🇬🇧 English Translation Note:</strong>{' '}
            Original content is authored in French following the Swiss watchmaking curriculum (<em>Théorie d&apos;Horlogerie</em>).{' '}
            This English version is machine-translated and undergoing human editorial review for authentic horological terms (e.g.{' '}
            <span className="font-mono text-amber-300">pallet lever</span>, <span className="font-mono text-amber-300">balance cock</span>,{' '}
            <span className="font-mono text-amber-300">endshake</span>).
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={handleSwitchToFrench}
            className="px-2.5 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-[10px] sm:text-[11px] font-mono transition flex items-center gap-1 shadow-sm font-semibold"
            title="Switch back to original Swiss French text"
          >
            <span>Lire en Français original 🇫🇷</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Dismiss translation notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
