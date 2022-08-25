import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cognitoApi, parse } from '../../lib';
import { SSOProvider } from '../../Context';

function SingleSignOn({ history, login, source, group, callback, redirect, children }) {
  const [config, setConfig] = useState({});

  useEffect(() => {
    (async () => {
      if (history && ['academy', 'den', 'eternal'].includes(source)) {
        const { refreshToken } = parse(history.location.search);
        if (refreshToken) {
          await cognitoApi.loginWithToken(refreshToken);
          history.push(history.location.pathname);
        }
      }

      const userData = await cognitoApi.checkSession(false);
      let isAuthenticated = !!userData;

      if (isAuthenticated && group) {
        const groups = await cognitoApi.groups();
        isAuthenticated = groups.includes(group);
      }

      const redirectTo =
        redirect || (typeof window !== 'undefined' && encodeURIComponent(window.location.href));

      if (callback) await callback(isAuthenticated);
      setConfig({
        history,
        source,
        redirect: redirectTo,
        login,
        isAuthenticated,
      });
    })();
  }, [callback, group, history, login, redirect, source]);

  if (!config.history) return <></>;
  return <SSOProvider value={config}>{children}</SSOProvider>;
}

export { SingleSignOn };

SingleSignOn.defaultProps = {
  callback: null,
  redirect: null,
  group: null,
};

SingleSignOn.propTypes = {
  login: PropTypes.string.isRequired,
  source: PropTypes.oneOf(['academy', 'console', 'den', 'eternal']).isRequired,
  group: PropTypes.string,
  callback: PropTypes.func,
  redirect: PropTypes.string,
};
