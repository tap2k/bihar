import React from 'react';
import Link from 'next/link'; // Use Next.js Link component
import FieldsetContent from './field';

const SplashPage: React.FC = () => {
  return (
    <div className="splash-container">
      <div className="splash-title-container">
        <div>
          <Link href= "./field"> {/* Use href instead of to */}
            <a>
              <h1>Represent</h1>
            </a>
          </Link>
          <div>
            <div className="text-border">
              <h2>
                <Link href="./field"> {/* Use href instead of to */}
                  <a>Bihar</a>
                </Link>
              </h2>
            </div>
            <h3>Everyone has a story to tell</h3>
            <div className="title-decoration" />
          </div>
        </div>
      </div>
      <Link href="./field"> {/* Use href instead of to */}
        <a>
          <button>Go to Separate Page</button>
        </a>
      </Link>
      <a href="./field" id="search-button" target="_blank" rel="noopener noreferrer">
        Enter
      </a>

      <hr className="enter" />
      <a id="about" href="https://stories.represent.org">
        About
      </a>
    </div>
  );
};

export default SplashPage;
