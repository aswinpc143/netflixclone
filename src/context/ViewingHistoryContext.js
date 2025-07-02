import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ViewingHistoryContext = createContext();

export const useViewingHistory = () => {
  const context = useContext(ViewingHistoryContext);
  if (!context) {
    throw new Error('useViewingHistory must be used within a ViewingHistoryProvider');
  }
  return context;
};

export const ViewingHistoryProvider = ({ children }) => {
  const [viewingHistory, setViewingHistory] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load user's viewing history from localStorage
      const savedHistory = localStorage.getItem(`viewingHistory_${user.id}`);
      if (savedHistory) {
        setViewingHistory(JSON.parse(savedHistory));
      }
    } else {
      // Clear history when user logs out
      setViewingHistory([]);
    }
  }, [user]);

  const addToHistory = (movie, progress = 0) => {
    if (!user) return;
    
    const historyItem = {
      ...movie,
      watchedAt: new Date().toISOString(),
      progress: progress
    };

    // Remove existing entry for the same movie
    const updatedHistory = viewingHistory.filter(item => item.id !== movie.id);
    
    // Add new entry at the beginning
    const newHistory = [historyItem, ...updatedHistory];
    
    // Keep only last 100 items
    const limitedHistory = newHistory.slice(0, 100);
    
    setViewingHistory(limitedHistory);
    localStorage.setItem(`viewingHistory_${user.id}`, JSON.stringify(limitedHistory));
  };

  const removeFromHistory = (movieId, watchedAt) => {
    if (!user) return;
    
    const updatedHistory = viewingHistory.filter(
      item => !(item.id === movieId && item.watchedAt === watchedAt)
    );
    setViewingHistory(updatedHistory);
    localStorage.setItem(`viewingHistory_${user.id}`, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    if (!user) return;
    
    setViewingHistory([]);
    localStorage.removeItem(`viewingHistory_${user.id}`);
  };

  const value = {
    viewingHistory,
    addToHistory,
    removeFromHistory,
    clearHistory
  };

  return (
    <ViewingHistoryContext.Provider value={value}>
      {children}
    </ViewingHistoryContext.Provider>
  );
};