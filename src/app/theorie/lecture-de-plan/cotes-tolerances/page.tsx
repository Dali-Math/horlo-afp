import { useState } from "react";

export default function CotesTolerancesSchemaPro() {
  const [modal, setModal] = useState(null);
  return (
    <div className="relative mx-auto w-full max-w-2xl p-6 bg-white border border-gray-200 rounded-xl shadow text-center">
      <h2 className="text-xl font-bold text-blue-900 mb-2">Schéma interactif technique</h2>
      <svg viewBox="0 0 640 340" className="mx-auto mb-4 w-full h-[320px]">
        {/* Roue dentée */}
        <circle
          cx="180"
          cy="170"
          r="70"
          fill="#f6f0d2"
          stroke="#0ea5e9"
          strokeWidth="4"
          className="cursor-pointer"
          onClick={() => setModal("roue")}
        />
        <text x="120" y="170" fontSize="22" fill="#0ea5e9" fontWeight="bold">Ø 1.20 mm</text>
        {/* Axe */}
        <rect
          x="330"
          y="150"
          width="120"
          height="38"
          fill="#e0e7ef"
          stroke="#0ea5e9"
          strokeWidth="4"
          rx="8"
          className="cursor-pointer"
          onClick={() => setModal("axe")}
        />
        <text x="370" y="142" fontSize="20" fill="#0ea5e9" fontWeight="bold">Tol. ±0.02 mm</text>
        {/* Annotation "ajustement" */}
        <text x="285" y="220" fontSize="18" fill="#1e293b" fontWeight="600">Zone d'ajustement clé</text>
        {/* Flèches d'annotation (optionnelles) */}
        <line x1="250" y1="170" x2="330" y2="170" stroke="#b91c1c" strokeWidth="2" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
            <polygon points="0,0 10,4 0,8" fill="#b91c1c" />
          </marker>
        </defs>
      </svg>
      <div className="text-blue-600">Clique un élément pour afficher explications et détails normatifs.</div>

      {/* Modals pédagogiques */}
      {modal === "roue" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setModal(null)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-gray-400 text-2xl" onClick={() => setModal(null)} title="Fermer">×</button>
            <div className="font-bold text-lg text-blue-900 mb-2">Cote Ø 1.20 mm</div>
            <div className="text-gray-700 text-left">
              Cette cote nominale représente le diamètre fonctionnel de la roue.
              Une tolérance adaptée garantit le <b>jeu d’assemblage optimal</b> :
              <ul className="list-disc pl-5 my-3">
                <li>trop serré : montage impossible ou grippage</li>
                <li>trop lâche : jeu excessif, imprécision, usure accélérée</li>
              </ul>
              Toujours appliquer une tolérance selon la <b>fonction réelle</b> et les normes ISO 129-1.
            </div>
          </div>
        </div>
      )}

      {modal === "axe" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setModal(null)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-gray-400 text-2xl" onClick={() => setModal(null)} title="Fermer">×</button>
            <div className="font-bold text-lg text-blue-900 mb-2">Tolérance ±0.02 mm (axe)</div>
            <div className="text-gray-700 text-left">
              La tolérance dimensionnelle donnée ici définit la <b>plage d’acceptabilité</b> autour de la cote nominale de l’axe.<br/> Les tolérances réduisent les risques d’erreur d’usinage et garantissent le bon comportement mécanique selon la <b>norme ISO 1101</b>.<br />
              - Trop stricte : coût de fabrication élevé, risque de rebut<br />
              - Trop large : performances fonctionnelles dégradées
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
