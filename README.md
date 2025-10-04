# Horlo-AFP

> Plateforme web pour la formation en horlogerie AFP - Module HORL1S925

## 📐 Direction artistique et structure générale

### Palette de couleurs – "Atelier horloger"

Thème sombre et doré évoquant l'ambiance d'un atelier d'horlogerie traditionnel.

#### Couleurs principales

- **Noir profond** : `#0b0c10` (dark-900)
- **Charbon** : `#1c1e26` (dark-800)
- **Or classique** : `#d4af37` (gold)
- **Or clair** : `#f7d070` (gold-light)
- **Or foncé** : `#b8941f` (gold-dark)
- **Gris très clair** : `#f3f4f6` (light-100)
- **Gris moyen** : `#b8b8b8` (light-200)

### Typographie

#### Titres et en-têtes
- **Bebas Neue** (première option) : Police condensée, majestueuse
- **Oswald** (fallback) : Alternative robuste
- Utilisation : `font-bebas` ou `font-oswald`

#### Texte courant
- **Inter** (première option) : Lisibilité optimale
- **Poppins** (alternative) : Moderne et accessible
- Utilisation : `font-inter` ou `font-poppins`

### Animations et transitions

#### Animations disponibles

```css
/* Fade In */
animate-fade-in

/* Fade In Up (depuis le bas) */
animate-fade-in-up

/* Slide In Left (depuis la gauche) */
animate-slide-in-left

/* Glow (effet de lueur dorée) */
animate-glow
```

#### Classes utilitaires personnalisées

```css
/* Bordure dorée */
.gold-border

/* Effet de lueur dorée */
.gold-glow
```

## 🎨 Utilisation des couleurs

### Arrière-plans

```jsx
// Fond principal - noir profond
className="bg-dark-900"

// Fond secondaire - charbon
className="bg-dark-800"

// Gradients recommandés
className="bg-gradient-to-b from-dark-900 via-dark-800 to-black"
```

### Textes

```jsx
// Texte principal - gris très clair
className="text-light-100"

// Texte secondaire - gris moyen
className="text-light-200"

// Accents dorés
className="text-gold"
className="text-gold-light"
className="text-gold-dark"
```

### Bordures et anneaux

```jsx
// Bordure subtile
className="border border-white/10"

// Anneau doré
className="ring-1 ring-gold/30"

// Bordure dorée pleine
className="gold-border"
```

## 🏗️ Structure des composants

### Hero Section

```jsx
<section className="relative overflow-hidden bg-dark-900">
  <div className="absolute inset-0 opacity-20">
    {/* Image de texture ou motif guilloché */}
  </div>
  <div className="container mx-auto px-4 py-20 relative">
    <h1 className="font-bebas text-5xl md:text-6xl text-light-100 animate-fade-in">
      Titre Principal
    </h1>
    <p className="font-inter text-light-200 mt-4 animate-fade-in-up">
      Description
    </p>
  </div>
</section>
```

### Cards et conteneurs

```jsx
<div className="rounded-xl border border-white/10 bg-dark-800/50 backdrop-blur p-6 gold-glow hover:bg-dark-800/70 transition">
  <h3 className="font-oswald text-gold">Titre</h3>
  <p className="font-inter text-light-200">Contenu</p>
</div>
```

## 📦 Technologies

- **Framework** : Next.js 14.2.0
- **Styling** : Tailwind CSS 3.4.3
- **Animations** : Framer Motion 11.0.0
- **Icônes** : Lucide React 0.263.1
- **Backend** : Firebase 10.7.1
- **PDF** : jsPDF 2.5.1

## 🚀 Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrage en mode développement
npm run dev

# Build de production
npm run build

# Démarrage en production
npm start
```

## 📁 Structure du projet

```
horlo-afp/
├── public/           # Fichiers statiques
├── src/
│   ├── app/          # Pages et routes Next.js
│   │   ├── culture/  # Page culture horlogère
│   │   ├── communaute/ # Planning et ressources
│   │   ├── evenements/ # Événements
│   │   ├── outils/    # Outils pratiques
│   │   ├── podcasts/  # Podcasts
│   │   ├── pratique/  # Exercices pratiques
│   │   ├── quiz/      # Quiz et tests
│   │   ├── ressources/ # Documentation
│   │   ├── theorie/   # Cours théoriques
│   │   ├── globals.css # Styles globaux
│   │   └── layout.tsx # Layout principal
│   ├── components/   # Composants réutilisables
│   └── lib/          # Utilitaires
├── tailwind.config.ts # Configuration Tailwind
└── package.json
```

## 🎓 Module de formation HORL1S925

Formation modulaire en Horlogerie - Module de Base
- **Durée** : Septembre 2025 - Mai 2026
- **Total** : 451 périodes
- **Matières** : 8 modules (Pratique, Théorie, Micromécanique, Mathématiques, etc.)

## 📝 Licence

Ce projet est destiné à la formation AFP en horlogerie.

---

**Développé pour** : École d'Horlogerie Formation AFP
**Design System** : Atelier Horloger (Sombre & Doré)
