import React from 'react';
import FieldsetContent from './field'; 

const Home = () => {
  return (
    <div>
      <div className="map"></div>
      <div className="mobile-layout">
        <div className="tapestry-title">
          <h1>
            <a href="./">Represent Bihar</a>
          </h1>
        </div>
      </div>
      <div id="left-panel" className="desktop-layout">
        <div className="tapestry-title-b">
          <h1 className="represent">
            <a href="./">Represent Bihar</a>
          </h1>
        </div>
        <div className="button-center">
          <a id="search-button" style={{ fontWeight: 'normal' }}>Explore</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
