import React from 'react';

/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

//My CSS stuff
import "./css/General_Blog.css"
import "./css/A_Blog_Legacy.css"

class A_Blog_Legacy extends React.Component {
  constructor(props){
     super(props);
  }
  render() {
    return(
      <Grid>
        <Row>
          <Col md={12}>
            <h3 className="Blog-Headers"> A Blog Legacy </h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="Blog-Text">
              Did you know I used to have blogspot blog? I bet you did!
            </p><br/>
            <p className="Blog-Text">
              Well, now you can check out that old blog <a href="http://scitechpond.blogspot.com/"
              target="_blank" rel="noopener noreferrer">here</a> too! Two blogs for the price of one!
              How lucky.
            </p><br/>
            <p className="Blog-Text">
              But seriously, I talked about some TSQL, C, and Java stuff in there, but rather than count
              the multiple entries within the blog breakdown, I will just count each language as being
              referenced once.
            </p><br/>
            <p className="Blog-Text">
              And apologies about the poor audio, heh.
            </p><br/>
          </Col>
        </Row>
      </Grid>

    );
  }
}

export default A_Blog_Legacy;
