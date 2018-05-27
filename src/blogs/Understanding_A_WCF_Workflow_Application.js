import React from 'react';

/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

//My CSS stuff
import "./css/General_Blog.css"
import "./css/Understanding_A_WCF_Workflow_Application.css"
var links = {
  sendClass: "https://docs.microsoft.com/en-us/dotnet/api/system.servicemodel.activities.send?view=netframework-4.7.1",
  sendReployClass: "https://docs.microsoft.com/en-us/dotnet/api/system.servicemodel.activities.sendreply?view=netframework-4.7.1",
  receiveClass: "https://docs.microsoft.com/en-us/dotnet/api/system.servicemodel.activities.receive?view=netframework-4.7.1",
  receiveReplyClass: "https://docs.microsoft.com/en-us/dotnet/api/system.servicemodel.activities.receive?view=netframework-4.7.1",
  whatIsXAML: "https://msdn.microsoft.com/en-us/library/cc295302.aspx"
}
class Understanding_A_WCF_Workflow_Application extends React.Component {
  constructor(props){
     super(props);
  }
  render() {
    return(
      <Grid>
        <Row>
          <Col md={12}>
            <h3 className="Blog-Headers"> Understanding A WCF Workflow Application </h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h4 className="Blog-Headers"> Overview </h4>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="Blog-Text">
              WCF Workflow Applications are essentially a WYSIWYG approach to designing
              a WCF service.  More specifically, by denoting specific service actions
              like <a href={links.sendClass}>Send</a>, <a href={links.sendClass}>SendReply</a>,
              <a href={links.receiveClass}>Receive</a>, <a href={links.receiveReplyClass}>ReceiveReply</a>
              and ordering them in certain ways in a <a href={links.whatIsXAML}>XAML</a> interface,
              you can create a ready to use service pretty easily.
            </p>
            <p className="Blog-Text">
              In this blog post, I  will create a simple mining service, loosely based upon minecraft,
              whereby a user will "find" a various ores.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h4 className="Blog-Headers"> Messaging Activities </h4>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="WCFWorkflowMessagingPic"></div>
            <p className="Blog-Text">
              In this particular case, this service will begin with a Receive activity and trigger
              actions accordingly.
            </p>
          </Col>
        </Row>
      </Grid>

    );
  }
}

export default Understanding_A_WCF_Workflow_Application;
