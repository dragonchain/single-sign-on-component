import React, { Component } from 'react';
import 'babel-polyfill';
import CognitoApi from '@dragonchain-dev/cognito-wrapper';
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
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.cognitoApi = null;
  }

  async componentDidMount() {
    this.cognitoApi = new CognitoApi(this.props.env || 'local', this.props.extension || 'com');

    const userData = await this.cognitoApi.checkSession(true);

    if (userData) {
      await this.onAuthorization(userData);
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  componentDidUpdate(prevProps) {
    const { location, getTokenCallback } = this.props;

    if (location !== prevProps.location) {
      this.cognitoApi.checkSession();
      if (getTokenCallback) return getTokenCallback(this.cognitoApi.getIdToken());
    }

    return undefined;
  }

  onAuthorization = async (data) => {
    const { getTokenCallback, changeAppState } = this.props;
    await getTokenCallback(this.cognitoApi.getIdToken());
    await this.setState({ ...data }, () => {
      changeAppState('username', data.username);
      changeAppState('emailAddress', data.email);
      changeAppState('isWalletClaimed', !!data.claimed);
      changeAppState('ethereumAddress', data.ethereumAddress);
      changeAppState('logout', this.handleLogout);
    });
		await this.setState({ isLoggedIn: true });
  }

  handleLogout = () => {
		const { changeAppState, resetState } = this.props;

		this.cognitoApi.logout();
		resetState()
		changeAppState('username', '');
		changeAppState('emailAddress', '');
		changeAppState('isWalletClaimed', false);
		changeAppState('ethereumAddress', '');
    this.setState({ isLoggedIn: false });
  }

  loginFailure() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn } = this.state;
    const { children, env } = this.props;
    const { login, checkSession } = this.cognitoApi;

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
        {isLoggedIn ? children : <Login env={env} loginSuccess={this.onAuthorization} checkSession={checkSession} login={login} />}
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
