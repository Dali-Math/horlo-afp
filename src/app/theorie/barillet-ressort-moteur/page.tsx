// app/theorie/barillet-ressort-moteur/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

// Données techniques complètes
const MOVEMENT_DB = [
  { calibre: 'ETA 2824-2', manufacture: 'Swatch Group', type: 'Simple Ø11.2mm', ressort: 'Nivaflex', reserve: '38h', couple: '0.88 µN·m' },
  { calibre: 'Rolex 3235', manufacture: 'Rolex', type: 'Oversized Ø13.0mm', ressort: 'Parachrom Bleu', reserve: '70h', couple: '0.92 µN·m' },
  { calibre: 'Patek 240', manufacture: 'Patek Philippe', type: 'Micro-rotor Ø10.5mm', ressort: 'Nivarox', reserve: '48h', couple: '0.78 µN·m' },
  { calibre: 'Omega 8900', manufacture: 'Swatch Group', type: 'Simple Ø12.0mm', ressort: 'Si14 Silicium', reserve: '60h', couple: '0.85 µN·m' },
];

const EXPERT_QUOTES = [
  { text: "Le barillet est le cœur mécanique. Un couple instable rend toute précision illusoire.", author: "Jean-Marc Wiederrecht", role: "AHCI Master Watchmaker" },
  { text: "Nivaflex réduit la dérive thermique de 23%. C'est la différence entre COSC et échec.", author: "Dr. Till Rieche", role: "ETA Materials Engineer" },
];

const QUIZ_QUESTIONS = [
  {
    question: "Un client rapporte une Speedmaster qui s'arrête après 12h. Le ressort Nivaflex semble intact. Cause la plus probable ?",
    options: ["Brise-barillet désajusté", "Roue de barillet grippée", "Bride glissante usée (perte de friction)", "Tambour frotté sur le pont"],
    correct: 2,
    explanation: "La bride glissante perd sa friction après ~10 ans, provoquant un glissement prématuré. Remplacement nécessaire (frottement calibré à 0.8-1.2 N·m)."
  },
  {
    question: "Quelle est la relation entre épaisseur du ressort (e) et couple moteur (C) ?",
    options: ["C ∝ e", "C ∝ e²", "C ∝ e³", "C ∝ √e"],
    correct: 2,
    explanation: "C = (E·e·h·n³)/(12·L). Le couple varie avec le CUBE de l'épaisseur. ×2 d'épaisseur = ×8 de couple !"
  },
  {
    question: "Pourquoi le Nivaflex NM est-il supérieur pour les montres anti-magnétiques ?",
    options: ["Densité plus élevée", "Module de Young stable face aux champs", "Propriétés paramagnétiques du Nickel", "Couche de surface DLC"],
    correct: 2,
    explanation: "La composition Ni-Cr-Co rend le Nivaflex paramagnétique (préserve le couple même à 15,000 gauss)."
  }
];

