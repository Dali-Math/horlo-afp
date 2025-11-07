'use client'
export const dynamic = "force-dynamic";
import { Suspense } from 'react'
import RechercheContent from './recherche-content'

// ✅ On sépare la logique dans un composant enfant
// et on entoure le tout avec <Suspense>
export default function RecherchePage() {
  return (
    <Suspense fallback={<p className="p-8 text-center">Chargement des résultats...</p>}>
      <RechercheContent />
    </Suspense>
  )
}
