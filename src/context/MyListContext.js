import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load user's list from localStorage
      const savedList = localStorage.getItem(`myList_${user.id}`);
      if (savedList) {
        setMyList(JSON.parse(savedList));
      }
    } else {
      // Clear list when user logs out
      setMyList([]);
    }
  }, [user]);

  const addToMyList = (movie) => {
    if (!user) return;
    
    const isAlreadyInList = myList.some(item => item.id === movie.id);
    if (isAlreadyInList) return;

    const updatedList = [...myList, movie];
    setMyList(updatedList);
    localStorage.setItem(`myList_${user.id}`, JSON.stringify(updatedList));
  };

  const removeFromMyList = (movieId) => {
    if (!user) return;
    
    const updatedList = myList.filter(item => item.id !== movieId);
    setMyList(updatedList);
    localStorage.setItem(`myList_${user.id}`, JSON.stringify(updatedList));
  };

  const isInMyList = (movieId) => {
    return myList.some(item => item.id === movieId);
  };

  const value = {
    myList,
    addToMyList,
    removeFromMyList,
    isInMyList
  };

  return (
    <MyListContext.Provider value={value}>
      {children}
    </MyListContext.Provider>
  );
};