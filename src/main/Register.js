import React from 'react';
/*My stuff*/
import '../css/Register.css';
import * as id_lib from '../lib/id_lib';
/*React Bootstrap stuff*/
import Button from  'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from  'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Grid from 'react-bootstrap/lib/Grid';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Modal from  'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_username:"",
      user_email_address:"",
      user_password:"",
      confirmation_code:"",
      user_password_confirmed:"",
      show_modal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleRegisterChange = this.handleRegisterChange.bind(this);
    this.handleResendConfirmation = this.handleResendConfirmation.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }



  getUsernameValidationState(){
    const lengthUserName = this.state.user_username.length;
    if (lengthUserName >= 4) return 'success';
    else return 'error';
  }
  getPasswordValidationState(){
    const lengthOfPassword = this.state.user_password.length;
    let passHasAtLeastOneDigit = /(?:\d*)?\d+/.test(this.state.user_password);
    let passHasAtLeastOneCapital = /(?:[A-Z]*)?[A-Z]+/.test(this.state.user_password);
    let passHasAtLeastOneSymbol = /(?:[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]*)?[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+/.test(this.state.user_password);
    if(lengthOfPassword < 8) return 'error';
    if(!passHasAtLeastOneDigit || !passHasAtLeastOneCapital || !passHasAtLeastOneSymbol) return 'error';


    return 'success';
  }
  getEmailValidationState(){
    const lengthOfEmailAddr = this.state.user_email_address.length;
    if(lengthOfEmailAddr > 0) return 'success';
    else return 'error';
  }
  getPasswordConfirmationValidationState(){
    if(!this.state.user_password || !this.state.user_password_confirmed) return 'error';
    if(this.state.user_password === this.state.user_password_confirmed) return 'success';
    return 'error';
  }
  getConfirmationCodeValidationState(){
    if(this.state.confirmation_code.length < 4) return 'error';
    return 'success';
  }
  handleRegisterChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });

  }
  handleRegister(event){
    id_lib.registerUser(this.state.user_username, this.state.user_password, this.state.user_email_address);
  }

  handleConfirmation(event){
    id_lib.confirmUserRegistration(this.state.user_username, this.state.confirmation_code);
    this.setState({show_modal: false});
  }

  handleResendConfirmation(event){
    id_lib.resendConfirmationCode(this.state.user_username);
  }

  handleValidation(){
    if(!this.state.user_password || !this.state.user_password_confirmed) return 'either your password or its confirmation are empty';
    if(this.state.user_password !== this.state.user_password_confirmed) return 'password entries do not match';

    const lengthOfPassword = this.state.user_password.length;
    let passHasAtLeastOneDigit = /(?:\d*)?\d+/.test(this.state.user_password);
    let passHasAtLeastOneCapital = /(?:[A-Z]*)?[A-Z]+/.test(this.state.user_password);
    let passHasAtLeastOneSymbol = /(?:[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]*)?[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+/.test(this.state.user_password);
    if(lengthOfPassword < 8) return 'password should be at least 8 characters';
    if(!passHasAtLeastOneDigit || !passHasAtLeastOneCapital || !passHasAtLeastOneSymbol) return 'password should contain one digit, capital, and symbol';

    const lengthUserName = this.state.user_username.length;
    if (lengthUserName < 4) return 'username should be at least 4 characters';
    return 'success';
  }


  handleSubmit(event) {
    //alert(JSON.stringify(this.state));
    let validationMsg = this.handleValidation();
    if(validationMsg !== 'success'){
      alert(validationMsg);
      return;
    };
    this.handleRegister(event);
    this.setState({show_modal: true});
  }

  showModal(){
    this.setState({show_modal: true});
  }
  closeModal(){
    this.setState({show_modal: false});
  }


  render() {
     return (
       <Grid>
         <div>
           <Row>
             <Col xs={12}>
               <div className="Register-Form-Title">
                 <h2>Register</h2>
               </div>
             </Col>
           </Row>
           <Form>
             <fieldset disabled>
             <Row>
               <FormGroup
                 controlId="registerUsernameFormInput"
                 validationState={this.getUsernameValidationState()}>
                 <Col md={11}>
                   <Col md={2} componentClass={ControlLabel} className="Labels">
                     Preferred Username*
                   </Col>
                   <Col md={5}>
                     <FormControl
                       type="text"
                       name="user_username"
                       placeholder="Please Enter Your Username"
                       onChange={this.handleRegisterChange}
                       required="true" />
                     <FormControl.Feedback />
                   </Col>
                 </Col>
                 <Col xs={9} xsOffset={2}>
                   <HelpBlock>Username must be at least four characters.</HelpBlock>
                 </Col>
               </FormGroup>
             </Row>
             <Row>
               <FormGroup
                 controlId="registerEmailAddressFormInput"
                 validationState={this.getEmailValidationState()}>
                 <Col md={11}>
                   <Col md={2} componentClass={ControlLabel}  className="Labels">
                     E-mail Address*
                   </Col>
                   <Col md={5}>
                     <FormControl
                       type="email"
                       name="user_email_address"
                       placeholder="Please Enter Your E-mail Address"
                       onChange={this.handleRegisterChange}
                       required="true" />
                   </Col>
                   <Col xs={9} xsOffset={2}>
                     <HelpBlock>Email Address cannot be empty</HelpBlock>
                   </Col>
                 </Col>
                 <Col md={11}>
                 <br/>
                 </Col>
               </FormGroup>
             </Row>
             <Row>
               <FormGroup
                 controlId="registerPasswordFormInput"
                 validationState={this.getPasswordValidationState()}>
                 <Col md={11}>
                   <Col md={2} componentClass={ControlLabel}>
                     Password*
                   </Col>
                   <Col md={5}>
                     <FormControl
                       type="password"
                       name="user_password"
                       placeholder="Please Enter Your Password"
                       onChange={this.handleRegisterChange}
                       required="true" />
                     <FormControl.Feedback />
                   </Col>
                 </Col>
                 <Col xs={9} xsOffset={2}>
                   <HelpBlock><p>Password must beat at least 8 characters</p>
                   <p>and contain at least one capital letter, digit, and symbol</p></HelpBlock>
                 </Col>
               </FormGroup>
             </Row>
             <Row>
               <FormGroup
                 controlId="registerPasswordConfirmationFormInput"
                 validationState={this.getPasswordConfirmationValidationState()}>
                 <Col md={11}>
                   <Col md={2} componentClass={ControlLabel}>
                     Confirm Password*
                   </Col>
                   <Col md={5}>
                     <FormControl
                       type="password"
                       name="user_password_confirmed"
                       placeholder="Please Enter Your Password Again"
                       onChange={this.handleRegisterChange}
                       required="true" />
                     <FormControl.Feedback />
                   </Col>
                 </Col>
                 <Col xs={9} xsOffset={2}>
                   <HelpBlock>The password you just entered should match</HelpBlock>
                 </Col>
               </FormGroup>
             </Row>
             <Row>
               <FormGroup
                 controlId="registerSubmitButton">
                 <Col md={6} mdOffset={2}>
                   <Button className="btn btn-primary btn-large centerButton" onClick={this.handleSubmit}> Submit </Button>
                 </Col>
               </FormGroup>
             </Row>
             </fieldset>
           </Form>
           <br/>
           <br/>
         </div>
         <Modal show={this.state.show_modal} onHide={this.closeModal}>
           <Modal.Header closeButton>
             <Modal.Title>Registration Confirmation</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <h4>Howdy!</h4>
             <p>Thank you for registering! Please check your email and provide the confirmation code below.</p>
             <p>After registering, you will need to <a href="/login"> login </a>.</p>

             <Form action="/login" onSubmit={this.handleConfirmation}>
               <FormGroup
                 controlId="confirmationCodeInput"
                 validationState={this.getConfirmationCodeValidationState()}>

                 <FormControl
                   type="text"
                   name="confirmation_code"
                   placeholder="Please Enter Your Confirmation Code"
                   onChange={this.handleRegisterChange}
                   required="true" />
                 <FormControl.Feedback />
                 <HelpBlock>Should be greater than 4 digits</HelpBlock>
               </FormGroup>
               <br/>

               <FormGroup
                 controlId="registerConfirmationButton">
                 <Button className="btn btn-primary btn-large centerButton" type="submit"> Submit </Button>
               </FormGroup>

             </Form>
           </Modal.Body>
           <Modal.Footer>
             <Button className="btn btn-primary btn-large centerButton"
               type="submit"
               onClick={this.handleResendConfirmation}> Resend Confirmation </Button>
             <Button onClick={this.closeModal}>Close</Button>
           </Modal.Footer>
         </Modal>
       </Grid>
     )
  }
}

