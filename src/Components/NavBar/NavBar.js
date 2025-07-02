import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './NavBar.css'

function NavBar() {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        setShowMenu(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="logo-container" onClick={handleLogoClick}>
                    <span className="logo-text">MALLUFLIX</span>
                </div>
                
                {user && (
                    <nav className="nav-links">
                        <Link 
                            to="/" 
                            className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/browse" 
                            className={`nav-link ${isActive('/browse') ? 'active' : ''}`}
                        >
                            Browse
                        </Link>
                        <Link 
                            to="/my-list" 
                            className={`nav-link ${isActive('/my-list') ? 'active' : ''}`}
                        >
                            My List
                        </Link>
                        <Link 
                            to="/search" 
                            className={`nav-link ${isActive('/search') ? 'active' : ''}`}
                        >
                            Search
                        </Link>
                    </nav>
                )}
            </div>
            
            {user && (
                <div className="nav-user">
                    <span className="user-name">Welcome, {user.name}</span>
                    <div className="user-menu">
                        <div 
                            className="avatar-container" 
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <div className="avatar-placeholder">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        {showMenu && (
                            <div className="dropdown-menu">
                                <Link 
                                    to="/profiles" 
                                    className="dropdown-item"
                                    onClick={() => setShowMenu(false)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                    Manage Profiles
                                </Link>
                                <Link 
                                    to="/account" 
                                    className="dropdown-item"
                                    onClick={() => setShowMenu(false)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                                    </svg>
                                    Account
                                </Link>
                                <Link 
                                    to="/viewing-history" 
                                    className="dropdown-item"
                                    onClick={() => setShowMenu(false)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                                    </svg>
                                    Viewing History
                                </Link>
                                <Link 
                                    to="/help" 
                                    className="dropdown-item"
                                    onClick={() => setShowMenu(false)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                                    </svg>
                                    Help Center
                                </Link>
                                <button className="dropdown-item logout-item" onClick={handleLogout}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar