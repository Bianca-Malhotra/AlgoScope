import React, { useMemo } from 'react';
import { useInterviewProgress } from './ProgressTracker';
import { QUESTION_DATASET } from './QuestionDataset';
import { 
  Award, AlertTriangle, Lightbulb, Bookmark, CheckCircle2, 
  TrendingUp, BarChart3, ChevronRight, Play 
} from 'lucide-react';

export default function ReadinessDashboard() {
  const { solved, bookmarked, stats, markSolved, toggleBookmark } = useInterviewProgress();

  const categories = Object.keys(stats.categoryStats);

  // Group into Weak and Strong Areas
  const analysis = useMemo(() => {
    const weak = [];
    const strong = [];
    const recommended = [];

    categories.forEach((cat) => {
      const item = stats.categoryStats[cat];
      if (item.percent < 40) {
        weak.push({ category: cat, ...item });
      } else if (item.percent >= 75) {
        strong.push({ category: cat, ...item });
      }
    });

    // Find up to 4 recommended questions
    // Priority: high frequency, unsolved, from weak areas if possible, otherwise any high-frequency unsolved
    const unsolvedQs = QUESTION_DATASET.filter((q) => !solved.includes(q.id));
    
    // Sort by: priority to weak categories, then frequency (Very High > High > Medium > Low)
    const frequencyWeight = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    
    const sortedRecommendations = [...unsolvedQs].sort((a, b) => {
      const aInWeak = weak.some(w => w.category === a.category) ? 1 : 0;
      const bInWeak = weak.some(w => w.category === b.category) ? 1 : 0;
      if (aInWeak !== bInWeak) return bInWeak - aInWeak;

      const aFreq = frequencyWeight[a.frequency] || 1;
      const bFreq = frequencyWeight[b.frequency] || 1;
      return bFreq - aFreq;
    });

    return {
      weak,
      strong,
      recommended: sortedRecommendations.slice(0, 4)
    };
  }, [stats.categoryStats, solved, categories]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Category Progress Bars */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur shadow-2xl space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-slate-100">Topic Readiness Metrics</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const stat = stats.categoryStats[cat];
            return (
              <div key={cat} className="bg-slate-950/20 border border-slate-800/60 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-200">{cat}</span>
                  <span className="text-cyan-400 font-mono font-bold">{stat.percent}%</span>
                </div>
                <div className="w-full bg-slate-900/60 rounded-full h-2.5 overflow-hidden">
                  <div
                    style={{ width: `${stat.percent}%` }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{stat.solved} solved</span>
                  <span>{stat.total} total questions</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weak & Strong Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak Areas Card */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-4">
          <h4 className="text-md font-bold text-slate-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            Focus Areas (Needs Improvement)
          </h4>
          {analysis.weak.length > 0 ? (
            <div className="space-y-3">
              {analysis.weak.map((w) => (
                <div key={w.category} className="flex items-center justify-between bg-rose-500/5 border border-rose-500/10 rounded-xl p-3.5">
                  <div>
                    <span className="text-sm font-semibold text-slate-200 block">{w.category}</span>
                    <span className="text-[11px] text-slate-400">{w.solved} of {w.total} solved</span>
                  </div>
                  <span className="text-rose-400 font-bold text-sm bg-rose-500/10 px-2.5 py-1 rounded-lg">
                    {w.percent}% Ready
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic bg-slate-950/20 border border-slate-800 rounded-xl p-4">
              Fantastic! You don't have any major weak areas left (all topics &ge; 40%).
            </p>
          )}
        </div>

        {/* Strong Areas Card */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-4">
          <h4 className="text-md font-bold text-slate-200 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            Strong Areas (Mastered)
          </h4>
          {analysis.strong.length > 0 ? (
            <div className="space-y-3">
              {analysis.strong.map((s) => (
                <div key={s.category} className="flex items-center justify-between bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3.5">
                  <div>
                    <span className="text-sm font-semibold text-slate-200 block">{s.category}</span>
                    <span className="text-[11px] text-slate-400">{s.solved} of {s.total} solved</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                    {s.percent}% Ready
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic bg-slate-950/20 border border-slate-800 rounded-xl p-4">
              Complete more questions in categories to reach mastery (all topics &ge; 75%).
            </p>
          )}
        </div>
      </div>

      {/* Recommended Questions */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur shadow-2xl space-y-6">
        <h4 className="text-md font-bold text-slate-200 flex items-center gap-2 pb-3 border-b border-slate-800">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Recommended Next Questions
        </h4>

        {analysis.recommended.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.recommended.map((q) => {
              const isQBookmarked = bookmarked.includes(q.id);
              const difficultyColors = {
                Easy: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
                Medium: 'text-amber-400 bg-amber-500/10 border border-amber-500/20',
                Hard: 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
              };

              return (
                <div key={q.id} className="bg-slate-950/30 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex items-start justify-between gap-4 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${difficultyColors[q.difficulty]}`}>
                        {q.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {q.category}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-100 text-base">{q.title}</h5>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {q.solutionApproach}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className={`p-2 border rounded-lg transition-all ${
                        isQBookmarked 
                          ? 'text-amber-400 bg-amber-400/10 border-amber-500/30'
                          : 'text-slate-400 hover:text-slate-200 border-slate-800 bg-slate-900/40'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" fill={isQBookmarked ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => markSolved(q.id)}
                      className="p-2 border border-slate-800 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 rounded-lg transition-all"
                      title="Quick Solve"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">No recommendations available. All questions solved!</p>
        )}
      </div>

      {/* General Interview Tips & Reminders */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-4">
        <h4 className="text-md font-bold text-slate-200 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Technical Interview Success Framework
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/20 border border-slate-800 rounded-xl p-4">
            <h5 className="text-sm font-bold text-slate-200 mb-1">1. Clarify constraints</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Always verify inputs, bounds, negative numbers, and memory limits before outlining code.
            </p>
          </div>
          <div className="bg-slate-950/20 border border-slate-800 rounded-xl p-4">
            <h5 className="text-sm font-bold text-slate-200 mb-1">2. Over-communicate</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explain why you chose a hash map over a heap. Talk through nested loops and explain complexity bottlenecks.
            </p>
          </div>
          <div className="bg-slate-950/20 border border-slate-800 rounded-xl p-4">
            <h5 className="text-sm font-bold text-slate-200 mb-1">3. Dry run edge cases</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trace through your final code with empty arrays, sorted lists, or duplicate characters to show rigor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
