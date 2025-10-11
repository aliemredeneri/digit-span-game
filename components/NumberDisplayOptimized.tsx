'use client'

import { useGameStore } from '@/store/gameStore'

export function NumberDisplay() {
  const { sequence, showingIndex } = useGameStore()
  const currentNumber = sequence[showingIndex]

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl border-4 border-gray-800 animate-fadeIn">
        <span className="text-white text-8xl font-bold">
          {currentNumber}
        </span>
      </div>
    </div>
  )
}