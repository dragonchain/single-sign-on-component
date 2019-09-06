import React from 'react';
import PropTypes from 'prop-types';
import { cognitoApi, AccountsApi } from '../lib';
import { GlobalConfig } from '../globals';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentWillMount = async () => {
    const userData = await cognitoApi.checkSession(false);

    if (userData) {
      await this.authorize();
    } else {
      this.redirectToAccount();
    }
  }

  authorize = async () => {
    const { userSessionCallback } = this.props;
    const token = await cognitoApi.token();
    const user = await AccountsApi.getUser(token);
    const orgs = await AccountsApi.getOrgs(token);

    await userSessionCallback({ token, user, orgs });

    this.setState({ isLoggedIn: true });
  }

  redirectToAccount = () => {
    const { source, redirect } = this.props;
    window.location = `${GlobalConfig.ACCOUNT_URL}/login?source=${source}&redirect=${redirect}`;
  }

  render() {
    const { isLoggedIn } = this.state;
    const { children } = this.props;

    if (isLoggedIn) return children;
    return null;
  }
}

PrivateRoute.propTypes = {
  redirect: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired, // application [dragonden, academy, console, ctlc]
  children: PropTypes.node.isRequired,
  userSessionCallback: PropTypes.func.isRequired,
};

export default PrivateRoute;
