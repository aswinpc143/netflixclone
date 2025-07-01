import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function NavBar({ onMyListClick }) {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="navbar">
            <img className="logo" src={require('./cooltext388381261994218.png')} alt='netflix-logo'/>
            
            {user && (
                <div className="nav-user">
                    <nav className="nav-links">
                        <button className="nav-link" onClick={() => window.location.reload()}>
                            Home
                        </button>
                        <button className="nav-link" onClick={onMyListClick}>
                            My List
                        </button>
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
                                <button className="dropdown-item" onClick={onMyListClick}>
                                    My List
                                </button>
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