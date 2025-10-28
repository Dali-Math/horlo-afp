"use client";

import React from "react";

export default function Analyseur() {
  return (
    <section className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-start py-10 px-6">
      <div className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#E2B44F] mb-3">
          Analyseur de Montres IA
        </h1>
        <p className="text-gray-700 text-sm md:text-base max-w-2xl mx-auto">
          Cet outil utilise l’intelligence artificielle pour analyser les montres
          à partir d’une simple photo. Téléversez une image et laissez notre moteur IA
          identifier les caractéristiques horlogères.
        </p>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <iframe
          src="https://copy-of-analyseur-de-montres-ia-147602908955.us-west1.run.app"
          title="Analyseur de Montres IA"
          className="w-full h-[85vh]"
          allow="camera; microphone; clipboard-read; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

      <footer className="mt-8 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} HorloLearn — Analyseur IA propulsé par Gemini API
      </footer>
    </section>
  );
}
