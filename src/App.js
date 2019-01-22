import React, { Component } from 'react';
import {
  Authenticator,
  Greetings,
  SignIn,
  SignOut,
  SignUp,
  ConfirmSignIn,
  RequireNewPassword,
  ConfirmSignUp,
  VerifyContact,
  ForgotPassword,
  TOTPSetup,
} from 'aws-amplify-react';
import cognitoApi from './lib/CognitoApiWrapper';
import Login from './custom/Login';

const defaultState = {
  isLoggedIn: false,
  username: '',
  email: '',
  email_verified: false,
  claimed: false,
  ethereumAddress: '',
};

class App extends Component {
  constructor() {
    super();
    this.state = defaultState;
    this.handleLogout = this.handleLogout.bind(this);
    this.onAuthorization = this.onAuthorization.bind(this);
  }

  async componentDidMount() {
    const userData = await cognitoApi.checkSession(true);
    if (userData) {
      this.onAuthorization(userData);
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  loginFailure() {
    this.setState({ isLoggedIn: false });
  }

  onAuthorization(data) {
    const { appContext } = this.props;
    this.setState({ isLoggedIn: true });
    this.setState({ ...data }, () => {
      appContext.changeAppState('username', data.username);
      appContext.changeAppState('emailAddress', data.email);
      appContext.changeAppState('isWalletClaimed', !!data.claimed);
      appContext.changeAppState('ethereumAddress', data.ethereumAddress);
      // this could be a new loginContext
      appContext.changeAppState('logout', this.handleLogout);
    });
  }

  handleLogout() {
    cognitoApi.logout();
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      // eslint-disable-next-line max-len
      <Authenticator
        theme={{ Container: {} }}
        hide={[
          Greetings,
          SignIn,
          SignOut,
          SignUp,
          ConfirmSignIn,
          RequireNewPassword,
          ConfirmSignUp,
          VerifyContact,
          ForgotPassword,
          TOTPSetup]}
      >
        {isLoggedIn
				  ? this.props.children
				  : <Login loginSuccess={this.onAuthorization} />}
      </Authenticator>
    );
  }
}
export default App;
