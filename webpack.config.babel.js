import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const plugins = [
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [{ from: './README.md' }, { from: './package.json' }],
  }),
];

export default {
  devtool: 'hidden-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'single-sign-on.min.js',
    libraryTarget: 'var',
    library: 'SingleSignOn',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['.js'],
    fallback: {
      fs: false,
      net: false,
      tls: false,
    },
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
