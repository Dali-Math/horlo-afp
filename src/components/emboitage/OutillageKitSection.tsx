'use client';

/**
 * HorloLearn — Outillage Nécessaire & Kit à Emboîter d'Atelier
 * Conforme aux planches de cours officielles de l'établi suisse :
 *   1. Les 10 outils nécessaires d'atelier (posage universel, posoirs, leviers, coussin, couteau, tournevis, potence, cloche, posage gigogne, cabron)
 *   2. Le kit à emboîter complet (cercle, support de cadran, mouvement, porte-pièce à limitation, aiguilles, cadran, boîte)
 */

import { useState } from 'react';
import { Wrench, Package, Info, CheckCircle2, ZoomIn, ShieldAlert } from 'lucide-react';

export interface ToolItem {
  id: string;
  name: string;
  role: string;
  benchTip: string;
  category: 'support' | 'aiguillage' | 'main' | 'hygiene';
  icon: string;
}

export const ATELIER_TOOLS: ToolItem[] = [
  {
    id: 'posage_universel',
    name: 'Posage Universel',
    role: 'Maintien de la platine pour mouvement nu (sans cadran)',
    benchTip: 'Indispensable pour travailler sur le calibre nu. Les mors réglables s\'adaptent au diamètre de la platine sans contraindre le balancier.',
    category: 'support',
    icon: 'posage-univ',
  },
  {
    id: 'outil_chasser_aiguilles',
    name: 'Outil à Chasser les Aiguilles',
    role: 'Chassage axial et planéité des aiguilles (posoirs manuels / Delrin)',
    benchTip: 'Embout en matière synthétique douce (Delrin/nylon) creux au centre pour ne jamais marquer le vernis ni la matière luminescente.',
    category: 'aiguillage',
    icon: 'posoir-aiguilles',
  },
  {
    id: 'leviers_aiguilles',
    name: 'Leviers aux Aiguilles (Paire)',
    role: 'Dépose soignée et parallèle des aiguilles sans rayer le cadran',
    benchTip: 'Toujours interposer un film protecteur Mylar sous les cuillères des leviers. Prendre appui sur le canon, jamais sur le décor du cadran.',
    category: 'aiguillage',
    icon: 'leviers',
  },
  {
    id: 'coussin_emboitage',
    name: 'Coussin d\'Emboîtage',
    role: 'Support amortissant pour carrure et fond de boîte',
    benchTip: 'Garni de gel souple et recouvert d\'un cuir doux antistatique. Évite toute rayure sur la lunette ou le traitement anti-reflet du saphir.',
    category: 'support',
    icon: 'coussin',
  },
  {
    id: 'ouvre_boite',
    name: 'Ouvre-Boîte (Couteau d\'Horloger)',
    role: 'Ouverture des fonds clipsés & ébavurage fin du filet de tige',
    benchTip: 'Lame rigide en acier trempé biseauté. En emboîtage, son tranchant sert à ébavurer l\'amorce de filet de tige après passage sur l\'Arkansas.',
    category: 'main',
    icon: 'couteau',
  },
  {
    id: 'lot_tournevis',
    name: 'Lot de Tournevis d\'Atelier',
    role: 'Serrage calibré des vis de ponts, brides et bâti automatique',
    benchTip: 'Utiliser exclusivement le tournevis rouge 1.20 mm pour les 2 vis noires du module automatique et les 2 vis de brides de boîte.',
    category: 'main',
    icon: 'tournevis',
  },
  {
    id: 'potence_aiguilles',
    name: 'Potence à Chasser les Aiguilles',
    role: 'Chassage micrométrique à descente verticale parfaitement perpendiculaire',
    benchTip: 'Élimine tout risque de faux-rond ou de cambrage. Permet un contrôle tactile direct de la garde et de la butée sur la chaussée.',
    category: 'aiguillage',
    icon: 'potence',
  },
  {
    id: 'cloche_anti_poussiere',
    name: 'Cloche Anti-Poussière',
    role: 'Protection permanente des composants et du calibre entre deux gestes',
    benchTip: 'En horlogerie suisse, tout composant non manipulé immédiatement à la brucelle doit reposer sous cloche.',
    category: 'hygiene',
    icon: 'cloche',
  },
  {
    id: 'posage_gigogne',
    name: 'Porte-Mouvement « Gigogne »',
    role: 'Support pour poser le calibre habillé de son cadran',
    benchTip: 'L\'évidement interne accueille le cadran sans contact direct. Toujours recouvrir d\'un cabron de peau propre sous le cadran.',
    category: 'support',
    icon: 'gigogne',
  },
  {
    id: 'cabron_de_peau',
    name: 'Cabron de Peau d\'Horloger',
    role: 'Surface d\'appui douce et protectrice pour la laque du cadran',
    benchTip: 'Lime en bois plate habillée de peau de chamois. Interposé entre le cadran et le posage gigogne pour amortir la pression de bridage.',
    category: 'hygiene',
    icon: 'cabron',
  },
];

export interface KitElement {
  id: string;
  name: string;
  role: string;
  specs: string;
  alert: string;
}

export const KIT_ELEMENTS: KitElement[] = [
  {
    id: 'cercle_emboitage',
    name: 'Cercle d\'Emboîtage',
    role: 'Bague intermédiaire de centrage du calibre dans la carrure',
    specs: 'Ajustement précis sans jeu radial. Assure la concentricité parfaite entre l\'axe de tigeron et le tube de boîte.',
    alert: 'Un cercle monté à l\'envers fausse l\'alignement de la tige et crée un point dur au remontage.',
  },
  {
    id: 'support_cadran',
    name: 'Support de Cadran (Bague / Cercle)',
    role: 'Support périphérique pour caler le cadran lors du transport et du cadrage',
    specs: 'Évite toute déformation sous contrainte et maintient la périphérie du cadran en appui franc.',
    alert: 'Contrôler la propreté absolue : aucune particule ne doit s\'intercaler sous le bord du cadran.',
  },
  {
    id: 'mouvement',
    name: 'Mouvement (Calibre Automatique ETA 2824-2)',
    role: 'Cœur mécanique de la montre avec calendrier instantané',
    specs: '28\'800 A/h, 25 rubis, module de remontage automatique amovible par 2 vis noires distinctes.',
    alert: 'Déposer le module automatique AVANT l\'aiguillage pour préserver les micro-billes du rotor.',
  },
  {
    id: 'porte_piece_limitation',
    name: 'Porte-Pièce à Doigt de Limitation',
    role: 'Portoir spécifique équipé de sa vis moletée inférieure de soutien',
    specs: 'Vis axiale réglable venant en contact affleurant franc sous le contre-pivot de seconde centrale.',
    alert: 'Indispensable : sans lui, chasser la trotteuse déchasse le rubis du pont ou casse le pivot central.',
  },
  {
    id: 'aiguilles',
    name: 'Jeu d\'Aiguilles (Heures, Minutes, Seconde)',
    role: 'Affichage du temps conforme aux gardes de sécurité NIHS 91-10',
    specs: 'Aiguille des heures (canon large), minutes (canon conique), trotteuse (canon fin avec contrepoids).',
    alert: 'Équarrir le canon de seconde à 90° à mi-hauteur par le dessous avant tout chassage.',
  },
  {
    id: 'cadran',
    name: 'Cadran d\'Atelier',
    role: 'Visage esthétique avec 2 pieds brasés à 90° et guichet date',
    specs: 'Laqué, émaillé ou soleillé. 2 pieds en cuivre rectilignes s\'insérant dans les alésages de la platine.',
    alert: 'ZÉRO Rodico sur le cadran ! Nettoyage EXCLUSIVEMENT à la brosse marron en poil de martre.',
  },
  {
    id: 'boite',
    name: 'Boîte de Montre (Carrure, Glace, Fond)',
    role: 'Enveloppe étanche protégeant le mécanisme selon la norme ISO 22810',
    specs: 'Glace saphir montée avec joint Hytrel à sec, tube de couronne chassé, gorge de fond vissé ou clipsé.',
    alert: 'Nettoyage intérieur sous faisceau rasant 45° : zéro poussière admise avant emboîtage.',
  },
];

