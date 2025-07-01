import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { MyListProvider } from './context/MyListContext'
import AuthPage from './Components/Auth/AuthPage'
import NavBar from './Components/NavBar/NavBar'
import MyList from './Components/MyList/MyList'
import "./Components/NavBar/NavBar.css"
import './App.css'
import {actions,originals} from './Urls'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost'

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('home');

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#111',
        color: 'white' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const handleMyListClick = () => {
    setCurrentView(currentView === 'mylist' ? 'home' : 'mylist');
  };

  return (
    <MyListProvider>
      <div>
        <NavBar onMyListClick={handleMyListClick} />
        {currentView === 'home' ? (
          <>
            <Banner/>
            <RowPost url={originals} title='Netflix Originals'/>
            <RowPost url={actions} title='Actions' isSmall />
          </>
        ) : (
          <MyList />
        )}
      </div>
    </MyListProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App