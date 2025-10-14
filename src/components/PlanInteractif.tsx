"use client";
import { useState } from "react";

export default function PlanInteractif() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-xl mx-auto p-4 bg-[#0b1220] rounded-lg border border-[#E2B44F40] text-white shadow-lg">
      <svg viewBox="0 0 320 180" className="w-full h-48 mb-2">
        {/* Roue */}
        <circle
          cx="100"
          cy="90"
          r="35"
          fill="#192030"
          stroke="#E2B44F"
          strokeWidth="3"
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => setSelected("roue")}
        />

        {/* Axe */}
        <rect
          x="195"
          y="80"
          width="45"
          height="20"
          fill="#CBD5E1"
          stroke="#E2B44F"
          strokeWidth="2"
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => setSelected("axe")}
        />

        {/* Cotations */}
        <text x="50" y="80" fontSize="13" fill="#E2B44F">
          Ø 1.20 mm
        </text>
        <text x="190" y="75" fontSize="13" fill="#E2B44F">
          Tolérance : ± 0.02 mm
        </text>
      </svg>

      {/* Pop-up Roue */}
      {selected === "roue" && (
        <div className="absolute left-5 top-5 bg-[#111] text-gray-100 border border-[#E2B44F80] p-4 rounded-xl shadow-xl w-64 z-10 animate-fadeIn">
          <button
            className="absolute right-2 top-1 text-[#E2B44F] text-lg"
            onClick={() => setSelected(null)}
            title="Fermer"
          >
            ×
          </button>
          <div className="font-bold text-[#E2B44F] mb-2">
            Cote de la roue (Ø 1.20 mm)
          </div>
          <p className="text-sm text-gray-300">
            Cette cote indique le diamètre extérieur de la roue.  
            La précision est essentielle pour un bon ajustement avec l’axe et
            le fonctionnement global du mouvement.
          </p>
        </div>
      )}

      {/* Pop-up Axe */}
      {selected === "axe" && (
        <div className="absolute right-5 top-5 bg-[#111] text-gray-100 border border-[#E2B44F80] p-4 rounded-xl shadow-xl w-64 z-10 animate-fadeIn">
          <button
            className="absolute right-2 top-1 text-[#E2B44F] text-lg"
            onClick={() => setSelected(null)}
            title="Fermer"
          >
            ×
          </button>
          <div className="font-bold text-[#E2B44F] mb-2">
            Tolérance de l’axe (± 0.02 mm)
          </div>
          <p className="text-sm text-gray-300">
            La tolérance définit l’écart acceptable autour de la cote nominale.  
            Trop serré : montage difficile.  
            Trop lâche : jeu excessif et imprécision dans l’ajustement.
          </p>
        </div>
      )}

      <p className="text-center text-[#E2B44F] mt-3 text-sm italic">
        Cliquez sur la <span className="font-bold">roue</span> ou sur l’<span className="font-bold">axe</span> pour explorer leurs cotes et tolérances.
      </p>
    </div>
  );
}
