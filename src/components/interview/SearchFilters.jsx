import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { COMPANIES_LIST, CATEGORIES_LIST } from './QuestionDataset';

export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedCompany,
  setSelectedCompany,
  selectedStatus,
  setSelectedStatus,
  selectedFrequency,
  setSelectedFrequency,
  onReset
}) {
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const frequencies = ['Low', 'Medium', 'High', 'Very High'];
  const statuses = ['Solved', 'Unsolved', 'Bookmarked'];

  const hasActiveFilters = 
    searchQuery || 
    selectedCategory || 
    selectedDifficulty || 
    selectedCompany || 
    selectedStatus || 
    selectedFrequency;

  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-slate-100">Filters & Search</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-1 cursor-pointer"
          >
            Clear All <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Search Input */}
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-2 relative">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, approach, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-700 hover:border-slate-600 focus:border-cyan-500 rounded-xl pl-10 pr-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Topic/Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Topic</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="">All Topics</option>
            {CATEGORIES_LIST.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Difficulty</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="">All Levels</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Company</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="">All Companies</option>
            {COMPANIES_LIST.map((comp) => (
              <option key={comp} value={comp}>{comp}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="">All Statuses</option>
            {statuses.map((stat) => (
              <option key={stat} value={stat}>{stat}</option>
            ))}
          </select>
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Frequency</label>
          <select
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="">All Frequencies</option>
            {frequencies.map((freq) => (
              <option key={freq} value={freq}>{freq} Frequency</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2">
          {searchQuery && (
            <span className="inline-flex items-center gap-1 bg-cyan-950/40 border border-cyan-800/60 text-cyan-200 text-xs px-3 py-1 rounded-full">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:text-red-400"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 bg-slate-700/40 border border-slate-600/50 text-slate-200 text-xs px-3 py-1 rounded-full">
              Topic: {selectedCategory}
              <button onClick={() => setSelectedCategory('')} className="hover:text-red-400"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedDifficulty && (
            <span className="inline-flex items-center gap-1 bg-slate-700/40 border border-slate-600/50 text-slate-200 text-xs px-3 py-1 rounded-full">
              Difficulty: {selectedDifficulty}
              <button onClick={() => setSelectedDifficulty('')} className="hover:text-red-400"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedCompany && (
            <span className="inline-flex items-center gap-1 bg-purple-950/40 border border-purple-900/60 text-purple-200 text-xs px-3 py-1 rounded-full">
              Company: {selectedCompany}
              <button onClick={() => setSelectedCompany('')} className="hover:text-red-400"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedStatus && (
            <span className="inline-flex items-center gap-1 bg-slate-700/40 border border-slate-600/50 text-slate-200 text-xs px-3 py-1 rounded-full">
              Status: {selectedStatus}
              <button onClick={() => setSelectedStatus('')} className="hover:text-red-400"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedFrequency && (
            <span className="inline-flex items-center gap-1 bg-slate-700/40 border border-slate-600/50 text-slate-200 text-xs px-3 py-1 rounded-full">
              Freq: {selectedFrequency}
              <button onClick={() => setSelectedFrequency('')} className="hover:text-red-400"><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
