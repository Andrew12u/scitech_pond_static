import React from 'react';
/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
/*My stuff*/
import '../css/Contact.css';


class Contact extends React.Component {
   render() {
      return (
        <Grid>
          <div>
            <Row>
              <Col xs={12}>
                <h3 id="contact_header">Contact</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>

                <h4 id="contact_subheader">For Professional Inquiries:</h4>
                <ul>
                  <li> <h5 id="contact_professional"><strong>E-mail: </strong> aizu (at) scitechpond (dot) com </h5> </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h4 id="contact_subheader">For All Other Inquiries:</h4>
                <ul>
                  <li> <h5 id="contact_professional"><strong>E-mail: </strong> aizu (at) scitechpond (dot) com </h5> </li>
                </ul>
              </Col>
            </Row>
          </div>
        </Grid>
      )
   }
}

export default Contact;
