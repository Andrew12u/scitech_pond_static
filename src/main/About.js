import React from 'react';

/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
/*My stuff*/
import '../css/About.css';


class About extends React.Component {
   render() {
      return (
        <Grid>
          <div>
            <Row>
              <Col xs={12}>
                <div className="welcome_text">
                  <h3 id="welcome_header">Welcome to SciTechPond!</h3>
                  <h5 id="welcome_subheader">I am sure you have questions.  Dont worry, I do too! :-)</h5>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <h3 id="faq-header"> FAQ </h3>
              </Col>
            </Row>

            <Row>
              <Col xs={12} className="faq-col">
                <div className="faq-question">
                  <h4 className="faq-title">What is this site is about?</h4>
                  <div className="faq-answer">
                    <p> The aim of this website is to provide a safe place to demonstrate technical, mathematical and scientific principles.</p>
                    <p> It is one thing to read material on a particular subject, but in order to distill that raw <em>data</em> into <strong>knowledge</strong> takes
                        quite a bit more effort. Hopefully by developing and maintaining this website, I can not only demonstrate knowledge for myself, but also share
                        it with others. </p>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12} className="faq-col">
                <div className="faq-question">
                  <h4 className="faq-title">What do you seek to accomplish with this site?</h4>
                  <div className="faq-answer">
                    <p> I seek knowledge.  I seek to demonstrate knowledge; I seek to document my efforts to find it; I seek to share what I find with others. </p>
                  </div>
                </div>
              </Col>
            </Row>

          </div>
        </Grid>
      )
   }
}

export default About;
