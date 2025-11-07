'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { searchContent, SearchItem } from '@/lib/searchData'

export default function RecherchePage() {
  const params = useSearchParams()
  const query = params.get('q') || ''
  const [results, setResults] = useState<SearchItem[]>([])

  useEffect(() => {
    if (query) {
      const found = searchContent(query)
      setResults(found)
    }
  }, [query])

  return (
    <main className="min-h-screen py-12 px-6 md:px-12 bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Résultats pour : <span className="text-[#E2B44F]">"{query}"</span>
      </h1>

      {results.length > 0 ? (
        <ul className="space-y-6">
          {results.map((item) => (
            <li
              key={item.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <a href={item.url} className="block">
                <h2 className="text-lg font-semibold text-[#E2B44F] hover:underline">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-500 mt-2 inline-block uppercase tracking-wide">
                  {item.type}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 mt-10">
          Aucun résultat trouvé pour cette recherche.
        </p>
      )}
    </main>
  )
}
