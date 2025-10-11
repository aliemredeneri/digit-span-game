'use client'

import { useEffect, useRef } from 'react'
import { useGameStore } from '@/store/gameStore'
import { generateSequence, calculateTimeLimit } from '@/lib/sequenceGenerator'
import { Header } from '@/components/Header'
import { StartScreen } from '@/components/StartScreenOptimized'
import { Countdown } from '@/components/CountdownOptimized'
import { NumberDisplay } from '@/components/NumberDisplayOptimized'
import { InputPanel } from '@/components/InputPanelOptimized'
import { ResultScreen } from '@/components/ResultScreenOptimized'

export default function Home() {
  const { 
    gameState, 
    currentLevel,
    sequence,

    showingIndex,
    setGameState,
    setSequence,
    setShowingIndex,
    incrementShowingIndex,
    setTimeRemaining
  } = useGameStore()

  const hasGeneratedSequence = useRef(false)

  useEffect(() => {
    if (gameState === 'countdown' && !hasGeneratedSequence.current) {
      const { shown, remember } = generateSequence(currentLevel)
      setSequence(shown, remember)
      setShowingIndex(0)
      hasGeneratedSequence.current = true
    } else if (gameState !== 'countdown') {
      hasGeneratedSequence.current = false
    }
  }, [gameState, currentLevel, setSequence, setShowingIndex])

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    if (gameState === 'showing') {
      if (showingIndex >= sequence.length) {
        const timeLimit = calculateTimeLimit(currentLevel)
        setTimeRemaining(timeLimit)
        setGameState('input')
        return
      }

      timer = setTimeout(() => {
        incrementShowingIndex()
      }, 1000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [gameState, showingIndex, sequence.length, currentLevel, incrementShowingIndex, setGameState, setTimeRemaining])

  const handleCountdownComplete = () => {
    setGameState('showing')
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-hidden">
        {gameState === 'idle' && <StartScreen />}
        {gameState === 'countdown' && <Countdown onComplete={handleCountdownComplete} />}
        {gameState === 'showing' && <NumberDisplay />}
        {gameState === 'input' && <InputPanel />}
        {gameState === 'result' && <ResultScreen />}
      </main>
    </div>
  )
}