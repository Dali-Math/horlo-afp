'use client';

/**
 * HorloLearn — Section Outillage & Kit à Emboîter
 * Intégration visuelle exhaustive avec photos réelles d'établi (planches originales suisses),
 * fiches techniques détaillées, spécifications, tolérances et loupe d'inspection 10x.
 * 
 * Strictement conforme aux standards de l'artisan horloger suisse (NIHS, ISO 22810, ETA 2824-2).
 */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Wrench,
  Package,
  Info,
  ShieldAlert,
  CheckCircle2,
  Maximize2,
  ZoomIn,
  X,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';

export interface AtelierTool {
  id: string;
  number: number;
  name: string;
  role: string;
  benchTip: string;
  category: 'support' | 'aiguillage' | 'ouverture' | 'serrage' | 'hygiene';
  icon: string;
  image: string;
  rowImage: string;
  specs: {
    material: string;
    standard: string;
    tolerances: string;
    maintenance: string;
  };
}

export const ATELIER_TOOLS: AtelierTool[] = [
  {
    id: 'posage_universel',
    number: 1,
    name: 'Posage Universel',
    role: 'Maintien de la platine pour mouvement nu (sans cadran)',
    benchTip: 'Serrer avec modération sur les mors étagés en duralumin. Ne jamais brider directement sur les dentures de la minuterie.',
    category: 'support',
    icon: 'posage',
    image: '/images/emboitage/tools/1_posage_universel.png',
    rowImage: '/images/emboitage/tools/1_posage_universel_row.png',
    specs: {
      material: 'Aluminium anodisé dur & mors en acier traité',
      standard: 'Bergeon 4040 / NIHS 91-10',
      tolerances: 'Planéité d\'appui < 0.01 mm, réversible 8¾ à 19 lignes',
      maintenance: 'Dégraisser les mors à l\'essence F, sécher à l\'air filtré',
    },
  },
  {
    id: 'outil_chasser_aiguilles',
    number: 2,
    name: 'Outil à Chasser les Aiguilles',
    role: 'Chassage axial et planéité des aiguilles (posoirs manuels Delrin)',
    benchTip: 'Choisir impérativement l\'embout en Delrin adapté au diamètre du canon. Pression exclusivement axiale sans aucun mouvement de levier.',
    category: 'aiguillage',
    icon: 'posoir',
    image: '/images/emboitage/tools/2_outil_chasser_aiguilles.png',
    rowImage: '/images/emboitage/tools/2_outil_chasser_aiguilles_row.png',
    specs: {
      material: 'Corps moleté aluminium, embouts Delrin synthétique anti-rayure',
      standard: 'Bergeon 7404 / Directives ETA',
      tolerances: 'Alésages Ø 0.50 mm (seconde), Ø 0.90 mm (min), Ø 1.50 mm (h)',
      maintenance: 'Inspecter les embouts à la loupe 10x, remplacer si bavure',
    },
  },
  {
    id: 'leviers_aiguilles',
    number: 3,
    name: 'Leviers aux Aiguilles (Paire)',
    role: 'Dépose soignée et parallèle des aiguilles sans rayer le cadran',
    benchTip: 'Toujours intercaler un film plastique transparent épais sur le cadran. Agir en levier parfaitement synchronisé des deux mains.',
    category: 'aiguillage',
    icon: 'levier',
    image: '/images/emboitage/tools/3_leviers_aiguilles.png',
    rowImage: '/images/emboitage/tools/3_leviers_aiguilles_row.png',
    specs: {
      material: 'Acier inoxydable forgé, poli miroir sur faces d\'appui',
      standard: 'Bergeon 30018 / Standard Genevois',
      tolerances: 'Épaisseur de bec effilée à 0.15 mm pour insertion sous aiguille',
      maintenance: 'Polir les pointes au cabron fin pour bannir toute arête vive',
    },
  },
  {
    id: 'coussin_emboitage',
    number: 4,
    name: 'Coussin d\'Emboîtage',
    role: 'Support amortissant pour carrure et fond de boîte',
    benchTip: 'La gorge centrale dégage la cambrure de la glace saphir. Évite toute contrainte mécanique sur le verre pendant le vissage du fond.',
    category: 'support',
    icon: 'coussin',
    image: '/images/emboitage/tools/4_coussin_emboitage.png',
    rowImage: '/images/emboitage/tools/4_coussin_emboitage_row.png',
    specs: {
      material: 'Gel silicone amortissant transparent ou cuir doux surmoulé',
      standard: 'Bergeon 5395-75',
      tolerances: 'Diamètre Ø 75 mm, résistant aux solvants légers',
      maintenance: 'Laver à l\'eau savonneuse neutre, sécher sous cloche',
    },
  },
  {
    id: 'ouvre_boite_couteau',
    number: 5,
    name: 'Ouvre-Boîte (Couteau d\'Horloger)',
    role: 'Ouverture des fonds clipsés & ébavurage fin du filet de tige',
    benchTip: 'Appliquer une poussée tangentielle contrôlée dans le cran d\'ouverture. Ne jamais faire levier contre la boîte au risque de marquer l\'acier.',
    category: 'ouverture',
    icon: 'couteau',
    image: '/images/emboitage/tools/5_ouvre_boite_couteau.png',
    rowImage: '/images/emboitage/tools/5_ouvre_boite_couteau_row.png',
    specs: {
      material: 'Lame rigide en acier suédois trempé biseauté, manche riveté',
      standard: 'Bergeon 7403',
      tolerances: 'Angle d\'affûtage biseau 25°, tranchant semi-vif contrôlé',
      maintenance: 'Repasser la lame sur pierre d\'Arkansas extra-fine',
    },
  },
  {
    id: 'lot_tournevis',
    number: 6,
    name: 'Lot de Tournevis d\'Atelier',
    role: 'Serrage calibré des vis de ponts, brides et bâti automatique',
    benchTip: 'La largeur de la lame doit remplir 95% de la fente de vis sans dépasser sur les côtés. Couple de serrage : 1.5 à 2.2 cNm.',
    category: 'serrage',
    icon: 'tournevis',
    image: '/images/emboitage/tools/6_lot_tournevis.png',
    rowImage: '/images/emboitage/tools/6_lot_tournevis_row.png',
    specs: {
      material: 'Corps laiton chromé moleté sur roulement à billes, mèches acier 54 HRC',
      standard: 'Code couleur suisse : 0.80 violet, 1.00 blanc, 1.20 noir, 1.40 bleu',
      tolerances: 'Affûtage parallèle strict sans conicité parasite',
      maintenance: 'Rectifier les tranchants sur outil d\'affûtage à roulettes',
    },
  },
  {
    id: 'potence_aiguiller',
    number: 7,
    name: 'Potence à Chasser les Aiguilles',
    role: 'Chassage micrométrique à descente verticale parfaitement perpendiculaire',
    benchTip: 'Élimine tout risque de faux-rond ou de cambrage. Permet un contrôle tactile direct de la garde et de la butée sur la chaussée.',
    category: 'aiguillage',
    icon: 'potence',
    image: '/images/emboitage/tools/7_potence_aiguiller.png',
    rowImage: '/images/emboitage/tools/7_potence_aiguiller_row.png',
    specs: {
      material: 'Fonte d\'acier usinée & colonne rectifiée, broche à ressort de rappel',
      standard: 'Bergeon 8935 / Horotec Presse Horlogère',
      tolerances: 'Perpendicularité broche/base < 0.005 mm sur 50 mm',
      maintenance: 'Lubrifier la colonne au Moebius HP-1300 (1 goutte fine)',
    },
  },
  {
    id: 'cloche_anti_poussiere',
    number: 8,
    name: 'Cloche Anti-Poussière',
    role: 'Protection permanente des composants et du calibre entre deux gestes',
    benchTip: 'En horlogerie suisse, tout composant non manipulé immédiatement à la brucelle doit impérativement reposer sous cloche.',
    category: 'hygiene',
    icon: 'cloche',
    image: '/images/emboitage/tools/8_cloche_antipoussiere.png',
    rowImage: '/images/emboitage/tools/8_cloche_antipoussiere_row.png',
    specs: {
      material: 'Verre minéral pur sans bulles ou acrylique antistatique, socle rainuré',
      standard: 'Bergeon 6759',
      tolerances: 'Joint d\'air périphérique empêchant la convection thermique',
      maintenance: 'Dépoussiérer à la microfibre propre et soufflette ionisante',
    },
  },
  {
    id: 'posage_gigogne',
    number: 9,
    name: 'Porte-Mouvement « Gigogne »',
    role: 'Support pour poser le calibre habillé de son cadran',
    benchTip: 'L\'évidement interne accueille le cadran sans contact direct. Toujours recouvrir d\'un cabron de peau propre sous le cadran.',
    category: 'support',
    icon: 'gigogne',
    image: '/images/emboitage/tools/9_porte_mouvement_gigogne.png',
    rowImage: '/images/emboitage/tools/9_porte_mouvement_gigogne_row.png',
    specs: {
      material: 'Laiton nickelé décolleté avec dégagement annulaire périphérique',
      standard: 'Spécifique ETA 2824-2 / Bergeon 1997',
      tolerances: 'Évidement cadran profondeur 1.20 mm, centrage H7',
      maintenance: 'Nettoyer à l\'alcool isopropylique 99% avant chaque pose',
    },
  },
  {
    id: 'cabron_de_peau',
    number: 10,
    name: 'Cabron de Peau d\'Horloger',
    role: 'Surface d\'appui douce et protectrice pour la laque du cadran',
    benchTip: 'Lime en bois plate habillée de peau de chamois. Interposé entre le cadran et le posage gigogne pour amortir la pression de bridage.',
    category: 'hygiene',
    icon: 'cabron',
    image: '/images/emboitage/tools/10_cabron_peau.png',
    rowImage: '/images/emboitage/tools/10_cabron_peau_row.png',
    specs: {
      material: 'Peau de chevreau / chamois sélectionnée non traitée chimiquement',
      standard: 'Outillage artisanal traditionnel suisse',
      tolerances: 'Épaisseur 0.8 mm, grain satiné ultra-doux zéro particule',
      maintenance: 'Brosser à sec à la brosse marron en poil de martre',
    },
  },
];

