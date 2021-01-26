import React from 'react';
import './about.styles.scss';

const AboutPage = ()=>{
    return (
      <div className="about-container">
        <div className="about-wrapper">
          <h2>Welcome to my menu planner.</h2>
          <p>
            {" "}
            This page is not part of greeklife services. I created this project
            on my free time, for learning purposes.
          </p>
        </div>
        <div className="info-wrapper">
          <p>
            Right now this project is very basic and it just renders current
            week's meals. I will slowly be updating more in the future as I get
            more familiar with what I am doing. It does not have any of the big
            functionality a lot of the other apps have.
          </p>
        </div>
      </div>
    );
}

export default AboutPage;