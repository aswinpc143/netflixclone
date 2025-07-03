import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

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
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchViewingHistory();
    } else {
      setViewingHistory([]);
    }
  }, [user]);

  const fetchViewingHistory = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('viewing_history')
        .select('*')
        .eq('user_id', user.id)
        .order('watched_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching viewing history:', error);
        return;
      }

      setViewingHistory(data || []);
    } catch (err) {
      console.error('Error in fetchViewingHistory:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = async (movie, progress = 0) => {
    if (!user) return;
    
    try {
      // Remove existing entry for the same movie
      await supabase
        .from('viewing_history')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', movie.id);

      const historyItem = {
        user_id: user.id,
        movie_id: movie.id,
        title: movie.title || movie.name,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date || movie.first_air_date,
        vote_average: movie.vote_average,
        media_type: movie.media_type || 'movie',
        progress: progress,
        watched_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('viewing_history')
        .insert([historyItem])
        .select()
        .single();

      if (error) {
        console.error('Error adding to viewing history:', error);
        return;
      }

      // Update local state
      setViewingHistory(prev => {
        const filtered = prev.filter(item => item.movie_id !== movie.id);
        return [data, ...filtered].slice(0, 100);
      });
    } catch (err) {
      console.error('Error in addToHistory:', err);
    }
  };

  const removeFromHistory = async (movieId, watchedAt) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('viewing_history')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', movieId)
        .eq('watched_at', watchedAt);

      if (error) {
        console.error('Error removing from viewing history:', error);
        return;
      }

      setViewingHistory(prev => 
        prev.filter(item => !(item.movie_id === movieId && item.watched_at === watchedAt))
      );
    } catch (err) {
      console.error('Error in removeFromHistory:', err);
    }
  };

  const clearHistory = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('viewing_history')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing viewing history:', error);
        return;
      }

      setViewingHistory([]);
    } catch (err) {
      console.error('Error in clearHistory:', err);
    }
  };

  const value = {
    viewingHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
    loading,
    refreshHistory: fetchViewingHistory
  };

  return (
    <ViewingHistoryContext.Provider value={value}>
      {children}
    </ViewingHistoryContext.Provider>
  );
};