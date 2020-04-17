import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSSOValue } from '../../Context';
import { cognitoApi, AccountsApi } from '../../lib';

function PrivateRoute({ callback, fallback, children }) {
  const sso = useSSOValue();
  const [redirectToAccount, setRedirectToAccount] = useState(false);
  const [makeCallback, setMakeCallback] = useState(false);

  useEffect(() => {
    if (!sso.isAuthenticated) setRedirectToAccount(true);
    setMakeCallback(true);
  }, [sso]);

  useEffect(() => {
    if (!redirectToAccount) return;

    if (typeof window !== 'undefined')
      window.location = `${sso.login}?source=${sso.source}&redirect=${sso.redirect}`;
  }, [redirectToAccount, sso]);

  useEffect(() => {
    if (!makeCallback) return;

    (async () => {
      const session = await cognitoApi.refreshSession();

      if (!session) {
        setRedirectToAccount(true);
        return;
      }

      if (callback) {
        const token = await cognitoApi.token();
        const user = await AccountsApi.getUser(token);
        const orgs = await AccountsApi.getOrgs(token);
        await callback({ token, user, orgs });
      }
    })();
  }, [callback, makeCallback, redirectToAccount, sso]);

  if (!!sso && sso.isAuthenticated) return children;
  return <>{fallback || ''}</>;
}

export { PrivateRoute };

PrivateRoute.defaultProps = {
  callback: null,
  fallback: null,
};

PrivateRoute.propTypes = {
  callback: PropTypes.func,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};
