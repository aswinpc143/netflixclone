import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

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

    return (
        <div className="navbar">
            <Link to="/">
                <img className="logo" src={require('./cooltext388381261994218.png')} alt='netflix-logo'/>
            </Link>
            
            {user && (
                <div className="nav-user">
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
                    <span className="user-name">Welcome, {user.name}</span>
                    <div className="user-menu">
                        <img 
                            className="avatar" 
                            src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" 
                            alt="Avatar"
                            onClick={() => setShowMenu(!showMenu)}
                        />
                        {showMenu && (
                            <div className="dropdown-menu">
                                <Link 
                                    to="/profiles" 
                                    className="dropdown-item"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Manage Profiles
                                </Link>
                                <Link 
                                    to="/account" 
                                    className="dropdown-item"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Account
                                </Link>
                                <Link 
                                    to="/viewing-history" 
                                    className="dropdown-item"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Viewing History
                                </Link>
                                <Link 
                                    to="/help" 
                                    className="dropdown-item"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Help Center
                                </Link>
                                <button className="dropdown-item logout-item" onClick={handleLogout}>
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