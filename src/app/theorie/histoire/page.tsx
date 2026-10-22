// src/app/theorie/histoire/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  Compass,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Activity
} from 'lucide-react';

interface EraItem {
  year: string;
  century: 'xvi' | 'xvii' | 'xviii' | 'xix' | 'xx' | 'xxi';
  title: string;
  city: string;
  character: string;
  summary: string;
  technicalImpact: string;
  quote?: string;
}

const HISTORIC_TIMELINE: EraItem[] = [
  {
    year: '1541',
    century: 'xvi',
    title: 'L’Édit Somptuaire de Calvin & la Naissance de l’Horlogerie',
    city: 'Genève',
    character: 'Jean Calvin & les Maîtres Orfèvres Genevois',
    summary: 'À Genève, le réformateur Jean Calvin bannit strictement le port de bijoux, colliers et ornements ostentatoires. Privés de travail, les célèbres orfèvres et émailleurs genevois unissent leur talent aux réfugiés huguenots français pour concevoir des montres, considérées comme des objets scientifiques et d’utilité morale.',
    technicalImpact: 'Fondation de la Corporation des Horlogers de Genève en 1601. Le savoir-faire de l’orfèvrerie se transmet définitivement à la micro-mécanique.',
    quote: '« La montre n’est pas une parure coupable, mais un instrument probe qui rappelle à l’homme la fuite inexorable de ses heures terrestres. »'
  },
  {
    year: '1675',
    century: 'xvii',
    title: 'L’Invention du Ressort Spiral par Christian Huygens',
    city: 'Paris / La Haye (Adopté instantanément en Suisse)',
    character: 'Christian Huygens',
    summary: 'Avant 1675, le balancier oscillait librement sans ressort de rappel (foliot), engendrant des erreurs de 30 à 60 minutes par jour ! Huygens invente le ressort spiral réglant : le balancier devient un oscillateur harmonique rigoureux.',
    technicalImpact: 'La précision fait un bond prodigieux : l’imprécision tombe à quelques secondes par jour, rendant enfin possible l’apparition de l’aiguille des minutes et des secondes sur les cadrans.',
    quote: '« Le spiral donne une âme propre et un battement régulier à la matière inerte. »'
  },
  {
    year: '1705',
    century: 'xviii',
    title: 'Daniel Jeanrichard & l’Établissage Jurassien',
    city: 'La Sagne / Le Locle (Montagnes Neuchâteloises)',
    character: 'Daniel Jeanrichard',
    summary: 'Durant les rudes hivers jurassiens où la terre est gelée, Jeanrichard invente l’« Établissage » : il forme les paysans à fabriquer chacun une pièce spécifique à la ferme (roues, ressorts, ponts, boîtes) avant un assemblage central.',
    technicalImpact: 'Naissance de l’Arc Jurassien horloger (La Chaux-de-Fonds, Le Locle, Vallée de Joux). La Suisse devient la première puissance mondiale de production de montres de poche.',
    quote: '« Que chaque foyer montagnard devienne un atelier de haute précision. »'
  },
  {
    year: '1770',
    century: 'xviii',
    title: 'Abraham-Louis Perrelet Invente la Montre Automatique',
    city: 'Le Locle',
    character: 'Abraham-Louis Perrelet',
    summary: 'Maître horloger au Locle, Perrelet invente la première montre à secousses équipée d’un poids oscillant intérieur qui s’arme tout seul au rythme de la marche du porteur.',
    technicalImpact: 'Ancêtre direct du rotor de remontage automatique moderne (système à rotor 360° et à butées).',
    quote: '« Une montre qui se remonte elle-même par le simple mouvement du corps en marchant. »'
  },
  {
    year: '1801',
    century: 'xix',
    title: 'Le Brevet Impérial du Tourbillon (7 Messidor an IX)',
    city: 'Neuchâtel / Paris',
    character: 'Abraham-Louis Breguet',
    summary: 'Le génial horloger neuchâtelois dépose le brevet d’un mécanisme où le balancier, le spiral et l’échappement sont enfermés dans une cage tournant à 1 tour/minute pour annuler les erreurs dues à la gravité terrestre.',
    technicalImpact: 'Le Tourbillon devient le symbole universel absolu de la virtuosité technique en Haute Horlogerie suisse.',
    quote: '« J’ai réussi à compenser par le mouvement circulaire de la cage les anomalies provenant des positions diverses du centre de gravité. »'
  },
  {
    year: '1865',
    century: 'xix',
    title: 'La Révolution Industrielle & les Grandes Fabriques',
    city: 'Le Locle / Saint-Imier / Le Brassus',
    character: 'Georges Favre-Jacot (Zenith), Longines, Audemars Piguet',
    summary: 'Passage de l’artisanat dispersé à la manufacture intégrée : Georges Favre-Jacot fonde Zenith en regroupant tous les métiers horlogers sous un même toit illuminé de verrières.',
    technicalImpact: 'Interchangeabilité des composants, industrialisation des calibres de précision et triomphe dans les concours d’observatoire (Neuchâtel, Genève, Kew Teddington).',
  },
  {
    year: '1926',
    century: 'xx',
    title: 'L’Oyster & la Conquête de l’Étanchéité Totale',
    city: 'Bienne / Genève',
    character: 'Hans Wilsdorf (Rolex) & Mercedes Gleitze',
    summary: 'Rolex brevète la première montre étanche à la poussière et à l’eau grâce à un boîtier monobloc et une couronne vissée hermétique. En 1927, la nageuse Mercedes Gleitze traverse la Manche à la nage avec la montre intacte.',
    technicalImpact: 'Démocratisation de la montre-bracelet de sport et de plongée sous-marine.',
    quote: '« Après plus de 10 heures d’immersion dans l’eau glaciale de la Manche, la montre conservait une précision parfaite. »'
  },
  {
    year: '1969',
    century: 'xx',
    title: 'L’Année Mythique : El Primero & l’Assaut du Quartz',
    city: 'Le Locle / Tokyo',
    character: 'Zenith Manufacture & Charles Vermot',
    summary: 'Le 10 janvier 1969, Zenith présente El Primero, premier chrono automatique 36’000 A/h. Mais fin 1969, la Seiko Astron à quartz déclenche une crise existentielle sans précédent en Suisse : les effectifs passent de 90’000 à 30’000 artisans.',
    technicalImpact: 'Charles Vermot cache clandestinement les outillages et étampes du mouvement El Primero dans les greniers de la manufacture Zenith pour sauver le patrimoine de la destruction.',
  },
  {
    year: '1983',
    century: 'xx',
    title: 'La Renaissance Héroïque Suisse & Nicolas Hayek',
    city: 'Bienne / Neuchâtel',
    character: 'Nicolas G. Hayek & Ernst Thomke',
    summary: 'Création de la Swatch (montre en plastique à 51 composants soudés aux ultrasons). Son succès commercial mondial colossal fournit les milliards nécessaires pour sauver et relancer les fleurons mécaniques suisses (Omega, Blancpain, Breguet).',
    technicalImpact: 'Renaissance spectaculaire de l’amour mondial pour la mécanique noble et la Haute Horlogerie traditionnelle.',
    quote: '« La Suisse ne vend pas seulement un instrument pour lire l’heure, elle vend une part d’éternité et d’émotion humaine. »'
  },
  {
    year: 'XXIe Siècle',
    century: 'xxi',
    title: 'L’Ère du Silicium & des Nouveaux Matériaux d’Art',
    city: 'La Chaux-de-Fonds / Vallée de Joux / Genève',
    character: 'CSEM Neuchâtel & Manufactures Suisses Réunies',
    summary: 'L’introduction du Silinvar et du silicium dans les spiraux et roues d’échappement supprime totalement le besoin d’huile sur les palettes et rend les calibres insensibles aux champs magnétiques des smartphones.',
    technicalImpact: 'Précision chronométrique supérieure, réserves de marche de 70h à 14 jours, et triomphe éclatant du label fédéral « Swiss Made » dans le monde entier.',
    quote: '« L’alliance suprême entre la tradition séculaire de l’établi et la physique des semi-conducteurs. »'
  }
];

