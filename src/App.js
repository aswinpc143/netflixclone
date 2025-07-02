import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { MyListProvider } from './context/MyListContext'
import { ViewingHistoryProvider } from './context/ViewingHistoryContext'
import AuthPage from './Components/Auth/AuthPage'
import Layout from './Components/Layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import BrowsePage from './pages/BrowsePage/BrowsePage'
import GenrePage from './pages/GenrePage/GenrePage'
import SearchPage from './pages/SearchPage/SearchPage'
import AccountPage from './pages/AccountPage/AccountPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ViewingHistoryPage from './pages/ViewingHistoryPage/ViewingHistoryPage'
import HelpPage from './pages/HelpPage/HelpPage'
import MyListPage from './pages/MyListPage/MyListPage'
import './App.css'

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
    <MyListProvider>
      <ViewingHistoryProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/browse/:category" element={<BrowsePage />} />
              <Route path="/genre/:genreId" element={<GenrePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/profiles" element={<ProfilePage />} />
              <Route path="/viewing-history" element={<ViewingHistoryPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/my-list" element={<MyListPage />} />
            </Routes>
          </Layout>
        </Router>
      </ViewingHistoryProvider>
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