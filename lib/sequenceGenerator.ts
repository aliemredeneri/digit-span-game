interface SequenceResult {
  shown: number[]
  remember: number[]
}

export function generateSequence(level: number): SequenceResult {
  console.log('[SequenceGenerator] Generating sequence for level:', level)
  
  // For a proper memory game, we need more numbers shown than to remember
  // Show approximately 1.5x to 2x the target count
  const targetRememberCount = level
  const minTotalNumbers = Math.max(targetRememberCount + 2, Math.floor(targetRememberCount * 1.5))
  const maxTotalNumbers = Math.floor(targetRememberCount * 2)
  const totalNumbers = Math.floor(Math.random() * (maxTotalNumbers - minTotalNumbers + 1)) + minTotalNumbers
  
  const shown: number[] = []
  const remember: number[] = []
  
  // Generate a diverse sequence of random numbers
  for (let i = 0; i < totalNumbers; i++) {
    if (i === 0) {
      // First number: random 0-9
      const firstNum = Math.floor(Math.random() * 10)
      shown.push(firstNum)
      remember.push(firstNum) // ALWAYS remember the first number
    } else {
      // Generate a random number 0-9, ensuring it's different from the previous
      let newNum: number
      
      // NEVER allow the same number as the previous one
      do {
        newNum = Math.floor(Math.random() * 10)
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
  if (remember.length > targetRememberCount + 1) {
    console.log('[SequenceGenerator] Too many to remember, regenerating...')
    return generateSequence(level)
  }
  
  // If we have too few numbers to remember, add some more
  while (remember.length < targetRememberCount) {
    const lastNum = shown[shown.length - 1]
    // Add a number that's definitely larger and different
    let newNum: number
    if (lastNum < 9) {
      newNum = lastNum + Math.floor(Math.random() * (9 - lastNum)) + 1
    } else {
      // If last number is 9, add a smaller number then a larger one
      const smallNum = Math.floor(Math.random() * 5)
      shown.push(smallNum)
      newNum = smallNum + Math.floor(Math.random() * (9 - smallNum)) + 1
    }
    shown.push(newNum)
    remember.push(newNum)
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
  const baseTime = 8
  const additionalTimePerNumber = 2
  return baseTime + (level - 4) * additionalTimePerNumber
}