import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  }

  async componentDidMount() {
    const userData = await cognitoApi.checkSession(true);
    if (userData) {
      this.onAuthorization(userData);
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  componentDidUpdate(prevProps) {
    const { location, getTokenCallback } = this.props;

    if (location !== prevProps.location) {
      cognitoApi.checkSession();
      if (getTokenCallback) return getTokenCallback(cognitoApi.getIdToken());
    }

    return undefined;
  }

  onAuthorization = async (data) => {
    const { getTokenCallback, changeAppState } = this.props;

    await getTokenCallback(cognitoApi.getIdToken());
    this.setState({ isLoggedIn: true });
    this.setState({ ...data }, () => {
      changeAppState('username', data.username);
      changeAppState('emailAddress', data.email);
      changeAppState('isWalletClaimed', !!data.claimed);
      changeAppState('ethereumAddress', data.ethereumAddress);
      changeAppState('logout', this.handleLogout);
    });
  }

  handleLogout = () => {
    cognitoApi.logout();
    this.setState({ isLoggedIn: false });
  }

  loginFailure() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn } = this.state;
    const { children } = this.props;

    return (
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
        {isLoggedIn ? children : <Login loginSuccess={this.onAuthorization} />}
      </Authenticator>
    );
  }
}

App.propTypes = {
  changeAppState: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  getTokenCallback: PropTypes.func.isRequired,
};
export default App;