export default function HistoirePage() {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filteredHistory = HISTORIC_TIMELINE.filter((item) => {
    if (selectedEra === 'all') return true;
    return item.century === selectedEra;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/theorie"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Espace Théorie</span>
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>🇨🇭 Cinq Siècles de Génie & de Persévérance Helvétique</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              La Grande Épopée de l’Horlogerie Suisse
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              De l'interdiction des bijoux par Jean Calvin en 1541 à la conquête spatiale et à l'avènement des spiraux en silicium : découvrez la frise chronologique vivante de l’art du temps en Suisse.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORPS DE LA FRISE CHRONOLOGIQUE --- */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Filtres par Époques */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Toute l’Épopée (1541 - Aujourd’hui)' },
              { id: 'xvi', label: 'XVIe (Les Origines)' },
              { id: 'xvii', label: 'XVIIe (Le Spiral)' },
              { id: 'xviii', label: 'XVIIIe (L’Établissage)' },
              { id: 'xix', label: 'XIXe (Manufactures)' },
              { id: 'xx', label: 'XXe (La Crise & Renaissance)' },
              { id: 'xxi', label: 'XXIe (Silicium)' }
            ].map((era) => (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedEra === era.id
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                    : 'bg-white dark:bg-[#0f1422] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono font-bold text-amber-500">
            {filteredHistory.length} dates majeures
          </span>
        </div>

        {/* Frise chronologique avec connecteur vertical doré */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/40 space-y-10 my-8">
          {filteredHistory.map((item, idx) => (
            <div key={item.year} className="relative group">
              {/* Pastille millésime dorée sur l'axe */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-amber-500 border-4 border-slate-50 dark:border-[#07090e] shadow-md flex items-center justify-center text-[10px] text-slate-950 font-bold" />

              {/* Carte Événement Historique */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 hover:border-amber-500/60 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-600 dark:text-amber-400 tracking-tight">
                    {item.year}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      📍 {item.city}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    Figures clés : {item.character}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.summary}
                </p>

                {/* Impact Technique d'Atelier */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Héritage Technique sur l’Établi Moderne :</span>
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">
                    {item.technicalImpact}
                  </p>
                </div>

                {/* Citation historique si présente */}
                {item.quote && (
                  <div className="pt-2 text-xs italic text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                    {item.quote}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fiche d'Honneur : Les 4 Plus Anciennes Manufactures Suisses Toujours en Activité */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
              Patrimoine Ininterrompu
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Les Doyennes de l’Art Horloger Suisse
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-center">
              <div className="text-lg font-mono font-extrabold text-amber-500">1735</div>
              <div className="font-bold text-slate-900 dark:text-white">Blancpain</div>
              <div className="text-[11px] text-slate-500">Villeret (Jura bernois)</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-center">
              <div className="text-lg font-mono font-extrabold text-amber-500">1755</div>
              <div className="font-bold text-slate-900 dark:text-white">Vacheron Constantin</div>
              <div className="text-[11px] text-slate-500">Genève (Production ininterrompue)</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-center">
              <div className="text-lg font-mono font-extrabold text-amber-500">1775</div>
              <div className="font-bold text-slate-900 dark:text-white">Breguet</div>
              <div className="text-[11px] text-slate-500">Vallée de Joux / Paris</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-center">
              <div className="text-lg font-mono font-extrabold text-amber-500">1839</div>
              <div className="font-bold text-slate-900 dark:text-white">Patek Philippe</div>
              <div className="text-[11px] text-slate-500">Plan-les-Ouates, Genève</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
