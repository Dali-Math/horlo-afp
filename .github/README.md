# 🕰️ Refonte de la page "Culture horlogère"

## 🎯 Objectif
Créer une page **Culture horlogère** immersive, moderne et cohérente avec l’identité visuelle de HorloLearn.  
Cette page doit transmettre la richesse culturelle et historique de l’horlogerie suisse à travers une expérience fluide, accessible et contemporaine — sans aspect scolaire ni formatif.

---

## 🎨 Direction artistique

- **Thème global** : mode sombre intégré (automatique selon le thème du site)
- **Style** : élégant, technique et culturel  
- **Palette de couleurs** :
  - Fond sombre : `#0a0a0a`
  - Fond clair (mode light) : `#ffffff`
  - Texte principal : `#f3f4f6`
  - Texte secondaire : `#9ca3af`
  - Couleur d’accent : `#facc15` (jaune doux) ou `#38bdf8` (bleu léger)
- **Police** :
  - Titres : `Bebas Neue` ou `Oswald`
  - Texte courant : `Inter`
- **Icônes** : `lucide-react`
- **Animations** : `framer-motion` pour les transitions et effets subtils

---

## 🧱 Structure des sections

### 1️⃣ — En-tête de page
- Grand titre : `Culture horlogère`
- Sous-titre : *“Un voyage à travers l’histoire et l’art du temps.”*
- Boutons de navigation (catégories) :
  - Histoire 🕰️  
  - Musées 🏛️  
  - Vidéos 🎥  
  - Lignes du temps ⏳  
- Effet : changement de teinte fluide au survol (transition `hover:brightness-125`).

---

### 2️⃣ — Ligne du temps (Timeline)
Créer un composant :  
`src/app/culture/TimelineHorlogerie.tsx`

- Timeline horizontale animée présentant les grandes dates :
  - 1510 — Première montre portable ⌚  
  - 1675 — Spiral réglant 🔁  
  - 1755 — Échappement à ancre ⚙️  
  - 1839 — Fondation de Patek Philippe 👑  
  - 1868 — Première montre-bracelet 💎  
  - 1905 — Naissance de Rolex 🏆  
  - 1969 — Révolution du quartz ⚡
- Animation fluide au défilement horizontal
- Chaque carte s’adapte au thème (`dark:bg-[#121212]`, `light:bg-gray-50`).

---

### 3️⃣ — Section “Histoire de l’horlogerie”
- Présenter les grandes références culturelles :  
  `Encyclopédie FHH`, `Watch-Wiki`, `British Museum`, etc.  
- Mise en page :
  - Texte à gauche  
  - Mini timeline verticale à droite  
- Effets : `fade-in` et `slide-up` via `framer-motion`.

---

### 4️⃣ — Section “Musées”
- Grille 2 colonnes responsive  
- Cartes sobres avec :
  - Icône 🏛️ à gauche  
  - Nom du musée  
  - Lien externe souligné au survol  
- Exemples :
  - *Musée International d’Horlogerie (La Chaux-de-Fonds)*  
  - *Musée Patek Philippe (Genève)*  
  - *Musée d’Horlogerie du Locle*  

---

### 5️⃣ — Section “Documentaires et vidéos”
- Cartes YouTube ou RTS avec miniature intégrée  
- Bannière d’intro : *🎬 Découvrir en vidéo*  
- Animation d’ombre douce au survol  
- Exemples :
  - *“Les Maîtres du Temps — RTS”*  
  - *“L’Art du Réglage — Fondation de la Haute Horlogerie”*

---

### 6️⃣ — Section “Lignes du temps et repères”
- Graphique ou composant 3D (optionnel) montrant l’évolution technique  
- Possibilité d’ajouter un effet de glissement horizontal interactif.  

---

### 7️⃣ — Pied de page
- Fond en dégradé subtil (`from-[#0a0a0a] to-[#1a1a1a]`)  
- Citation :  
  _“L’horlogerie est l’art de comprendre le temps avant de le mesurer.”_

---

## ⚙️ Dépendances à installer
```bash
npm install framer-motion lucide-react