export interface KitElement {
  id: string;
  number: number;
  name: string;
  role: string;
  specs: string;
  alert: string;
  image: string;
  details: {
    dimensions: string;
    tolerances: string;
    criticalCheck: string;
  };
}

export const KIT_ELEMENTS: KitElement[] = [
  {
    id: 'cercle_emboitage',
    number: 1,
    name: 'Cercle d\'Emboîtage',
    role: 'Bague intermédiaire de centrage du calibre dans la carrure',
    specs: 'Ajustement précis sans jeu radial. Assure la concentricité parfaite entre l\'axe de tigeron et le tube de boîte.',
    alert: 'Un cercle monté à l\'envers fausse l\'alignement de la tige et crée un point dur au remontage.',
    image: '/images/emboitage/kit/1_cercle_emboitage.png',
    details: {
      dimensions: 'Ø intérieur 25.60 mm · Ø extérieur 29.80 mm · Ép. 1.85 mm',
      tolerances: 'Ajustement glissant H7/h6 dans la carrure',
      criticalCheck: 'Repérer le fraisage du passage de tige avant insertion.',
    },
  },
  {
    id: 'support_cadran',
    number: 2,
    name: 'Support de Cadran (Vis & Brides)',
    role: 'Support périphérique pour caler le cadran lors du transport et du cadrage',
    specs: 'Évite toute déformation sous contrainte et maintient la périphérie du cadran en appui franc.',
    alert: 'Contrôler la propreté absolue : aucune particule ne doit s\'intercaler sous le bord du cadran.',
    image: '/images/emboitage/kit/2_support_cadran.png',
    details: {
      dimensions: 'Appui sur listel platine · 2 vis de pieds à 135°',
      tolerances: 'Serrage des vis excentriques à 1.2 cNm maximum',
      criticalCheck: 'Vérifier l\'absence de déformation axiale des pieds de cadran.',
    },
  },
  {
    id: 'mouvement',
    number: 3,
    name: 'Mouvement (Calibre ETA 2824-2 Automatique)',
    role: 'Cœur mécanique de la montre avec calendrier instantané',
    specs: '28\'800 A/h, 25 rubis, module de remontage automatique amovible par 2 vis noires distinctes.',
    alert: 'Déposer le module automatique AVANT l\'aiguillage pour préserver les micro-billes du rotor.',
    image: '/images/emboitage/kit/3_mouvement_calibre.png',
    details: {
      dimensions: '11½ Lignes (Ø 25.60 mm) · Hauteur 4.60 mm',
      tolerances: 'Chronométrie COSC (-4/+6 s/j) · Réserve 38h',
      criticalCheck: 'Passage de date instantané calé à 00h00 ± 2 min.',
    },
  },
  {
    id: 'porte_piece_limitation',
    number: 4,
    name: 'Porte-Pièce à Doigt de Limitation',
    role: 'Portoir spécifique équipé de sa vis moletée inférieure de soutien',
    specs: 'Vis axiale réglable venant en contact affleurant franc sous le contre-pivot de seconde centrale.',
    alert: 'Indispensable : sans lui, chasser la trotteuse déchasse le rubis du pont ou casse le pivot central.',
    image: '/images/emboitage/kit/4_porte_piece_limitation.png',
    details: {
      dimensions: 'Enclume filetée M3 en laiton doux réglable par molette',
      tolerances: 'Affleurement tactile à 0.00 mm (contact sans forcer)',
      criticalCheck: 'Absorbe 100% de la force verticale de chassage.',
    },
  },
  {
    id: 'aiguilles',
    number: 5,
    name: 'Jeu d\'Aiguilles (Heures, Minutes, Seconde)',
    role: 'Affichage du temps conforme aux gardes de sécurité NIHS 91-10',
    specs: 'Aiguille des heures (canon large), minutes (canon conique), trotteuse (canon fin avec contrepoids).',
    alert: 'Équarrir le canon de seconde à 90° à mi-hauteur par le dessous avant tout chassage.',
    image: '/images/emboitage/kit/5_jeu_aiguilles.png',
    details: {
      dimensions: 'Canons : Heures Ø 1.50 mm · Minutes Ø 0.90 mm · Seconde Ø 0.25 mm',
      tolerances: 'Gardes minimales g1, g2 ≥ 0.15 mm · Parallélisme parfait',
      criticalCheck: 'Contrôler la concentricité et le faux-rond sous loupe 10x.',
    },
  },
  {
    id: 'cadran',
    number: 6,
    name: 'Cadran d\'Atelier',
    role: 'Visage esthétique avec 2 pieds brasés à 90° et guichet date',
    specs: 'Laqué, émaillé ou soleillé. 2 pieds en cuivre rectilignes s\'insérant dans les alésages de la platine.',
    alert: 'ZÉRO Rodico sur le cadran ! Nettoyage EXCLUSIVEMENT à la brosse marron en poil de martre.',
    image: '/images/emboitage/kit/6_cadran.png',
    details: {
      dimensions: 'Diamètre Ø 28.50 mm · Épaisseur 0.40 mm',
      tolerances: 'Centrage du guichet date sur disque sauteur ± 0.05 mm',
      criticalCheck: 'Pieds de cadran sans bavure, planéité absolue sur marbre.',
    },
  },
  {
    id: 'boite',
    number: 7,
    name: 'Boîte de Montre (Carrure, Glace, Fond)',
    role: 'Enveloppe étanche protégeant le mécanisme selon la norme ISO 22810',
    specs: 'Glace saphir montée avec joint Hytrel à sec, tube de couronne chassé, gorge de fond vissé ou clipsé.',
    alert: 'Lubrifier le joint de fond exclusivement au Fomblin UT18 sans toucher le cadran ni la glace.',
    image: '/images/emboitage/kit/7_boite_etanche.png',
    details: {
      dimensions: 'Carrure acier 316L Ø 40.0 mm · Entrecornes 20.0 mm',
      tolerances: 'Pression d\'épreuve 5 à 10 bar (contrôle Witschi ALC 2000)',
      criticalCheck: 'Chanfrein d\'entrée de tube exempt de bavure abrasive.',
    },
  },
];

