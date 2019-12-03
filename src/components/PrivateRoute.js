import React from 'react';
import PropTypes from 'prop-types';
import { cognitoApi, AccountsApi, parseURLquery } from '../lib';
import { GlobalConfig } from '../globals';

const { ACCOUNT_URL } = GlobalConfig;

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount = async () => {
    const { history, source } = this.props;

    if (history && ['academy', 'scale'].includes(source)) {
      const { refreshToken } = parseURLquery(history.location.search);

      if (refreshToken) {
        await cognitoApi.loginWithToken(refreshToken);
        history.push(history.location.pathname);
      }
    }

    const userData = await cognitoApi.checkSession(false);

    if (!userData) { this.redirectToAccount(); return; }
    await this.authorize();
  }

  authorize = async () => {
    const { userSessionCallback } = this.props;
    const session = await cognitoApi.refreshSession();

    if (!session) { this.redirectToAccount(); return; }

    if (userSessionCallback) {
      const token = await cognitoApi.token();
      const user = await AccountsApi.getUser(token);
      const orgs = await AccountsApi.getOrgs(token);
      await userSessionCallback({ token, user, orgs });
    }

    this.setState({ isLoggedIn: true });
  }

  redirectToAccount = () => {
    const { overrideAccountUrl, source, redirect } = this.props;
    const accountUrl = overrideAccountUrl || ACCOUNT_URL;

    window.location = `${accountUrl}/login/?source=${source}&redirect=${redirect}`;
  }

  render() {
    const { isLoggedIn } = this.state;
    const { children, fallback } = this.props;

    if (isLoggedIn) return children;
    return (<>{fallback || ''}</>);
  }
}

PrivateRoute.defaultProps = {
  userSessionCallback:undefined,
};

PrivateRoute.propTypes = {
  redirect: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired, // application [console, den, academy, scale]
  children: PropTypes.node.isRequired,
  userSessionCallback: PropTypes.func,
};

export default PrivateRoute;
