"use client";

import React from "react";

export default function Analyseur() {
  return (
    <main className="min-h-screen w-full bg-[#0f172a] flex flex-col items-center justify-center p-0 m-0">
      <iframe
        src="https://copy-of-analyseur-de-montres-ia-147602908955.us-west1.run.app/"
        title="Analyseur de Montres IA"
        className="w-full h-screen border-none"
        allow="camera; microphone; clipboard-read; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </main>
  );
}
