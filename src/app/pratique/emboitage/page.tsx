'use client';

import dynamic from 'next/dynamic';

const EmboitageAcademy = dynamic(() => import('@/components/emboitage/EmboitageAcademy'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-[#070b14]">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 rounded-full border-2 border-bronze/30 dark:border-amber-400/30 border-t-bronze dark:border-t-amber-400 animate-spin mx-auto" />
        <p className="font-label text-xs text-ink-soft dark:text-slate-400">
          Chargement de l&apos;Atelier d&apos;Emboîtage &amp; Aiguillage...
        </p>
      </div>
    </div>
  ),
});

export default function EmboitagePage() {
  return <EmboitageAcademy />;
}
