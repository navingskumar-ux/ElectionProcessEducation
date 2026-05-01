"use client"

import { TimelineStep } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserCheck, IdCard, MapPin, Box, AlertTriangle, ArrowRight } from 'lucide-react'

interface VotingWalkthroughProps {
  steps: TimelineStep[]
}

const iconMap: Record<string, React.ElementType> = {
  'user-check': UserCheck,
  'id-card': IdCard,
  'map-pin': MapPin,
  box: Box,
}

export function VotingWalkthrough({ steps }: VotingWalkthroughProps) {
  return (
    <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
      {steps.map((step, index) => {
        const Icon = iconMap[step.icon] || UserCheck
        const isEven = index % 2 === 0
        
        return (
          <div key={step.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
            {/* Timeline dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-950 bg-primary/20 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
              <span className="font-bold text-sm">{index + 1}</span>
            </div>
            
            <Card className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] relative overflow-hidden group-hover:shadow-xl transition-all duration-300 border-slate-800/60 bg-slate-950/60 backdrop-blur-xl ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary/50 to-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              
              <CardHeader className="flex flex-row items-start gap-4 pb-3">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-sm border border-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 pt-1">
                  <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-transparent hover:bg-slate-700 font-medium">Step {index + 1}</Badge>
                  <CardTitle className="text-lg md:text-xl font-bold leading-tight text-white">{step.title.replace(/^\d+\.\s*/, '')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
                
                <div className="p-4 bg-amber-50/80 dark:bg-amber-950/20 rounded-xl border border-amber-200/50 dark:border-amber-900/50 flex gap-3 shadow-inner">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
                    {step.details}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
