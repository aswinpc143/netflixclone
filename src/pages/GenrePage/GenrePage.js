import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../Axios';
import { API_KEY } from '../../Constants/Constants';
import MovieCard from '../../Components/MovieCard/MovieCard';
import YouTube from 'react-youtube';
import './GenrePage.css';

function GenrePage() {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [loading, setLoading] = useState(true);
  const [urlId, setUrlId] = useState('');

  const genreNames = {
    28: 'Action',
    35: 'Comedy',
    27: 'Horror',
    10749: 'Romance',
    99: 'Documentary',
    18: 'Drama',
    878: 'Science Fiction',
    53: 'Thriller',
    16: 'Animation',
    10751: 'Family'
  };

  useEffect(() => {
    setLoading(true);
    setGenreName(genreNames[genreId] || 'Movies');
    
    axios.get(`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`)
      .then(response => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error fetching genre movies:", err);
        setLoading(false);
      });
  }, [genreId]);

  const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
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

  if (loading) {
    return (
      <div className="genre-page loading">
        <div className="loading-spinner">Loading {genreName} movies...</div>
      </div>
    );
  }

  return (
    <div className="genre-page">
      <div className="genre-header">
        <h1>{genreName} Movies</h1>
        <p>Discover the best {genreName.toLowerCase()} movies</p>
      </div>

      <div className="genre-grid">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            onClick={() => handleMovie(movie.id)}
            className="genre-movie-card"
          />
        ))}
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

export default GenrePage;