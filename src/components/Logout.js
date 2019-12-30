import PropTypes from 'prop-types';
import { cognitoApi } from '../lib';
import { GlobalConfig } from '../globals';

const Logout = async (source, redirect, redirectToAccounts = true) => {
  await cognitoApi.logout();
  if (redirectToAccounts) {
    window.location = `${GlobalConfig.ACCOUNT_URL}/login/?source=${source}&redirect=${redirect}`;
  }
};

Logout.propTypes = {
  redirect: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired, // application [console, den, academy, scale]
};

export default Logout;
