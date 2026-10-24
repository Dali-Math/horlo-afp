<div align="center">

# 🇨🇭 HorloLearn
### *L'Académie & la Culture Horlogère Suisse en Ligne*

[![Site Web](https://img.shields.io/badge/Site%20Officiel-www.horlolearn.ch-D4AF37?style=for-the-badge&logo=safari&logoColor=white)](https://www.horlolearn.ch)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Standards](https://img.shields.io/badge/Standards-NIHS%20%26%20COSC-E11D48?style=for-the-badge)](https://www.fhs.swiss/)

<br />

**HorloLearn** est une plateforme éducative ouverte et interactive conçue pour transmettre l'excellence micromécanique, l'histoire et le savoir-faire de la Haute Horlogerie suisse au monde entier.

Du premier battement de balancier aux grandes complications astronomiques et aux calibres en silicium DRIE, HorloLearn structure plus de **70 modules interactifs**, des **simulateurs d'atelier** et des **écorchés 3D** conformes aux référentiels suisses (CP, CFC, AFP).

[Explorer la Plateforme en Direct ➔](https://www.horlolearn.ch)

</div>

---

## 🌟 Points Forts & Fonctionnalités Clés

### 🧭 1. Le Parcours Horloger Méthodique (3 Niveaux)
* 🟢 **Niveau 1 • Découverte (15-30 min) :** L'éveil du temps, les 5 organes cinématiques (*Moteur, Transmission, Distribution, Régulation, Affichage*) et la grande fresque historique suisse (Calvin 1541, les cabinotiers, le Jura, l'UNESCO).
* 🟡 **Niveau 2 • Passionné & Culture (1-2h) :** Monographies des 15 plus prestigieuses manufactures suisses (*Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin...*), musée des grandes complications et cartographie solaire des fuseaux horaires Louis Cottier (1931).
* 🔴 **Niveau 3 • Apprenti d'Atelier (CFC / AFP) :** Théorie approfondie d'établi, cinématique de l'échappement à ancre suisse en 5 phases, lecture de plans micromécaniques, tolérances NIHS H7/g6, protocole de huilage Moebius et simulateur de démontage virtuel du calibre ETA 6497-1.

### ⏱️ 2. Le Garde-Temps Virtuel & Complications Astronomiques
* Modélisation vectorielle haute précision d'une montre de manufacture suisse.
* Balayage continu fluide (60 FPS) de la trotteuse centrale et battement du tourbillon volant à 6 heures.
* **4 Complications Astronomiques en direct :**
  1. *Phase de Lune Réelle* (calcul synodique sur cycle de 29.5305 jours avec précision suisse d'un jour d'écart tous les 122 ans).
  2. *Équation du Temps* (écart entre temps solaire vrai et temps moyen civil).
  3. *Heure Sidérale de Genève* (méridien de référence astronomique).
  4. *Chronomètre Officiel*.

### 🔬 3. Écorchés 3D & Simulateurs Micromécaniques
* Visualisation et décomposition cinématique en 3D des calibres de référence **ETA 6497-1** (remontage manuel) et **ETA 2824-2** (automatique).
* Laboratoire d'apprentissage de l'échappement à ancre suisse (repos, tirage, chute, levées et angle de levée).
* Banc d'essai interactif de l'oscillateur quartz (32'768 Hz) et des technologies silicium DRIE.

---

## 🛠️ Stack Technologique

| Domaine | Technologie |
| :--- | :--- |
| **Framework Web** | [Next.js 14](https://nextjs.org/) (App Router, Server Components & Dynamic SSR) |
| **Langage** | [TypeScript](https://www.typescriptlang.org/) (Typage strict pour la micromécanique) |
| **Style & Design** | [Tailwind CSS](https://tailwindcss.com/) avec support bi-thème complet (Sombre & Clair) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) & CSS Hardware Accelerated Transforms |
| **Icônes** | [Lucide React](https://lucide.dev/) |
| **Rendu Vectoriel** | SVG dynamiques haute fidélité (Horlogerie & Astrolabe) |
| **Déploiement** | [Vercel](https://vercel.com/) (Edge Network CDN haute disponibilité) |

---

## 📂 Architecture des Modules du Site

```
horlolearn/
├── src/
│   ├── app/
│   │   ├── layout.tsx                     # Layout racine avec Navbar capsule et Footer
│   │   ├── page.tsx                       # Vitrine d'accueil & Parcours guidé mondial
│   │   ├── theorie/                       # 17 traités fondamentaux d'horlogerie
│   │   │   ├── introduction-montre-mecanique/ # Les 5 organes cinématiques
│   │   │   ├── histoire-horlogerie-suisse/    # Histoire complète (Calvin, Jura, Crise Quartz)
│   │   │   ├── echappement-ancre/             # Échappement suisse détaillé
│   │   │   ├── lecture-de-plan/               # Tolérances ISO & normes NIHS
│   │   │   ├── manufactures/                  # Les 15 manufactures mythiques
│   │   │   ├── complications/                 # Tourbillon, Répétition minutes, Quantième
│   │   │   ├── technologies/                  # Quartz 32'768 Hz, Silicium DRIE, Smartwatches
│   │   │   └── galerie-3d/                    # Écorché 3D interactif des calibres
│   │   ├── pratique/                      # Atelier d'établi, démontage & huilage
│   │   ├── fuseaux-horaires/              # Complication Heures du Monde Louis Cottier
│   │   ├── metiers/                       # Métiers d'Art & filières professionnelles AFP/CFC
│   │   ├── quiz/                          # Évaluations formatives et auto-contrôle
│   │   └── outils/                        # Calculateurs de rouage et tables d'ébats
│   ├── components/
│   │   ├── LuxuryHeroClock.tsx            # Garde-temps vectoriel & complications astronomiques
│   │   ├── Navbar.tsx                     # Barre capsule Haute Horlogerie avec sélecteur FR/EN/DE
│   │   └── Footer.tsx                     # Pied de page académique et mentions patrimoniales
```

---

## 🚀 Installation & Démarrage Local

Pour exécuter le projet en local sur votre environnement de développement :

### 1. Prérequis
* [Node.js](https://nodejs.org/) (version 18.17 ou supérieure recommandée)
* npm, yarn ou pnpm

### 2. Cloner le dépôt
```bash
git clone https://github.com/Dali-Math/horlo-afp.git
cd horlo-afp
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Lancer le serveur de développement
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour découvrir HorloLearn.

### 5. Compiler pour la production
```bash
npm run build
npm start
```

---

## 🏛️ Référentiels & Standards Horlogers Respectés

Les contenus pédagogiques et techniques d'HorloLearn s'appuient sur les normes officielles de l'industrie :
* **Normes NIHS** (Normes de l'Industrie Horlogère Suisse) : Tolérances dimensionnelles, ajustements d'ébats et sécurité antichocs.
* **COSC** (Contrôle Officiel Suisse des Chronomètres) : Critères d'homologation de marche et tolérances thermiques.
* **Référentiels CP / CFC / AFP** : Conventions de formation professionnelle suisse pour horlogers et opérateurs en micromécanique.

---

## 👤 Auteur & Créateur

* **Mohamed Ali Mathlouthi** – Concepteur & Développeur
* Plateforme : [https://www.horlolearn.ch](https://www.horlolearn.ch)
* Dépôt GitHub : [https://github.com/Dali-Math/horlo-afp](https://github.com/Dali-Math/horlo-afp)

---

<div align="center">
  <sub>Conçu avec passion pour faire rayonner la micromécanique et le patrimoine horloger suisse à travers le monde.</sub>
</div>
