import React from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthPage from './Components/Auth/AuthPage'
import NavBar from './Components/NavBar/NavBar'
import "./Components/NavBar/NavBar.css"
import './App.css'
import {actions,originals} from './Urls'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost'

function AppContent() {
  const { user, loading } = useAuth();

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

  return (
    <div>
      <NavBar/>
      <Banner/>
      <RowPost url={originals} title='Netflix Originals'/>
      <RowPost url={actions} title='Actions' isSmall />
    </div>
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