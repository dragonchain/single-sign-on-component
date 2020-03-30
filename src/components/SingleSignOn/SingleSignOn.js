import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cognitoApi } from '../../lib';
import { SSOProvider } from '../../Context';

function SingleSignOn({ history, login, source, group, callback, redirect, children }) {
  const [config, setConfig] = useState({});

  useEffect(() => {
    (async () => {
      const userData = await cognitoApi.checkSession(false);
      let isAuthenticated = !!userData;

      if (isAuthenticated && group) {
        const groups = await cognitoApi.groups();
        isAuthenticated = groups.includes(group);
      }
      const redirectTo =
        redirect || (typeof window !== 'undefined' && encodeURIComponent(window.location.href));

      if (callback) await callback(isAuthenticated);
      console.log('apple');
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
  source: PropTypes.oneOf(['console', 'den', 'academy', 'scale']).isRequired,
  group: PropTypes.string,
  callback: PropTypes.func,
  redirect: PropTypes.string,
};
