"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("babel-polyfill");

var _cognitoWrapper = _interopRequireDefault(require("@dragonchain-dev/cognito-wrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cognitoApi = new _cognitoWrapper.default(process.env.REACT_APP_STAGE || 'local', 'org');
console.log('see here', cognitoApi);
var _default = cognitoApi;
exports.default = _default;