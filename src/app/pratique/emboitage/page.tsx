'use client';

import dynamic from 'next/dynamic';

const EmboitageAcademy = dynamic(() => import('@/components/emboitage/EmboitageAcademy'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 rounded-full border-2 border-bronze/30 border-t-bronze animate-spin mx-auto" />
        <p className="font-label text-xs text-ink-soft">Chargement de l&apos;Atelier d&apos;Emboîtage &amp; Habillage...</p>
      </div>
    </div>
  ),
});

export default function EmboitagePage() {
  return <EmboitageAcademy />;
}
