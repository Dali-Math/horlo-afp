import { Metadata } from "next";
import Link from "next/link";
import FaqSchema from "@/components/FaqSchema";
import BreadcrumbsSchema from "@/components/BreadcrumbsSchema";
import { SITE } from "@/lib/seo";
import { HelpCircle, Wrench, Droplets, Gauge, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `FAQ Technique d'Atelier & Horlogerie Suisse – ${SITE.name}`,
  description:
    "20 réponses techniques d'horloger : échappement à ancre suisse, lubrification Moebius (9010, HP-1300, 9415, 9504, 8217), calibres ETA/Sellita, normes NIHS et contrôle COSC ISO 3159.",
};

interface FaqEntry {
  category: "Échappement & Réglage" | "Lubrification Moebius" | "Calibres ETA & Sellita" | "Normes NIHS & COSC ISO 3159";
  question: string;
  answer: string;
  linkHref: string;
  linkLabel: string;
}

const FAQ_ENTRIES: FaqEntry[] = [
  // === 1. ÉCHAPPEMENT & RÉGLAGE ===
  {
    category: "Échappement & Réglage",
    question: "Pourquoi ne faut-il jamais huiler les pivots d'ancre, le dard ou la fourchette ?",
    answer:
      "L'ancre suisse ne tourne pas en continu : elle oscille sur un très faible angle (~10° à 12°) avec une vitesse de dégagement critique. La moindre trace d'huile sur ses pivots, sur le dard ou dans les cornes de fourchette crée une résistance visqueuse par capillarité qui freine le dégagement lors de l'impulsion du balancier et fait chuter l'amplitude de 30° à 50°. Seules les palettes en rubis reçoivent la graisse thixotrope Moebius 9415.",
    linkHref: "/pratique/echappement",
    linkLabel: "Voir le module Échappement à Ancre Suisse",
  },
  {
    category: "Échappement & Réglage",
    question: "Quel est l'impact d'un mauvais angle de levée (Lift Angle) sur le vibrographe Witschi ?",
    answer:
      "Le vibrographe calcule l'amplitude uniquement à partir du temps qui sépare le bruit de dégagement du bruit d'impulsion. Chaque degré d'erreur sur l'angle de levée renseigné dans l'appareil fausse la lecture de l'amplitude d'environ 5° à 6°. Par exemple, mesurer un ETA 2892-A2 (vrai angle : 51°) ou un Unitas 6497-2 (44°) avec le réglage par défaut de 52° affichera une amplitude artificiellement gonflée.",
    linkHref: "/outils",
    linkLabel: "Consulter la Base des 130+ Angles de Levée (Poste 7)",
  },
  {
    category: "Échappement & Réglage",
    question: "Qu'est-ce que l'erreur de repère (Beat Error) et comment la corriger ?",
    answer:
      "L'erreur de repère exprime en millisecondes (ms) l'asymétrie entre l'alternance aller et l'alternance retour du balancier. Au repos, la cheville de plateau (ellipse) doit être parfaitement alignée sur la ligne des centres reliant l'axe du balancier à l'axe d'ancre. Sur les calibres modernes à porte-piton mobile (type Etachron), on corrige le repère en déplaçant uniquement le porte-piton jusqu'à obtenir une valeur inférieure ou égale à 0.4 ms.",
    linkHref: "/pratique/reglage",
    linkLabel: "Consulter le Protocole de Mise au Repère",
  },
  {
    category: "Échappement & Réglage",
    question: "Comment reconnaître un spiral magnétisé sur l'établi ?",
    answer:
      "Un spiral magnétisé présente des spires qui se collent entre elles (souvent du côté opposé au piton), raccourcissant brutalement la longueur active du spiral. Sur le vibrographe, la montre prend une avance spectaculaire (+60 s/j à plusieurs minutes par jour) accompagnée d'une baisse d'amplitude. Le passage dans un démagnétiseur à champ alternatif décroissant restaure immédiatement la marche.",
    linkHref: "/ressources/reglage",
    linkLabel: "Ouvrir le Laboratoire du Spiral",
  },
  {
    category: "Échappement & Réglage",
    question: "À quoi sert la courbe terminale de Phillips (spiral Breguet) ?",
    answer:
      "Dans un spiral plat d'Archimède, le centre de gravité G du spiral se déplace latéralement à chaque respiration, ce qui crée des écarts de marche dans les positions verticales. La courbe terminale relevée d'Édouard Phillips impose mathématiquement que le centre de gravité du spiral demeure en permanence sur l'axe du balancier (condition Σ x·dm = 0), assurant l'isochronisme quelle que soit la position.",
    linkHref: "/ressources/reglage",
    linkLabel: "Simuler la Courbe Phillips & Exporter en .DXF",
  },

  // === 2. LUBRIFICATION MOEBIUS ===
  {
    category: "Lubrification Moebius",
    question: "Quels sont les 5 lubrifiants Moebius indispensables sur un établi horloger ?",
    answer:
      "Tout rhabillage horloger suisse repose sur 5 lubrifiants certifiés Moebius : 1) Moebius 9010 (huile synthétique fluide pour pivots rapides : balancier Incabloc, roue de seconde, roue d'échappement) ; 2) Moebius HP-1300 (huile haute pression pour pivots lents : barillet, centre, grande moyenne) ; 3) Moebius 9415 (graisse thixotrope pour les levées d'ancre et roue d'échappement) ; 4) Moebius 9504 (graisse haute pression pour le remontoir : tige, pignon coulant, tirette, bascule) ; 5) Moebius 8217 (graisse freinante dédiée à la paroi interne des barillets automatiques à bride glissante).",
    linkHref: "/pratique/huilage",
    linkLabel: "Voir la Cartographie de Lubrification Moebius",
  },
  {
    category: "Lubrification Moebius",
    question: "Quelle quantité d'huile Moebius 9010 faut-il déposer sur un contre-pivot Incabloc ?",
    answer:
      "La goutte de Moebius 9010 déposée au centre du contre-pivot doit former, une fois le chaton percé assemblé, un ménisque circulaire parfaitement centré couvrant entre 50 % et 66 % (2/3) du diamètre de la pierre contre-pivot. Si l'huile touche le laiton du chaton, elle filera par capillarité en quelques jours et laissera le pivot de balancier tourner à sec.",
    linkHref: "/pratique/huilage",
    linkLabel: "Inspecter le dosage au rubis",
  },
  {
    category: "Lubrification Moebius",
    question: "Pourquoi utilise-t-on la graisse Moebius 8217 dans un barillet automatique ?",
    answer:
      "Dans un calibre automatique, la masse oscillante arme le ressort en continu. Pour éviter la rupture du ressort en fin d'armage, celui-ci est muni d'une bride glissante qui frotte contre la paroi interne du tambour. La graisse Moebius 8217 garantit un coefficient de friction précis : assez élevé pour maintenir la pleine réserve de marche, mais permettant un glissement doux sans broutage dès que le couple maximal est atteint.",
    linkHref: "/outils",
    linkLabel: "Ouvrir le Calculateur de Ressort D/3 (Poste 12)",
  },
  {
    category: "Lubrification Moebius",
    question: "Qu'est-ce que l'épilamage (Fixodrop) et sur quelles pièces l'applique-t-on ?",
    answer:
      "L'épilamage consiste à déposer un film moléculaire fluoré hydrophobe et oléophobe à la surface des pièces après lavage. Il empêche l'huile de s'étaler et la force à rester en goutte sphérique exactement sur la zone de friction. On épilame systématiquement la roue d'échappement, l'ancre montée et les contre-pivots des amortisseurs antichocs.",
    linkHref: "/pratique/rhabillage",
    linkLabel: "Voir le Protocole de Rhabillage & Épilamage",
  },
  {
    category: "Lubrification Moebius",
    question: "Comment lubrifier correctement les palettes d'ancre au Moebius 9415 ?",
    answer:
      "Sur un calibre à 18'000 ou 21'600 A/h, on dépose une micro-touche de Moebius 9415 au pique-huile rouge sur le plan d'impulsion de la palette de sortie toutes les 5 dents de la roue d'échappement (soit 3 dépôts sur les 15 dents). Sur les calibres haute fréquence (28'800 et 36'000 A/h), l'épilamage préalable de la roue d'échappement et des palettes est indispensable pour éviter l'éjection centrifuge.",
    linkHref: "/pratique/echappement",
    linkLabel: "Voir le schéma d'huilage des palettes",
  },

  // === 3. CALIBRES ETA & SELLITA ===
  {
    category: "Calibres ETA & Sellita",
    question: "Quelles pièces ne sont PAS interchangeables entre un ETA 2824-2 et un Sellita SW200-1 ?",
    answer:
      "Bien que le Sellita SW200-1 partage les cotes d'emboîtage de l'ETA 2824-2 (Ø 25.60 mm, H 4.60 mm), le profil de denture du rochet (Code 415), de la roue de couronne (Code 420) et la géométrie du cliquet (Code 425) ont été modifiés. Il ne faut jamais mélanger ces trois fournitures entre ETA et Sellita sous peine de blocage ou de casse des dents au remontage.",
    linkHref: "/outils",
    linkLabel: "Ouvrir le Comparateur ETA vs Sellita (Poste 11)",
  },
  {
    category: "Calibres ETA & Sellita",
    question: "Quelle est la différence entre un Unitas 6497-1 et un 6497-2 ?",
    answer:
      "L'ETA 6497-1 oscille à 18'000 A/h (2.5 Hz) avec un angle de levée de 50°, tandis que l'ETA 6497-2 oscille à 21'600 A/h (3 Hz) avec un angle de levée de 44° et une réserve de marche portée à ~56 heures. La roue de centre, la roue d'échappement, le barillet et le balancier-spiral diffèrent entre les deux versions.",
    linkHref: "/pratique/fiches/eta6497",
    linkLabel: "Voir la Fiche Technique ETA 6497",
  },
  {
    category: "Calibres ETA & Sellita",
    question: "Pourquoi la masse oscillante d'un ETA 2824-2 tourne-t-elle parfois vite quand on remonte la couronne ?",
    answer:
      "Ce phénomène ('effet hélicoptère') survient lorsque les cliquets internes de l'une des deux roues inverseuses (Code 1488) restent collés en position embrayée à cause d'une huile gommée ou d'une usure. Au lieu de débrayer librement pendant le remontage manuel, la roue inverseuse renvoie le couple élevé de la couronne vers le rouage d'automatique et entraîne violemment le rotor.",
    linkHref: "/pratique/fiches/eta2824",
    linkLabel: "Voir le schéma des Roues Inverseuses ETA 2824-2",
  },
  {
    category: "Calibres ETA & Sellita",
    question: "Comment régler l'embrayage du pignon oscillant (Code 8080) sur un chronographe Valjoux 7750 ?",
    answer:
      "Lors de l'enclenchement du chronographe (Start), le pignon oscillant (Code 8080) bascule pour engrener avec la roue de chronographe au centre (Code 8000). La pénétration de la denture doit être réglée par l'excentrique de bascule aux deux tiers (2/3) de la hauteur de dent : trop profonde, l'aiguille saute au départ et l'amplitude chute ; trop faible, les dents patinent.",
    linkHref: "/pratique/fiches/valjoux7750",
    linkLabel: "Voir le Plan Technique Valjoux 7750",
  },
  {
    category: "Calibres ETA & Sellita",
    question: "Qu'est-ce que la 'Zone de la Mort' (21h00 – 03h00) sur un mécanisme de quantième ?",
    answer:
      "Entre 21h00 et 03h00 du matin, le doigt d'entraînement de quantième est déjà engagé dans la denture du disque de date pour préparer le saut de minuit. Actionner la correction rapide à la couronne (Position T2) pendant cette plage horaire force le disque contre le doigt engagé et provoque la casse du doigt ou la déformation du ressort-sautoir.",
    linkHref: "/theorie/complications/quantieme",
    linkLabel: "Étudier le mécanisme de Quantième",
  },

  // === 4. NORMES NIHS & COSC ISO 3159 ===
  {
    category: "Normes NIHS & COSC ISO 3159",
    question: "Quels sont les critères officiels de la norme ISO 3159 (Contrôle COSC) pour un calibre > 20 mm ?",
    answer:
      "Pour obtenir le bulletin officiel de chronomètre selon la norme ISO 3159 (catégorie 1, diamètre > 20 mm), le mouvement est testé durant 15 jours dans 5 positions (CH, CB, 6H, 9H, 3H) et à 3 températures (8°C, 23°C, 38°C). Ses 7 critères limites sont : Marche diurne moyenne M entre -4.0 et +6.0 s/j ; Variation moyenne V ≤ 2.0 s/j ; Plus grande variation Vmax ≤ 5.0 s/j ; Différence H-V D entre -6.0 et +8.0 s/j ; Plus grand écart P ≤ 10.0 s/j ; Erreur thermique C ≤ ±0.6 s/j/°C ; Reprise de marche R ≤ ±5.0 s/j.",
    linkHref: "/outils",
    linkLabel: "Tester un mouvement au Calculateur COSC ISO 3159 (Poste 5)",
  },
  {
    category: "Normes NIHS & COSC ISO 3159",
    question: "Comment calcule-t-on les dimensions d'un ressort de barillet selon la Règle des Tiers (D/3) ?",
    answer:
      "Dans un tambour de barillet de diamètre intérieur D, l'horloger divise le rayon en trois parts égales : 1) Le diamètre de la bonde de l'arbre doit valoir d = D / 3 ; 2) La surface annulaire occupée par les spires du ressort armé est égale à la surface annulaire libre permettant son développement. Cette proportion géométrique garantit le nombre maximal de tours d'armage (environ 6.5 à 7 tours) avec un couple constant.",
    linkHref: "/outils",
    linkLabel: "Calculer un ressort sur le Poste 12 (Règle D/3)",
  },
  {
    category: "Normes NIHS & COSC ISO 3159",
    question: "À quoi correspondent les codes officiels de fournitures Ebauches SA (100, 200, 401, 710, 8000) ?",
    answer:
      "La codification normalisée suisse Ebauches SA attribue un numéro universel à chaque pièce d'un mouvement, quelle que soit la manufacture : série 100 pour le bâti (100 Platine, 105 Pont de barillet, 125 Coq), série 200 pour le rouage (200 Centre, 240 Chaussée), série 400 pour le remontoir (401 Tige, 407 Pignon coulant, 443 Tirette), série 700 pour l'échappement (705 Roue d'échappement, 710 Ancre, 721 Balancier-spiral) et série 8000 pour le chronographe.",
    linkHref: "/ressources/termes-techniques",
    linkLabel: "Consulter le Dictionnaire Illustré Ebauches SA",
  },
  {
    category: "Normes NIHS & COSC ISO 3159",
    question: "Quels couples de serrage en cNm applique-t-on aux vis horlogères en acier ?",
    answer:
      "Le couple de serrage dépend du diamètre nominal du filetage normalisé NIHS : pour une vis S 0.60 mm (coq / pont d'ancre fin), on applique 0.8 à 1.1 cNm ; pour S 0.80 mm (pont de rouage), 1.4 à 1.8 cNm ; pour S 1.00 mm (pont de barillet / masse oscillante), 2.0 à 2.5 cNm ; et pour S 1.20 mm (rochet de grand calibre), 2.8 à 3.5 cNm. La largeur de la panne du tournevis doit toujours égaler 100 % du diamètre de la tête de vis.",
    linkHref: "/pratique/micromecanique",
    linkLabel: "Voir le module Micromécanique & Affûtage",
  },
  {
    category: "Normes NIHS & COSC ISO 3159",
    question: "Quelle est la différence entre la norme d'étanchéité NIHS 92-20 (ISO 22810) et la norme plongée ISO 6425 ?",
    answer:
      "La norme NIHS 92-20 (ISO 22810) régit les montres étanches d'usage courant (3 ATM à 10 ATM) par des tests de surpression sèche, d'immersion et de choc thermique avec goutte de condensation. La norme ISO 6425 (Montres de Plongée ≥ 100 m / 10 ATM) impose en plus un test de chaque pièce à 125 % de sa pression nominale, une résistance à l'eau salée, une lisibilité à 25 cm dans l'obscurité et une lunette unidirectionnelle.",
    linkHref: "/pratique/emboitage",
    linkLabel: "Voir le module Emboîtage & Étanchéité NIHS 92-20",
  },
];