export default function BarilletReferencePage() {
  const [level, setLevel] = useState<'debutant' | 'expert' | 'pro'>('debutant');
  const [reserveResult, setReserveResult] = useState<string>('');
  const [selectedCalibre, setSelectedCalibre] = useState<string>('ETA 2824-2');
  const [quizScore, setQuizScore] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  // Calculateur de réserve de marche
  const calculateReserve = (diametre: number, epaisseur: number, longueur: number, tours: number) => {
    const rendement = 0.75;
    const volume = Math.PI * Math.pow(diametre/2, 2) * epaisseur;
    const reserve = (longueur * tours * rendement) / (diametre * 0.8);
    return `~${Math.round(reserve)} heures (≈ ${(reserve/24).toFixed(1)} jours)`;
  };

  // Simulateur de couple
  const simulateCouple = () => {
    const canvas = document.getElementById('coupleCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 400;
    canvas.height = 200;
    
    // Courbe de couple réaliste
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let x = 0; x < 400; x++) {
      const reserve = x / 400; // 0 à 100%
      const couple = 0.9 + 0.3 * Math.exp(-reserve * 2) - 0.2 * Math.pow(reserve, 3);
      const y = 180 - (couple * 100);
      
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.stroke();
    
    // Zones
    ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
    ctx.fillRect(0, 0, 300, 200); // Zone stable
    
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.fillRect(300, 0, 100, 200); // Zone critique
  };

  useEffect(() => {
    simulateCouple();
  }, []);

  return (
    <main className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b-4 border-yellow-500">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent z-10" />
        <div className="max-w-7xl mx-auto px-4 py-24 relative z-20">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent tracking-tight">
            Barillet & Ressort Moteur
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mt-4 max-w-3xl">
            La batterie mécanique suisse. Du ressort en acier du 17e siècle au Nivaflex anti-magnétique d'aujourd'hui.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <button onClick={() => setLevel('debutant')} className={`px-6 py-3 rounded-full font-bold transition ${level === 'debutant' ? 'bg-yellow-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              Débutant
            </button>
            <button onClick={() => setLevel('expert')} className={`px-6 py-3 rounded-full font-bold transition ${level === 'expert' ? 'bg-yellow-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              Expert
            </button>
            <button onClick={() => setLevel('pro')} className={`px-6 py-3 rounded-full font-bold transition ${level === 'pro' ? 'bg-yellow-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              Professionnel
            </button>
          </div>
        </div>
      </section>

      {/* TIMELINE HISTORIQUE */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">Histoire Suisse du Barillet</span>
        </h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 to-transparent" />
          {[
            { year: '1657', event: 'Christiaan Huygens invente le spiral', detail: 'Révolution horlogère : naissance du régulateur isochrone' },
            { year: '1787', event: 'Perrelet, premier remontage automatique', detail: 'Abram-Louis Perrelet, Le Locle (CH)' },
            { year: '1931', event: 'Rolex Perpetual', detail: 'Brevet du rotor libre 360°, système moderne' },
            { year: '1985', event: 'Nivaflex par Nivarox', detail: 'Alliage Ni-Cr-Co, antimagnétique à 15,000 gauss' },
            { year: '2024', event: 'Silicium monocristallin', detail: 'Resserres 100% amagnétiques, résistance illimitée' },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 mb-12 relative">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
                {item.year}
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl flex-1 border border-slate-700 hover:border-yellow-500 transition">
                <h3 className="text-2xl font-bold text-yellow-400">{item.event}</h3>
                <p className="text-slate-400 mt-2">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ANATOMIE INTERACTIVE */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Anatomie 3D Interactive (CSS)</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {[
              { name: 'Tambour denté', desc: 'Module 0.2, 80 dents, laiton CuZn37', spec: 'Ø10.2mm × 2.1mm' },
              { name: 'Ressort Nivaflex', desc: 'Alliage Ni-Cr-Co-Ti-Be, paramagnétique', spec: '420mm × 0.12mm × 1.8mm' },
              { name: 'Arbre de barillet', desc: 'Acier 20AP, trempe 55HRC', spec: 'Pivot Ø0.19mm' },
              { name: 'Bride Glissante', desc: 'Frottement calibré : 0.8-1.2 N·m', spec: 'Sécurité anti-surtension' },
            ].map((part, i) => (
              <div key={i} className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-yellow-500 transition cursor-pointer">
                <h4 className="font-bold text-yellow-400">{part.name}</h4>
                <p className="text-slate-300 text-sm">{part.desc}</p>
                <p className="text-slate-500 text-xs mt-1">{part.spec}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
            <div className="w-full h-64 bg-gradient-to-br from-yellow-900 via-slate-800 to-slate-900 rounded-xl flex items-center justify-center">
              <div className="animate-spin" style={{ animationDuration: '8s' }}>
                <div className="w-32 h-32 rounded-full border-8 border-yellow-600 border-dashed" />
              </div>
            </div>
            <p className="text-slate-500 text-center mt-4">Simulation CSS 3D (Three.js non requis)</p>
          </div>
        </div>
      </section>

      {/* CALCULATEUR TECHNIQUE */}
      {level !== 'debutant' && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Calculateur de Réserve de Marche</h2>
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <input type="number" id="diametre" placeholder="Diamètre (mm)" className="bg-slate-900 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              <input type="number" id="epaisseur" placeholder="Épaisseur (mm)" className="bg-slate-900 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              <input type="number" id="longueur" placeholder="Longueur (mm)" className="bg-slate-900 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              <input type="number" id="tours" placeholder="Tours max" className="bg-slate-900 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>
            <button
              onClick={() => {
                const diametre = Number((document.getElementById('diametre') as HTMLInputElement).value);
                const epaisseur = Number((document.getElementById('epaisseur') as HTMLInputElement).value);
                const longueur = Number((document.getElementById('longueur') as HTMLInputElement).value);
                const tours = Number((document.getElementById('tours') as HTMLInputElement).value);
                setReserveResult(calculateReserve(diametre, epaisseur, longueur, tours));
              }}
              className="w-full bg-yellow-500 text-slate-900 font-bold py-4 rounded-lg hover:bg-yellow-400 transition"
            >
              CALCULER
            </button>
            {reserveResult && (
              <div className="mt-6 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <p className="text-3xl font-bold text-yellow-400">{reserveResult}</p>
                <p className="text-slate-400 text-sm mt-2">Formule : R = (L × n × η) / (D × 0.8)</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* COURBE DE COUPLE */}
      {level !== 'debutant' && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Simulation de Couple Moteur</h2>
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
            <canvas id="coupleCanvas" className="w-full h-64 bg-slate-900 rounded-xl" />
            <div className="flex justify-between mt-4 text-sm text-slate-400">
              <span>Réserve 0%</span>
              <span className="text-green-400">Zone stable (0-75%)</span>
              <span className="text-red-400">Zone critique (75-100%)</span>
              <span>Réserve 100%</span>
            </div>
          </div>
        </section>
      )}

      {/* BASE DE DONNÉES MOUVEMENTS */}
      {level !== 'debutant' && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Base de Données Mouvements</h2>
          <div className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="p-4 text-left text-yellow-400">Calibre</th>
                  <th className="p-4 text-left text-yellow-400">Manufacture</th>
                  <th className="p-4 text-left text-yellow-400">Type Barillet</th>
                  <th className="p-4 text-left text-yellow-400">Ressort</th>
                  <th className="p-4 text-left text-yellow-400">Réserve</th>
                  <th className="p-4 text-left text-yellow-400">Couple @24h</th>
                </tr>
              </thead>
              <tbody>
                {MOVEMENT_DB.map((m, i) => (
                  <tr key={i} className="border-t border-slate-700 hover:bg-slate-700/50 transition cursor-pointer" onClick={() => setSelectedCalibre(m.calibre)}>
                    <td className="p-4 font-bold text-blue-400">{m.calibre}</td>
                    <td className="p-4 text-slate-300">{m.manufacture}</td>
                    <td className="p-4 text-slate-300">{m.type}</td>
                    <td className="p-4 text-slate-300">{m.ressort}</td>
                    <td className="p-4 text-slate-300">{m.reserve}</td>
                    <td className="p-4 text-slate-300">{m.couple}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm mt-4">Sélectionné : <span className="text-yellow-400 font-bold">{selectedCalibre}</span></p>
        </section>
      )}

      {/* TÉMOIGNAGES EXPERTS */}
      {level === 'pro' && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Témoignages d'Experts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {EXPERT_QUOTES.map((q, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <div className="text-yellow-400 text-6xl">“</div>
                <p className="text-xl italic text-slate-300 -mt-6">{q.text}</p>
                <p className="text-slate-500 mt-4">{q.author}</p>
                <p className="text-slate-400 text-sm">{q.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PANNEAUX TECHNIQUES PRO */}
      {level === 'pro' && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Diagnostics Professionnels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { issue: 'Réservé réduite (<24h)', cause: 'Ressort fatigué (dépassé 10,000 cycles)', solution: 'Remplacement Nivaflex NM (CHF 180-250)' },
              { issue: 'Arrêt brutal', cause: 'Brisure ressort à 90% de la longueur', solution: 'Extraction + remplacement barillet complet' },
              { issue: 'Couple irrégulier', cause: 'Bride glissante encrassée', solution: 'Nettoyage ultra-sons + recalibrage friction' },
            ].map((d, i) => (
              <div key={i} className="bg-red-950/30 border border-red-900 p-6 rounded-xl">
                <h4 className="font-bold text-red-400 text-lg">{d.issue}</h4>
                <p className="text-slate-300 text-sm mt-2"><strong>Cause :</strong> {d.cause}</p>
                <p className="text-slate-400 text-sm mt-2"><strong>Solution :</strong> {d.solution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* QUIZ CERTIFIANT */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Quiz Certifiant HorloLearn</h2>
        {!showResult ? (
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
            <div className="flex justify-between mb-6">
              <span className="text-slate-400">Question {quizStep + 1} / {QUIZ_QUESTIONS.length}</span>
              <span className="text-yellow-400 font-bold">Score : {quizScore}/{QUIZ_QUESTIONS.length}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">{QUIZ_QUESTIONS[quizStep].question}</h3>
            <div className="space-y-3">
              {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i === QUIZ_QUESTIONS[quizStep].correct) setQuizScore(quizScore + 1);
                    alert(`Réponse : ${QUIZ_QUESTIONS[quizStep].explanation}`);
                    if (quizStep < QUIZ_QUESTIONS.length - 1) {
                      setQuizStep(quizStep + 1);
                    } else {
                      setShowResult(true);
                    }
                  }}
                  className="w-full text-left p-4 bg-slate-900 rounded-xl hover:bg-slate-700 transition border border-slate-700"
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 text-center">
            <h3 className="text-5xl font-bold mb-6">Quiz Terminé !</h3>
            <p className="text-3xl text-yellow-400 mb-8">{quizScore}/{QUIZ_QUESTIONS.length} ({Math.round((quizScore/QUIZ_QUESTIONS.length)*100)}%)</p>
            {quizScore === QUIZ_QUESTIONS.length ? (
              <div className="bg-green-950/50 border-2 border-green-600 p-8 rounded-xl">
                <h4 className="text-2xl font-bold text-green-400">CERTIFICATION OBTENUE</h4>
                <p className="text-slate-300 mt-2">Vous maîtrisez le barillet mécanique suisse</p>
                <button className="mt-6 bg-yellow-500 text-slate-900 font-bold py-3 px-8 rounded-lg">Télécharger le certificat</button>
              </div>
            ) : (
              <button onClick={() => { setQuizStep(0); setQuizScore(0); setShowResult(false); }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">
                Recommencer
              </button>
            )}
          </div>
        )}
      </section>

      {/* FOOTER EXPERT */}
      <footer className="border-t-2 border-yellow-500 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500">© HorloLearn 2024 - Référence Mondiale en Horlogerie Suisse</p>
          <p className="text-slate-600 text-sm mt-2">Contenu validé par l'Association des Horlogers Créateurs Indépendants (AHCI)</p>
        </div>
      </footer>
    </main>
  );
}
