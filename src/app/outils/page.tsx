'use client'

import { useState } from 'react'

export default function TestPage() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div className="p-10 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl mb-4">Test Interactivité</h1>
      
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-600 px-4 py-2 rounded mb-4"
      >
        Compteur: {count}
      </button>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type something..."
        className="bg-slate-800 text-white px-3 py-2 rounded border border-slate-600"
      />
      <p className="mt-2">Tu as tapé: {name}</p>
    </div>
  )
}
