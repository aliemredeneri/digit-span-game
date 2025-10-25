'use client'

import { useGameStore } from '@/store/gameStore'
import { formatUserAnswer, formatCorrectAnswer } from '@/lib/sequenceGenerator'
import { useEffect, useRef } from 'react'

export function ResultScreen() {
  const {
    userInput,
    toRemember,
    currentTrial,
    currentLevel,
    incrementTrial,
    incrementScore,
    nextLevel,
    setGameState,
    setUserInput
  } = useGameStore()

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const userAnswer = formatUserAnswer(userInput)
  const correctAnswer = formatCorrectAnswer(toRemember)
  const isCorrect = userInput === toRemember.map(n => n.toString()).join('')
  
  // Calculate total trial number across all levels
  const totalTrialNumber = (currentLevel - 4) * 3 + currentTrial
  const totalTrials = 21 // 7 levels * 3 trials each

  useEffect(() => {
    let mounted = true;
    
    if (isCorrect) {
      incrementScore()
    }

    timerRef.current = setTimeout(() => {
      if (!mounted) return;
      
      setUserInput('')
      
      if (currentTrial >= 3) {
        // Completed 3 trials for this level
        if (currentLevel < 10) {
          // Move to next level
          nextLevel()
          setGameState('countdown')
        } else {
          // Completed all levels
          setGameState('idle')
        }
      } else {
        // Continue with next trial in same level
        incrementTrial()
        setGameState('countdown')
      }
    }, 3000)

    return () => {
      mounted = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
    // Run only once when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="bg-white rounded-lg shadow-xl p-12 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Trial {totalTrialNumber} of {totalTrials}
          </h2>
          <p className="text-gray-600">
            Level {currentLevel} - Trial {currentTrial}/3 - Remember {currentLevel} numbers
          </p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-2">Your answer:</p>
            <p className={`text-3xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {userAnswer || '-'}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-700 mb-2">Correct answer:</p>
            <p className="text-3xl font-bold text-gray-800">
              {correctAnswer}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center scale-0 animate-scaleIn">
          {isCorrect ? (
            <p className="text-2xl font-bold text-green-600">Correct! ✓</p>
          ) : (
            <p className="text-2xl font-bold text-red-600">Incorrect ✗</p>
          )}
        </div>
      </div>
    </div>
  )
}