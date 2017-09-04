import React from 'react';
//bootstrap stuff
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
//my stuff
import './css/Starship_Generator.css';
import Starship_Generator_Client from './apps/Starship_Generator_Client';


class Starship_Generator extends React.Component {
   render() {
      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <div className="aHeader">
                <h2>Background</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="summaryText">
                <p>
                  As I am currently studying for the AWS Solutions Architect certification, I figured I might
                  try my luck at demonstrating use of AWS SNS, SQS by creating a "Fanout" application architecture.
                </p><br/>
                <p>
                  In this architecture, A publisher will push to an SNS topic, the message will be replicated across multiple SQS
                  queues, each SQS queue would be linked to an application that would consume each queued message; essentially with the idea
                  being to decouple two application components and to allow for distributed asynchronous processing.
                </p><br/>
                <p>
                  You an even use this sort of architecture to replicate real data to both dev and production environments.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="aHeader">
                <h2>Summary</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="summaryText">
                <p>
                  Alright! So what I am going to do to demonstrate this sort of architecture is present you with a form whereby you will choose
                  which components will go into your starship. This data will then be published to an SNS topic which will have two SQS queues
                  that will be subscribed.
                </p><br/>
                <p>
                  One queue will lead to an application that will take the input you provided and procedurally generate an image of a starship
                  matching your parameters. This image will be pushed up to an S3 bucket, and be made available to you below the form.
                </p><br/>
                <p>
                  Another queue will lead to an application that will take the input you provided and procedurally generate the crew of your
                  starship.  This data will be pushed up to an S3 bucket, and be made available to you below the image of your presented ship.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="aHeader">
                <h2>Project</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="aProject">
                <Accordion>
                  <Panel header="Starship Generator" eventKey="1">
                    <Starship_Generator_Client/>
                  </Panel>
                </Accordion>
              </div>
            </Col>
          </Row>
        </Grid>

      )
   }
}

export default Starship_Generator;
