import React, { createContext, useContext } from 'react';

export const SSOContext = createContext();

export const SSOProvider = ({ value, children }) => (
  <SSOContext.Provider value={value}>{children}</SSOContext.Provider>
);

export const useSSOValue = () => useContext(SSOContext);
