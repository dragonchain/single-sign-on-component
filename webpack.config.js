
var path = require('path');
module.exports = {
  entry: {
		main: ['core-js/fn/promise', './src/index.js']
	},
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'index.js'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env, react']
          }
        }
      }
    ]
  },
};