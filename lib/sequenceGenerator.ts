interface SequenceResult {
  shown: number[]
  remember: number[]
}

export function generateSequence(level: number): SequenceResult {
  console.log('[SequenceGenerator] Generating sequence for level:', level)
  
  // For a proper memory game, we need more numbers shown than to remember
  // Show approximately 1.5x to 2x the target count
  const targetRememberCount = level
  const totalNumbers = Math.floor(targetRememberCount * 1.5)
  
  const shown: number[] = []
  const remember: number[] = []
  
  // Generate a diverse sequence of random numbers (1-9, no zeros)
  for (let i = 0; i < totalNumbers; i++) {
    if (i === 0) {
      // First number: random 1-9 (no zero)
      const firstNum = Math.floor(Math.random() * 9) + 1
      shown.push(firstNum)
      remember.push(firstNum) // ALWAYS remember the first number
    } else {
      // Generate a random number 1-9, ensuring it's different from the previous
      let newNum: number

      // NEVER allow zero or the same number as the previous one
      do {
        newNum = Math.floor(Math.random() * 9) + 1
      } while (newNum === shown[shown.length - 1])
      
      shown.push(newNum)
      
      // Check if this number is greater than the previous one
      if (newNum > shown[i - 1]) {
        remember.push(newNum)
      }
    }
  }
  
  // If we have too many numbers to remember, we need to regenerate
  // This ensures the difficulty is appropriate
  if (remember.length !== targetRememberCount) {
    console.log('[SequenceGenerator] Incorrect number to remember, regenerating...')
    return generateSequence(level)
  }

  
  console.log('[SequenceGenerator] Generated sequence:', shown)
  console.log('[SequenceGenerator] Numbers to remember:', remember)
  console.log('[SequenceGenerator] Total shown:', shown.length, 'To remember:', remember.length)
  
  return { shown, remember }
}

export function formatUserAnswer(digits: string): string {
  return digits.split('').join('-')
}

export function formatCorrectAnswer(numbers: number[]): string {
  return numbers.join('-')
}

export function calculateTimeLimit(level: number): number {
  const baseTime = 5
  const additionalTimePerNumber = 2
  return baseTime + (level - 4) * additionalTimePerNumber
}