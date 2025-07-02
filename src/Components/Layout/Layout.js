import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <NavBar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;