import React from 'react';
import Banner from '../../Components/Banner/Banner';
import RowPost from '../../Components/RowPost/RowPost';
import { actions, originals, comedy, horror, romance, documentaries } from '../../Urls';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <Banner />
      <div className="homepage-content">
        <RowPost url={originals} title='Netflix Originals' />
        <RowPost url={actions} title='Action Movies' isSmall />
        <RowPost url={comedy} title='Comedy Movies' isSmall />
        <RowPost url={horror} title='Horror Movies' isSmall />
        <RowPost url={romance} title='Romance Movies' isSmall />
        <RowPost url={documentaries} title='Documentaries' isSmall />
      </div>
    </div>
  );
}

export default HomePage;