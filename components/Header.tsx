'use client'

import { useGameStore } from '@/store/gameStore'

export function Header() {
  const { currentLevel, currentTrial, gameState } = useGameStore()
  const totalTrialNumber = (currentLevel - 4) * 3 + currentTrial

  const handleExit = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <header className="bg-[#2D3748] h-16 flex items-center justify-between px-6 border-b-4 border-blue-600">
      <div className="flex items-center gap-4">
        <h1 className="text-white text-xl font-bold tracking-wider">DIGIT SPAN TEST</h1>
      </div>
      
      {gameState !== 'idle' && (
        <div className="flex items-center gap-6">
          <span className="text-white text-lg">
            Practice {totalTrialNumber} of 21
          </span>
          <button
            onClick={handleExit}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            Exit →
          </button>
        </div>
      )}
    </header>
  )
}