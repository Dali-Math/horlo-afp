# 🕰️ Refonte de la page "Culture horlogère"

## 🎯 Objectif
Refondre la page **Culture horlogère** pour la rendre plus immersive, élégante et pédagogique.  
Créer une expérience moderne autour de l’histoire de l’horlogerie, des musées, et des ressources culturelles, avec animations fluides et design sombre.

---

## 🎨 Direction artistique
- **Thème général** : ambiance “atelier d’horloger” sombre et dorée  
- **Palette de couleurs** :
  - Fond principal : `#0b0c10`
  - Dégradé de section : `#0b0c10 → #1c1e26`
  - Doré lumineux : `#d4af37`
  - Texte principal : `#f3f4f6`
  - Texte secondaire : `#b8b8b8`
- **Police recommandée** :  
  - Titres : `Bebas Neue` ou `Oswald` (condensée, élégante)  
  - Texte : `Inter` ou `Poppins`  
- **Icônes** : utiliser `Lucide-react`  
- **Animation** : `framer-motion` pour les transitions et effets au survol

---

## 🧱 Structure des sections

### 1️⃣ — En-tête de page
- Grand titre : `Culture horlogère`
- Sous-titre : “Un voyage à travers les arts et métiers du temps.”
- Boutons colorés (catégories) :  
  - Histoire 🕰️  
  - Musées 🏛️  
  - Vidéos 🎥  
  - Lignes du temps ⏳  
- Ces boutons changent de couleur au survol (effet néon doux).

---

### 2️⃣ — Ligne du temps (Timeline)
Créer un composant :  
`src/app/culture/TimelineHorlogerie.tsx`

- Afficher une **timeline horizontale** avec étapes clés :
  - 1510 — Montre portable ⌚  
  - 1675 — Spiral réglant 🔁  
  - 1755 — Échappement à ancre ⚙️  
  - 1839 — Patek Philippe 👑  
  - 1868 — Montre-bracelet 💎  
  - 1905 — Rolex 🏆  
  - 1969 — Quartz ⚡
- Animation fluide avec **scroll horizontal / glisser pour parcourir**
- Chaque carte : fond #111213, bordure dorée, légère ombre et effet au survol

---

### 3️⃣ — Section “Histoire de l’horlogerie”
- Reprendre la liste existante (`Encyclopédie FHH`, `British Museum`, `Watch-Wiki`)
- L’afficher dans **un conteneur semi-transparent noir**
- À droite, intégrer une **mini timeline verticale** (déjà en place)
- Ajouter un léger effet “fade-in” sur apparition.

---

### 4️⃣ — Section “Musées”
- Créer un **grid 2 colonnes**, cartes blanches légèrement transparentes
- Icône 🏛️ à gauche de chaque nom
- Lien externe souligné au survol
- Effet : zoom léger sur la carte au hover (`framer-motion`)

---

### 5️⃣ — Section “Documentaires et vidéos”
- Intégrer les liens YouTube / RTS / Arte sous forme de **cartes** avec miniature YouTube
- Ajouter une bannière “🎬 Découvrir en vidéo”
- Chaque carte affiche une **ombre violette au survol**

---

### 6️⃣ — Pied de page
- Fond dégradé sombre
- Citation subtile :  
  _“L’horlogerie est l’art de dompter le temps sans jamais l’arrêter.”_

---

## ⚙️ Dépendances à installer
```bash
npm install framer-motion lucide-react
