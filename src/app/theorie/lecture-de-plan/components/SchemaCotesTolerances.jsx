import { useState } from "react";

export default function SchemaCotesTolerances() {
  const [zone, setZone] = useState(null);
  return (
    <div className="relative flex flex-col items-center max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow">
      <svg viewBox="0 0 600 300" className="w-full h-72 mb-2">
        {/* Roue */}
        <circle
          cx="180"
          cy="150"
          r="60"
          fill="#f3f4f5"
          stroke="#0ea5e9"
          strokeWidth="6"
          className="cursor-pointer"
          onClick={() => setZone("roue")}
        />
        <text x="120" y="150" fontSize="20" fill="#0ea5e9" fontWeight="bold">Ø 1.20 mm</text>
        {/* Axe */}
        <rect
          x="300"
          y="125"
          width="120"
          height="40"
          fill="#e0e7ef"
          stroke="#0ea5e9"
          strokeWidth="4"
          rx="8"
          className="cursor-pointer"
          onClick={() => setZone("axe")}
        />
        <text x="350" y="120" fontSize="18" fill="#0ea5e9" fontWeight="bold">Tol. ±0.02 mm</text>
        <text x="260" y="210" fontSize="17" fill="#1e293b" fontWeight="600">Zone d'ajustement</text>
      </svg>
      <div className="text-blue-600">Clique une zone du schéma pour l’explication détaillée.</div>

      {/* Tooltips pédagogiques */}
      {zone === "roue" && (
        <div className="absolute left-5 top-5 bg-white p-4 rounded shadow-lg border w-72 z-20 text-blue-900">
          <button className="absolute right-2 top-2 text-gray-500" onClick={() => setZone(null)}>×</button>
          <div className="font-bold mb-2">Cote Ø 1.20 mm (roue)</div>
          Valeur idéale pour l’ajustement. Trop grande : jeu ; trop petite : montage impossible. 
          <br />Tolérance à soigner pour garantir la précision.
        </div>
      )}
      {zone === "axe" && (
        <div className="absolute right-5 top-5 bg-white p-4 rounded shadow-lg border w-72 z-20 text-blue-900">
          <button className="absolute right-2 top-2 text-gray-500" onClick={() => setZone(null)}>×</button>
          <div className="font-bold mb-2">Tolérance ±0.02 mm (axe)</div>
          Autorise une variation min/max précise, évite les surprises à l’assemblage et réduit les rebuts.
        </div>
      )}
    </div>
  );
}
