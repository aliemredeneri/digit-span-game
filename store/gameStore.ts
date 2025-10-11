import { create } from 'zustand'

export type GameState = 'idle' | 'countdown' | 'showing' | 'input' | 'result'

interface GameStore {
  gameState: GameState
  currentLevel: number
  sequence: number[]
  toRemember: number[]
  userInput: string
  trialCount: number
  currentTrial: number
  score: number
  showingIndex: number
  timeRemaining: number
  
  setGameState: (state: GameState) => void
  setCurrentLevel: (level: number) => void
  setSequence: (sequence: number[], toRemember: number[]) => void
  setUserInput: (input: string) => void
  addDigit: (digit: string) => void
  removeLastDigit: () => void
  incrementTrial: () => void
  resetTrials: () => void
  incrementScore: () => void
  resetScore: () => void
  setShowingIndex: (index: number) => void
  incrementShowingIndex: () => void
  setTimeRemaining: (time: number) => void
  decrementTime: () => void
  resetGame: () => void
  nextLevel: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: 'idle',
  currentLevel: 4,
  sequence: [],
  toRemember: [],
  userInput: '',
  trialCount: 0,
  currentTrial: 1,
  score: 0,
  showingIndex: 0,
  timeRemaining: 0,
  
  setGameState: (state) => set({ gameState: state }),
  setCurrentLevel: (level) => set({ currentLevel: level }),
  setSequence: (sequence, toRemember) => set({ sequence, toRemember }),
  setUserInput: (input) => set({ userInput: input }),
  addDigit: (digit) => set((state) => ({ 
    userInput: state.userInput.length < state.toRemember.length 
      ? state.userInput + digit 
      : state.userInput 
  })),
  removeLastDigit: () => set((state) => ({ 
    userInput: state.userInput.slice(0, -1) 
  })),
  incrementTrial: () => set((state) => ({ 
    currentTrial: state.currentTrial + 1,
    trialCount: state.trialCount + 1 
  })),
  resetTrials: () => set({ currentTrial: 1 }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  resetScore: () => set({ score: 0 }),
  setShowingIndex: (index) => set({ showingIndex: index }),
  incrementShowingIndex: () => set((state) => ({ 
    showingIndex: state.showingIndex + 1 
  })),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  decrementTime: () => set((state) => ({ 
    timeRemaining: Math.max(0, state.timeRemaining - 1) 
  })),
  resetGame: () => set({
    gameState: 'idle',
    currentLevel: 4,
    sequence: [],
    toRemember: [],
    userInput: '',
    trialCount: 0,
    currentTrial: 1,
    score: 0,
    showingIndex: 0,
    timeRemaining: 0,
  }),
  nextLevel: () => set((state) => ({
    currentLevel: Math.min(10, state.currentLevel + 1),
    currentTrial: 1,
    userInput: '',
    sequence: [],
    toRemember: [],
  })),
}))