export default Register;

//=============================================================================
//=============================================================================
//=============================================================================
/*

   <div>
      <h1>Register</h1>
      <Form>

        <FormGroup
          controlId="registerUsernameFormInput"
          validationState={this.getUsernameValidationState()}>
          <Col md={11} mdOffset={1}>
            <Col md={2} componentClass={ControlLabel}>
              Preferred Username*
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                name="user_username"
                placeholder="Please Enter Your Username"
                onChange={this.handleRegisterChange}
                required="true" />
              <FormControl.Feedback />
            </Col>
          </Col>
          <Col md={9} mdOffset={3}>
            <HelpBlock>Username must be at least four characters.</HelpBlock>
          </Col>
        </FormGroup>

        <FormGroup
          controlId="registerEmailAddressFormInput">
          <Col md={11} mdOffset={1}>
            <Col md={2} componentClass={ControlLabel}>
              E-mail Address*
            </Col>
            <Col md={5}>
              <FormControl
                type="email"
                name="user_email_address"
                placeholder="Please Enter Your E-mail Address"
                onChange={this.handleRegisterChange}
                required="true" />
            </Col>
          </Col>
          <Col md={11} mdOffset={1}>
          <br/>
          </Col>
        </FormGroup>
        <FormGroup
          controlId="registerPasswordFormInput"
          validationState={this.getPasswordValidationState()}>
          <Col md={11} mdOffset={1}>
            <Col md={2} componentClass={ControlLabel}>
              Password*
            </Col>
            <Col md={5}>
              <FormControl
                type="password"
                name="user_password"
                placeholder="Please Enter Your Password"
                onChange={this.handleRegisterChange}
                required="true" />
              <FormControl.Feedback />
            </Col>
          </Col>
          <Col md={9} mdOffset={3}>
            <HelpBlock><p>Password must beat at least 8 characters</p>
            <p>and contain at least one capital letter, digit, and symbol</p></HelpBlock>
          </Col>
        </FormGroup>

        <FormGroup
          controlId="registerPasswordConfirmationFormInput"
          validationState={this.getPasswordConfirmationValidationState()}>
          <Col md={11} mdOffset={1}>
            <Col md={2} componentClass={ControlLabel}>
              Confirm Password*
            </Col>
            <Col md={5}>
              <FormControl
                type="password"
                name="user_password_confirmed"
                placeholder="Please Enter Your Password Again"
                onChange={this.handleRegisterChange}
                required="true" />
              <FormControl.Feedback />
            </Col>
          </Col>
          <Col md={9} mdOffset={3}>
            <HelpBlock>The password you just entered should match</HelpBlock>
          </Col>
        </FormGroup>


        <FormGroup
          controlId="registerSubmitButton">
          <Col md={6} mdOffset={3}>
            <Button className="btn btn-primary btn-large centerButton" onClick={this.handleSubmit}> Submit </Button>
          </Col>
        </FormGroup>
      </Form>

      <br/>
      <br/>

      <Modal show={this.state.show_modal} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Howdy!</h4>
          <p>Thank you for registering! Please check your email and provide the confirmation code below.</p>
          <p>After registering, you will need to <a href="/login"> login </a>.</p>

          <Form action="/login" onSubmit={this.handleConfirmation}>
            <FormGroup
              controlId="confirmationCodeInput"
              validationState={this.getConfirmationCodeValidationState()}>

              <FormControl
                type="text"
                name="confirmation_code"
                placeholder="Please Enter Your Confirmation Code"
                onChange={this.handleRegisterChange}
                required="true" />
              <FormControl.Feedback />
              <HelpBlock>Should be greater than 4 digits</HelpBlock>
            </FormGroup>
            <br/>

            <FormGroup
              controlId="registerConfirmationButton">
              <Button className="btn btn-primary btn-large centerButton" type="submit"> Submit </Button>
            </FormGroup>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary btn-large centerButton"
            type="submit"
            onClick={this.handleResendConfirmation}> Resend Confirmation </Button>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
    </Modal>

   </div>
*/
