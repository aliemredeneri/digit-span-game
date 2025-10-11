'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

export function StartScreen() {
  const { setGameState } = useGameStore()

  const handleStart = () => {
    setGameState('countdown')
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          Digit Span Memory Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">How to Play</h2>
          <ul className="text-left text-gray-600 space-y-3">
            <li>• Numbers will appear one at a time for 1 second each</li>
            <li>• Remember numbers that are LARGER than the previous number</li>
            <li>• Enter the remembered numbers in order</li>
            <li>• You'll start with 4 numbers to remember</li>
            <li>• Complete 3 trials per level</li>
            <li>• Difficulty increases up to 10 numbers</li>
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="bg-blue-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Start Test
        </motion.button>
      </motion.div>
    </div>
  )
}