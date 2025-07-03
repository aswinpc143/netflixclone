import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

const MyListContext = createContext();

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyList must be used within a MyListProvider');
  }
  return context;
};

export const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMyList();
    } else {
      setMyList([]);
    }
  }, [user]);

  const fetchMyList = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('my_list')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching my list:', error);
        return;
      }

      setMyList(data || []);
    } catch (err) {
      console.error('Error in fetchMyList:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToMyList = async (movie) => {
    if (!user) return;
    
    const isAlreadyInList = myList.some(item => item.movie_id === movie.id);
    if (isAlreadyInList) return;

    try {
      const listItem = {
        user_id: user.id,
        movie_id: movie.id,
        title: movie.title || movie.name,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date || movie.first_air_date,
        vote_average: movie.vote_average,
        media_type: movie.media_type || 'movie',
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('my_list')
        .insert([listItem])
        .select()
        .single();

      if (error) {
        console.error('Error adding to my list:', error);
        return;
      }

      setMyList(prev => [data, ...prev]);
    } catch (err) {
      console.error('Error in addToMyList:', err);
    }
  };

  const removeFromMyList = async (movieId) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('my_list')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', movieId);

      if (error) {
        console.error('Error removing from my list:', error);
        return;
      }

      setMyList(prev => prev.filter(item => item.movie_id !== movieId));
    } catch (err) {
      console.error('Error in removeFromMyList:', err);
    }
  };

  const isInMyList = (movieId) => {
    return myList.some(item => item.movie_id === movieId);
  };

  const value = {
    myList,
    addToMyList,
    removeFromMyList,
    isInMyList,
    loading,
    refreshMyList: fetchMyList
  };

  return (
    <MyListContext.Provider value={value}>
      {children}
    </MyListContext.Provider>
  );
};