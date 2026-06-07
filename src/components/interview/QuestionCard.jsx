import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bookmark, CheckCircle, HelpCircle, BookOpen, Clock, 
  ChevronDown, ChevronUp, Play, Pause, RotateCcw, AlertTriangle 
} from 'lucide-react';

export default function QuestionCard({
  question,
  isSolved,
  isBookmarked,
  onToggleSolve,
  onToggleBookmark
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeHintIndex, setActiveHintIndex] = useState(-1);
  const [showApproach, setShowApproach] = useState(false);

  // Timer State
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  // Parse expected time like "30 mins" into seconds
  const parseExpectedTime = (timeStr) => {
    if (!timeStr) return 1800; // 30 mins default
    const num = parseInt(timeStr.replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 1800 : num * 60;
  };

  useEffect(() => {
    setTimeLeft(parseExpectedTime(question.expectedTime));
  }, [question.expectedTime]);

  // Handle count down timer
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  const toggleTimer = (e) => {
    e.stopPropagation();
    setTimerRunning(!timerRunning);
  };

  const resetTimer = (e) => {
    e.stopPropagation();
    setTimerRunning(false);
    setTimeLeft(parseExpectedTime(question.expectedTime));
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const difficultyColors = {
    Easy: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
    Medium: 'text-amber-400 bg-amber-500/10 border border-amber-500/20',
    Hard: 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
  };

  const frequencyColors = {
    Low: 'text-slate-400 bg-slate-500/5',
    Medium: 'text-sky-400 bg-sky-500/10 border border-sky-500/20',
    High: 'text-violet-400 bg-violet-500/10 border border-violet-500/20',
    'Very High': 'text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20'
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className={`bg-slate-900/40 border rounded-2xl overflow-hidden backdrop-blur hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 ${
        isExpanded ? 'border-cyan-500/40' : 'border-slate-800'
      }`}
    >
      {/* Clickable Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/20 transition-colors"
      >
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>
            <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/50">
              {question.category}
            </span>
            {question.frequency && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${frequencyColors[question.frequency]}`}>
                {question.frequency} Freq
              </span>
            )}
          </div>

          <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            {question.title}
            {isSolved && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
          </h4>

          {/* Company tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {question.companyTags.slice(0, 5).map((comp) => (
              <span key={comp} className="text-[10px] text-cyan-300/90 bg-cyan-950/35 border border-cyan-800/30 px-2 py-0.5 rounded">
                {comp}
              </span>
            ))}
            {question.companyTags.length > 5 && (
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                +{question.companyTags.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3 self-end md:self-center" onClick={(e) => e.stopPropagation()}>
          {/* Expected time & Inline Timer */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className={`text-xs font-mono font-bold ${timeLeft === 0 ? 'text-rose-400' : 'text-slate-300'}`}>
              {formatTime(timeLeft)}
            </span>
            <button
              onClick={toggleTimer}
              className={`p-1 rounded hover:bg-slate-800 text-xs transition-colors ${
                timerRunning ? 'text-amber-400' : 'text-cyan-400'
              }`}
              title={timerRunning ? 'Pause Timer' : 'Start Timer'}
            >
              {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(question.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isBookmarked
                ? 'text-amber-400 bg-amber-400/10 border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700 bg-slate-900/20'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Mark Solved Checkbox */}
          <button
            onClick={() => onToggleSolve(question.id)}
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
              isSolved
                ? 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700 bg-slate-900/20'
            }`}
            title={isSolved ? 'Mark Unsolved' : 'Mark Solved'}
          >
            <CheckCircle className="w-4 h-4" />
          </button>

          {/* Expand Arrow */}
          <div className="text-slate-400 p-2">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Expandable Panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-800 bg-slate-900/20"
          >
            <div className="p-6 space-y-6">
              {/* Timer Warning if expired */}
              {timeLeft === 0 && (
                <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-rose-300 text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Time target reached! Review the solution approach below and wrap up your practice.</span>
                </div>
              )}

              {/* Hints Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    Hints ({question.hints.length})
                  </h5>
                  {activeHintIndex < question.hints.length - 1 && (
                    <button
                      onClick={() => setActiveHintIndex((prev) => prev + 1)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Reveal Next Hint
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {question.hints.map((hint, idx) => (
                    <AnimatePresence key={idx}>
                      {idx <= activeHintIndex && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3 text-sm text-slate-300"
                        >
                          <span className="text-cyan-400 font-bold mr-1.5">Hint {idx + 1}:</span>
                          {hint}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                  {activeHintIndex === -1 && (
                    <p className="text-xs text-slate-500 italic">No hints revealed yet. Click above to reveal hints.</p>
                  )}
                </div>
              </div>

              {/* Solution Approach */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-violet-400" />
                    Solution Approach
                  </h5>
                  <button
                    onClick={() => setShowApproach(!showApproach)}
                    className="text-xs text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
                  >
                    {showApproach ? 'Hide Approach' : 'Reveal Approach'}
                  </button>
                </div>
                <AnimatePresence>
                  {showApproach && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 leading-relaxed space-y-2 overflow-hidden"
                    >
                      <p className="whitespace-pre-line">{question.solutionApproach}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Follow ups */}
              {question.followUps && question.followUps.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Follow-up Questions</h5>
                  <ul className="list-disc pl-5 text-sm text-slate-400 space-y-1">
                    {question.followUps.map((fol, index) => (
                      <li key={index}>{fol}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
