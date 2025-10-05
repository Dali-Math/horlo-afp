# ✨ Optimisations UX Premium - Quiz Certification CFC

## 🎯 Objectif
Élever la qualité perçue et l'efficacité d'usage du module de certification via micro-interactions, animations maîtrisées et accessibilité soignée.

---

## 🔬 Principes directeurs
- Cohérence visuelle et microtiming soigné (200–400ms)
- Feedback immédiat, explicite, non intrusif
- Accessibilité by design (A11y AA), support clavier et lecteurs d'écran
- Performance: animations GPU-friendly, lazy loading intelligent

---

## 🧩 Zones d'interaction prioritaires

### 1) Sélection des réponses
- Hover state doux: glow doré 8% + légère élévation (translateY -2px)
- Active state: ripple discret doré (12% opacity)
- Focus state: anneau d’accessibilité contrasté (#f4e4bc)
- Validation: transition couleur succès/erreur + icône animée

Composants concernés: `Question.tsx`, `QuizCFC.tsx`

### 2) Barre de progression
- Remplissage fluide via spring animation
- Palier jalons (25/50/75/100%) avec micro-confetti léger
- Label dynamique: "Question X/Y • Niveau: Compagnon"

Composant: `ProgressBar.tsx`

### 3) Feedback réponse
- Carte glassmorphism avec motion blur subtil
- Slide from bottom (stagger 40ms par élément)
- Boutons "Revoir la notion" et "Question suivante"

Composants: `QuizFeedback.tsx`, `AdaptiveReview.tsx`

### 4) Tableau de score
- Animation de compte (0 → score) avec easing
- Barres par catégorie avec couleur adaptative
- CTA "Obtenir le certificat" sticky visible >60%

Composant: `Scoreboard.tsx`

---

## 🎛️ Tokens et styles

Couleurs
- Or primaire: #d4af37
- Or clair: #f4e4bc
- Fond primaire: #0b0c10
- Carte: #111213
- Texte principal: #f3f4f6
- Succès: #10b981 • Erreur: #ef4444 • Info: #3b82f6

Rayons et Ombres
- radius-md: 10px
- shadow-gold: 0 10px 25px rgba(212, 175, 55, 0.1)
- shadow-card: 0 10px 30px rgba(0,0,0,0.35)

Motion
- ease-default: cubic-bezier(0.4, 0, 0.2, 1)
- ease-luxury: cubic-bezier(0.22, 1, 0.36, 1)
- duration-fast: 180ms • duration-base: 280ms • duration-slow: 420ms

---

## 🛠️ Patterns d’implémentation (extraits)

Framer Motion variants
```ts
export const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.4,0,0.2,1] } },
  exit:  { opacity: 0, y: 12, transition: { duration: 0.22 } }
}
```

Barre de progression avec jalons
```ts
const milestones = [25,50,75,100];
```

Accessibilité choix de réponse
```tsx
<button role="radio" aria-checked={isSelected} aria-labelledby={`q${id}-label`} />
```

---

## 🧪 QA et métriques
- CLS < 0.05 sur toutes les pages de quiz
- FPS ≥ 55 durant transitions
- Taux d’erreurs d’interaction < 1%
- Couverture tests e2e (Playwright) ≥ 70%

---

## 📦 Tâches à créer
- feat(quiz-cert): Motion tokens + helpers (src/lib/motion.ts)
- feat(quiz-cert): Micro-interactions réponses + focus ring accessible
- feat(quiz-cert): Milestones ProgressBar + micro-confetti
- feat(quiz-cert): Feedback card glassmorphism + actions
- feat(quiz-cert): Animations Scoreboard + CTA certificat

---

## 🔗 Dépendances
- framer-motion, lucide-react, react-confetti

---

Statut: prêt pour implémentation Semaine 1–2
