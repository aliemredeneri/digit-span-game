'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { formatUserAnswer, formatCorrectAnswer } from '@/lib/sequenceGenerator'
import { useEffect } from 'react'

export function ResultScreen() {
  const { 
    userInput, 
    toRemember, 
    currentTrial,
    currentLevel,
    incrementTrial,
    incrementScore,
    nextLevel,
    resetTrials,
    setGameState,
    setUserInput
  } = useGameStore()

  const userAnswer = formatUserAnswer(userInput)
  const correctAnswer = formatCorrectAnswer(toRemember)
  const isCorrect = userInput === toRemember.map(n => n.toString()).join('')

  useEffect(() => {
    if (isCorrect) {
      incrementScore()
    }

    const timer = setTimeout(() => {
      if (currentTrial >= 3) {
        if (currentLevel < 10) {
          nextLevel()
          resetTrials()
        } else {
          setGameState('idle')
        }
      } else {
        incrementTrial()
      }
      
      setUserInput('')
      setGameState('countdown')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="bg-white rounded-lg shadow-xl p-12 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Practice {currentTrial} of 35
          </h2>
          <p className="text-gray-600">Level {currentLevel} - Remember {currentLevel} numbers</p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-2">Your answer is :</p>
            <p className={`text-3xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {userAnswer || '-'}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-700 mb-2">Correct answer is :</p>
            <p className="text-3xl font-bold text-gray-800">
              {correctAnswer}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          {isCorrect ? (
            <p className="text-2xl font-bold text-green-600">Correct! ✓</p>
          ) : (
            <p className="text-2xl font-bold text-red-600">Incorrect ✗</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}