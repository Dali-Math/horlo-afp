/**
 * HorloLearn — Dictionnaire de Remplacement & Correction Horlogère Certifié
 * Basé sur le « Dictionnaire professionnel illustré de l'horlogerie » (G.-A. Berner, Fédération Horlogère Suisse FH)
 * Corrige automatiquement les faux-amis et contresens créés par les traducteurs automatiques
 * (ex: "anchor" -> "lever", "rooster" -> "balance cock", "zipper" -> "setting lever", "exhaust" -> "escapement").
 */

interface GlossaryRule {
  pattern: RegExp;
  replacement: string;
}

const ENGLISH_HOROLOGICAL_GLOSSARY: GlossaryRule[] = [
  // Échappement & Organe régulateur
  { pattern: /\b(?:the\s+)?(?:anchor\s+escapement|escapement\s+with\s+anchor)\b/gi, replacement: 'Swiss lever escapement' },
  { pattern: /\b(?:the\s+)?Swiss\s+anchor\b/gi, replacement: 'Swiss lever' },
  { pattern: /\bpallet\s+anchor\b/gi, replacement: 'pallet fork' },
  { pattern: /\banchor\s+fork\b/gi, replacement: 'pallet fork' },
  { pattern: /\banchor\s+bridge\b/gi, replacement: 'pallet bridge' },
  { pattern: /\banchor\s+wheel\b/gi, replacement: 'escape wheel' },
  { pattern: /\banchor\s+teeth\b/gi, replacement: 'escape wheel teeth' },
  { pattern: /\b(?:the\s+)?anchor\b/gi, replacement: 'pallet lever' },

  // Coq de balancier (évite le ridicule "rooster" ou "cock")
  { pattern: /\b(?:the\s+)?balance\s+rooster\b/gi, replacement: 'balance cock' },
  { pattern: /\b(?:the\s+)?rooster\s+of\s+balance\b/gi, replacement: 'balance cock' },
  { pattern: /\brooster\b/gi, replacement: 'balance cock' },

  // Échappement (évite "exhaust" comme un pot d'échappement de voiture)
  { pattern: /\bexhaust\s+wheel\b/gi, replacement: 'escape wheel' },
  { pattern: /\bexhaust\s+system\b/gi, replacement: 'escapement mechanism' },
  { pattern: /\bSwiss\s+exhaust\b/gi, replacement: 'Swiss escapement' },
  { pattern: /\bexhaust\b/gi, replacement: 'escapement' },
  { pattern: /\bexhausts\b/gi, replacement: 'escapements' },

  // Raquette de réglage (évite "tennis racket")
  { pattern: /\btennis\s+racket\b/gi, replacement: 'regulator index' },
  { pattern: /\brating\s+racket\b/gi, replacement: 'regulator index' },
  { pattern: /\bracquet\b/gi, replacement: 'regulator index' },

  // Tirette & Tige (évite "zipper" ou "pull tab")
  { pattern: /\b(?:the\s+)?zipper\b/gi, replacement: 'setting lever' },
  { pattern: /\bzipper\s+screw\b/gi, replacement: 'setting lever screw' },
  { pattern: /\bpull\s+tab\b/gi, replacement: 'setting lever' },
  { pattern: /\bwinder\s+stem\b/gi, replacement: 'winding stem' },
  { pattern: /\bwinding\s+rod\b/gi, replacement: 'winding stem' },
  { pattern: /\bwinder\s+rod\b/gi, replacement: 'winding stem' },

  // Sautoir de date (évite "long necklace")
  { pattern: /\blong\s+necklace\b/gi, replacement: 'jumper spring' },
  { pattern: /\bdate\s+necklace\b/gi, replacement: 'date jumper' },
  { pattern: /\bjumper\s+necklace\b/gi, replacement: 'jumper spring' },

  // Fusée & Chaînette (évite "space rocket")
  { pattern: /\bspace\s+rocket\b/gi, replacement: 'fusee' },
  { pattern: /\brocket\s+and\s+chain\b/gi, replacement: 'fusee and chain' },

  // Ébats micromécaniques (évite "frolic" ou "play" sauvage)
  { pattern: /\baxial\s+frolic\b/gi, replacement: 'axial endshake' },
  { pattern: /\bradial\s+frolic\b/gi, replacement: 'radial sideplay' },
  { pattern: /\bfrolic\s+of\s+rotor\b/gi, replacement: 'rotor endshake' },
  { pattern: /\bfrolic\s+of\s+balance\b/gi, replacement: 'balance endshake' },
  { pattern: /\bfrolic\b/gi, replacement: 'endshake' },
  { pattern: /\baxial\s+play\b/gi, replacement: 'axial endshake' },
  { pattern: /\bradial\s+play\b/gi, replacement: 'radial sideplay' },

  // Barillet
  { pattern: /\bgun\s+barrel\b/gi, replacement: 'mainspring barrel' },
  { pattern: /\bmotor\s+cylinder\b/gi, replacement: 'mainspring barrel' },

  // Chute de la dent d'échappement (évite "fall")
  { pattern: /\btooth\s+fall\b/gi, replacement: 'tooth drop' },

  // Platine et composants d'assemblage
  { pattern: /\bplate\s+3\/4\b/gi, replacement: 'three-quarter plate (3/4)' },
  { pattern: /\bcore\s+plate\b/gi, replacement: 'mainplate' },
  { pattern: /\bmain\s+plate\b/gi, replacement: 'mainplate' },
  { pattern: /\bmaillechort\b/gi, replacement: 'German silver (maillechort)' },
  { pattern: /\bscrewed\s+chatons\b/gi, replacement: 'screwed gold chatons' },
];


