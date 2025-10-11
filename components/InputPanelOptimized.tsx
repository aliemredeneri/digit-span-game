'use client'

import { X } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'
import { useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

export function InputPanel() {
  const { 
    userInput, 
    toRemember, 
    timeRemaining, 
    addDigit, 
    removeLastDigit,
    setGameState,
    decrementTime 
  } = useGameStore()

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeRemaining <= 0) {
      setGameState('result')
      return
    }

    intervalRef.current = setInterval(() => {
      decrementTime()
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null;
      }
    }
  }, [timeRemaining, decrementTime, setGameState])

  useEffect(() => {
    if (userInput.length === toRemember.length && userInput.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setGameState('result')
      }, 500)
      
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null;
        }
      }
    }
  }, [userInput.length, toRemember.length, setGameState])

  const handleDigitClick = useCallback((digit: string) => {
    if (userInput.length < toRemember.length) {
      addDigit(digit)
    }
  }, [userInput.length, toRemember.length, addDigit])

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const inputArray = userInput.split('')
  const maxDigits = toRemember.length

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="mb-8">
        <div className="text-center mb-4">
          <span className="text-gray-600 text-lg">Time: {timeRemaining}s</span>
        </div>
        
        <div 
          className="bg-gray-100 rounded-lg p-4 mb-6 h-16 flex items-center justify-center"
          style={{ minWidth: '400px' }}
        >
          <div className="flex gap-2">
            {Array.from({ length: maxDigits }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-12 h-12 border-b-2 flex items-center justify-center text-2xl font-bold",
                  index < inputArray.length ? "border-blue-600 text-gray-800" : "border-gray-400"
                )}
              >
                {inputArray[index] || ''}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        {digits.slice(0, 9).map((digit) => (
          <button
            key={digit}
            onClick={() => handleDigitClick(digit)}
            className="w-24 h-24 bg-white border-2 border-gray-300 rounded-lg text-3xl font-semibold hover:bg-gray-50 active:scale-95 transition-all duration-75 shadow-md"
            disabled={userInput.length >= toRemember.length}
          >
            {digit}
          </button>
        ))}
        
        <div className="col-start-2">
          <button
            onClick={() => handleDigitClick('0')}
            className="w-24 h-24 bg-white border-2 border-gray-300 rounded-lg text-3xl font-semibold hover:bg-gray-50 active:scale-95 transition-all duration-75 shadow-md"
            disabled={userInput.length >= toRemember.length}
          >
            0
          </button>
        </div>
        
        <button
          onClick={removeLastDigit}
          className="w-24 h-24 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all duration-75 shadow-md"
          disabled={userInput.length === 0}
        >
          <X className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}