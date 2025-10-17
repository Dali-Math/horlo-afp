'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Wrench, Database, Calculator, BookOpen, HelpCircle, Star, Activity, Award, Users, Info } from 'lucide-react';

// ---- Simulateur d’alternance (directement dans ce fichier pour la démo) ----
function SimulateurAlternance() {
  const [frequency, setFrequency] = React.useState(28800);
  const [isAnimating, setIsAnimating] = React.useState(true);

  // Calculs
  const hz = frequency / 7200;
  const vph = frequency * 2;
  const period = 3600 / frequency;
  const animationDuration = period * 1000;

  React.useEffect(() => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
  }, [frequency]);

  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-2xl p-8 text-white mb-8 overflow-hidden">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Activity className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Simulateur d’Alternance (balancier)</h2>
      </div>
      {/* Animation visuelle */}
      <div className="flex md:flex-row flex-col gap-10 items-center">
        {/* Animation balancier */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-4 h-4 bg-yellow-500 rounded-full z-10 shadow-lg left-[107px] top-[107px]"></div>
            <div
              className={`absolute left-[110px] top-[110px] origin-bottom-left`}
              style={{
                width: '95px',
                height: '4px',
                background: 'linear-gradient(90deg,#fbbf24,#f59e0b)',
                boxShadow: '0 0 20px rgba(251,191,36,0.5)',
                transformOrigin: 'left center',
                animation: isAnimating ? `balance ${animationDuration}ms ease-in-out infinite` : 'none'
              }}
            >
              {/* Masse du balancier */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow"></div>
            </div>
          </div>
          <div className="absolute inset-0 border-2 border-dashed border-white/15 rounded-full"></div>
        </div>
        {/* Contrôles */}
        <div className="flex-1 space-y-3">
          <label className="block text-sm font-semibold text-blue-200 mb-1">
            Choisir la fréquence (A/h)
          </label>
          <select
            value={frequency}
            onChange={e => setFrequency(Number(e.target.value))}
            className="mb-2 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-lg text-white font-bold focus:ring-2 focus:ring-blue-500"
          >
            <option value={18000}>ETA 6497 / 7001 – 18 000</option>
            <option value={21600}>Lemania 1873 – 21 600</option>
            <option value={28800}>ETA 2824/Sellita SW200 – 28 800</option>
            <option value={36000}>Zenith El Primero – 36 000</option>
            <option value={43200}>Breguet Classique – 43 200</option>
          </select>
          <input
            type="number"
            min={3600} max={72000}
            className="block w-full px-4 py-2 border border-white/25 bg-white/10 rounded-lg mb-2 text-white"
            value={frequency}
            onChange={e => setFrequency(Number(e.target.value))}
          />
          <div className="grid grid-cols-2 gap-3 text-white">
            <div className="bg-blue-800/30 rounded p-3">
              <div className="text-xs text-blue-200">Fréquence</div>
              <div className="font-bold text-lg">{hz.toFixed(2)} Hz</div>
            </div>
            <div className="bg-blue-800/30 rounded p-3">
              <div className="text-xs text-blue-200">Vibrations/h</div>
              <div className="font-bold text-lg">{vph.toLocaleString()}</div>
            </div>
            <div className="bg-blue-800/30 rounded p-3 col-span-2">
              <div className="text-xs text-blue-200">Durée d'une alternance</div>
              <div className="font-bold">{period.toFixed(3)} s</div>
            </div>
          </div>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="mt-4 px-6 py-2 bg-blue-600 rounded font-semibold hover:bg-blue-700 transition"
          >{isAnimating ? 'Pause' : 'Reprendre'} l’animation</button>
        </div>
      </div>
      <style jsx>{`
        @keyframes balance {
          0%,100% { transform: rotate(-40deg);}
          50% { transform: rotate(40deg);}
        }
      `}</style>
    </div>
  );
}

