"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Region, useAppStore } from '@/lib/store'
import { Globe } from 'lucide-react'
import { useState } from 'react'

export function Onboarding() {
  const { setRegion, completeOnboarding } = useAppStore()
  const [selectedRegion, setSelectedRegion] = useState<Region>('India')

  const handleContinue = () => {
    if (selectedRegion) {
      setRegion(selectedRegion)
      completeOnboarding()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl bg-slate-900/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4 pt-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto bg-primary/20 p-4 rounded-full w-20 h-20 flex items-center justify-center"
            >
              <Globe className="w-10 h-10 text-primary" />
            </motion.div>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Welcome to the Election Guide
            </CardTitle>
            <CardDescription className="text-base text-slate-400">
              Your personalized journey into understanding the democratic process.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Select your region
              </label>
              <Select value={selectedRegion || ''} onValueChange={(value) => setSelectedRegion(value as Region)}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="USA" disabled>United States (Coming Soon)</SelectItem>
                  <SelectItem value="UK" disabled>United Kingdom (Coming Soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all" 
              onClick={handleContinue}
              disabled={!selectedRegion}
            >
              Start Learning
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
