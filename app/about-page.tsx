import React, { useEffect } from 'react';

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="about-page overlay">
        <hr className="left" />
        <a href="./" target="_blank" rel="noopener noreferrer">
          <h2>About</h2>
        </a>
        <hr className="right" />
        <h1 className="represent">
          <a href="./" target="_blank" rel="noopener noreferrer">
            Represent Bihar
          </a>
        </h1>
        <div className="about-content">
          <p>
            Stories are the embodiment of our unique experiences and journeys, providing the narrative behind our myths, legends, and folktales, and are our primary way of remembering the past. Represent provides a platform for the sharing of stories of all types, from all places and people.
            <br />
            <br />
            <b>Narrators are listed by name on their respective stories. They retain all rights to their stories, including in their spoken, transcripted, and translated forms. All narrators have given their oral consent for recording and publishing their stories. The artwork and photos used with the stories are paid commissioned work.</b>
            <br />
            <br />
            Our first collection of stories is from the state of Bihar. Through a variety of dialects and modalities, they tell us about the culture and history of Bihar using stories and songs. If you would prefer to stream these stories, they are also on <a href="https://soundcloud.com/representorg/sets/stories-of-bihar" target="_blank" rel="noopener noreferrer">Soundcloud</a>. We hope you enjoy the opportunity to explore this ancient land.
            <br />
            <br />
            <b>Landing Page Illustration: Nagma Khan</b>
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
