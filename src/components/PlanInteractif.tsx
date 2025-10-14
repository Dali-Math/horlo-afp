"use client";
import { useState } from "react";

export default function PlanInteractif() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="relative w-full max-w-2xl mx-auto p-6 bg-[#0b1220] rounded-xl border border-[#E2B44F40] text-center shadow-lg">
      {/* Image du schéma */}
      <img
        src="/images/image.jpg"
        alt="Schéma de cotation et tolérance horlogère"
        className="mx-auto w-full max-w-xl h-auto rounded-lg shadow-md border border-[#E2B44F] cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        onClick={() => setSelected(true)}
        style={{ minHeight: "300px", objectFit: "contain" }}
      />

      {/* Légende */}
      <div className="text-[#E2B44F] mt-3 text-sm italic">
        Cliquez sur l’image pour afficher l’explication pédagogique.
      </div>

      {/* Pop-up explicative */}
      {selected && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111] text-gray-100 p-6 rounded-xl shadow-xl z-10 w-[90%] sm:w-[26rem] border border-[#E2B44F80]">
          <button
            className="absolute right-4 top-3 text-[#E2B44F] text-2xl hover:scale-110 transition-transform"
            onClick={() => setSelected(false)}
            title="Fermer"
          >
            ×
          </button>
          <div className="font-bold text-[#E2B44F] text-lg mb-3">
            Schéma pédagogique — Cotation & Tolérance
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Ce schéma illustre les principes fondamentaux de la{" "}
            <b>cotation nominale</b> et des <b>tolérances fonctionnelles</b>{" "}
            appliquées aux composants horlogers.  
            <br />
            <br />
            Analyse la zone cotée pour observer l’influence du jeu ou du serrage
            entre la <b>roue</b> et son <b>axe</b>.  
            Une tolérance trop serrée empêche l’assemblage ; trop large crée un
            jeu fonctionnel nuisible à la précision du mouvement.
            <br />
            <br />
            <b>Astuce :</b> observe les valeurs et leurs symboles ISO — elles
            déterminent le niveau de précision mécanique exigé en horlogerie
            suisse.
          </p>
        </div>
      )}
    </div>
  );
}
