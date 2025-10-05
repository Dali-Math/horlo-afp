# 📚 Documentation - Horlo AFP

## 📖 Vue d'ensemble

Ce dossier contient la documentation complète du projet **Horlo AFP**, une plateforme web premium dédiée à l'horlogerie de luxe. Le projet utilise Next.js, TypeScript, Tailwind CSS, Firebase et intègre des animations avec Framer Motion.

---

## 🏗️ Architecture du projet

### Structure des dossiers

```
horlo-afp/
├── src/
│   ├── app/              # Pages et routing Next.js
│   ├── components/       # Composants réutilisables
│   ├── lib/             # Librairies et utilitaires
│   └── styles/          # Styles globaux
├── public/              # Assets statiques
├── docs/                # Documentation
└── config files         # Configuration (Next, Tailwind, etc.)
```

---

## 🎨 Modules principaux

### 1. **Page Culture horlogère** (`/culture`)

Une expérience immersive autour de l'histoire de l'horlogerie.

**Composants clés:**
- `TimelineHorlogerie.tsx` - Timeline interactive des grandes dates
- Section Histoire - Encyclopédies et ressources
- Section Musées - Grid de musées horlogers
- Section Vidéos - Documentaires et contenus multimédias

**Design:**
- Thème sombre (#0b0c10 → #1c1e26)
- Accents dorés (#d4af37)
- Animations Framer Motion
- Police: Bebas Neue (titres) + Inter (texte)

### 2. **Page Métiers** (`/metiers`)

Présentation des métiers de l'horlogerie avec système de citations inspirantes.

**Fonctionnalités:**
- `CitationFinaleMetiers` - Citations rotatives
- Bandeau premium or
- Profils de métiers détaillés
- Parcours de formation

### 3. **Communauté** (`/communaute`)

Espace membres avec système d'authentification Firebase.

**Modules:**
- Authentification utilisateur
- Plans premium
- Forum et échanges
- Profils personnalisés

### 4. **Système de Design**

**Palette de couleurs:**
```css
/* Fonds */
--bg-primary: #0b0c10
--bg-secondary: #1c1e26
--bg-card: #111213

/* Accents */
--gold: #d4af37
--gold-light: #f4e4bc

/* Textes */
--text-primary: #f3f4f6
--text-secondary: #b8b8b8
```

**Typographie:**
- Titres: Bebas Neue / Oswald
- Corps: Inter / Poppins
- Tailles: 14px (base), 16px (confort), 18px+ (titres)

---

## 🔧 Technologies utilisées

- **Framework:** Next.js 14+ (App Router)
- **Langage:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Firebase (Auth + Firestore)
- **Déploiement:** Vercel

---

## 🚀 Installation et développement

```bash
# Installer les dépendances
npm install

# Configurer Firebase
cp .env.local.example .env.local
# Ajouter vos clés Firebase dans .env.local

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build
```

---

## 📦 Dépendances principales

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "framer-motion": "^10.0.0",
  "lucide-react": "^0.300.0",
  "firebase": "^10.0.0",
  "react-icons": "^5.0.0"
}
```

---

## 📝 Conventions de code

### Composants
- Utiliser PascalCase pour les noms de composants
- Préfixer les composants de page avec "Page" ou suffixer avec "Section"
- Typer toutes les props avec TypeScript

### Styles
- Privilégier Tailwind CSS classes
- Utiliser les variables de couleur du thème
- Animations avec `framer-motion` pour la fluidité

### Commits
- Format: `type(scope): message`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`
- Exemples:
  - `feat(metiers): add CitationFinaleMetiers component`
  - `fix(culture): correct timeline scrolling behavior`
  - `docs: update README with design system`

---

## 🎯 Feuille de route

### ✅ Complété
- [x] Configuration initiale Next.js + TypeScript
- [x] Intégration Tailwind CSS
- [x] Système d'authentification Firebase
- [x] Page Culture horlogère
- [x] Page Métiers avec citations
- [x] Design system complet

### 🚧 En cours
- [ ] Timeline interactive complète
- [ ] Section vidéos avec player intégré
- [ ] Module forum communauté
- [ ] Système de notifications

### 📅 À venir
- [ ] Application mobile (React Native)
- [ ] API REST pour contenus
- [ ] Dashboard admin
- [ ] Système de badges et récompenses

---

## 🤝 Contribution

Pour contribuer au projet:

1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'feat: Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📞 Contact

**Projet:** Horlo AFP - Atelier de Formation Professionnelle en Horlogerie

**Website:** [horlo-afp.vercel.app](https://horlo-afp.vercel.app)

**Repository:** [github.com/Dali-Math/horlo-afp](https://github.com/Dali-Math/horlo-afp)

---

## 📄 Licence

*Information de licence à ajouter*

---

> *"L'horlogerie est l'art de dompter le temps sans jamais l'arrêter."*
