import React from 'react';
import PropTypes from 'prop-types';
import { cognitoApi, AnalyticAction } from '../lib';
import { GlobalConfig } from '../globals';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentWillMount = async () => {
    const userData = await cognitoApi.checkSession(true);

    if (userData) {
      await this.authorize(userData);
    } else {
      this.redirectToAccount();
    }
  }

  authorize = async (userData) => {
    const { source, redirect } = this.props;
    const { userSessionCallback } = this.props;
    const token = await cognitoApi.token();

    await userSessionCallback(token, userData);

    AnalyticAction.identify(userData.username);
    AnalyticAction.track(`Viewed ${source}`, {
      $username: userData.username,
      $source: source,
      $location: redirect,
    });
    AnalyticAction.people.increment(`${source} Logins`);
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