// ---- Section Quiz éclair ----
function MiniQuiz() {
  const questions = [
    {
      q: "Quelle pièce transmet l’énergie du barillet à la roue d’échappement ?",
      a: ["Roue de centre", "Ancre", "Roue de minuterie", "Pont de barillet"],
      correct: 0
    },
    {
      q: "À quoi sert l’alternance en horlogerie ?",
      a: [
        "Donner la réserve de marche",
        "Mesurer la fréquence du balancier",
        "Compter le nombre de tours de la trotteuse",
        "Augmenter la précision du spiral"
      ],
      correct: 1
    },
    {
      q: "Quelle est la fréquence la plus répandue dans les calibres modernes suisses ?",
      a: ["18000", "21600", "28800", "36000"],
      correct: 2
    }
  ];
  const [step, setStep] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const handleClick = (idx: number) => {
    if (idx === questions[step].correct) setScore(s => s + 1);
    if (step + 1 < questions.length) setStep(s => s + 1);
    else setDone(true);
  };

  return (
    <div className="mb-8 bg-gradient-to-r from-green-700/70 to-blue-700/70 rounded-2xl p-8 shadow-lg text-white">
      <div className="flex gap-3 items-center mb-3"><HelpCircle /> <span className="font-bold text-lg">Quiz éclair</span></div>
      {!done ? (
        <div>
          <div className="mb-4">
            <span className="font-semibold">{questions[step].q}</span>
          </div>
          <div className="grid gap-2">
            {questions[step].a.map((rep, i) => (
              <button
                className="bg-white/10 hover:bg-blue-600 rounded-lg p-2 font-semibold transition"
                key={rep}
                onClick={() => handleClick(i)}
              >
                {rep}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm text-blue-200">{step + 1} / {questions.length}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center">
          <span className="text-xl font-bold">
            {score === 3 ? "👏 Parfait !" : score >= 2 ? "👍 Bien joué !" : "💡 Continue à t’entraîner !"}
          </span>
          <span className="text-lg">Score : <b>{score}</b> / 3</span>
          <button className="mt-3 px-6 py-2 bg-white text-blue-700 font-semibold rounded" onClick={() => { setStep(0); setScore(0); setDone(false); }}>Recommencer</button>
        </div>
      )}
    </div>
  );
}

export default function OutilsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-200">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* TITRE */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-200 text-blue-900 rounded-full text-sm mb-4 font-bold">
            Espace Outils & Simulations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Boîte à Outils Interactive Horlogère
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Pratiquez, testez, expérimentez et approfondissez la technique horlogère&nbsp;:
            simulateurs, quiz, calculateurs et ressources professionnelles.
          </p>
        </div>

        {/* FEATURE SECTION : simulateur */}
        <SimulateurAlternance />

        {/* MINI-QUIZ */}
        <MiniQuiz />

        {/* Liens & ressources structurées */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600 p-2 rounded-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Liens utiles & bases de référence</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="https://www.cliniquehorlogere.ch" target="_blank" rel="noopener" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Base Chronos</h3>
              <p className="text-sm text-slate-600">Diagnostic atelier, pannes et procédures professionnelles</p>
            </a>
            <a href="https://www.ssc.ch/fr/bibliotheque" target="_blank" rel="noopener" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">SSC Bibliothèque</h3>
              <p className="text-sm text-slate-600">Publications et références scientifiques suisses</p>
            </a>
            <a href="https://horlogerie-suisse.com" target="_blank" rel="noopener" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Horlogerie Suisse</h3>
              <p className="text-sm text-slate-600">Ressources, tutos et forums de discussion</p>
            </a>
            <a href="https://www.ranfft.de" target="_blank" rel="noopener" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Base de Calibres Ranfft</h3>
              <p className="text-sm text-slate-600">Fiches techniques complètes par calibre</p>
            </a>
            <a href="https://mikrolisk.de" target="_blank" rel="noopener" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Catalogue Mikrolisk</h3>
              <p className="text-sm text-slate-600">Dictionnaire de marques & mouvements</p>
            </a>
            <a href="https://www.tinkercad.com" target="_blank" rel="noopener" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">TinkerCad (CAO 3D)</h3>
              <p className="text-sm text-slate-600">Modélisation 3D gratuite en horlogerie</p>
            </a>
            {/* ...ajoutez ici d'autres ressources selon vos besoins */}
          </div>
        </section>

        {/* Footer pédagogique */}
        <section className="mt-20 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl px-8 py-6 shadow">
            <div className="flex items-center gap-4">
              <Award className="w-9 h-9 text-blue-600" />
              <div>
                <b className="block text-blue-900 font-bold text-lg">HorloLearn</b>
                <span className="text-blue-700 text-sm">
                  La première plateforme interactive, pédagogique et communautaire pour pratiquer et aimer l’horlogerie suisse.  
                </span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium text-sm">Explorez, essayez, perfectionnez-vous !</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2025 HorloLearn – Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
