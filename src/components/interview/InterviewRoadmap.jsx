import React from 'react';
import { useInterviewProgress } from './ProgressTracker';
import { Compass, Shield, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

const ROADMAP_STEPS = [
  {
    level: 'Beginner',
    icon: Compass,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
    categories: ['Arrays', 'Strings', 'Linked Lists'],
    description: 'Master core linear data structures and foundational problem solving.',
    topics: [
      'Iterating through lists, searching complements (Two Sum)',
      'Subarray algorithms (Kadane\'s algorithm, sliding windows)',
      'Reversing nodes and detecting loops in linked lists',
      'String compression, anagram checks, and parsing'
    ]
  },
  {
    level: 'Intermediate',
    icon: Shield,
    color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    borderColor: 'border-sky-500/20 hover:border-sky-500/40',
    categories: ['Trees', 'Graphs', 'Recursion & Backtracking'],
    description: 'Deep dive into non-linear topologies, backtracking trees, and traversals.',
    topics: [
      'Tree traversals (BFS, DFS, Inorder) and validation checks',
      'Graph algorithms (Topological sorting, Dijkstra\'s shortest paths)',
      'Recursion configurations (Subsets, Permutations, Sudoku backtracking)',
      'Union-Find structures and minimum spanning trees'
    ]
  },
  {
    level: 'Advanced',
    icon: Zap,
    color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    borderColor: 'border-violet-500/20 hover:border-violet-500/40',
    categories: ['Dynamic Programming', 'Greedy', 'System Design'],
    description: 'Solve complex optimizations, interval divisions, and distributed system architectures.',
    topics: [
      '0-1 Knapsack, Coin change, and edit distance',
      'Longest Increasing Subsequence (O(n log n) Patience sorting)',
      'Greedy job scheduling and Huffman binary coding trees',
      'URL shorteners, real-time chats, and rate limiters design'
    ]
  }
];

export default function InterviewRoadmap() {
  const { stats } = useInterviewProgress();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Introduction */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur text-center space-y-2">
        <h3 className="text-xl font-bold text-slate-100">Structured Preparation Roadmap</h3>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          We recommend advancing sequentially. Once you reach 70% readiness on a level, step up to start practicing the next block.
        </p>
      </div>

      {/* Steps Visual Layout */}
      <div className="space-y-6">
        {ROADMAP_STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          
          // Calculate step completion percentage
          let solvedSum = 0;
          let totalSum = 0;
          step.categories.forEach((cat) => {
            const stat = stats.categoryStats[cat];
            if (stat) {
              solvedSum += stat.solved;
              totalSum += stat.total;
            }
          });

          const percent = totalSum > 0 ? Math.round((solvedSum / totalSum) * 100) : 0;

          return (
            <div
              key={step.level}
              className={`bg-slate-900/40 border ${step.borderColor} rounded-2xl p-6 md:p-8 backdrop-blur transition-all duration-300 grid grid-cols-1 lg:grid-cols-4 gap-6`}
            >
              {/* Level metadata */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${step.color}`}>
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-100">{step.level} Path</h4>
                    <span className="text-xs text-slate-400">Step {idx + 1} of 3</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Level Percentage Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-slate-400 font-semibold">
                    <span>Level Progress</span>
                    <span className="font-bold text-slate-200">{percent}%</span>
                  </div>
                  <div className="w-full bg-slate-950/40 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div style={{ width: `${percent}%` }} className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  </div>
                  <span className="text-[10px] text-slate-500 block">
                    {solvedSum} of {totalSum} questions completed
                  </span>
                </div>
              </div>

              {/* Syllabus details */}
              <div className="lg:col-span-2 space-y-4">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key syllabus items to master</h5>
                <ul className="space-y-2">
                  {step.topics.map((topic, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <ChevronRight className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories checklist */}
              <div className="space-y-3 lg:border-l lg:border-slate-800/80 lg:pl-6">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Syllabus Progress</h5>
                <div className="space-y-2.5">
                  {step.categories.map((cat) => {
                    const catStat = stats.categoryStats[cat];
                    const isCompleted = catStat?.percent >= 80;
                    return (
                      <div key={cat} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className={`w-4.5 h-4.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-700'}`} />
                          <span className="text-slate-300">{cat}</span>
                        </div>
                        <span className="font-mono font-semibold text-slate-400">
                          {catStat?.solved}/{catStat?.total}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
