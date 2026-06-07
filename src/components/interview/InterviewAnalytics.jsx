import React from 'react';
import { useInterviewProgress } from './ProgressTracker';
import { 
  BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { BarChart3, LineChart as LineIcon, Activity, Sparkles, Award } from 'lucide-react';

export default function InterviewAnalytics() {
  const { stats } = useInterviewProgress();

  const categoryStats = stats.categoryStats;
  const categories = Object.keys(categoryStats);

  // 1. Prepare Bar Chart Data: Solved vs Remaining
  const barData = categories.map((cat) => {
    const stat = categoryStats[cat];
    return {
      name: cat,
      Solved: stat.solved,
      Remaining: stat.total - stat.solved,
      total: stat.total
    };
  });

  // 2. Prepare Radar Chart Data: Readiness % per Category
  const radarData = categories.map((cat) => {
    return {
      subject: cat,
      Readiness: categoryStats[cat].percent,
      fullMark: 100
    };
  });

  // 3. Prepare Line Chart Data: Mock history
  // Since mockHistory is in reverse chronological order, we reverse it to display chronological trend
  const mockTrendData = [...stats.mockHistory]
    .reverse()
    .map((mock, idx) => ({
      session: `Mock #${idx + 1}`,
      Score: mock.score,
      date: mock.date,
      type: mock.type
    }));

  // Custom tooltips to match glassmorphism theme
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-xs font-bold text-slate-200 mb-1">{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} className="text-xs font-semibold" style={{ color: p.color || p.fill }}>
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-semibold block">Questions Solved</span>
            <span className="text-2xl font-black text-slate-100">{stats.totalSolved} / {stats.totalQuestions}</span>
            <span className="text-[10px] text-emerald-400 block font-bold">Total repository coverage</span>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur flex items-center gap-4">
          <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20 text-violet-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-semibold block">Average Accuracy</span>
            <span className="text-2xl font-black text-slate-100">{stats.accuracy}%</span>
            <span className="text-[10px] text-slate-400 block font-medium">Calculated based on solve attempts</span>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-semibold block">Mocks Completed</span>
            <span className="text-2xl font-black text-slate-100">{stats.mockCompletedCount} sessions</span>
            <span className="text-[10px] text-cyan-400 block font-bold">DSA, HR & Mixed Rounds</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Solved vs Remaining bar chart */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-2xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-850">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-slate-200">Syllabus Breakdown (Solved vs Remaining)</h4>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                <Bar dataKey="Solved" stackId="a" fill="#06b6d4" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Remaining" stackId="a" fill="#1e293b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart Coverage */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-2xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-850">
            <Activity className="w-4 h-4 text-violet-400" />
            <h4 className="text-sm font-bold text-slate-200">Readiness Radar Map (%)</h4>
          </div>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" r="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                <Radar name="Readiness" dataKey="Readiness" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mock Interview Scores Line Chart */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur shadow-2xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-850">
          <LineIcon className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold text-slate-200">Mock Performance Trend Line</h4>
        </div>

        {mockTrendData.length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData} margin={{ top: 10, right: 20, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="session" stroke="#64748b" fontSize={10} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="Score" stroke="#f59e0b" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="py-12 text-center bg-slate-950/20 border border-slate-800 rounded-xl space-y-2">
            <Award className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm text-slate-400">No mock history records found</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Jump over to the Mock Interview tab to complete your first session. Your score history trend will plot here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
