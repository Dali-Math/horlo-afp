// components/PlanInteractif.jsx
import { useState } from "react";

export default function PlanInteractif() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg viewBox="0 0 400 200" className="w-full h-64 border">
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="#cbd5e1"
          className="cursor-pointer"
          onClick={() => setSelected("cote")}
        />
        <text x="95" y="100" fontSize="16" fill="#374151">Ø 1.20</text>
      </svg>

      {selected === "cote" && (
        <div className="absolute left-[120px] top-[40px] bg-white shadow-lg border p-4 rounded z-10 w-72 text-black">
          <button
            className="absolute right-2 top-2 text-gray-400 text-lg"
            onClick={() => setSelected(null)}
            title="Fermer"
          >×</button>
          <div className="font-bold mb-2">Cote Ø 1.20 mm</div>
          <div>
            Cette cote indique le diamètre du trou destiné à recevoir un axe de roue.<br/>
            La tolérance associée (<b>± 0.02 mm</b>) garantit un jeu fonctionnel :<br/>
            - trop serré : l’axe ne monte pas<br/>
            - trop lâche : la roue prend du jeu<br/>
            Importance pour la précision et la qualité d’assemblage.
          </div>
        </div>
      )}
    </div>
  );
}
