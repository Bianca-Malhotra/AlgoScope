import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RapidFireSection({ topic, questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isRunning, setIsRunning] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const topicQuestions = questions.slice(0, 10)
  const question = topicQuestions[currentQuestion]

  // Timer
  useEffect(() => {
    let interval
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    } else if (timeLeft === 0 && isRunning) {
      handleTimeUp()
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const handleTimeUp = () => {
    setIsRunning(false)
    setShowAnswer(true)
  }

  const handleCorrect = () => {
    setScore({ correct: score.correct + 1, total: score.total + 1 })
    handleNext()
  }

  const handleIncorrect = () => {
    setScore({ correct: score.correct, total: score.total + 1 })
    handleNext()
  }

  const handleNext = () => {
    if (currentQuestion < topicQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(30)
      setIsRunning(true)
      setShowAnswer(false)
    } else {
      setIsRunning(false)
    }
  }

  const handleStart = () => {
    setTimeLeft(30)
    setIsRunning(true)
    setShowAnswer(false)
    setScore({ correct: 0, total: 0 })
    setCurrentQuestion(0)
  }

  const handleReset = () => {
    setTimeLeft(30)
    setIsRunning(false)
    setShowAnswer(false)
    setScore({ correct: 0, total: 0 })
    setCurrentQuestion(0)
  }

  if (score.total === topicQuestions.length && !isRunning) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-12 text-center backdrop-blur"
        >
          <h2 className="text-4xl font-bold text-slate-100 mb-4">Round Complete!</h2>

          <div className="mb-8">
            <p className="text-6xl font-bold text-cyan-400 mb-2">
              {Math.round((score.correct / score.total) * 100)}%
            </p>
            <p className="text-xl text-slate-300">
              {score.correct} out of {score.total} correct
            </p>
          </div>

          <div className="space-y-2 mb-8">
            <p className="text-slate-400">
              {score.correct === score.total && '🎉 Perfect score!'}
              {score.correct >= 7 && score.correct < score.total && '👍 Great job!'}
              {score.correct < 7 && '💪 Keep practicing!'}
            </p>
          </div>

          <button
            onClick={handleStart}
            className="px-8 py-4 bg-cyan-500/20 border border-cyan-400/30 rounded-lg font-bold text-cyan-300 hover:bg-cyan-500/30 transition-all text-lg"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Timer & Score */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center backdrop-blur">
          <p className="text-sm text-slate-400 mb-1">Time Left</p>
          <p className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-cyan-400'}`}>
            {timeLeft}s
          </p>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center backdrop-blur">
          <p className="text-sm text-slate-400 mb-1">Progress</p>
          <p className="text-2xl font-bold text-slate-100">
            {currentQuestion + 1}/{topicQuestions.length}
          </p>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center backdrop-blur">
          <p className="text-sm text-slate-400 mb-1">Correct</p>
          <p className="text-2xl font-bold text-green-400">{score.correct}</p>
        </div>
      </div>

      {/* Question */}
      {!isRunning && score.total === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-12 text-center backdrop-blur"
        >
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Rapid Fire Round - {topic}</h2>
          <p className="text-slate-400 mb-8 text-lg">
            You have 30 seconds per question. Can you answer {topicQuestions.length} questions?
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-cyan-500/20 border border-cyan-400/30 rounded-lg font-bold text-cyan-300 hover:bg-cyan-500/30 transition-all text-lg"
          >
            Start Challenge
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 backdrop-blur"
          >
            <h3 className="text-2xl font-bold text-slate-100 mb-6">{question.question}</h3>

            {!showAnswer ? (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">⏱️ Answer before time runs out!</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6"
              >
                <p className="text-green-300 font-semibold mb-2">Answer</p>
                <p className="text-slate-200">{question.answer}</p>
              </motion.div>
            )}

            {showAnswer && (
              <div className="flex gap-3">
                <button
                  onClick={handleIncorrect}
                  className="flex-1 px-4 py-3 bg-red-500/20 border border-red-400/30 rounded-lg font-bold text-red-300 hover:bg-red-500/30 transition-all"
                >
                  ✗ Didn't Know
                </button>
                <button
                  onClick={handleCorrect}
                  className="flex-1 px-4 py-3 bg-green-500/20 border border-green-400/30 rounded-lg font-bold text-green-300 hover:bg-green-500/30 transition-all"
                >
                  ✓ Got It Right
                </button>
              </div>
            )}

            {!showAnswer && isRunning && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleTimeUp}
                  className="flex-1 px-4 py-3 bg-orange-500/20 border border-orange-400/30 rounded-lg font-bold text-orange-300 hover:bg-orange-500/30 transition-all"
                >
                  Show Answer
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Reset Button */}
      {score.total > 0 && !isRunning && score.total < topicQuestions.length && (
        <button
          onClick={handleReset}
          className="w-full px-4 py-3 bg-slate-700/50 rounded-lg font-semibold text-slate-300 hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      )}
    </div>
  )
}
