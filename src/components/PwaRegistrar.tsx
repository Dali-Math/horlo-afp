"use client";

import React, { useEffect, useState } from "react";
import { Download, WifiOff, CheckCircle2, X, Smartphone } from "lucide-react";

export default function PwaRegistrar() {
  const [isOffline, setIsOffline] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosTip, setShowIosTip] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Service Worker Registration
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[PWA] Service Worker HorloLearn actif. Scope :", reg.scope);
        })
        .catch((err) => {
          console.warn("[PWA] Échec enregistrement Service Worker :", err);
        });
    }

    // 2. Connectivity Listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    // 3. Detect standalone (already installed)
    if (typeof window !== "undefined") {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone);

      // Detect iOS Safari
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIos(isIosDevice);
    }

    // 4. Capture BeforeInstallPrompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show install prompt button if not already in standalone mode
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIos) {
        setShowIosTip(true);
      }
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setShowInstallPrompt(false);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {/* Offline Status Toast */}
      {isOffline && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-950/90 border border-amber-500/50 text-amber-200 text-xs font-mono shadow-2xl backdrop-blur-md animate-bounce">
          <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Mode Hors-Ligne Actif :</strong> L&apos;application reste 100% opérationnelle à l&apos;établi sans réseau.
          </span>
        </div>
      )}

      {/* Discreet Install Pill on Workbench (if installable and not already standalone) */}
      {showInstallPrompt && !isInstalled && (
        <div className="fixed top-20 right-4 z-40 hidden sm:flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 dark:bg-black/90 border border-amber-500/40 text-slate-200 shadow-xl backdrop-blur-md text-xs font-mono">
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Installer l&apos;App HorloLearn</span>
          </button>
          <button
            onClick={() => setShowInstallPrompt(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Masquer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* iOS Install Helper Modal */}
      {showIosTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-sm w-full bg-slate-900 border border-amber-500/40 rounded-3xl p-6 text-slate-200 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-amber-400 font-bold flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Installer sur iPad / iPhone
              </span>
              <button
                onClick={() => setShowIosTip(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Pour poser HorloLearn directement sur votre établi :
            </p>
            <ol className="space-y-2 list-decimal list-inside text-slate-300">
              <li>Touchez le bouton de <strong>Partage</strong> en bas de Safari (icône carré avec flèche montante ⎋).</li>
              <li>Faites défiler et sélectionnez <strong>« Sur l&apos;écran d&apos;accueil »</strong> (icône ➕).</li>
              <li>Validez avec <strong>« Ajouter »</strong>.</li>
            </ol>
            <p className="text-[11px] text-amber-400/90 border-t border-slate-800 pt-3">
              ✓ L&apos;application s&apos;ouvrira en plein écran sans barre d&apos;adresse, utilisable même en sous-sol sans Wi-Fi.
            </p>
            <button
              onClick={() => setShowIosTip(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}
