'use client'

import { useEffect, useState, useRef } from 'react'

interface CountdownProps {
  onComplete: () => void
}

export function Countdown({ onComplete }: CountdownProps) {
  const [count, setCount] = useState(3)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    if (count === 0 && !hasCompletedRef.current) {
      hasCompletedRef.current = true
      onComplete()
      return
    }

    if (count > 0) {
      timerRef.current = setTimeout(() => {
        setCount(prev => prev - 1)
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [count, onComplete])

  return (
    <div className="flex items-center justify-center h-full">
      {count > 0 && (
        <div className="text-9xl font-bold text-blue-600 animate-pulse">
          {count}
        </div>
      )}
    </div>
  )
}