export default function OutillageKitSection() {
  const [activeTab, setActiveTab] = useState<'outillage' | 'kit'>('outillage');
  const [selectedTool, setSelectedTool] = useState<AtelierTool>(ATELIER_TOOLS[0]);
  const [selectedKit, setSelectedKit] = useState<KitElement>(KIT_ELEMENTS[0]);
  const [toolViewMode, setToolViewMode] = useState<'photo' | 'row'>('photo');

  // État modale d'agrandissement d'image
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  // Écoute de la touche Échap pour fermer la modale
  useEffect(() => {
    if (!lightboxImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  return (
    <div className="space-y-6">
      {/* Barre supérieure : Commutateur Outillage / Kit & Accès aux planches complètes */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-cream-card dark:bg-slate-900 p-4 rounded-2xl border border-cream-border dark:border-slate-800">
        <div>
          <span className="text-[10px] font-label font-bold uppercase tracking-widest text-bronze dark:text-amber-400">
            Planches d'Atelier Suisses Authentiques
          </span>
          <h3 className="font-display text-lg text-ink dark:text-slate-100 mt-0.5">
            {activeTab === 'outillage'
              ? '1. Outillage Nécessaire d\'Établi (10 Instruments)'
              : '2. Kit d\'Emboîtage & Cadrage (7 Fournitures)'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Bouton Commutateur Outillage (10) */}
          <button
            onClick={() => setActiveTab('outillage')}
            className={`px-3.5 py-2 rounded-xl text-xs font-label font-bold transition flex items-center gap-2 ${
              activeTab === 'outillage'
                ? 'bg-bronze text-white shadow-md'
                : 'bg-cream-tile dark:bg-slate-800 text-ink-soft dark:text-slate-300 hover:text-ink dark:hover:text-white border border-cream-border dark:border-slate-700'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" /> Outillage d'Établi (10)
          </button>

          {/* Bouton Commutateur Kit (7) */}
          <button
            onClick={() => setActiveTab('kit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-label font-bold transition flex items-center gap-2 ${
              activeTab === 'kit'
                ? 'bg-bronze text-white shadow-md'
                : 'bg-cream-tile dark:bg-slate-800 text-ink-soft dark:text-slate-300 hover:text-ink dark:hover:text-white border border-cream-border dark:border-slate-700'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> Kit à Emboîter (7)
          </button>

          {/* Bouton voir la planche originale complète */}
          <button
            onClick={() => {
              if (activeTab === 'outillage') {
                setLightboxImage({
                  src: '/images/emboitage/tools/planche_outillage_complete.jpg',
                  title: 'Planche Officielle d\'Atelier — Les 10 Outils de Posage-Emboîtage',
                  subtitle: 'Document original suisse : Vue synoptique de l\'équipement complet exigé à l\'établi',
                });
              } else {
                setLightboxImage({
                  src: '/images/emboitage/kit/planche_kit_complete.png',
                  title: 'Planche Officielle d\'Atelier — Le Kit à Emboîter sur Tapis Vert',
                  subtitle: 'Document original suisse : Les 7 fournitures disposées avant le cadrage',
                });
              }
            }}
            className="px-3 py-2 rounded-xl text-xs font-label font-bold bg-amber-500/10 hover:bg-amber-500/20 text-bronze dark:text-amber-300 border border-bronze/30 dark:border-amber-400/30 transition flex items-center gap-1.5"
            title="Ouvrir la photo originale du cours d'atelier"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Planche Complète
          </button>
        </div>
      </div>

      {/* CONTENU 1 : OUTILLAGE NÉCESSAIRE (10 OUTILS) */}
      {activeTab === 'outillage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Grille des 10 outils avec vignettes visuelles réelles */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ATELIER_TOOLS.map((t) => {
              const isSelected = selectedTool.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTool(t)}
                  className={`text-left p-3 rounded-2xl border transition flex items-center gap-3 group relative overflow-hidden ${
                    isSelected
                      ? 'bg-bronze/10 dark:bg-amber-400/15 border-bronze dark:border-amber-400 shadow-sm ring-1 ring-bronze/30'
                      : 'bg-cream-tile dark:bg-slate-800/70 border-cream-border dark:border-slate-700 hover:border-bronze/60 dark:hover:border-slate-500'
                  }`}
                >
                  {/* Vignette photo réelle de l'outil */}
                  <div className="relative w-16 h-12 shrink-0 rounded-lg overflow-hidden border border-cream-border dark:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center shadow-inner">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition duration-300"
                    />
                    <span
                      className={`absolute top-0.5 left-0.5 text-[9px] font-label font-bold px-1 rounded ${
                        isSelected
                          ? 'bg-bronze text-white'
                          : 'bg-black/60 text-white'
                      }`}
                    >
                      {t.number}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[13px] text-ink dark:text-slate-100 truncate leading-tight">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-ink-soft dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                      {t.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Fiche détaillée de l'outil sélectionné avec GRAND VISUEL DE L'OUTIL */}
          <div className="lg:col-span-5 bg-cream-card dark:bg-slate-900 text-ink dark:text-slate-100 rounded-3xl border border-cream-border dark:border-slate-800 p-5 space-y-4 shadow-xl lg:sticky lg:top-36">
            <div className="flex items-center justify-between border-b border-cream-border dark:border-slate-800 pb-3">
              <span className="text-[10px] uppercase font-label font-bold tracking-widest text-bronze dark:text-amber-400 bg-bronze/10 dark:bg-amber-400/10 px-2.5 py-0.5 rounded border border-bronze/20 dark:border-amber-400/20">
                Instrument N°{selectedTool.number} d'Atelier
              </span>
              <span className="text-xs font-label text-ink-soft dark:text-slate-400 capitalize">
                Catégorie : {selectedTool.category}
              </span>
            </div>

            <div>
              <h4 className="font-display text-xl text-ink dark:text-slate-100">{selectedTool.name}</h4>
              <p className="text-xs text-bronze-dark dark:text-amber-400 mt-0.5 font-medium">{selectedTool.role}</p>
            </div>

            {/* GRAND VISUEL RÉEL DE L'OUTIL AVEC SÉLECTEUR PHOTO / EXTRAIT ORIGINAL */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-label">
                <div className="flex items-center gap-1 bg-cream-tile dark:bg-slate-950 p-0.5 rounded-lg border border-cream-border dark:border-slate-800">
                  <button
                    onClick={() => setToolViewMode('photo')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                      toolViewMode === 'photo'
                        ? 'bg-bronze text-white shadow-sm'
                        : 'text-ink-soft dark:text-slate-400 hover:text-ink dark:hover:text-white'
                    }`}
                  >
                    Photo de l'outil
                  </button>
                  <button
                    onClick={() => setToolViewMode('row')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                      toolViewMode === 'row'
                        ? 'bg-bronze text-white shadow-sm'
                        : 'text-ink-soft dark:text-slate-400 hover:text-ink dark:hover:text-white'
                    }`}
                  >
                    Extrait planche
                  </button>
                </div>

                <button
                  onClick={() =>
                    setLightboxImage({
                      src: toolViewMode === 'photo' ? selectedTool.image : selectedTool.rowImage,
                      title: selectedTool.name,
                      subtitle: selectedTool.role,
                    })
                  }
                  className="flex items-center gap-1 text-bronze dark:text-amber-400 hover:text-bronze-dark dark:hover:text-amber-300 transition font-bold"
                >
                  <ZoomIn className="w-3.5 h-3.5" /> Loupe 10x
                </button>
              </div>

              {/* Conteneur d'affichage de l'image */}
              <div
                onClick={() =>
                  setLightboxImage({
                    src: toolViewMode === 'photo' ? selectedTool.image : selectedTool.rowImage,
                    title: selectedTool.name,
                    subtitle: selectedTool.role,
                  })
                }
                className="relative w-full h-44 rounded-2xl overflow-hidden border border-cream-border dark:border-slate-800 bg-cream-tile dark:bg-slate-950 flex items-center justify-center p-3 cursor-zoom-in group shadow-inner"
              >
                <img
                  src={toolViewMode === 'photo' ? selectedTool.image : selectedTool.rowImage}
                  alt={selectedTool.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-md group-hover:scale-105 transition duration-300"
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/75 text-[10px] font-label text-white/90 backdrop-blur-sm flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  <ZoomIn className="w-3 h-3 text-amber-300" /> Agrandir
                </div>
              </div>
            </div>

            {/* Spécifications & Tolérances Suisses */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-label">
              <div className="p-2.5 rounded-xl bg-cream-tile dark:bg-slate-800/80 border border-cream-border dark:border-slate-700">
                <span className="text-[10px] uppercase text-ink-soft dark:text-slate-400 block font-bold">Standard Suisse</span>
                <span className="text-ink dark:text-slate-200 font-semibold">{selectedTool.specs.standard}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cream-tile dark:bg-slate-800/80 border border-cream-border dark:border-slate-700">
                <span className="text-[10px] uppercase text-ink-soft dark:text-slate-400 block font-bold">Matière / Corps</span>
                <span className="text-ink dark:text-slate-200 font-semibold truncate block">{selectedTool.specs.material}</span>
              </div>
              <div className="col-span-2 p-2.5 rounded-xl bg-cream-tile dark:bg-slate-800/80 border border-cream-border dark:border-slate-700">
                <span className="text-[10px] uppercase text-bronze-dark dark:text-amber-400 block font-bold">Tolérance & Précision</span>
                <span className="text-ink dark:text-slate-200 font-semibold">{selectedTool.specs.tolerances}</span>
              </div>
            </div>

            {/* Recommandation du Maître d'Atelier */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 space-y-1.5">
              <span className="flex items-center gap-1.5 text-xs font-label font-bold text-amber-900 dark:text-amber-300">
                <Sparkles className="w-3.5 h-3.5" /> RECOMMANDATION DU MAÎTRE D'ATELIER :
              </span>
              <p className="text-xs leading-relaxed text-amber-950/90 dark:text-amber-100/90">{selectedTool.benchTip}</p>
            </div>

            <div className="text-[11px] font-label text-ink-soft dark:text-slate-400 flex items-center gap-2 pt-1 border-t border-cream-border dark:border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Conforme aux normes d'outillage des manufactures suisses.</span>
            </div>
          </div>
        </div>
      )}

      {/* CONTENU 2 : LE KIT A EMBOITER (7 COMPOSANTS) */}
      {activeTab === 'kit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Liste des 7 composants avec vignettes réelles du tapis d'établi */}
          <div className="lg:col-span-7 space-y-2.5">
            {KIT_ELEMENTS.map((k) => {
              const isSelected = selectedKit.id === k.id;
              return (
                <button
                  key={k.id}
                  onClick={() => setSelectedKit(k)}
                  className={`w-full text-left p-3 rounded-2xl border transition flex items-center gap-3 group relative overflow-hidden ${
                    isSelected
                      ? 'bg-bronze/10 dark:bg-amber-400/15 border-bronze dark:border-amber-400 shadow-sm ring-1 ring-bronze/30'
                      : 'bg-cream-tile dark:bg-slate-800/70 border-cream-border dark:border-slate-700 hover:border-bronze/60'
                  }`}
                >
                  {/* Vignette réelle du composant sur tapis vert */}
                  <div className="relative w-16 h-14 shrink-0 rounded-lg overflow-hidden border border-cream-border dark:border-slate-600 bg-[#2d553b] flex items-center justify-center shadow-inner">
                    <img
                      src={k.image}
                      alt={k.name}
                      className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition duration-300"
                    />
                    <span
                      className={`absolute top-0.5 left-0.5 text-[9px] font-label font-bold px-1 rounded ${
                        isSelected
                          ? 'bg-bronze text-white'
                          : 'bg-black/60 text-white'
                      }`}
                    >
                      0{k.number}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[13.5px] text-ink dark:text-slate-100 truncate">
                      {k.name}
                    </h4>
                    <p className="text-[11.5px] text-ink-soft dark:text-slate-400 truncate mt-0.5">
                      {k.role}
                    </p>
                  </div>

                  <Info className={`w-4 h-4 shrink-0 ${isSelected ? 'text-bronze dark:text-amber-400' : 'text-ink-soft/40'}`} />
                </button>
              );
            })}
          </div>

          {/* Fiche détaillée du composant sélectionné avec GRAND VISUEL SUR TAPIS */}
          <div className="lg:col-span-5 bg-cream-card dark:bg-slate-900 text-ink dark:text-slate-100 rounded-3xl border border-cream-border dark:border-slate-800 p-5 space-y-4 shadow-xl lg:sticky lg:top-36">
            <div className="flex items-center justify-between border-b border-cream-border dark:border-slate-800 pb-3">
              <span className="text-[10px] uppercase font-label font-bold tracking-widest text-bronze dark:text-amber-400 bg-bronze/10 dark:bg-amber-400/10 px-2.5 py-0.5 rounded border border-bronze/20 dark:border-amber-400/20">
                Fourniture N°0{selectedKit.number} · Contrôle Réception
              </span>
              <span className="text-xs font-label text-ink-soft dark:text-slate-400">Kit Horloger</span>
            </div>

            <div>
              <h4 className="font-display text-xl text-ink dark:text-slate-100">{selectedKit.name}</h4>
              <p className="text-xs text-bronze-dark dark:text-amber-400 mt-0.5 font-medium">{selectedKit.role}</p>
            </div>

            {/* GRAND VISUEL DU COMPOSANT SUR TAPIS D'ÉTABLI */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-label">
                <span className="text-ink-soft dark:text-slate-400 font-medium">Vue réelle sur tapis vert d'atelier</span>
                <button
                  onClick={() =>
                    setLightboxImage({
                      src: selectedKit.image,
                      title: selectedKit.name,
                      subtitle: selectedKit.role,
                    })
                  }
                  className="flex items-center gap-1 text-bronze dark:text-amber-400 hover:text-bronze-dark dark:hover:text-amber-300 transition font-bold"
                >
                  <ZoomIn className="w-3.5 h-3.5" /> Loupe 10x
                </button>
              </div>

              <div
                onClick={() =>
                  setLightboxImage({
                    src: selectedKit.image,
                    title: selectedKit.name,
                    subtitle: selectedKit.role,
                  })
                }
                className="relative w-full h-44 rounded-2xl overflow-hidden border border-cream-border dark:border-slate-800 bg-[#1b3624] flex items-center justify-center p-3 cursor-zoom-in group shadow-inner"
              >
                <img
                  src={selectedKit.image}
                  alt={selectedKit.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-md group-hover:scale-105 transition duration-300"
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/75 text-[10px] font-label text-white/90 backdrop-blur-sm flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  <ZoomIn className="w-3 h-3 text-amber-300" /> Agrandir
                </div>
              </div>
            </div>

            {/* Dimensions & Contrôles */}
            <div className="space-y-2 text-[11.5px] font-label">
              <div className="p-3 rounded-xl bg-cream-tile dark:bg-slate-800/80 border border-cream-border dark:border-slate-700 space-y-1">
                <span className="text-[10px] uppercase text-ink-soft dark:text-slate-400 block font-bold">Dimensions & Cotes</span>
                <p className="text-ink dark:text-slate-200 font-semibold">{selectedKit.details.dimensions}</p>
              </div>
              <div className="p-3 rounded-xl bg-cream-tile dark:bg-slate-800/80 border border-cream-border dark:border-slate-700 space-y-1">
                <span className="text-[10px] uppercase text-bronze-dark dark:text-amber-400 block font-bold">Tolérance d'Ajustement</span>
                <p className="text-ink dark:text-slate-200 font-semibold">{selectedKit.details.tolerances}</p>
              </div>
            </div>

            {/* Piège à éviter */}
            <div className="p-3.5 rounded-xl bg-red-500/10 dark:bg-red-950/60 border border-red-500/30 dark:border-red-500/40 space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-label font-bold text-red-700 dark:text-red-300">
                <ShieldAlert className="w-3.5 h-3.5 text-red-600 dark:text-red-400" /> PIÈGE TECHNIQUE À ÉVITER :
              </span>
              <p className="text-xs leading-relaxed text-red-950 dark:text-red-200 font-medium">{selectedKit.alert}</p>
            </div>
          </div>
        </div>
      )}

      {/* MODALE LIGHTBOX : ZOOM IMAGE 10X & PLANCHE COMPLÈTE */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[9999] bg-[#070b14]/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-cream dark:bg-slate-900 border border-bronze/40 dark:border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] cursor-default"
          >
            {/* Barre supérieure modale */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-border dark:border-slate-800 bg-cream-card dark:bg-slate-900/90">
              <div>
                <span className="text-[10px] font-label font-bold uppercase tracking-widest text-bronze dark:text-amber-400">
                  Inspection Loupe 10x — Document d'Atelier
                </span>
                <h3 className="font-display text-lg text-ink dark:text-slate-100">
                  {lightboxImage.title}
                </h3>
                <p className="text-xs font-label text-ink-soft dark:text-slate-400">
                  {lightboxImage.subtitle}
                </p>
              </div>

              <button
                onClick={() => setLightboxImage(null)}
                className="w-9 h-9 rounded-xl bg-cream-track dark:bg-slate-800 border border-cream-border dark:border-slate-700 text-ink dark:text-slate-200 hover:bg-cream-border flex items-center justify-center transition"
                title="Fermer (Échap)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corps de l'image agrandie */}
            <div className="p-6 overflow-auto flex items-center justify-center bg-cream-tile dark:bg-slate-950/80">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl border border-cream-border dark:border-slate-800 shadow-lg"
              />
            </div>

            {/* Pied de page modale */}
            <div className="px-6 py-3 border-t border-cream-border dark:border-slate-800 bg-cream-card dark:bg-slate-900/90 flex items-center justify-between text-xs font-label text-ink-soft dark:text-slate-400">
              <span>Résolution d'inspection d'établi</span>
              <button
                onClick={() => setLightboxImage(null)}
                className="px-4 py-1.5 rounded-lg bg-bronze text-white font-bold hover:bg-bronze-dark transition"
              >
                Fermer l'inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
