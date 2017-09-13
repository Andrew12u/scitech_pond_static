import React from 'react';
/*My stuff*/
import '../css/Login.css';
import * as id_lib from '../lib/id_lib';
/*React Bootstrap stuff*/
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from  'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from  'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_username:"",
      user_email_address:"",
      user_password:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
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

  handleLoginChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });

  }

  handleValidation(){
    if(!this.state.user_password) return 'password is empty';
    if(!this.state.user_email_address) return 'email address is empty';

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

  //Seems like this can't be called at the form level.
  //By the time the server responds, the form refreshes which might throw things off
  handleSubmit(event) {
    let validationMsg = this.handleValidation();
    if(validationMsg !== 'success'){
      alert(validationMsg);
      return;
    };
    id_lib.loginUser(this.state.user_username, this.state.user_password);
  }


  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className="Login-Form-Title">
              <h2>Login</h2>
            </div>
          </Col>
        </Row>
        <Form>
          <fieldset disabled>
          <Row>
            <Col md={11}>
              <FormGroup
                controlId="loginUsernameFormInput"
                validationState={this.getUsernameValidationState()}>
                <Col md={2} componentClass={ControlLabel} className="Labels">
                  Preferred Username*
                </Col>
                <Col md={5}>
                  <FormControl
                    type="text"
                    name="user_username"
                    placeholder="Please Enter Your Username"
                    onChange={this.handleLoginChange}
                    required="true" />
                  <FormControl.Feedback />
                </Col>
                <Col xs={9} xsOffset={2}>
                  <HelpBlock>Username must be at least four characters.</HelpBlock>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <FormGroup
              controlId="loginEmailAddressFormInput"
              validationState={this.getEmailValidationState()}>
              <Col md={11}>
                <Col md={2} componentClass={ControlLabel} className="Labels">
                  E-mail Address*
                </Col>
                <Col md={5}>
                  <FormControl
                    type="email"
                    name="user_email_address"
                    placeholder="Please Enter Your E-mail Address"
                    onChange={this.handleLoginChange}
                    required="true" />
                  <FormControl.Feedback />
                </Col>
              </Col>
              <Col xs={9} xsOffset={2}>
                <HelpBlock>Email address cannot be empty</HelpBlock>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup
              controlId="loginPasswordFormInput"
              validationState={this.getPasswordValidationState()}>
              <Col md={11}>
                <Col md={2} componentClass={ControlLabel} className="Labels">
                  Password*
                </Col>
                <Col md={5}>
                  <FormControl
                    type="password"
                    name="user_password"
                    placeholder="Please Enter Your Password"
                    onChange={this.handleLoginChange}
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
              controlId="loginSubmitAndRegister">
              <Col md={1} mdOffset={2}>
                <Button className="btn btn-primary btn-large centerButton" onClick={this.handleSubmit}> Submit </Button>
              </Col>
              <Col md={4}>
                <div>Need an account? Please <u><a href="/register" className="Labels">register</a></u>. </div>
              </Col>
            </FormGroup>
          </Row>
          </fieldset>
        </Form>
        <Row>
          <Col xs={12}>
            <div className="Benefits-For-Logging-In">
              <h2>Eventual Benefits of Logging In?</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="Benefits-For-Logging-In">
              <ul>
                <li> Once you log in, you will be able to access demo projects and some 'special' content;  Although there isn&#39;t any at the moment, so...check back later! </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Login;
