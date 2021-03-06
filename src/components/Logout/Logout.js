import { cognitoApi } from '../../lib';

const Logout = async (sso, redirectToAccounts = true) => {
  await cognitoApi.logout();

  if (redirectToAccounts) {
    const { login, source, redirect } = sso;
    if (typeof window !== 'undefined')
      window.location = `${login}?source=${source}&redirect=${redirect}`;
  }
};

export { Logout };
