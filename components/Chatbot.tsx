"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, Send, X, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am your Election Guide Assistant. Ask me anything about the election process!' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    const newMessages = [...messages, { role: 'user' as const, content: text }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error answering your question. Please make sure the Gemini API key is configured.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const quickActions = ["Explain like I'm 10", "Summarize MCC", "Real-world example"]

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button 
              size="icon" 
              className="w-14 h-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-white border-2 border-primary/50"
              onClick={() => setIsOpen(true)}
            >
              <Bot className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[360px] md:max-w-[400px]"
          >
            <Card className="shadow-2xl border-primary/20 overflow-hidden flex flex-col h-[500px] bg-slate-950/95 backdrop-blur-xl">
              <CardHeader className="bg-primary text-white p-4 flex flex-row items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 -mr-2" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 p-0 overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-950">
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                          msg.role === 'user' 
                            ? 'bg-primary text-white rounded-tr-sm' 
                            : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm shadow-sm'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="px-4 py-3 flex flex-wrap gap-2 bg-slate-900/50 border-t border-slate-800 backdrop-blur-md">
                  {quickActions.map(action => (
                    <button
                      key={action}
                      onClick={() => handleSend(action)}
                      className="text-xs px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-3 bg-slate-900 border-t border-slate-800">
                <form 
                  className="flex w-full items-center space-x-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend(input)
                  }}
                >
                  <Input 
                    placeholder="Ask a question..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-slate-950 border-slate-800 focus-visible:ring-primary text-white"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="bg-primary hover:bg-primary/90 text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
