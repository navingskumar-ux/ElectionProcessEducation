"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { TimelineStep } from '@/lib/data'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronUp, MessageSquare, Megaphone, FileText, Users, CheckSquare, BarChart2, MapPin } from 'lucide-react'

interface TimelineProps {
  steps: TimelineStep[]
}

const iconMap: Record<string, React.ElementType> = {
  megaphone: Megaphone,
  'file-text': FileText,
  users: Users,
  'check-square': CheckSquare,
  'bar-chart-2': BarChart2,
  'map-pin': MapPin,
}

export function Timeline({ steps }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 space-y-8">
      {steps.map((step, index) => {
        const Icon = iconMap[step.icon] || FileText
        const isExpanded = expandedId === step.id

        return (
          <div key={step.id} className="relative pl-8 md:pl-12 group">
            {/* Timeline Node */}
            <div className={`absolute -left-[17px] top-4 border-2 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-colors duration-300 ${isExpanded ? 'bg-primary border-primary/30' : 'bg-slate-950 border-primary'}`}>
              <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isExpanded ? 'bg-white' : 'bg-primary'}`} />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, ease: 'easeOut' }}
            >
              <Card 
                className={`overflow-hidden transition-all duration-300 bg-slate-950/70 backdrop-blur-md border border-white/10 ${
                  isExpanded ? 'ring-2 ring-primary shadow-xl scale-[1.02]' : 'hover:shadow-lg hover:border-primary/50'
                }`}
              >
                <div 
                  className="p-5 cursor-pointer flex items-start gap-4 relative overflow-hidden"
                  onClick={() => setExpandedId(isExpanded ? null : step.id)}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} />
                  
                  <div className={`p-3 rounded-2xl transition-colors duration-300 ${isExpanded ? 'bg-primary text-white shadow-md' : 'bg-primary/10 text-primary'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] uppercase tracking-wider font-semibold">
                        Phase {index + 1}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight">{step.title}</h3>
                    <p className="text-slate-400 mt-2 text-sm md:text-base">{step.description}</p>
                  </div>
                  <div className={`pt-2 transition-transform duration-300 ${isExpanded ? 'text-primary' : 'text-slate-500'}`}>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="px-5 pb-5 pt-0 border-t border-slate-800/50 relative">
                        <div className="absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50" />
                        <div className="mt-5 p-5 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 shadow-inner">
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                            {step.details}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="secondary" size="sm" className="gap-2 text-primary bg-primary/10 hover:bg-primary/20">
                            <MessageSquare className="w-4 h-4" />
                            Explain Simply
                          </Button>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