const CHINESE_HOROLOGICAL_GLOSSARY: GlossaryRule[] = [
  // Échappement & Ancre suisse (évite '排气' pot d'échappement et '锚' ancre de navire)
  { pattern: /瑞士锚式排气|锚式排气/g, replacement: '瑞士杠杆擒纵机构' },
  { pattern: /瑞士排气|排气机构/g, replacement: '瑞士擒纵机构' },
  { pattern: /排气轮/g, replacement: '擒纵轮' },
  { pattern: /排气叉/g, replacement: '擒纵叉' },
  { pattern: /排气/g, replacement: '擒纵' },
  { pattern: /瑞士锚|锚叉/g, replacement: '擒纵叉' },
  { pattern: /托盘叉/g, replacement: '擒纵叉' },
  { pattern: /托盘桥|锚夹板/g, replacement: '擒纵叉夹板' },

  // Balancier-spiral et Coq (évite '公鸡' le coq animal !)
  { pattern: /摆轮公鸡|摆动公鸡|平衡公鸡/g, replacement: '摆轮夹板' },
  { pattern: /公鸡夹板|公鸡/g, replacement: '摆轮夹板' },
  { pattern: /摆动弹簧/g, replacement: '摆轮游丝' },
  { pattern: /平衡弹簧/g, replacement: '游丝' },
  { pattern: /平衡轮/g, replacement: '摆轮' },

  // Barillet (évite '枪管' canon de fusil ou '桶')
  { pattern: /主发条枪管|发条枪管|枪管/g, replacement: '发条盒' },
  { pattern: /枪弹簧|发条枪/g, replacement: '主发条' },
  { pattern: /主发条桶/g, replacement: '主发条盒' },

  // Remontoir & Tirette (évite '拉链' fermeture éclair de vêtement !)
  { pattern: /拉链螺丝/g, replacement: '拉档螺丝' },
  { pattern: /拉链/g, replacement: '拉档' },
  { pattern: /卷绕棒|卷绕杆|上弦棒/g, replacement: '上条柄轴' },
  { pattern: /柄轴/g, replacement: '上条柄轴' },
  { pattern: /离合轮/g, replacement: '离合齿轮' },

  // Ébats micromécaniques (évite '嬉戏', '玩耍' jeu d'enfant)
  { pattern: /轴向嬉戏|轴向玩耍|轴向晃动/g, replacement: '轴向间隙 (Endshake)' },
  { pattern: /径向嬉戏|径向玩耍|径向晃动/g, replacement: '径向间隙 (Sideplay)' },
  { pattern: /转子嬉戏|陀飞嬉戏/g, replacement: '自动陀轴向间隙' },

  // Raquette de réglage (évite '网球拍' raquette de tennis !)
  { pattern: /网球拍|网球拍调节/g, replacement: '快慢针 (Regulator)' },
  { pattern: /调节球拍/g, replacement: '快慢针' },

  // Sautoir de quantième / date (évite '项链' collier ou bijou !)
  { pattern: /长项链|跳跃项链|日期项链/g, replacement: '日历定位簧 (Date jumper)' },

  // Masse oscillante / Rotor (évite '陀螺' toupie de jeu)
  { pattern: /旋转陀螺|摆动陀螺/g, replacement: '自动陀 (Oscillating weight)' },

  // Rubis d'horlogerie (évite '珠宝首饰')
  { pattern: /红宝石饰品|珠宝首饰/g, replacement: '红宝石轴承' },
];

const GERMAN_HOROLOGICAL_GLOSSARY: GlossaryRule[] = [
  { pattern: /\bAnkerhemmung\b/gi, replacement: 'Schweizer Kolbenzahn-Ankerhemmung' },
  { pattern: /\bUnruhkloben\b/gi, replacement: 'Unruhkloben' },
  { pattern: /\bRücker\b/gi, replacement: 'Rücker' },
  { pattern: /\bFederhaus\b/gi, replacement: 'Federhaus' },
  { pattern: /\bAufzugswelle\b/gi, replacement: 'Aufzugswelle' },
];

// Cache des nœuds textuels déjà corrigés pour performance maximale
const processedNodes = new WeakSet<Node>();

export function applyHorologicalGlossary(langCode: string): void {
  if (typeof document === 'undefined' || langCode === 'fr') return;

  const rules = langCode === 'en' ? ENGLISH_HOROLOGICAL_GLOSSARY : (langCode === 'zh' || langCode.startsWith('zh')) ? CHINESE_HOROLOGICAL_GLOSSARY : langCode === 'de' ? GERMAN_HOROLOGICAL_GLOSSARY : [];
  if (rules.length === 0) return;

  // On recherche dans le contenu principal (évite scripts, styles, iframes)
  const root = document.querySelector('body');
  if (!root) return;

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node: Node) {
        if (!node.textContent || node.textContent.trim().length === 0) {
          return NodeFilter.FILTER_REJECT;
        }
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'noscript' || tag === 'iframe') {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent.closest('[translate="no"], .notranslate')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  let currentNode: Node | null;
  while ((currentNode = walker.nextNode())) {
    if (processedNodes.has(currentNode)) continue;

    let text = currentNode.textContent || '';
    let changed = false;

    for (const rule of rules) {
      if (rule.pattern.test(text)) {
        text = text.replace(rule.pattern, rule.replacement);
        changed = true;
      }
    }

    if (changed) {
      currentNode.textContent = text;
      processedNodes.add(currentNode);
    }
  }
}
