import React from 'react';

/*REACT Bootstrap Stuff*/
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from  'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from  'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

//My CSS stuff
import "../css/General_Project.css"
import "./css/Minesweeper.css"
import App from './App';

class Minesweeper extends React.Component {
  constructor(props){
     super(props);
  }
  render() {
    return(
      <Grid>
        <Row>
          <Col md={12}>
            <h3 className="Blog-Headers">Minesweeper</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h4 className="Blog-Headers">Overview</h4>
            <p className="Blog-Text">
              A couple of months ago, I was given a coding question for coding up
              minesweeper.  This is what I came up with.  There are a few limitations,
              one of which is that you have to wait a bit for mines to be deployed.
            </p><br/>
            <p className="Blog-Text">
              Obviously this might not work in a mobile contexts.  The bigger the screen,
              the better.
            </p><br/>
            <p className="Blog-Text">
              If I recall, you will never get a message saying you won.  But don&#39;t
              worry...You&#39;re still a winner in my book!
            </p><br/>
            <p className="Blog-Text">
              Code can be found
              <a href="https://github.com/Andrew12u/minesweeper"> here</a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <App/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Minesweeper;
