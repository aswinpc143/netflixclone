import React from 'react';
import { useViewingHistory } from '../../context/ViewingHistoryContext';
import { imageUrl } from '../../Constants/Constants';
import './ViewingHistoryPage.css';

function ViewingHistoryPage() {
  const { viewingHistory, clearHistory, removeFromHistory, loading } = useViewingHistory();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const groupByDate = (history) => {
    const groups = {};
    history.forEach(item => {
      const date = new Date(item.watched_at).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });
    return groups;
  };

  const groupedHistory = groupByDate(viewingHistory);

  if (loading) {
    return (
      <div className="viewing-history-page">
        <div className="history-header">
          <h1>Viewing History</h1>
        </div>
        <div className="empty-history">
          <div className="empty-history-content">
            <h2>Loading your viewing history...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (viewingHistory.length === 0) {
    return (
      <div className="viewing-history-page">
        <div className="history-header">
          <h1>Viewing History</h1>
        </div>
        <div className="empty-history">
          <div className="empty-history-content">
            <h2>No viewing history yet</h2>
            <p>Your recently watched movies and shows will appear here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="viewing-history-page">
      <div className="history-header">
        <div className="header-content">
          <h1>Viewing History</h1>
          <button className="clear-history-btn" onClick={clearHistory}>
            Clear All History
          </button>
        </div>
        <p className="history-count">
          {viewingHistory.length} {viewingHistory.length === 1 ? 'item' : 'items'} watched
        </p>
      </div>

      <div className="history-content">
        {Object.entries(groupedHistory)
          .sort(([a], [b]) => new Date(b) - new Date(a))
          .map(([date, items]) => (
            <div key={date} className="history-group">
              <h2 className="date-header">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h2>
              
              <div className="history-items">
                {items
                  .sort((a, b) => new Date(b.watched_at) - new Date(a.watched_at))
                  .map((item, index) => (
                    <div key={index} className="history-item">
                      <div className="item-poster">
                        <img
                          src={`${imageUrl}${item.backdrop_path || item.poster_path}`}
                          alt={item.title}
                          className="poster-image"
                        />
                        <div className="play-overlay">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="item-info">
                        <h3 className="item-title">{item.title}</h3>
                        <p className="item-overview">
                          {item.overview ? 
                            (item.overview.length > 120 ? 
                              item.overview.substring(0, 120) + '...' : 
                              item.overview
                            ) : 
                            'No description available'
                          }
                        </p>
                        <div className="item-meta">
                          <span className="watch-time">Watched {formatDate(item.watched_at)}</span>
                          {item.progress && (
                            <span className="progress">Progress: {Math.round(item.progress)}%</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="item-actions">
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromHistory(item.movie_id, item.watched_at)}
                          title="Remove from history"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ViewingHistoryPage;