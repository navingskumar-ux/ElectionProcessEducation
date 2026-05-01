"use client"

import { useAppStore } from '@/lib/store'
import { Onboarding } from '@/components/Onboarding'
import { Dashboard } from '@/components/Dashboard'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { hasCompletedOnboarding } = useAppStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      {/* Loading state for hydration */}
      <div className="animate-pulse w-16 h-16 rounded-full bg-indigo-200 dark:bg-indigo-800"></div>
    </div>
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding />
  }

  return <Dashboard />
}
