"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-gray-300 border-t border-gray-800 py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Logo et description */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Image
            src="/logos/Logo.jpg"
            alt="HorloLearn Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <h2 className="text-xl font-bold text-white">
            Horlo<span className="text-[#E2B44F]">Learn</span>
          </h2>
          <p className="text-sm text-gray-400">
            Culture & savoir-faire horloger suisse  
            — partager la passion du temps.
          </p>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="text-[#E2B44F] text-lg font-semibold mb-4">
            Navigation
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/suisse" className="hover:text-[#E2B44F] transition">
                🇨🇭 Horlogerie Suisse
              </Link>
            </li>
            <li>
              <Link href="/pratique" className="hover:text-[#E2B44F] transition">
                Pratique Horlogère
              </Link>
            </li>
            <li>
              <Link href="/ressources" className="hover:text-[#E2B44F] transition">
                Ressources
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#E2B44F] transition">
                📩 Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-center items-center md:items-end">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} HorloLearn. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Développé avec passion par{" "}
            <span className="text-[#E2B44F]">HorloLearn</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
