const Login = async sso => {
  const { login, source, redirect } = sso;
  window.location = `${login}?source=${source}&redirect=${redirect}`;
};

export { Login };
