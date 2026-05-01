"use client"

import { useAppStore } from '@/lib/store'
import { electionData } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { LogOut, BookOpen, Navigation, Map } from 'lucide-react'
import { Timeline } from './Timeline'
import { VotingWalkthrough } from './VotingWalkthrough'
import { Quiz } from './Quiz'
import { Chatbot } from './Chatbot'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Dashboard() {
  const { region, resetApp } = useAppStore()
  
  if (!region || !electionData[region]) {
    return null
  }

  const data = electionData[region]

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <header className="relative w-full py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-slate-900 flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full opacity-50" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase mb-2">
            Election Guide
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
            {data.region} Elections <span className="text-primary">Simplified</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {data.introText}
          </p>
          <div className="pt-6">
            <Button variant="outline" onClick={resetApp} className="rounded-full px-6 border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
              <LogOut className="w-4 h-4 mr-2" />
              Change Region
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 md:mt-12">
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="flex w-full overflow-x-auto justify-start md:justify-center bg-transparent border-b border-border rounded-none pb-px mb-12 hide-scrollbar">
            <TabsTrigger value="timeline" className="text-sm md:text-lg font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent transition-all">
              <Map className="w-5 h-5 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="walkthrough" className="text-sm md:text-lg font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent transition-all">
              <Navigation className="w-5 h-5 mr-2" />
              How to Vote
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-sm md:text-lg font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent transition-all">
              <BookOpen className="w-5 h-5 mr-2" />
              Quiz
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-10 text-center text-white">The Election Timeline</h2>
            <Timeline steps={data.timeline} />
          </TabsContent>

          <TabsContent value="walkthrough" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-10 text-center text-white">Your Voting Journey</h2>
            <VotingWalkthrough steps={data.votingSteps} />
          </TabsContent>

          <TabsContent value="quiz" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-10 text-center text-white">Knowledge Check</h2>
            <Quiz questions={data.quiz || []} />
          </TabsContent>
        </Tabs>
      </main>

      <Chatbot />
    </div>
  )
}
