"use client";

export default function FooterSuisse() {
  return (
    <footer className="py-12 px-6 bg-[#111] border-t border-[#E2B44F]/20">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Horlo AFP - L'Horlogerie Suisse
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Excellence et tradition horlogère
        </p>
      </div>
    </footer>
  );
}
