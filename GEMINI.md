# Directives et Règles Fondamentales — HorloLearn & Horlo-AFP

## 1. RÈGLE D'OR : EXPLICATION VISUELLE & SCHÉMAS OBLIGATOIRES
- **Les dessins et schémas techniques sont primordiaux** : En horlogerie, toute explication (théorique, pratique, assemblage, métrologie ou réglage) DOIT impérativement être accompagnée d'illustrations visuelles claires.
- **Formes visuelles requises** :
  - Dessins et photos réelles des composants (ex: fournitures transparentes ETA 6497).
  - Schémas techniques vectoriels SVG haute précision (ex: coupe de l'antichoc Incabloc, plan d'impulsion de l'ancre suisse, engrènement à 1/3 de dent du pignon oscillant 7750, cames navettes de chronographe).
  - Vues éclatées, diagrammes de chaîne cinématique et coupes micro-mécaniques.
  - Repères exacts de lubrification : visualiser précisément l'emplacement de la goutte d'huile (forme, diamètre, centrage et zones interdites sèches).
  - Loupe d'inspection 10x / zoom interactif pour examiner les micro-détails d'atelier.

## 2. IDENTITÉ ET PHILOSOPHIE DE L'AUTEUR
- L'auteur est un **artisan horloger authentique et passionné** qui transmet son savoir d'établi.
- **Pas de diplômes, pas d'école ni de centre de formation officiel.**
- **Aucune fausse fiche SAV ou garantie commerciale inventée.**
- Seules les **normes horlogères suisses officielles** font foi : NIHS, ISO 3159 (Contrôle chronométrique officiel COSC), couples de serrage en cNm, 5 lubrifiants Moebius certifiés (9010, HP-1300, 9415, 9504, 8217).

## 3. EXIGENCE DE DESIGN & QUALITÉ TECHNIQUE
- **Mode Sombre & Mode Clair impeccables** : Chaque page et composant doit être parfaitement contrasté, lisible et élégant dans les deux thèmes.
- **Code React / Next.js / TypeScript** : Strictement typé, aucun commentaire HTML dans le JSX, validé systématiquement avec le compilateur SWC.
- **Export & Sauvegarde** : Toujours maintenir une copie prête à l'emploi dans `C:\Users\hamma\Downloads\` et synchroniser les dossiers de travail.

## 4. STANDARD IMPÉRATIF 3D — CALIBRE OFFICIEL SUISSE ETA 6497-1 (97 FOURNITURES)
- **Fichier Source CAO Certifié** : `/models/calibre-6497-demontage.glb` (97 composants horlogers micromécaniques suisses).
- **Architecture de Scène & Moteur** :
  - Visualiseur laboratoire : `src/lib/calibre/engine-scene.ts` et `src/lib/calibre/engine.ts`.
  - Mouvement flottant d'accueil (scroll dynamique) : `src/components/FloatingCalibre3D.tsx`.
- **Règle d'or de stabilité micromécanique (ZÉRO détachement spontané)** :
  - Toutes les 97 fournitures du GLB partagent un système de coordonnées micromécanique commun.
  - **INTERDICTION FORMELLE** d'appliquer des rotations directes sur `rotation.y` ou `rotation.z` aux nœuds non centrés à (0,0,0) (notamment ancre, balancier, roues de moyenne/seconde/échappement, barillet, couronne). Toute rotation locale non centrée fait orbiter la pièce et la fait flotter dans les airs.
  - **Verrouillage strict à l'assemblage** : Dès que `factor <= 0.001`, chaque nœud DOIT être réinitialisé de manière stricte sur ses coordonnées d'origine (`origPos` et `origRot`). Aucune pièce ne doit bouger sans manipulation explicite de la vue éclatée.
- **Matériaux et Finitions Horlogères Suisses** :
  - Ponts & Platine : Rhodiage avec Côtes de Genève et perlage (`matBridge`, `matMainplate`).
  - 17 Rubis corindon synthétique : Matériau physique transparent avec indice de réfraction `ior = 1.77`, transmission `0.72`, épaisseur `0.6`.
  - Vis horlogères : Acier bleui à la flamme (`matBluedSteel`, teinte cobalt profond `0x1b3eb5`).
  - Mobiles & Rouages : Laiton horloger suisse 2N/3N doré (`matBrassGold`).
  - Antichoc Incabloc : Ressort lyre et contre-pivot fidèles aux spécifications NIHS.
- **Ergonomie UI de la page d'accueil** :
  - Boutons d'action flottants (`ScrollToTop`, `FloatingSearchButton`, `VoiceWorkbenchAssistant`) fixés impérativement à **GAUCHE** (`left-6`) pour libérer tout l'espace droit au mouvement 3D.
  - Cartouche d'accueil élégant en verre dépoli (`backdrop-blur`) : *"Bienvenue dans mon atelier horloger. Découvrez le cœur battant du temps, pièce par pièce."*
