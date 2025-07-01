import React from 'react';
import { useMyList } from '../../context/MyListContext';
import { imageUrl } from '../../Constants/Constants';
import './MovieCard.css';

function MovieCard({ movie, onClick, className }) {
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  const inList = isInMyList(movie.id);

  const handleMyListClick = (e) => {
    e.stopPropagation();
    if (inList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie);
    }
  };

  return (
    <div className={`movie-card-container ${className}`}>
      <img 
        onClick={onClick}
        className="movie-poster-img" 
        alt="poster" 
        src={`${imageUrl}${movie.backdrop_path || movie.poster_path}`}
      />
      <div className="movie-card-overlay">
        <div className="movie-card-actions">
          <button 
            className="play-btn"
            onClick={onClick}
            title="Play"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <button 
            className={`my-list-btn ${inList ? 'in-list' : ''}`}
            onClick={handleMyListClick}
            title={inList ? 'Remove from My List' : 'Add to My List'}
          >
            {inList ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
            )}
          </button>
        </div>
        <div className="movie-card-info">
          <h4 className="movie-card-title">{movie.title || movie.name}</h4>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;