export default function FAQPage() {
  const categories = [
    "Échappement & Réglage",
    "Lubrification Moebius",
    "Calibres ETA & Sellita",
    "Normes NIHS & COSC ISO 3159",
  ] as const;

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <BreadcrumbsSchema
          items={[
            { name: "Accueil", slug: "" },
            { name: "FAQ Technique d'Atelier", slug: "faq" },
          ]}
        />

        <header className="mb-12 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4" /> Réponses Techniques d&apos;Établi · Normes Suisses NIHS &amp; ISO 3159
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
            FAQ Technique <span className="text-amber-600 dark:text-amber-400">HorloLearn</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-base leading-relaxed">
            Les <strong>20 questions techniques les plus fréquentes à l&apos;établi</strong> : diagnostic d&apos;échappement au vibrographe Witschi, dosage des 5 lubrifiants certifiés Moebius, pièges d&apos;interchangeabilité ETA/Sellita et tolérances chronométriques officielles COSC ISO 3159.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mt-6">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition"
              >
                {cat}
              </a>
            ))}
          </div>
        </header>

        <div className="space-y-12">
          {categories.map((cat) => {
            const catItems = FAQ_ENTRIES.filter((item) => item.category === cat);
            const anchorId = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <div key={cat} id={anchorId} className="scroll-mt-28">
                <div className="flex items-center gap-2.5 mb-5">
                  {cat === "Échappement & Réglage" && <Gauge className="w-6 h-6 text-amber-500" />}
                  {cat === "Lubrification Moebius" && <Droplets className="w-6 h-6 text-amber-500" />}
                  {cat === "Calibres ETA & Sellita" && <Wrench className="w-6 h-6 text-amber-500" />}
                  {cat === "Normes NIHS & COSC ISO 3159" && <ShieldCheck className="w-6 h-6 text-amber-500" />}
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {cat}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {catItems.map((it) => (
                    <div
                      key={it.question}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-2.5 leading-snug">
                          {it.question}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                          {it.answer}
                        </p>
                      </div>
                      <Link
                        href={it.linkHref}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline mt-2"
                      >
                        {it.linkLabel} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <FaqSchema
          items={FAQ_ENTRIES.map((e) => ({
            question: e.question,
            answer: e.answer,
          }))}
        />
      </div>
    </section>
  );
}
