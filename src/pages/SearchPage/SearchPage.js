import React, { useState, useEffect } from 'react';
import axios from '../../Axios';
import { API_KEY } from '../../Constants/Constants';
import MovieCard from '../../Components/MovieCard/MovieCard';
import YouTube from 'react-youtube';
import './SearchPage.css';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [urlId, setUrlId] = useState('');
  const [searchType, setSearchType] = useState('multi');

  useEffect(() => {
    if (searchQuery.trim()) {
      const delayedSearch = setTimeout(() => {
        performSearch();
      }, 500);

      return () => clearTimeout(delayedSearch);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, searchType]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/search/${searchType}?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`
      );
      setSearchResults(response.data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMovie = (id, mediaType = 'movie') => {
    const endpoint = mediaType === 'tv' ? 'tv' : 'movie';
    axios.get(`/${endpoint}/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          console.log("No trailer found");
        }
      });
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search</h1>
        <div className="search-container">
          <div className="search-input-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search for movies, TV shows, actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="search-filters">
            <button
              className={`filter-btn ${searchType === 'multi' ? 'active' : ''}`}
              onClick={() => setSearchType('multi')}
            >
              All
            </button>
            <button
              className={`filter-btn ${searchType === 'movie' ? 'active' : ''}`}
              onClick={() => setSearchType('movie')}
            >
              Movies
            </button>
            <button
              className={`filter-btn ${searchType === 'tv' ? 'active' : ''}`}
              onClick={() => setSearchType('tv')}
            >
              TV Shows
            </button>
            <button
              className={`filter-btn ${searchType === 'person' ? 'active' : ''}`}
              onClick={() => setSearchType('person')}
            >
              People
            </button>
          </div>
        </div>
      </div>

      <div className="search-content">
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner">Searching...</div>
          </div>
        )}

        {!loading && searchQuery && searchResults.length === 0 && (
          <div className="no-results">
            <h2>No results found for "{searchQuery}"</h2>
            <p>Try different keywords or check your spelling</p>
          </div>
        )}

        {!loading && searchResults.length > 0 && (
          <div className="search-results">
            <h2>Search Results ({searchResults.length})</h2>
            <div className="results-grid">
              {searchResults.map((item, index) => {
                if (item.media_type === 'person' || searchType === 'person') {
                  return (
                    <div key={index} className="person-card">
                      <img
                        src={item.profile_path 
                          ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                          : 'https://via.placeholder.com/200x300?text=No+Image'
                        }
                        alt={item.name}
                        className="person-image"
                      />
                      <div className="person-info">
                        <h3>{item.name}</h3>
                        <p>{item.known_for_department}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <MovieCard
                      key={index}
                      movie={item}
                      onClick={() => handleMovie(item.id, item.media_type)}
                      className="search-movie-card"
                    />
                  );
                }
              })}
            </div>
          </div>
        )}

        {!searchQuery && (
          <div className="search-suggestions">
            <h2>Popular Searches</h2>
            <div className="suggestions-grid">
              {['Action', 'Comedy', 'Horror', 'Romance', 'Thriller', 'Drama'].map(genre => (
                <button
                  key={genre}
                  className="suggestion-btn"
                  onClick={() => setSearchQuery(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {urlId && (
        <div className="trailer-section">
          <h2>Trailer</h2>
          <YouTube opts={opts} videoId={urlId.key} />
        </div>
      )}
    </div>
  );
}

export default SearchPage;