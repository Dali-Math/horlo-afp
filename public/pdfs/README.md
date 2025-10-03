# PDFs - Ressources Pédagogiques

## Planning HORL1S925

### 250919_HORL1_S925.pdf

**Planning provisoire - Formation modulaire en Horlogerie**

#### Description
Ce document contient le planning détaillé et l'emploi du temps modulable de la formation horlogère HORL1S925 (Module de Base).

#### Contenu du planning :

**Matières enseignées :**
- **Pratique d'horlogerie** (Patrick Rouge) - 205 périodes - Atelier
- **Théorie d'horlogerie** (Vincent Guilliou) - 70 périodes - Salle 414
- **Micromécanique A** (W. Peres Tateisi) - 55 périodes - Salle sèche - 17h30-21h15
- **Micromécanique B** (H. Alves Garcia) - 55 périodes - Salle sèche - 17h15-20h15
- **Mathématiques** (Mlanie Achram) - 50 périodes - Salle 414 - 17h30-21h15  
- **Dessin technique** (Pascal Wyss) - 35 périodes - Salle 420 - 17h00-20h45
- **Tech Micro** (Humberto Alves Garcia) - 11 périodes - Salle sèche - 17h30-21h15
- **Matériaux** (Adrian Tairi) - 10 périodes - Salle sèche - 17h30-21h15

**Total : 451 périodes**

#### Périodes couvertes
- Septembre 2025 - Mai 2026
- Planning avec jours fériés inclus (Jene Genevois, Vendredi Saint, Lundi de Pâques, Ascension, Pentecôte, Noël)

#### Horaires
- Cours en soirée principalement (17h00 - 21h15)
- Répartition sur les lundis, mardis, mercredis, jeudis et samedis

#### Salles
- Atelier (Pratique)
- Salle 414 (Théorie, Mathématiques)
- Salle 420 (Dessin technique)  
- Salle sèche (Micromécanique A et B, Tech Micro, Matériaux)

#### Formateurs
- Patrick Rouge (Pratique)
- Vincent Guilliou (Théorie)
- W. Peres Tateisi (Micromécanique A)
- H. Alves Garcia (Micromécanique B)
- Mlanie Achram (Mathématiques)
- Pascal Wyss (Dessin technique)
- Humberto Alves Garcia (Tech Micro)
- Adrian Tairi (Matériaux)

---

### Instructions pour ajouter le PDF

1. Placez le fichier `250919_HORL1_S925.pdf` dans ce dossier `/public/pdfs/`
2. Le PDF sera accessible via l'URL : `/pdfs/250919_HORL1_S925.pdf`
3. Référencez-le dans les pages Planning et Modules/Ressources

### Intégration dans le site

Le PDF peut être intégré de plusieurs façons :

**Lien direct :**
```tsx
<a href="/pdfs/250919_HORL1_S925.pdf" target="_blank" rel="noopener noreferrer" 
   className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
  <FileText className="w-5 h-5" />
  Télécharger le planning HORL1S925
</a>
```

**Visualiseur PDF intégré :**
```tsx
<iframe 
  src="/pdfs/250919_HORL1_S925.pdf" 
  className="w-full h-[600px] border rounded-md"
  title="Planning HORL1S925"
/>
```

**Carte de ressource :**
```tsx
<div className="border rounded-lg p-6 hover:shadow-lg transition">
  <h3 className="text-lg font-semibold mb-2">Planning Formation HORL1S925</h3>
  <p className="text-sm text-gray-600 mb-4">
    Planning provisoire susceptible de modifications. Formation modulaire en Horlogerie - Module de Base.
    451 périodes réparties sur 8 matières de septembre 2025 à mai 2026.
  </p>
  <a href="/pdfs/250919_HORL1_S925.pdf" target="_blank" className="text-amber-600 hover:text-amber-700">
    Consulter le planning →
  </a>
</div>
```
