'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

export function NumberDisplay() {
  const { sequence, showingIndex } = useGameStore()
  const currentNumber = sequence[showingIndex]

  return (
    <div className="flex items-center justify-center h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={showingIndex}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl border-4 border-gray-800"
        >
          <span className="text-white text-8xl font-bold">
            {currentNumber}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}