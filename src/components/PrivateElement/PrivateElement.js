/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { useSSOValue } from '../../Context';

function PrivateElement({ children, fallback }) {
  const sso = useSSOValue();

  if (sso.isAuthenticated) return <>{children}</>;
  return <>{fallback}</>;
}

export { PrivateElement };

PrivateElement.defaultProps = {
  fallback: '',
};

PrivateElement.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};
