import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Target, Flame, Compass, BarChart3, 
  BookOpen, Building2, ShieldCheck, Sparkles 
} from 'lucide-react';
import { ProgressProvider, useInterviewProgress } from './interview/ProgressTracker';
import QuestionBank from './interview/QuestionBank';
import CompanyPrep from './interview/CompanyPrep';
import MockInterviewPanel from './interview/MockInterviewPanel';
import ReadinessDashboard from './interview/ReadinessDashboard';
import InterviewRoadmap from './interview/InterviewRoadmap';
import InterviewAnalytics from './interview/InterviewAnalytics';

function DashboardHeader() {
  const { stats } = useInterviewProgress();

  const cards = [
    {
      label: 'Questions Solved',
      value: `${stats.totalSolved} / ${stats.totalQuestions}`,
      desc: 'Overall DSA & HR coverage',
      icon: BookOpen,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      label: 'Accuracy Rate',
      value: `${stats.accuracy}%`,
      desc: 'Correct submission ratio',
      icon: Target,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      label: 'Current Streak',
      value: `${stats.streak} Days`,
      desc: 'Consecutive active days',
      icon: Flame,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      label: 'Readiness Score',
      value: `${stats.readinessScore}%`,
      desc: 'Weighted category score',
      icon: Trophy,
      color: 'text-violet-400 bg-violet-500/10 border-violet-500/20'
    },
    {
      label: 'Mocks Completed',
      value: `${stats.mockCompletedCount}`,
      desc: 'Evaluated mock runs',
      icon: Sparkles,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 md:p-5 backdrop-blur shadow-xl hover:border-slate-700/50 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.05)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block">
                {card.label}
              </span>
              <div className={`p-2 rounded-xl border ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl font-black text-slate-100 font-mono block">
                {card.value}
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 block leading-tight mt-0.5">
                {card.desc}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MainLayout() {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, bank, company, mock, roadmap, analytics

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: ShieldCheck },
    { id: 'bank', label: 'Question Bank', icon: BookOpen },
    { id: 'company', label: 'Company Prep', icon: Building2 },
    { id: 'mock', label: 'Mock Interview', icon: Sparkles },
    { id: 'roadmap', label: 'Roadmap', icon: Compass },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Title Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
        <div className="space-y-2 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            Interview Preparation
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Simulate technical hiring paths with structured DSA challenges, company prep guides, and evaluated mock sessions.
          </p>
        </div>
        <div className="absolute -top-16 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Dashboard Stats Cards */}
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto border-b border-slate-900 flex gap-2 sm:gap-4 overflow-x-auto pb-1.5 scrollbar-thin">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap border flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 border-cyan-500/35 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-800/80 hover:bg-slate-900/10'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panel View Content */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === 'dashboard' && <ReadinessDashboard />}
            {activeTab === 'bank' && <QuestionBank />}
            {activeTab === 'company' && <CompanyPrep />}
            {activeTab === 'mock' && <MockInterviewPanel />}
            {activeTab === 'roadmap' && <InterviewRoadmap />}
            {activeTab === 'analytics' && <InterviewAnalytics />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function InterviewView() {
  return (
    <ProgressProvider>
      <MainLayout />
    </ProgressProvider>
  );
}
