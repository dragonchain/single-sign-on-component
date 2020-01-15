import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cognitoApi } from '../../lib';
import { SSOProvider } from '../../Context';

function SingleSignOn({ history, login, source, callback, redirect, children }) {
  const [config, setConfig] = useState({});

  useEffect(() => {
    (async () => {
      const userData = await cognitoApi.checkSession(false);
      const isAuthenticated = !!userData;

      setConfig({
        history,
        source,
        redirect: redirect || encodeURIComponent(window.location.href),
        login,
        isAuthenticated,
      });

      if (callback) callback(isAuthenticated);
    })();
  }, [callback, history, login, redirect, source]);

  if (!config.history) return <></>;
  return <SSOProvider value={config}>{children}</SSOProvider>;
}

export { SingleSignOn };

SingleSignOn.defaultProps = {
  callback: null,
  redirect: null,
};

SingleSignOn.propTypes = {
  login: PropTypes.string.isRequired,
  source: PropTypes.oneOf(['console', 'den', 'academy', 'scale']).isRequired,
  children: PropTypes.node.isRequired,
  callback: PropTypes.func,
  redirect: PropTypes.string,
};
