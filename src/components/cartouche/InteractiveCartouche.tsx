import React, { useState } from "react";
import { FileText } from "lucide-react";

// Ajoute la prop darkMode optionnelle pour le support UI
interface CartoucheSchemaInteractiveProps {
  darkMode?: boolean;
}

const cartoucheFieldsData = [
  {
    id: "entreprise",
    name: "Nom de l'entreprise",
    category: "Identification",
    obligation: "Obligatoire",
    description: "Raison sociale de l'entreprise ou logo.",
    example: "Manufacture Horlogère SA",
    characters: "30 caractères"
  },
  {
    id: "titre",
    name: "Titre",
    category: "Descriptif",
    obligation: "Obligatoire",
    description: "Désignation de la pièce ou de l'ensemble. Doit être clair et normalisé.",
    example: "Platine calibre 2824",
    characters: "25-30 caractères"
  },
  {
    id: "numero-piece",
    name: "Numéro de pièce",
    category: "Identification",
    obligation: "Obligatoire",
    description: "Référence unique de la pièce dans le système de gestion.",
    example: "P-2824-001-A",
    characters: "15-20 caractères"
  },
  {
    id: "materiau",
    name: "Matériau",
    category: "Technique",
    obligation: "Obligatoire",
    description: "Matière première utilisée selon nomenclature normalisée.",
    example: "Maillechort, Laiton, Acier inox 316L",
    characters: "20 caractères"
  },
  {
    id: "traitement",
    name: "Traitement de surface",
    category: "Technique",
    obligation: "Conditionnel",
    description: "Traitements thermiques, revêtements, finitions spéciales.",
    example: "Rhodiage, Anglage, Perlage, PVD",
    characters: "30 caractères"
  },
  {
    id: "masse",
    name: "Masse",
    category: "Technique",
    obligation: "Conditionnel",
    description: "Poids théorique de la pièce (important en horlogerie).",
    example: "0.45 g, 2.3 g",
    characters: "10 caractères"
  },
  {
    id: "echelle",
    name: "Échelle",
    category: "Représentation",
    obligation: "Obligatoire",
    description: "Rapport entre les dimensions du dessin et les dimensions réelles.",
    example: "1:1, 2:1, 5:1",
    characters: "10 caractères"
  },
  {
    id: "tolerance-generale",
    name: "Tolérance générale",
    category: "Technique",
    obligation: "Conditionnel",
    description: "Tolérances applicables aux cotes non tolérancées individuellement.",
    example: "ISO 2768-m, 0.1 mm",
    characters: "20 caractères"
  },
  {
    id: "projection",
    name: "Méthode d'app.",
    category: "Représentation",
    obligation: "Obligatoire",
    description: "Symbole indiquant la méthode européenne (E) ou américaine (A).",
    example: "Symbole E, 1er dièdre",
    characters: "Symbole"
  },
  {
    id: "format",
    name: "Format",
    category: "Document",
    obligation: "Obligatoire",
    description: "Format du plan selon ISO 5457 (A0, A1, A2, A3, A4).",
    example: "A4, A3",
    characters: "4 caractères"
  },
  {
    id: "indice",
    name: "Indice de révision",
    category: "Gestion",
    obligation: "Obligatoire",
    description: "Lettre ou numéro indiquant la version du document.",
    example: "A, B, C, Rev.1",
    characters: "4 caractères"
  },
  {
    id: "dessinateur",
    name: "Dessinateur",
    category: "Administratif",
    obligation: "Obligatoire",
    description: "Nom ou initiales de la personne ayant réalisé le dessin.",
    example: "J. Dupont",
    characters: "20 caractères"
  },
  {
    id: "verificateur",
    name: "Vérificateur",
    category: "Administratif",
    obligation: "Obligatoire",
    description: "Nom ou initiales de la personne ayant vérifié le dessin.",
    example: "M. Martin",
    characters: "20 caractères"
  },
  {
    id: "date",
    name: "Date",
    category: "Administratif",
    obligation: "Obligatoire",
    description: "Date de création ou de dernière modification.",
    example: "17.10.2025",
    characters: "10 caractères"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Descriptif":      return "bg-blue-100 text-blue-600 border-blue-200";
    case "Identification":  return "bg-purple-100 text-purple-600 border-purple-200";
    case "Technique":       return "bg-green-100 text-green-600 border-green-200";
    case "Représentation":  return "bg-orange-100 text-orange-600 border-orange-200";
    case "Document":        return "bg-cyan-100 text-cyan-600 border-cyan-200";
    case "Administratif":   return "bg-pink-100 text-pink-600 border-pink-200";
    case "Gestion":         return "bg-amber-100 text-amber-600 border-amber-200";
    default:                return "bg-slate-100 text-slate-600 border-slate-200";
  }
};
const getObligationColor = (obligation: string) =>
  obligation === "Obligatoire" ? "text-red-600 font-bold" : "text-blue-600 font-bold";


