"use client";
import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export default function HuilagePage() {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/pratique"
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Retour
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Zap className="text-yellow-400 w-7 h-7" />
          <h1 className="text-3xl font-bold text-yellow-400">
            Huilage & Lubrification
          </h1>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          Comprenez les principes d'un bon huilage : types d'huiles,
          micro-quantités, zones de friction et fréquence d'entretien.
        </p>
      </div>
    </div>
  );
}
