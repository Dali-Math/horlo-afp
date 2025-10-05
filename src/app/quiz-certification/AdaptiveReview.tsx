'use client'

import { motion } from 'framer-motion'

interface AdaptiveReviewProps {
  answers: Record<number, string>
  score: number
}

const GOLD = '#f5c453'
const GOLD_DARK = '#c79b34'

export default function AdaptiveReview({ answers, score }: AdaptiveReviewProps) {
  const total = Object.keys(answers).length
  const accuracy = total ? Math.round((score / total) * 100) : 0

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-[#0e0e10] to-[#0a0a0b] p-6"
      style={{ boxShadow: `0 0 0 1px ${GOLD}22` }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-zinc-100">Revue adaptative</h2>
        <motion.span
          className="px-3 py-1 text-xs rounded-full"
          style={{ backgroundColor: `${GOLD}1a`, color: GOLD }}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          Précision {accuracy}%
        </motion.span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(answers).map(([qid, ans], i) => (
          <motion.div
            key={qid}
            className="rounded-xl border border-zinc-800 p-4 bg-zinc-900/40"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <div className="text-xs text-zinc-500 mb-2">Question #{qid}</div>
            <div className="text-sm text-zinc-200">
              Votre réponse: <span style={{ color: GOLD }}>{ans}</span>
            </div>
            <motion.div
              className="mt-3 h-px w-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35 }}
              style={{ background: `linear-gradient(90deg, transparent, ${GOLD_DARK}, transparent)` }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
