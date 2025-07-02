import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../Components/Banner/Banner';
import RowPost from '../../Components/RowPost/RowPost';
import { useViewingHistory } from '../../context/ViewingHistoryContext';
import { useMyList } from '../../context/MyListContext';
import { actions, originals, comedy, horror, romance, documentaries, trending } from '../../Urls';
import { imageUrl } from '../../Constants/Constants';
import './HomePage.css';

function HomePage() {
  const { viewingHistory } = useViewingHistory();
  const { myList } = useMyList();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const recentlyWatched = viewingHistory.slice(0, 6);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="homepage">
        <div className="loading-container">
          <div className="loading-text">Loading your personalized experience...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage">
        <div className="error-container">
          <div className="error-text">Something went wrong loading the homepage</div>
          <button className="retry-btn" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <div className="featured-section">
        <Banner />
      </div>
      
      <div className="homepage-content">
        {/* Quick Access Links */}
        <div className="quick-access">
          <h2>Quick Access</h2>
          <div className="quick-links">
            <Link to="/my-list" className="quick-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
              My List ({myList.length})
            </Link>
            <Link to="/browse" className="quick-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Browse All
            </Link>
            <Link to="/search" className="quick-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              Search
            </Link>
            <Link to="/viewing-history" className="quick-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
              </svg>
              History
            </Link>
          </div>
        </div>

        {/* Continue Watching */}
        {recentlyWatched.length > 0 && (
          <div className="continue-watching">
            <h2>Continue Watching</h2>
            <div className="continue-grid">
              {recentlyWatched.map((item, index) => (
                <div key={index} className="continue-item">
                  <img
                    src={`${imageUrl}${item.backdrop_path || item.poster_path}`}
                    alt={item.title || item.name}
                    className="continue-poster"
                  />
                  <div className="continue-info">
                    <div className="continue-title">{item.title || item.name}</div>
                    <div className="continue-progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${item.progress || 25}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Rows */}
        <div className="content-section">
          <RowPost url={trending} title='Trending Now' />
        </div>
        
        <div className="content-section">
          <RowPost url={originals} title='Netflix Originals' />
        </div>
        
        <div className="content-section">
          <RowPost url={actions} title='Action Movies' isSmall />
        </div>
        
        <div className="content-section">
          <RowPost url={comedy} title='Comedy Movies' isSmall />
        </div>
        
        <div className="content-section">
          <RowPost url={horror} title='Horror Movies' isSmall />
        </div>
        
        <div className="content-section">
          <RowPost url={romance} title='Romance Movies' isSmall />
        </div>
        
        <div className="content-section">
          <RowPost url={documentaries} title='Documentaries' isSmall />
        </div>
      </div>
    </div>
  );
}

export default HomePage;