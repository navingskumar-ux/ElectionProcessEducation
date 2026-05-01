"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuizQuestion } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react'

interface QuizProps {
  questions: QuizQuestion[]
}

export function Quiz({ questions }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return
    setSelectedOption(index)
    setIsAnswered(true)

    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setShowResults(false)
  }

  if (showResults) {
    return (
      <Card className="max-w-2xl mx-auto shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mt-4">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-8 space-y-6">
          <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center bg-primary/10">
            <span className="text-4xl font-bold text-primary">
              {score}/{questions.length}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
            {score === questions.length 
              ? "Perfect score! You have a great understanding of the election process."
              : "Good job! Review the modules to learn more and try again."}
          </p>
          <Button onClick={resetQuiz} className="gap-2 bg-primary hover:bg-primary/90 text-white px-8">
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-sm font-medium text-slate-500">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-lg border-slate-100 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx
                const isCorrect = idx === currentQuestion.correctAnswer
                const showCorrect = isAnswered && isCorrect
                const showWrong = isAnswered && isSelected && !isCorrect

                let buttonClass = "w-full justify-start h-auto p-4 text-left font-normal border-2 "
                
                if (showCorrect) {
                  buttonClass += "border-green-500 bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:text-green-300"
                } else if (showWrong) {
                  buttonClass += "border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                } else if (isSelected) {
                  buttonClass += "border-primary bg-primary/10 text-primary"
                } else {
                  buttonClass += "border-slate-800 hover:border-primary/50 text-slate-300 hover:bg-primary/5"
                }

                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center justify-between w-full gap-4">
                      <span className="flex-1 whitespace-normal">{option}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                      {showWrong && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                    </div>
                  </Button>
                )
              })}

              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800"
                  >
                    <h4 className="font-semibold text-white mb-2">Explanation</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            {isAnswered && (
              <CardFooter className="bg-slate-900/50 border-t border-slate-800 justify-end rounded-b-xl py-4">
                <Button onClick={handleNext} className="gap-2 bg-primary hover:bg-primary/90 text-white">
                  {currentIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
