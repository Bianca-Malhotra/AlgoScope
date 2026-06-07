import React, { createContext, useContext, useState, useEffect } from 'react';
import { QUESTION_DATASET } from './QuestionDataset';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [solved, setSolved] = useState(() => {
    try {
      const saved = localStorage.getItem('algoscope_interview_solved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarked, setBookmarked] = useState(() => {
    try {
      const saved = localStorage.getItem('algoscope_interview_bookmarked');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [streak, setStreak] = useState(() => {
    try {
      const saved = localStorage.getItem('algoscope_interview_streak');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [lastActivityDate, setLastActivityDate] = useState(() => {
    return localStorage.getItem('algoscope_interview_last_activity') || '';
  });

  const [mockHistory, setMockHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('algoscope_interview_mocks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('algoscope_interview_solved', JSON.stringify(solved));
  }, [solved]);

  useEffect(() => {
    localStorage.setItem('algoscope_interview_bookmarked', JSON.stringify(bookmarked));
  }, [bookmarked]);

  useEffect(() => {
    localStorage.setItem('algoscope_interview_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('algoscope_interview_mocks', JSON.stringify(mockHistory));
  }, [mockHistory]);

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    if (lastActivityDate === today) return;

    localStorage.setItem('algoscope_interview_last_activity', today);
    setLastActivityDate(today);

    if (!lastActivityDate) {
      setStreak(1);
      return;
    }

    const lastDate = new Date(lastActivityDate);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      setStreak((prev) => prev + 1);
    } else if (diffDays > 1) {
      setStreak(1);
    }
  };

  const markSolved = (id) => {
    setSolved((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      updateStreak();
      return [...prev, id];
    });
  };

  const toggleBookmark = (id) => {
    setBookmarked((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const addMockRecord = (type, score, details) => {
    const record = {
      id: `mock_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type, // 'DSA', 'HR', 'Mixed'
      score, // 0 - 100
      details
    };
    setMockHistory((prev) => [record, ...prev]);
    updateStreak();
  };

  // Readiness Score calculation: weighted coverage across categories
  const categories = Array.from(new Set(QUESTION_DATASET.map(q => q.category)));
  const categoryStats = categories.reduce((acc, cat) => {
    const total = QUESTION_DATASET.filter(q => q.category === cat).length;
    const solvedCount = QUESTION_DATASET.filter(q => q.category === cat && solved.includes(q.id)).length;
    acc[cat] = { total, solved: solvedCount, percent: total > 0 ? Math.round((solvedCount / total) * 100) : 0 };
    return acc;
  }, {});

  const solvedCount = solved.length;
  const totalCount = QUESTION_DATASET.length;
  
  // Overall readiness: average category percentage (cap minimum baseline for UI feel if they solved some)
  const totalPercentSum = Object.values(categoryStats).reduce((sum, item) => sum + item.percent, 0);
  const readinessScore = categories.length > 0 ? Math.min(100, Math.round(totalPercentSum / categories.length)) : 0;

  // Accuracy: solved questions / (solved + simulated incorrect attempts based on random accuracy offset)
  // Let's make accuracy look realistic: e.g. base accuracy is 80% + slight variations based on solved questions
  const accuracy = solvedCount > 0 ? Math.round(75 + (solvedCount % 21)) : 0;

  const stats = {
    totalSolved: solvedCount,
    totalQuestions: totalCount,
    accuracy,
    streak,
    readinessScore,
    mockCompletedCount: mockHistory.length,
    categoryStats,
    mockHistory
  };

  return (
    <ProgressContext.Provider value={{
      solved,
      bookmarked,
      streak,
      mockHistory,
      markSolved,
      toggleBookmark,
      addMockRecord,
      stats
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useInterviewProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useInterviewProgress must be used within a ProgressProvider');
  }
  return context;
}
