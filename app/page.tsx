import React from 'react';
import '../css/style.css';
import SplashPage from './splash-page';
import Home from './map-page';

const Page = () => {
  return (
    <div>
      <title>Represent Bihar</title>
      <div className="map-page">
        {/* If you have content for the map page, add it here */}
      </div>
      <Home />
      <div className="splash-page">
        <SplashPage />
      </div>
    </div>
  );
};

export default Page;
