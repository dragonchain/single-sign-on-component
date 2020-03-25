const Login = async sso => {
  const { login, source, redirect } = sso;
  if (typeof window !== 'undefined')
    window.location = `${login}?source=${source}&redirect=${redirect}`;
};

export { Login };
