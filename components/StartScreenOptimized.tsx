'use client'

import { useGameStore } from '@/store/gameStore'

export function StartScreen() {
  const { setGameState } = useGameStore()

  const handleStart = () => {
    setGameState('countdown')
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="text-center max-w-2xl opacity-0 animate-fadeIn">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          Digit Span Memory Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">How to Play</h2>
          <ul className="text-left text-gray-600 space-y-3">
            <li>• Numbers will appear one at a time for 1 second each</li>
            <li>• Remember the FIRST number shown</li>
            <li>• Remember any number that is LARGER than the previous one</li>
            <li>• Enter all remembered numbers in the order shown</li>
            <li>• Example: 4-8-2-5 → Remember: 4-8-5</li>
            <li>• Complete 3 trials per level (4 to 10 numbers)</li>
          </ul>
        </div>

        <button
          onClick={handleStart}
          className="bg-blue-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-150 shadow-lg"
        >
          Start Test
        </button>
      </div>
    </div>
  )
}