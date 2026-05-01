import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Region = 'India' | 'USA' | 'UK' | null

interface AppState {
  region: Region
  hasCompletedOnboarding: boolean
  setRegion: (region: Region) => void
  completeOnboarding: () => void
  resetApp: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      region: null,
      hasCompletedOnboarding: false,
      setRegion: (region) => set({ region }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetApp: () => set({ region: null, hasCompletedOnboarding: false }),
    }),
    {
      name: 'election-app-storage',
    }
  )
)
