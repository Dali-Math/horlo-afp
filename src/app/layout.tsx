import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "HorloLearn | Formation AFP en Horlogerie",
  description: "Plateforme éducative dédiée à la formation AFP en horlogerie suisse : théorie, pratique, fiches, vidéos et quiz interactifs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white">
        <div className="fixed inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
