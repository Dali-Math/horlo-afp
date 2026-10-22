// src/components/LanguageSelector.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

export interface Language {
  code: string;
  label: string;
  flag: string;
  short: string;
}

export const LANGUAGES: Language[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷', short: 'FR' },
  { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', short: 'DE' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', short: 'IT' },
];

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState<string>('fr');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialisation et détection du cookie googtrans
  useEffect(() => {
    // 1. Lire la langue stockée dans les cookies ou localStorage
    const getSavedLanguage = () => {
      const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
      if (match && match[1]) {
        const parts = match[1].split('/');
        const targetLang = parts[parts.length - 1];
        if (LANGUAGES.some(l => l.code === targetLang)) {
          return targetLang;
        }
      }
      const localLang = localStorage.getItem('horlolearn_lang');
      if (localLang && LANGUAGES.some(l => l.code === localLang)) {
        return localLang;
      }
      return 'fr';
    };

    setCurrentLang(getSavedLanguage());

    // 2. Charger le script Google Translate de façon propre
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'fr',
              includedLanguages: 'fr,en,de,it',
              autoDisplay: false,
              layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE || 0,
            },
            'google_translate_element'
          );
        }
      };

      const existingScript = document.getElementById('google-translate-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    }

    // 3. Fermer le dropdown en cliquant à l'extérieur
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Changer de langue
  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('horlolearn_lang', langCode);
    setIsOpen(false);

    if (langCode === 'fr') {
      // Effacer le cookie pour revenir à la langue native
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      const domainParts = window.location.hostname.split('.');
      if (domainParts.length > 1) {
        const rootDomain = '.' + domainParts.slice(-2).join('.');
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain};`;
      }
    } else {
      // Définir le cookie de traduction Google
      const cookieValue = `/fr/${langCode}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname};`;
      const domainParts = window.location.hostname.split('.');
      if (domainParts.length > 1) {
        const rootDomain = '.' + domainParts.slice(-2).join('.');
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${rootDomain};`;
      }
    }

    // Recharger doucement la page pour appliquer la traduction
    window.location.reload();
  };

  const activeLanguageObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Conteneur caché pour le gadget Google Translate */}
      <div id="google_translate_element" className="hidden" style={{ display: 'none' }} />

      {/* Bouton de sélection de langue style Haute Horlogerie */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-[#E2B44F] border border-slate-700 hover:border-[#E2B44F]/50 transition-all duration-200 text-xs font-mono shadow-sm group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-3.5 h-3.5 text-[#E2B44F] group-hover:rotate-45 transition-transform duration-300" />
        <span className="text-sm leading-none">{activeLanguageObj.flag}</span>
        <span className="font-bold tracking-wider">{activeLanguageObj.short}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-[#E2B44F] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0D121F] border border-[#E2B44F]/30 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            Langue du Site · Language
          </div>

          <div className="py-1">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLang;

              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors font-mono ${
                    isSelected
                      ? 'bg-[#E2B44F]/15 text-[#E2B44F] font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-sans font-medium">{lang.label}</span>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#E2B44F]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 border-t border-slate-800/80 text-[9px] font-mono text-slate-500 text-center">
            Traduction instantanée d&apos;établi
          </div>
        </div>
      )}
      {/* Styles globaux pour masquer le bandeau Google Translate et préserver l'esthétique */}
      <style jsx global>{`
        .goog-te-banner-frame,
        .goog-te-gadget,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .goog-tooltip,
        .goog-tooltip:hover {
          display: none !important;
        }
        body {
          top: 0px !important;
          position: static !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
