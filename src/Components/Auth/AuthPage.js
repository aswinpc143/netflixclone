import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-overlay">
          <div className="auth-header">
            <img 
              className="auth-logo" 
              src={require('../NavBar/cooltext388381261994218.png')} 
              alt='netflix-logo'
            />
          </div>
          
          <div className="auth-container">
            <div className="auth-form-wrapper">
              {isLogin ? <LoginForm /> : <SignupForm />}
              
              <div className="auth-switch">
                {isLogin ? (
                  <p>
                    New to Netflix? 
                    <button 
                      className="auth-switch-btn"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up now
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account? 
                    <button 
                      className="auth-switch-btn"
                      onClick={() => setIsLogin(true)}
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;