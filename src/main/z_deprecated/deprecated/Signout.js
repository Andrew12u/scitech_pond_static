import React from 'react';
/*My stuff*/
import '../css/Signout.css';
import * as id_lib from '../lib/id_lib';
/*React Bootstrap stuff*/
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from  'react-bootstrap/lib/Form';
import Col from 'react-bootstrap/lib/Col';
import Button from  'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

class Signout extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
  }

  //Seems like this can't be called at the form level.
  //By the time the server responds, the form refreshes which might throw things off
  handleSignout(event) {
    id_lib.signoutUser();
  }


  render() {
     return (
       <Grid>
         <Row>
           <Col xs={12}>
             <div className="Signout-Form-Title">
               <h2>Aww! Sorry to see you go! )-:</h2>
               <h3>Hope you drop on by again!</h3>
             </div>
           </Col>
         </Row>
         <Row>
           <Form action="/" onSubmit={this.handleSignout}>
             <FormGroup
               controlId="signoutButton">
               <Col md={1}>
                 <Button className="btn btn-primary btn-large centerButton" type="submit"> Sign Out </Button>
               </Col>
             </FormGroup>
           </Form>
         </Row>
       </Grid>

     )
  }
}

export default Signout;
/*
<div>
   <h1>Sign Out</h1>
   <Form action="/" onSubmit={this.handleSignout}>

     <Col md={9} mdOffset={3}>
       <h2>Aww! Sorry to see you go! )-:</h2>
       <h3>Hope you drop on by again!</h3>
     </Col>
     <FormGroup
       controlId="signoutButton">
       <Col md={1} mdOffset={3}>
         <Button className="btn btn-primary btn-large centerButton" type="submit"> Sign Out </Button>
       </Col>
     </FormGroup>
   </Form>

</div>
*/
