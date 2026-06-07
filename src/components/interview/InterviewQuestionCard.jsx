import { useState } from 'react'
import { ChevronDown, Bookmark, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InterviewQuestionCard({
  question,
  isPracticed,
  isSaved,
  onPractice,
  onSave,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const difficultyColor = {
    Easy: 'text-green-400 bg-green-400/10',
    Medium: 'text-yellow-400 bg-yellow-400/10',
    Hard: 'text-red-400 bg-red-400/10',
  }

  return (
    <motion.div
      layout
      className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur hover:border-cyan-400/30 transition-all duration-200"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-start gap-4">
          <ChevronDown
            className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-1 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-100 leading-tight mb-2">
              {question.question}
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded ${difficultyColor[question.difficulty]}`}>
                {question.difficulty}
              </span>
              <span className="text-xs text-slate-400 bg-slate-700/30 px-2 py-1 rounded">
                {question.category.join(', ')}
              </span>
              {question.faqnFrequency && (
                <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                  FAANG: {question.faqnFrequency}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {isPracticed && <Check className="w-5 h-5 text-green-400" />}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSave(question.id)
              }}
              className={`p-2 rounded-lg transition-all ${
                isSaved
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
              }`}
            >
              <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-700/30 bg-slate-900/30"
          >
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Model Answer</h4>
                <p className="text-slate-300 leading-relaxed text-sm">{question.answer}</p>
              </div>

              {question.followUps && question.followUps.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Interviewer Follow-ups</h4>
                  <ul className="space-y-2">
                    {question.followUps.map((followUp, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex gap-2">
                        <span className="text-cyan-400 flex-shrink-0">→</span>
                        <span>{followUp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {question.keyPoints && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Points</h4>
                  <ul className="space-y-1">
                    {question.keyPoints.map((point, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex gap-2">
                        <span className="text-green-400">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-3 border-t border-slate-700/30 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onPractice(question.id)
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    isPracticed
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30'
                  }`}
                >
                  {isPracticed ? '✓ Practiced' : 'Mark as Practiced'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
