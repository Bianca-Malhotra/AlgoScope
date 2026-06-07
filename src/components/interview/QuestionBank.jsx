import React, { useState, useMemo } from 'react';
import { useInterviewProgress } from './ProgressTracker';
import { QUESTION_DATASET } from './QuestionDataset';
import SearchFilters from './SearchFilters';
import QuestionCard from './QuestionCard';
import { BookOpen, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 15;

export default function QuestionBank() {
  const { solved, bookmarked, markSolved, toggleBookmark } = useInterviewProgress();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredQuestions = useMemo(() => {
    // Reset to page 1 on filter changes
    setCurrentPage(1);

    return QUESTION_DATASET.filter((q) => {
      // Search text match (case-insensitive)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const inTitle = q.title.toLowerCase().includes(query);
        const inApproach = q.solutionApproach.toLowerCase().includes(query);
        const inCat = q.category.toLowerCase().includes(query);
        if (!inTitle && !inApproach && !inCat) return false;
      }

      // Category filter
      if (selectedCategory && q.category !== selectedCategory) return false;

      // Difficulty filter
      if (selectedDifficulty && q.difficulty !== selectedDifficulty) return false;

      // Company filter
      if (selectedCompany && !q.companyTags.includes(selectedCompany)) return false;

      // Frequency filter
      if (selectedFrequency && q.frequency !== selectedFrequency) return false;

      // Status filter
      if (selectedStatus) {
        const isSolve = solved.includes(q.id);
        const isBookmark = bookmarked.includes(q.id);
        if (selectedStatus === 'Solved' && !isSolve) return false;
        if (selectedStatus === 'Unsolved' && isSolve) return false;
        if (selectedStatus === 'Bookmarked' && !isBookmark) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedCompany, selectedStatus, selectedFrequency, solved, bookmarked]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDifficulty('');
    setSelectedCompany('');
    setSelectedStatus('');
    setSelectedFrequency('');
    setCurrentPage(1);
  };

  // Pagination bounds
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE));
  const displayedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredQuestions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredQuestions, currentPage]);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      // Smooth scroll to top of list container
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Search & Filter Component */}
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedFrequency={selectedFrequency}
        setSelectedFrequency={setSelectedFrequency}
        onReset={handleResetFilters}
      />

      {/* Main Results Listing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-400 px-1">
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Showing <strong className="text-slate-200">{filteredQuestions.length}</strong> questions matching criteria
          </span>
          {totalPages > 1 && (
            <span>Page {currentPage} of {totalPages}</span>
          )}
        </div>

        {displayedQuestions.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {displayedQuestions.map((q) => (
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
        ) : (
          <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
            <h4 className="text-lg font-semibold text-slate-300">No questions found</h4>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              We couldn't find any questions matching your search filters. Try widening your filters or resetting search keywords.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 text-xs bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 border border-slate-800 rounded-xl hover:border-slate-700 bg-slate-900/30 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
              // Sliding page window to show up to 5 page numbers
              let pageNum = currentPage - 2 + idx;
              if (currentPage <= 2) pageNum = idx + 1;
              if (currentPage >= totalPages - 1) pageNum = totalPages - 4 + idx;
              
              // Ensure bounds
              if (pageNum < 1 || pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    pageNum === currentPage
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-slate-900/30 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2 border border-slate-800 rounded-xl hover:border-slate-700 bg-slate-900/30 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
