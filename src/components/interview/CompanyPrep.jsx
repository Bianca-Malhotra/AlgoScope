import React, { useState, useMemo } from 'react';
import { useInterviewProgress } from './ProgressTracker';
import { QUESTION_DATASET } from './QuestionDataset';
import QuestionCard from './QuestionCard';
import { Building2, Award, Zap, CheckCircle2 } from 'lucide-react';

const TARGET_COMPANIES = [
  'Google', 'Amazon', 'Microsoft', 'Meta', 'Adobe', 'Uber', 'Atlassian', 
  'Goldman Sachs', 'Walmart', 'Flipkart'
];

export default function CompanyPrep() {
  const { solved, bookmarked, markSolved, toggleBookmark } = useInterviewProgress();
  const [activeCompany, setActiveCompany] = useState('Google');

  const companyData = useMemo(() => {
    const questions = QUESTION_DATASET.filter((q) => q.companyTags.includes(activeCompany));
    const solvedForCompany = questions.filter((q) => solved.includes(q.id));

    // Calculate difficulty ratios
    const easy = questions.filter((q) => q.difficulty === 'Easy').length;
    const medium = questions.filter((q) => q.difficulty === 'Medium').length;
    const hard = questions.filter((q) => q.difficulty === 'Hard').length;

    // High frequency questions count
    const highFreqCount = questions.filter((q) => q.frequency === 'High' || q.frequency === 'Very High').length;

    return {
      questions,
      solvedCount: solvedForCompany.length,
      totalCount: questions.length,
      easy,
      medium,
      hard,
      highFreqCount
    };
  }, [activeCompany, solved]);

  // Company logo colors and patterns to give custom look
  const companyThemes = {
    Google: 'from-red-500/10 via-yellow-500/5 to-blue-500/10 border-blue-500/30 text-blue-400',
    Amazon: 'from-orange-500/10 to-amber-500/5 border-orange-500/30 text-orange-400',
    Microsoft: 'from-blue-500/10 to-emerald-500/5 border-blue-500/30 text-sky-400',
    Meta: 'from-indigo-600/10 to-blue-500/5 border-indigo-500/30 text-indigo-400',
    Adobe: 'from-rose-600/10 to-red-500/5 border-rose-500/30 text-rose-400',
    Uber: 'from-slate-700/20 to-slate-900/10 border-slate-500/30 text-slate-300',
    Atlassian: 'from-sky-600/10 to-blue-500/5 border-sky-500/30 text-sky-400',
    'Goldman Sachs': 'from-cyan-600/10 to-teal-500/5 border-teal-500/30 text-teal-400',
    Walmart: 'from-amber-400/10 to-yellow-500/5 border-amber-500/30 text-yellow-400',
    Flipkart: 'from-yellow-400/10 to-blue-500/5 border-yellow-500/30 text-yellow-300'
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Company Selection Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin">
        {TARGET_COMPANIES.map((company) => {
          const isActive = activeCompany === company;
          return (
            <button
              key={company}
              onClick={() => setActiveCompany(company)}
              className={`px-5 py-2.5 rounded-xl font-bold whitespace-nowrap border transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {company}
            </button>
          );
        })}
      </div>

      {/* Stats Summary Card */}
      <div className={`bg-gradient-to-br ${companyThemes[activeCompany] || 'from-slate-800/40 to-slate-900/40'} border rounded-2xl p-6 md:p-8 backdrop-blur shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-8`}>
        {/* Left Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800">
              <Building2 className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-100">{activeCompany} Prep Kit</h3>
              <p className="text-slate-400 text-sm">Targeted interview questions</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Solved Progress</span>
              <span className="font-bold text-slate-200">
                {companyData.solvedCount} / {companyData.totalCount} ({Math.round((companyData.solvedCount / Math.max(1, companyData.totalCount)) * 100)}%)
              </span>
            </div>
            <div className="w-full bg-slate-950/40 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                style={{ width: `${Math.round((companyData.solvedCount / Math.max(1, companyData.totalCount)) * 100)}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Middle Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Difficulty Breakdown</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Easy ({companyData.easy})</span>
                <span className="font-mono">{Math.round((companyData.easy / companyData.totalCount) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-950/40 h-1.5 rounded-full overflow-hidden">
                <div style={{ width: `${(companyData.easy / companyData.totalCount) * 100}%` }} className="h-full bg-emerald-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Medium ({companyData.medium})</span>
                <span className="font-mono">{Math.round((companyData.medium / companyData.totalCount) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-950/40 h-1.5 rounded-full overflow-hidden">
                <div style={{ width: `${(companyData.medium / companyData.totalCount) * 100}%` }} className="h-full bg-amber-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Hard ({companyData.hard})</span>
                <span className="font-mono">{Math.round((companyData.hard / companyData.totalCount) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-950/40 h-1.5 rounded-full overflow-hidden">
                <div style={{ width: `${(companyData.hard / companyData.totalCount) * 100}%` }} className="h-full bg-rose-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950/30 border border-slate-800 rounded-xl p-4 text-center flex flex-col justify-center">
            <Award className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <span className="text-2xl font-bold text-slate-100">{companyData.highFreqCount}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">High Freq Set</span>
          </div>

          <div className="bg-slate-950/30 border border-slate-800 rounded-xl p-4 text-center flex flex-col justify-center">
            <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <span className="text-2xl font-bold text-slate-100">
              {companyData.totalCount > 0 ? Math.round(companyData.totalCount * 25 / 60) : 0}h
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Est. Prep Time</span>
          </div>
        </div>
      </div>

      {/* Company Questions Listing */}
      <div className="space-y-4">
        <h4 className="text-md font-bold text-slate-200 px-1 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          Key {activeCompany} Questions ({companyData.totalCount})
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {companyData.questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              isSolved={solved.includes(q.id)}
              isBookmarked={bookmarked.includes(q.id)}
              onToggleSolve={markSolved}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
