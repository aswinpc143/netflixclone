import React from 'react'
import { useAuth } from '../../context/AuthContext'

function NavBar() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="navbar">
            <img className="logo" src={require('./cooltext388381261994218.png')} alt='netflix-logo'/>
            
            {user && (
                <div className="nav-user">
                    <span className="user-name">Welcome, {user.name}</span>
                    <img className="avatar" src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar" />
                    <button className="logout-btn" onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    )
}

export default NavBar