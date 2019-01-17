"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CognitoApiWrapper = _interopRequireDefault(require("./lib/CognitoApiWrapper"));

var _awsAmplifyReact = require("aws-amplify-react");

var _Login = _interopRequireDefault(require("./components/Login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this));
    _this.state = {
      isLoggedIn: false
    };
    _this.loginSuccess = _this.loginSuccess.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      //check if logged in
      // cognitoApi.logout()
      _CognitoApiWrapper.default.checkSession().then(function (res) {
        if (!!res) {
          // if true
          // call onAuthorization with user data 
          console.log('is logged in response', res);

          _this2.setState({
            isLoggedIn: true
          });
        } else {
          // if false
          // show login component
          // login with cognito
          // call onAuthorization with user
          console.log('is not logged in response', res);

          _this2.setState({
            isLoggedIn: false
          });
        }
      }).catch(function (err) {
        console.log('error', err);
      });
    }
  }, {
    key: "loginSuccess",
    value: function loginSuccess() {
      this.setState({
        isLoggedIn: true
      });
      console.log('in login success', this.state);
    }
  }, {
    key: "onAuthorization",
    value: function onAuthorization() {}
  }, {
    key: "onAuthStateChange",
    value: function onAuthStateChange(state, data) {
      console.log('state', state);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement(_awsAmplifyReact.Authenticator, {
        theme: {
          Container: {}
        },
        onStateChange: function onStateChange(state, data) {
          return _this3.onAuthStateChange(state, data);
        },
        hide: [_awsAmplifyReact.Greetings, _awsAmplifyReact.SignIn, _awsAmplifyReact.SignOut, _awsAmplifyReact.SignUp, _awsAmplifyReact.ConfirmSignIn, _awsAmplifyReact.RequireNewPassword, _awsAmplifyReact.ConfirmSignUp, _awsAmplifyReact.VerifyContact, _awsAmplifyReact.ForgotPassword, _awsAmplifyReact.TOTPSetup]
      }, this.state.isLoggedIn ? this.props.children : _react.default.createElement(_Login.default, {
        loginSuccess: this.loginSuccess
      }));
    }
  }]);

  return App;
}(_react.Component);

var _default = App;
exports.default = _default;