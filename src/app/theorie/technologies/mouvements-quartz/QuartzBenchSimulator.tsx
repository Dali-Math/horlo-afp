"use client";

import React, { useState, useEffect, useRef } from "react";
import { Zap, Play, Square, Compass, RefreshCw, AlertTriangle, CheckCircle2, ShieldAlert, Activity, Battery, Sliders } from "lucide-react";

export default function QuartzBenchSimulator() {
  const [testMode, setTestMode] = useState<"voltage" | "coil" | "consumption" | "unblock">("voltage");
  const [voltage, setVoltage] = useState<number>(1.55);
  const [coilState, setCoilState] = useState<"ok" | "open" | "short">("ok");
  const [trainState, setTrainState] = useState<"clean" | "gummed">("clean");

  // Motor kinematics state
  const [rotorAngle, setRotorAngle] = useState<number>(0);
  const [secHandAngle, setSecHandAngle] = useState<number>(0);
  const [polarity, setPolarity] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [phaseMessage, setPhaseMessage] = useState<string>("Rotor : Repos Magnétique 0° (Aligné sur encoches 35°)");

  const tickCounterRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger one Lavet step (180° rotation)
  const triggerPulse = () => {
    if (coilState === "open" || voltage < 1.20) {
      setPhaseMessage("ÉCHEC IMPULSION : Circuit bobine coupé (∞ Ω) ou tension U < 1.20V");
      return;
    }

    setRotorAngle((prev) => prev + 180);
    setSecHandAngle((prev) => prev + 6);
    setPolarity((prev) => prev * -1);
    setPhaseMessage(`Impulsion 7.8 ms reçue : Rotation +180° du rotor Lavet • Polarité ${polarity === 1 ? 'N/S' : 'S/N'}`);
  };

  // Run magnetic unblocker (50 Hz external rotating field)
  const runMagneticUnblocker = () => {
    setTestMode("unblock");
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        setRotorAngle((prev) => prev + 180);
        setSecHandAngle((prev) => prev + 6);
      }, i * 110);
    }
    setPhaseMessage("Débloqueur Magnétique : 6 pas rapides (50 Hz) induits sans courant électrique !");
  };

  // Continuous run effect (1 Hz normal or 4-sec jump in EOL mode)
  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      tickCounterRef.current++;
      const isEol = voltage < 1.35 && voltage >= 1.20;

      if (isEol) {
        // EOL (End Of Life): stay stopped for 3 seconds, then jump 4 steps rapidly
        if (tickCounterRef.current % 4 === 0) {
          for (let i = 0; i < 4; i++) {
            setTimeout(() => {
              triggerPulse();
            }, i * 110);
          }
        }
      } else {
        triggerPulse();
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, voltage, coilState, polarity]);

  // Telemetry computation
  const isEol = voltage < 1.35 && voltage >= 1.20;
  const isDead = voltage < 1.20;
  const consumptionUa = trainState === "clean" ? 1.10 : 4.20;

  // Probe coordinates in SVG based on selected mode
  const probeCoords = {
    voltage: { red: { x: 85, y: 52 }, black: { x: 85, y: 115 } },
    coil: { red: { x: 365, y: 95 }, black: { x: 365, y: 145 } },
    consumption: { red: { x: 175, y: 75 }, black: { x: 85, y: 115 } },
    unblock: { red: { x: 565, y: 105 }, black: { x: 565, y: 215 } }
  }[testMode];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Banc de Contrôle Horotest / Witschi Q-Test • Calibre ETA 955.112</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
            Diagnostic Électrique, Moteur Lavet &amp; Consommation Quartz
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-cyan-700 dark:text-cyan-300">
            Oscillateur : <strong>32&apos;768 Hz ÷ 2¹⁵ = 1 Hz</strong>
          </span>
          {isDead ? (
            <span className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-700 dark:text-rose-300 font-semibold">
              Tension Trop Basse (&lt; 1.20 V)
            </span>
          ) : isEol ? (
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-800 dark:text-amber-300 font-semibold animate-pulse">
              EOL Actif : Saut de 4 s toutes les 4s !
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold">
              Marche Normale (1 Hz / 180°)
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Interactive SVG Movement & Lavet Step Motor */}
        <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-800 p-5 shadow-inner space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b border-slate-300 dark:border-slate-800 pb-3">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-amber-400" />
              FLUX MAGNÉTIQUE STATOR &amp; ROTOR BIPOLAIRE
            </span>
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px]">
              {phaseMessage}
            </span>
          </div>

          {/* SVG Movement with probes */}
          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 680 320" className="w-full h-auto min-w-[540px]">
              <defs>
                <linearGradient id="qCopperCoil" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#B45309" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#92400E" />
                </linearGradient>
                <linearGradient id="qStatorGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
              </defs>

              {/* 1. Silver Oxide Battery 1.55V */}
              <g
                className="cursor-pointer transition-opacity hover:opacity-90"
                onClick={() => setTestMode("voltage")}
              >
                <circle cx="85" cy="115" r="52" className="fill-slate-200 dark:fill-[#1E293B]" stroke={testMode === "voltage" ? "#F59E0B" : "#94A3B8"} strokeWidth="3" />
                <circle cx="85" cy="115" r="42" className="fill-slate-300 dark:fill-[#334155]" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 3" />
                <text x="85" y="102" textAnchor="middle" fill="#F8FAFC" fontFamily="monospace" fontSize="11" fontWeight="bold">PILE 371</text>
                <text x="85" y="118" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="10">Ag₂O • 1.55V</text>
                <text
                  x="85"
                  y="135"
                  textAnchor="middle"
                  fill={voltage < 1.35 ? "#F59E0B" : "#10B981"}
                  fontFamily="monospace"
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  U = {voltage.toFixed(2)} V
                </text>
                <rect x="75" y="45" width="20" height="14" rx="2" fill="#D4AF37" />
                <text x="85" y="38" textAnchor="middle" fill="#D4AF37" fontFamily="monospace" fontSize="9">Piste (+)</text>
              </g>

              {/* 2. CMOS IC + Quartz Cylinder */}
              <g
                className="cursor-pointer transition-opacity hover:opacity-90"
                onClick={() => setTestMode("consumption")}
              >
                <rect x="175" y="55" width="145" height="125" rx="8" className="fill-slate-200 dark:fill-[#0F172A]" stroke={testMode === "consumption" ? "#F59E0B" : "#38BDF8"} strokeWidth="2" />
                <text x="247" y="78" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="10" fontWeight="bold">CIRCUIT CMOS</text>
                <rect x="195" y="92" width="105" height="28" rx="12" fill="#334155" stroke="#CBD5E1" strokeWidth="1.5" />
                <text x="247" y="110" textAnchor="middle" fill="#FDE047" fontFamily="monospace" fontSize="9.5" fontWeight="bold">QUARTZ 32&apos;768 Hz</text>
                <text x="247" y="142" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="8.5">15 étages Bascules T</text>
                <text x="247" y="160" textAnchor="middle" fill="#10B981" fontFamily="monospace" fontSize="9">Impulsion : 7.8 ms / 1s</text>
              </g>

              {/* PCB Traces */}
              <path d="M 137 115 L 175 115" stroke="#D4AF37" strokeWidth="3" />
              <path d="M 320 95 L 365 95" stroke="#D4AF37" strokeWidth="3" />
              <path d="M 320 145 L 365 145" stroke="#D4AF37" strokeWidth="3" />

              {/* 3. Copper Coil */}
              <g
                className="cursor-pointer transition-opacity hover:opacity-90"
                onClick={() => setTestMode("coil")}
              >
                <rect x="365" y="75" width="145" height="90" rx="6" fill="url(#qStatorGrad)" stroke={testMode === "coil" ? "#F59E0B" : "#64748B"} strokeWidth="2" />
                <rect x="388" y="65" width="100" height="110" rx="6" fill="url(#qCopperCoil)" stroke="#FDE047" strokeWidth="2" />
                {coilState === "open" && (
                  <path d="M 420 70 L 455 170" stroke="#EF4444" strokeWidth="4" />
                )}
                <text x="438" y="115" textAnchor="middle" fill="#FFFBEB" fontFamily="monospace" fontSize="10" fontWeight="bold">BOBINE CUIVRE</text>
                <text x="438" y="132" textAnchor="middle" fill="#FEF08A" fontFamily="monospace" fontSize="8.5">Fil Ø 0.02 mm (2.1 kΩ)</text>
                <circle cx="365" cy="95" r="6" fill="#D4AF37" stroke="#0A0D12" strokeWidth="1.5" />
                <circle cx="365" cy="145" r="6" fill="#D4AF37" strokeWidth="1.5" stroke="#0A0D12" />
              </g>

              {/* 4. Permalloy Stator & Lavet Stepping Rotor */}
              <g id="svgLavetMotor">
                <path d="M 510 75 L 615 75 A 65 65 0 0 1 615 245 L 365 245 L 365 165 L 510 165 Z" className="fill-slate-200 dark:fill-[#1E293B] stroke-slate-400 dark:stroke-[#94A3B8]" strokeWidth="2" />
                <text x="455" y="232" textAnchor="middle" className="fill-slate-600 dark:fill-[#CBD5E1]" fontFamily="monospace" fontSize="9">STATOR PERMALLOY (ASSOUPISSEMENT)</text>

                {/* Stator Poles */}
                <text
                  x="565"
                  y="96"
                  textAnchor="middle"
                  fill={polarity === 1 ? "#EF4444" : "#38BDF8"}
                  fontFamily="monospace"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {polarity === 1 ? "N" : "S"}
                </text>
                <text
                  x="565"
                  y="232"
                  textAnchor="middle"
                  fill={polarity === 1 ? "#38BDF8" : "#EF4444"}
                  fontFamily="monospace"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {polarity === 1 ? "S" : "N"}
                </text>

                {/* Stator Bore + Asymmetric Notches */}
                <circle cx="565" cy="160" r="46" className="fill-slate-100 dark:fill-[#070A0F]" stroke="#475569" strokeWidth="2" />
                <circle cx="532" cy="127" r="7" className="fill-slate-100 dark:fill-[#1E293B] stroke-amber-500" strokeWidth="1.5" />
                <circle cx="598" cy="193" r="7" className="fill-slate-100 dark:fill-[#1E293B] stroke-amber-500" strokeWidth="1.5" />
                <text x="615" y="122" className="fill-amber-700 dark:fill-[#D4AF37]" fontFamily="monospace" fontSize="8">Encoches 35°</text>

                {/* Bipolar Magnet Rotor */}
                <g
                  transform={`rotate(${rotorAngle} 565 160)`}
                  style={{ transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                >
                  <path d="M 565 122 A 38 38 0 0 1 565 198 Z" fill="#EF4444" />
                  <path d="M 565 198 A 38 38 0 0 1 565 122 Z" fill="#38BDF8" />
                  <circle cx="565" cy="160" r="38" fill="none" stroke="#F8FAFC" strokeWidth="2" />
                  <text x="583" y="164" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="10" fontWeight="bold">N</text>
                  <text x="547" y="164" textAnchor="middle" fill="#0F172A" fontFamily="monospace" fontSize="10" fontWeight="bold">S</text>
                  <circle cx="565" cy="160" r="8" fill="#D4AF37" stroke="#0A0D12" strokeWidth="2" />
                </g>
              </g>

              {/* 5. Analog Seconds Hand */}
              <g transform="translate(85, 245)">
                <circle cx="0" cy="0" r="46" className="fill-slate-100 dark:fill-[#111827] stroke-amber-500" strokeWidth="2" />
                <text x="0" y="-28" textAnchor="middle" className="fill-slate-600 dark:fill-[#94A3B8]" fontFamily="monospace" fontSize="8">TROTTEUSE</text>
                <g
                  transform={`rotate(${secHandAngle} 0 0)`}
                  style={{ transition: "transform 0.15s ease-out" }}
                >
                  <line x1="0" y1="10" x2="0" y2="-38" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="3.5" fill="#D4AF37" />
                </g>
              </g>

              {/* Multimeter Probes */}
              <g>
                <circle
                  cx={probeCoords.red.x}
                  cy={probeCoords.red.y}
                  r="7"
                  fill="#EF4444"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <circle
                  cx={probeCoords.black.x}
                  cy={probeCoords.black.y}
                  r="7"
                  fill="#1E293B"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </g>
            </svg>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <button
              onClick={triggerPulse}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-2 shadow transition-all active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Impulsion CMOS (+180°)</span>
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2.5 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isRunning
                  ? "bg-rose-500/20 border-rose-500/50 text-rose-300 hover:bg-rose-500/30"
                  : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500"
              }`}
            >
              {isRunning ? <Square className="w-4 h-4 text-rose-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              <span>{isRunning ? "Arrêter Marche" : "Marche Continue (1 Hz / EOL)"}</span>
            </button>

            <button
              onClick={runMagneticUnblocker}
              className="p-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-sky-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Débloqueur Magnétique (50 Hz)</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Multimeter LCD & Fault Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">Appareil d&apos;Atelier</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Multimètre &amp; Horotest</h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[11px] text-cyan-600 dark:text-cyan-400">
                Calibre : 955.112
              </span>
            </div>

            {/* 4 Measurement Modes */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <button
                onClick={() => setTestMode("voltage")}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  testMode === "voltage"
                    ? "border-amber-500 bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-amber-500"
                }`}
              >
                <Battery className="w-4 h-4 shrink-0" />
                <span className="truncate">1. Tension Pile (V)</span>
              </button>

              <button
                onClick={() => setTestMode("coil")}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  testMode === "coil"
                    ? "border-amber-500 bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-amber-500"
                }`}
              >
                <Activity className="w-4 h-4 shrink-0" />
                <span className="truncate">2. Bobine (kΩ)</span>
              </button>

              <button
                onClick={() => setTestMode("consumption")}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  testMode === "consumption"
                    ? "border-amber-500 bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-amber-500"
                }`}
              >
                <Sliders className="w-4 h-4 shrink-0" />
                <span className="truncate">3. Conso (µA)</span>
              </button>

              <button
                onClick={() => setTestMode("unblock")}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  testMode === "unblock"
                    ? "border-amber-500 bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-amber-500"
                }`}
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span className="truncate">4. Champ Magn.</span>
              </button>
            </div>

            {/* LCD Readout Adaptatif Horotest */}
            <div className="bg-emerald-50/80 dark:bg-[#08100C] border-2 border-emerald-500/40 rounded-2xl p-4 font-mono shadow-sm text-emerald-800 dark:text-emerald-400">
              <div className="flex justify-between text-[10px] text-emerald-700 dark:text-emerald-400/80 uppercase mb-1 font-bold">
                <span>
                  {testMode === "voltage" && "MODE 1 : TENSION PILE SOUS CHARGE (R = 2 kΩ)"}
                  {testMode === "coil" && "MODE 2 : RÉSISTANCE OHMIQUE BOBINE (Ω)"}
                  {testMode === "consumption" && "MODE 3 : CONSOMMATION DU MOUVEMENT (µA)"}
                  {testMode === "unblock" && "MODE 4 : CHAMP MAGNÉTIQUE ROTATIF"}
                </span>
                <span>SONDES : R (+) / N (-)</span>
              </div>

              <div className="flex items-baseline justify-between my-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-wider text-emerald-950 dark:text-emerald-300">
                  {testMode === "voltage" && `${voltage.toFixed(2)} V`}
                  {testMode === "coil" && (coilState === "ok" ? "2.10 kΩ" : coilState === "open" ? "O.L (∞ MΩ)" : "0.35 kΩ")}
                  {testMode === "consumption" && `${consumptionUa.toFixed(2)} µA`}
                  {testMode === "unblock" && "50 Hz MAG"}
                </span>

                <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  (testMode === "voltage" && voltage >= 1.50) || (testMode === "coil" && coilState === "ok") || (testMode === "consumption" && trainState === "clean")
                    ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                    : "bg-rose-500/20 text-rose-800 dark:text-rose-300"
                }`}>
                  {testMode === "voltage" && (voltage >= 1.50 ? "PILE NEUVE" : voltage >= 1.35 ? "FAIBLE" : "EOL < 1.35V")}
                  {testMode === "coil" && (coilState === "ok" ? "BOBINE SAINE" : coilState === "open" ? "COUPÉE" : "COURT-CIRCUIT")}
                  {testMode === "consumption" && (trainState === "clean" ? "NORMALE" : "ROUAGE GOMMÉ")}
                  {testMode === "unblock" && "ROTATIF ACTIF"}
                </span>
              </div>

              <div className="text-[11px] text-emerald-800/90 dark:text-emerald-200/80 border-t border-emerald-300 dark:border-emerald-500/20 pt-2 mt-2">
                {testMode === "voltage" && (
                  voltage >= 1.35
                    ? "Courbe de décharge plate Ag₂O (1.55 V). Marche normale à 1 Hz."
                    : "Alerte EOL : le circuit CMOS retient 3 impulsions et envoie 4 pas rapides toutes les 4s !"
                )}
                {testMode === "coil" && (
                  coilState === "ok"
                    ? "Norme suisse ETA : 1.80 à 2.40 kΩ (env. 10'000 spires de fil cuivre Ø 0.02 mm)."
                    : coilState === "open"
                    ? "Rupture du fil de 20 µm (coup de tournevis). Remplacement de la bobine requis."
                    : "Vernis isolant brûlé : champ magnétique affaibli et vidage express de la pile."
                )}
                {testMode === "consumption" && (
                  trainState === "clean"
                    ? "Consommation nominale : 0.80 à 1.50 µA (autonomie théorique > 36 mois)."
                    : "Surconsommation (4.20 µA) : le CMOS envoie des impulsions de rattrapage haute énergie !"
                )}
                {testMode === "unblock" && "Entraîne directement le rotor sans courant pour vérifier si les rouages tournent librement."}
              </div>
            </div>

            {/* Sliders & Fault Injectors */}
            <div className="space-y-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs font-mono">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Tension Pile 371 :</span>
                  <strong className={voltage < 1.35 ? "text-amber-500" : "text-emerald-500"}>
                    {voltage.toFixed(2)} V {voltage < 1.35 ? "(Fin de vie EOL)" : "(Normale)"}
                  </strong>
                </div>
                <input
                  type="range"
                  min="1.10"
                  max="1.60"
                  step="0.05"
                  value={voltage}
                  onChange={(e) => setVoltage(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase mb-1">
                  État Physique de la Bobine (Fil Ø 0.02 mm) :
                </label>
                <select
                  value={coilState}
                  onChange={(e) => setCoilState(e.target.value as "ok" | "open" | "short")}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white outline-none"
                >
                  <option value="ok">Bobine Saine (2.10 kΩ — Plage normale 1.80 à 2.40 kΩ)</option>
                  <option value="open">Bobine Coupée par ripage de brucelles (∞ MΩ — Circuit Ouvert)</option>
                  <option value="short">Spires en Court-Circuit (0.35 kΩ — Isolant dégradé)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase mb-1">
                  État Mécanique du Rouage :
                </label>
                <select
                  value={trainState}
                  onChange={(e) => setTrainState(e.target.value as "clean" | "gummed")}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white outline-none"
                >
                  <option value="clean">Rouage Propre &amp; Huilé Moebius 9000 (1.10 µA)</option>
                  <option value="gummed">Huiles figées / Poussières (4.20 µA — Surconsommation !)</option>
                </select>
              </div>
            </div>

            {/* Atelier Verdict */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              coilState === "open"
                ? "bg-rose-50 dark:bg-rose-950/40 border-rose-500/50 text-rose-900 dark:text-rose-200"
                : trainState === "gummed"
                ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500/50 text-amber-900 dark:text-amber-200"
                : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/50 text-emerald-900 dark:text-emerald-200"
            }`}>
              {coilState === "open" ? (
                <>
                  <strong className="text-rose-700 dark:text-rose-400 font-mono block mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Diagnostic Atelier : Bobine Coupée (∞ Ω)
                  </strong>
                  Même avec une pile neuve et le débloqueur magnétique fonctionnel, aucune impulsion n&apos;est transmise au stator. Le bloc bobine/module électronique doit être remplacé.
                </>
              ) : trainState === "gummed" ? (
                <>
                  <strong className="text-amber-700 dark:text-amber-400 font-mono block mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Diagnostic Atelier : Surconsommation Mécanique (4.20 µA)
                  </strong>
                  La partie électronique est saine mais les huiles figées freinent le rotor : un rhabillage complet et nettoyage aux ultrasons du rouage est impératif, sans quoi la pile neuve se videra en moins de 6 mois.
                </>
              ) : (
                <>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-mono block mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Diagnostic Atelier : Circuit &amp; Moteur Lavet Parfaitement Conformes
                  </strong>
                  Cliquez sur <strong>« Impulsion CMOS (+180°) »</strong> pour observer comment l&apos;inversion de polarité du stator fait basculer le rotor bipolaire de 180° à chaque seconde grâce aux encoches d&apos;asymétrie de repos à 35°.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