export default function OutillageKitSection() {
  const [activeTab, setActiveTab] = useState<'outillage' | 'kit'>('outillage');
  const [selectedTool, setSelectedTool] = useState<ToolItem>(ATELIER_TOOLS[0]);
  const [selectedKit, setSelectedKit] = useState<KitElement>(KIT_ELEMENTS[0]);

  return (
    <div className="bg-cream-card dark:bg-slate-900 rounded-3xl border border-cream-border dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-6 hl-fade">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-border dark:border-slate-800">
        <div>
          <span className="inline-block text-xs uppercase font-label font-bold tracking-widest text-bronze-dark dark:text-amber-400 bg-bronze/10 dark:bg-amber-400/10 px-3 py-1 rounded-full border border-bronze/25 dark:border-amber-400/25 mb-1.5">
            Planches Officielles d'Atelier
          </span>
          <h3 className="font-display text-xl sm:text-2xl text-ink dark:text-slate-100">
            {activeTab === 'outillage' ? '1. Outillage Nécessaire d\'Établi' : '2. Kit à Emboîter (Fourniture d\'Atelier)'}
          </h3>
          <p className="text-xs text-ink-soft dark:text-slate-400 mt-1">
            {activeTab === 'outillage'
              ? 'Les 10 instruments de référence exigés pour les opérations d\'emboîtage et d\'aiguillage suisse.'
              : 'Les 7 composants et fournitures d\'atelier préparés sur le sous-main avant l\'assemblage.'}
          </p>
        </div>

        {/* Boutons d'onglet */}
        <div className="flex items-center gap-1.5 p-1 bg-cream-track dark:bg-slate-800 rounded-xl border border-cream-border dark:border-slate-700 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('outillage')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-label font-bold transition flex items-center gap-1.5 ${
              activeTab === 'outillage'
                ? 'bg-bronze text-white shadow-sm'
                : 'text-ink-soft dark:text-slate-400 hover:text-ink dark:hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" /> Outillage (10)
          </button>
          <button
            onClick={() => setActiveTab('kit')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-label font-bold transition flex items-center gap-1.5 ${
              activeTab === 'kit'
                ? 'bg-bronze text-white shadow-sm'
                : 'text-ink-soft dark:text-slate-400 hover:text-ink dark:hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> Kit à Emboîter (7)
          </button>
        </div>
      </div>

      {/* CONTENU 1 : OUTILLAGE NÉCESSAIRE (10 OUTILS) */}
      {activeTab === 'outillage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Grille des 10 outils */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ATELIER_TOOLS.map((t, idx) => {
              const isSelected = selectedTool.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTool(t)}
                  className={`text-left p-3 rounded-2xl border transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-bronze/10 dark:bg-amber-400/10 border-bronze dark:border-amber-400 shadow-sm'
                      : 'bg-cream-tile dark:bg-slate-800/60 border-cream-border dark:border-slate-700 hover:border-bronze/60 dark:hover:border-slate-500'
                  }`}
                >
                  <span
                    className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-label text-xs font-bold ${
                      isSelected
                        ? 'bg-bronze text-white'
                        : 'bg-cream-card dark:bg-slate-700 text-ink-soft dark:text-slate-300 border border-cream-border dark:border-slate-600'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-[13px] text-ink dark:text-slate-100 truncate">{t.name}</h4>
                    <p className="text-[11px] text-ink-soft dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                      {t.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Fiche détaillée de l'outil sélectionné */}
          <div className="lg:col-span-5 bg-[#221B10] text-cream rounded-2xl border border-bronze/40 p-5 space-y-4 shadow-lg lg:sticky lg:top-36">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] uppercase font-label font-bold tracking-widest text-bronze-light bg-bronze/20 px-2 py-0.5 rounded border border-bronze/30">
                Fiche Instrument d'Atelier
              </span>
              <span className="text-xs font-label text-cream/70">Catégorie : {selectedTool.category}</span>
            </div>

            <div>
              <h4 className="font-display text-xl text-white">{selectedTool.name}</h4>
              <p className="text-xs text-bronze-light mt-1 font-medium">{selectedTool.role}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
              <span className="flex items-center gap-1.5 text-xs font-label font-bold text-amber-300">
                <Info className="w-3.5 h-3.5" /> RECOMMANDATION DU MAÎTRE D'ATELIER :
              </span>
              <p className="text-xs leading-relaxed text-cream/90">{selectedTool.benchTip}</p>
            </div>

            <div className="text-[11px] font-label text-cream/60 flex items-center gap-2 pt-1 border-t border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Conforme au standard d'équipement de l'artisan horloger suisse.</span>
            </div>
          </div>
        </div>
      )}

      {/* CONTENU 2 : LE KIT A EMBOITER (7 COMPOSANTS) */}
      {activeTab === 'kit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Liste des 7 composants */}
          <div className="lg:col-span-7 space-y-2.5">
            {KIT_ELEMENTS.map((k, idx) => {
              const isSelected = selectedKit.id === k.id;
              return (
                <button
                  key={k.id}
                  onClick={() => setSelectedKit(k)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-bronze/10 dark:bg-amber-400/10 border-bronze dark:border-amber-400 shadow-sm'
                      : 'bg-cream-tile dark:bg-slate-800/60 border-cream-border dark:border-slate-700 hover:border-bronze/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-label text-xs font-bold ${
                        isSelected
                          ? 'bg-bronze text-white'
                          : 'bg-cream-card dark:bg-slate-700 text-ink-soft dark:text-slate-300 border border-cream-border dark:border-slate-600'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-[13.5px] text-ink dark:text-slate-100 truncate">{k.name}</h4>
                      <p className="text-[11.5px] text-ink-soft dark:text-slate-400 truncate mt-0.5">{k.role}</p>
                    </div>
                  </div>
                  <Info className={`w-4 h-4 shrink-0 ${isSelected ? 'text-bronze dark:text-amber-400' : 'text-ink-soft/40'}`} />
                </button>
              );
            })}
          </div>

          {/* Fiche détaillée du composant sélectionné */}
          <div className="lg:col-span-5 bg-[#221B10] text-cream rounded-2xl border border-bronze/40 p-5 space-y-4 shadow-lg lg:sticky lg:top-36">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] uppercase font-label font-bold tracking-widest text-bronze-light bg-bronze/20 px-2 py-0.5 rounded border border-bronze/30">
                Fourniture d'Atelier
              </span>
              <span className="text-xs font-label text-cream/70">Contrôle Réception</span>
            </div>

            <div>
              <h4 className="font-display text-xl text-white">{selectedKit.name}</h4>
              <p className="text-xs text-bronze-light mt-1 font-medium">{selectedKit.role}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
              <span className="text-[11px] font-label font-bold uppercase tracking-wider text-amber-300 block">
                Spécifications &amp; Tolérances :
              </span>
              <p className="text-xs leading-relaxed text-cream/90">{selectedKit.specs}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-label font-bold text-red-300">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> PIÈGE À ÉVITER :
              </span>
              <p className="text-xs leading-relaxed text-red-200">{selectedKit.alert}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
