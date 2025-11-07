'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import searchData from '@/lib/searchData'

export default function RecherchePage() {
  const params = useSearchParams()
  const query = params.get('q') || ''
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    if (query) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    }
  }, [query])

  return (
    <main className="min-h-screen py-12 px-6 md:px-12 bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">
        Résultats pour : <span className="text-[#E2B44F]">{query}</span>
      </h1>

      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((item, index) => (
            <li key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <a href={item.href} className="text-[#E2B44F] text-lg font-medium hover:underline">
                {item.title}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Aucun résultat trouvé.</p>
      )}
    </main>
  )
}
