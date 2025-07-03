import React from 'react';
import { useMyList } from '../../context/MyListContext';
import { imageUrl } from '../../Constants/Constants';
import './MyList.css';

function MyList() {
  const { myList, removeFromMyList, loading } = useMyList();

  if (loading) {
    return (
      <div className="my-list-container">
        <div className="my-list-header">
          <h1>My List</h1>
        </div>
        <div className="empty-list">
          <div className="empty-list-content">
            <h2>Loading your list...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (myList.length === 0) {
    return (
      <div className="my-list-container">
        <div className="my-list-header">
          <h1>My List</h1>
        </div>
        <div className="empty-list">
          <div className="empty-list-content">
            <h2>Your list is empty</h2>
            <p>Movies and shows you add to your list will appear here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-list-container">
      <div className="my-list-header">
        <h1>My List</h1>
        <span className="list-count">{myList.length} {myList.length === 1 ? 'title' : 'titles'}</span>
      </div>
      
      <div className="my-list-grid">
        {myList.map((item) => (
          <div key={item.id} className="my-list-item">
            <div className="movie-card">
              <img 
                src={`${imageUrl}${item.backdrop_path || item.poster_path}`}
                alt={item.title}
                className="movie-poster"
              />
              <div className="movie-overlay">
                <div className="movie-info">
                  <h3 className="movie-title">{item.title}</h3>
                  <p className="movie-overview">
                    {item.overview ? 
                      (item.overview.length > 150 ? 
                        item.overview.substring(0, 150) + '...' : 
                        item.overview
                      ) : 
                      'No description available'
                    }
                  </p>
                  <div className="movie-actions">
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromMyList(item.movie_id)}
                      title="Remove from My List"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyList;