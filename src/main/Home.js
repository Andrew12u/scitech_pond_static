import React from 'react';
import '../css/Home.css';

class Home extends React.Component {
   render() {
      return (
        <div className="background_content" id="scale_background">
          <div>
            <div id="home_headers">
              <h1 id="home_mainheader"> SciTechPond </h1>
              <h3 id="home_subheader"> A Safe Place to Discover </h3>
            </div>
          </div>
        </div>
      )
   }
}

export default Home;
