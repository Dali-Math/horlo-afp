"use client";
import Image from "next/image";
import { useState } from "react";

export default function SchemaInteractif() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <section className="bg-[#111827] text-gray-200 rounded-2xl shadow-lg p-8 text-center">
      <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">
        Schéma Interactif
      </h2>
      <div
        className="cursor-pointer flex flex-col items-center"
        onClick={() => setShowInfo(!showInfo)}
      >
        <Image
          src="/images/schema-tolerances.png"
          alt="Schéma des tolérances horlogères"
          width={500}
          height={300}
          className="rounded-lg border border-gray-700"
        />
        <p className="text-gray-400 text-sm mt-3">
          Cliquez sur l’image pour afficher l’explication pédagogique.
        </p>
      </div>

      {showInfo && (
        <div className="mt-6 text-left bg-[#0b1220] p-4 rounded-lg border border-gray-700">
          <p className="text-gray-300">
            Les tolérances en horlogerie garantissent la précision
            dimensionnelle des composants. Une mauvaise lecture ou un
            dépassement peut altérer le bon fonctionnement d’un mouvement.
          </p>
        </div>
      )}
    </section>
  );
}
