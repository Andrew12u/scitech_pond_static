import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';



export function isUserLoggedIn(){
  let poolData = {
      UserPoolId: 'us-west-2_5CF1AgdI7',
      ClientId: '7mnegsrm5brlepbh0rbekshkfk'
  };
  let userPool = new CognitoUserPool(poolData);
  let cognitoUser = userPool.getCurrentUser();
  let sessionIsValid = false;
  if (cognitoUser != null) {
    cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err);
        sessionIsValid = false;
      }
      sessionIsValid = session.isValid();
    });
  }
  return sessionIsValid;
}

export function signoutUser(){
  let poolData = {
      UserPoolId: 'us-west-2_5CF1AgdI7',
      ClientId: '7mnegsrm5brlepbh0rbekshkfk'
  };
  let userPool = new CognitoUserPool(poolData);
  let cognitoUser = userPool.getCurrentUser();
  cognitoUser.signOut();
  cognitoUser.globalSignOut();
}

export function loginUser(username, password){
  let poolData = {
      UserPoolId: 'us-west-2_5CF1AgdI7',
      ClientId: '7mnegsrm5brlepbh0rbekshkfk'
  };
  let authenticationData = {
      Username: username,
      Password: password
  };
  var authenticationDetails = new AuthenticationDetails(authenticationData);

  var userPool = new CognitoUserPool(poolData);
  var userData = {
      Username: username,
      Pool: userPool
  };
  var cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
          console.log(result);
          console.log('access token + ' + result.getAccessToken().getJwtToken());
          document.location.href="/";
      },

      onFailure: function(err) {
          console.error(err);
      }
  });
}

export function registerUser(username, password, email){
  let poolData = {
      UserPoolId: 'us-west-2_5CF1AgdI7',
      ClientId: '7mnegsrm5brlepbh0rbekshkfk'
  };

  let userPool = new CognitoUserPool(poolData);

  let attributeList = [];

  let dataEmail = {
    Name: 'email',
    Value: email
  };

  let attributeEmail = new CognitoUserAttribute(dataEmail);

  attributeList.push(attributeEmail);

  console.log(`Register User ${username} ${email}`);
  userPool.signUp(username, password, attributeList, null, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      var cognitoUser = result.user;
      console.log('user registered as ' + cognitoUser.getUsername());
    }
  });
}

export function confirmUserRegistration(username, confirmation_code){
  let poolData = {
      UserPoolId: 'us-west-2_5CF1AgdI7',
      ClientId: '7mnegsrm5brlepbh0rbekshkfk'
  };

  let userPool = new CognitoUserPool(poolData);
  let userData = {
    Username : username,
    Pool : userPool
  };
  let cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(confirmation_code, true, function(err, result) {
    /*
    // For some reason, err is thrown if request takes too long.
    // this prevents confirmation_code from going through
    if (err) {
      alert(err);
      return;
    }
    */
    console.log('call result: ' + result);
  });
}

export function resendConfirmationCode(username){
  let poolData = {
      UserPoolId: 'us-west-2_5CF1AgdI7',
      ClientId: '7mnegsrm5brlepbh0rbekshkfk'
  };

  let userPool = new CognitoUserPool(poolData);
  let userData = {
    Username : username,
    Pool : userPool
  };
  let cognitoUser = new CognitoUser(userData);
  cognitoUser.resendConfirmationCode(function(err, result) {
    if (err) {
      alert(err);
      return;
    }
    console.log('call result: ' + result);
  });
}
