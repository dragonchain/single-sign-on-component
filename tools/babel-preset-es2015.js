const ENV = process.env.BABEL_ENV;

module.exports = function() {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: false,
          modules: ENV === 'es6' ? false : 'commonjs',
        },
      ],
    ],
  };
};