const CartoucheSchemaInteractive: React.FC<CartoucheSchemaInteractiveProps> = ({ darkMode }) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const selectedFieldData = cartoucheFieldsData.find(f => f.id === selectedField);

  // Ajoute les classes darkMode si besoin
  const baseSectionClass = darkMode
    ? "bg-gray-900 text-gray-100"
    : "";

  return (
    <section className={`mb-16 ${baseSectionClass}`}>
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-gray-100" : "text-slate-900"}`}>
        Schéma Interactif du Cartouche
      </h2>
      <p className={`mb-8 ${darkMode ? "text-gray-400" : "text-slate-600"}`}>
        Cliquez sur un champ dans le schéma ou dans la liste ci-dessous pour voir ses détails.
      </p>
      <div className={`rounded-2xl p-8 mb-6 shadow-2xl ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-slate-700 to-slate-800"}`}>
        <div className="mb-6 text-center">
          <span className={`text-sm font-medium px-4 py-2 rounded-full ${darkMode ? "text-gray-200 bg-gray-900/60" : "text-slate-300 bg-slate-900/50"}`}>
            Position : Coin inférieur droit du plan (ISO 5457)
          </span>
        </div>
        <div className={`rounded-xl p-6 border-2 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-slate-800 border-slate-600"}`}>
          {/* Grilles Interactive */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {cartoucheFieldsData.slice(0, 3).map(field => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedField === field.id
                    ? `${darkMode ? "bg-blue-800 border-blue-500" : "bg-blue-500 border-blue-400"} shadow-lg shadow-blue-500/50`
                    : `${darkMode ? "bg-gray-900 border-gray-700 hover:border-gray-500" : "bg-slate-700 border-slate-600 hover:border-slate-500"}`
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-semibold ${selectedField === field.id ? "text-white" : darkMode ? "text-gray-400" : "text-slate-400"}`}>
                    {field.name.length > 15 ? field.name.slice(0, 13) + "…" : field.name}
                  </span>
                  <span className={`w-5 h-5 rounded-full ${field.obligation === "Obligatoire" ? "bg-red-500" : "bg-blue-500"} flex items-center justify-center text-white text-xs font-bold`}>
                    {field.obligation === "Obligatoire" ? "O" : "C"}
                  </span>
                </div>
                <div className={`text-xs ${selectedField === field.id ? (darkMode ? "text-blue-300" : "text-blue-100") : (darkMode ? "text-gray-600" : "text-slate-500")}`}>
                  {field.example}
                </div>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {cartoucheFieldsData.slice(3, 7).map(field => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedField === field.id
                    ? `${darkMode ? "bg-blue-800 border-blue-500" : "bg-blue-500 border-blue-400"} shadow-lg shadow-blue-500/50`
                    : `${darkMode ? "bg-gray-900 border-gray-700 hover:border-gray-500" : "bg-slate-700 border-slate-600 hover:border-slate-500"}`
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-semibold ${selectedField === field.id ? "text-white" : darkMode ? "text-gray-400" : "text-slate-300"}`}>
                    {field.name.length > 15 ? field.name.slice(0, 12) + "…" : field.name}
                  </span>
                  <span className={`w-4 h-4 rounded-full ${field.obligation === "Obligatoire" ? "bg-red-500" : "bg-blue-500"} flex items-center justify-center text-white text-10px font-bold`}>
                    {field.obligation === "Obligatoire" ? "O" : "C"}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-3 mb-3">
            {cartoucheFieldsData.slice(7, 13).map(field => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedField === field.id
                    ? `${darkMode ? "bg-blue-800 border-blue-500" : "bg-blue-500 border-blue-400"} shadow-lg shadow-blue-500/50`
                    : `${darkMode ? "bg-gray-900 border-gray-700 hover:border-gray-500" : "bg-slate-700 border-slate-600 hover:border-slate-500"}`
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-semibold ${selectedField === field.id ? "text-white" : darkMode ? "text-gray-400" : "text-slate-300"}`}>
                    {field.name.length > 15 ? field.name.slice(0, 12) + "…" : field.name}
                  </span>
                  <span className={`w-4 h-4 rounded-full ${field.obligation === "Obligatoire" ? "bg-red-500" : "bg-blue-500"} flex items-center justify-center text-white text-10px font-bold`}>
                    {field.obligation === "Obligatoire" ? "O" : "C"}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cartoucheFieldsData.slice(13, 15).map(field => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedField === field.id
                    ? `${darkMode ? "bg-blue-800 border-blue-500" : "bg-blue-500 border-blue-400"} shadow-lg shadow-blue-500/50`
                    : `${darkMode ? "bg-gray-900 border-gray-700 hover:border-gray-500" : "bg-slate-700 border-slate-600 hover:border-slate-500"}`
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-semibold ${selectedField === field.id ? "text-white" : darkMode ? "text-gray-400" : "text-slate-300"}`}>
                    {field.name.length > 15 ? field.name.slice(0, 12) + "…" : field.name}
                  </span>
                  <span className={`w-4 h-4 rounded-full ${field.obligation === "Obligatoire" ? "bg-red-500" : "bg-blue-500"} flex items-center justify-center text-white text-10px font-bold`}>
                    {field.obligation === "Obligatoire" ? "O" : "C"}
                  </span>
                </div>
              </button>
            ))}
          </div>
          {/* Légende */}
          <div className="flex items-center gap-6 mt-6 justify-center">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">O</span>
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-slate-300"}`}>Obligatoire (O)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">C</span>
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-slate-300"}`}>Conditionnel (C)</span>
            </div>
          </div>
        </div>
        {/* Champ sélectionné affiché */}
        {selectedFieldData && (
          <div className={`rounded-xl p-6 border-l-4 mt-6 animate-fadeIn ${darkMode ? "bg-gray-900 border-blue-800" : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-600"}`}>
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-slate-900"}`}>
                  {selectedFieldData.name}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(selectedFieldData.category)}`}>
                    {selectedFieldData.category}
                  </span>
                  <span className={`text-sm font-bold ${getObligationColor(selectedFieldData.obligation)}`}>
                    {selectedFieldData.obligation}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-bold mb-1">Description</p>
                <p className={`${darkMode ? "text-gray-300" : "text-slate-700"} mb-3`}>
                  {selectedFieldData.description}
                </p>
                <p className="text-sm font-bold mb-1">Nombre de caractères</p>
                <p className={`${darkMode ? "text-gray-300" : "text-slate-700"}`}>{selectedFieldData.characters}</p>
              </div>
              <div>
                <p className="text-sm font-bold mb-1">Exemple horlogerie</p>
                <p className={`${darkMode ? "text-gray-300 bg-gray-800 border-gray-700" : "text-slate-700 bg-white border-blue-200"} px-4 py-3 rounded-lg border font-mono text-sm`}>
                  {selectedFieldData.example}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartoucheSchemaInteractive;
