import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RowPost from '../../Components/RowPost/RowPost';
import { actions, originals, comedy, horror, romance, documentaries, trending } from '../../Urls';
import './BrowsePage.css';

function BrowsePage() {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  const categories = [
    { id: 'all', name: 'All', url: trending },
    { id: 'movies', name: 'Movies', url: actions },
    { id: 'tv-shows', name: 'TV Shows', url: originals },
    { id: 'new-releases', name: 'New Releases', url: trending },
    { id: 'popular', name: 'Popular', url: trending }
  ];

  const genres = [
    { id: 28, name: 'Action', url: actions },
    { id: 35, name: 'Comedy', url: comedy },
    { id: 27, name: 'Horror', url: horror },
    { id: 10749, name: 'Romance', url: romance },
    { id: 99, name: 'Documentary', url: documentaries }
  ];

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1>Browse</h1>
        <div className="category-nav">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/browse/${cat.id}`}
              className={`category-link ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="browse-content">
        <div className="genre-section">
          <h2>Browse by Genre</h2>
          <div className="genre-grid">
            {genres.map(genre => (
              <Link
                key={genre.id}
                to={`/genre/${genre.id}`}
                className="genre-card"
              >
                <div className="genre-card-content">
                  <h3>{genre.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="content-rows">
          {selectedCategory === 'all' && (
            <>
              <RowPost url={trending} title='Trending Now' />
              <RowPost url={originals} title='Netflix Originals' isSmall />
              <RowPost url={actions} title='Action Movies' isSmall />
              <RowPost url={comedy} title='Comedy Movies' isSmall />
            </>
          )}
          
          {selectedCategory === 'movies' && (
            <>
              <RowPost url={actions} title='Action Movies' />
              <RowPost url={comedy} title='Comedy Movies' isSmall />
              <RowPost url={horror} title='Horror Movies' isSmall />
              <RowPost url={romance} title='Romance Movies' isSmall />
            </>
          )}
          
          {selectedCategory === 'tv-shows' && (
            <>
              <RowPost url={originals} title='Netflix Originals' />
              <RowPost url={trending} title='Trending TV Shows' isSmall />
            </>
          )}
          
          {(selectedCategory === 'new-releases' || selectedCategory === 'popular') && (
            <>
              <RowPost url={trending} title='Trending Now' />
              <RowPost url={actions} title='Popular Movies' isSmall />
              <RowPost url={originals} title='Popular TV Shows' isSmall />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;