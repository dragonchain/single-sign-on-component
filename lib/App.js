"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CognitoApiWrapper = _interopRequireDefault(require("./lib/CognitoApiWrapper"));

var _context2 = _interopRequireDefault(require("./context"));

var _Login = _interopRequireDefault(require("./components/Login"));

var _awsAmplifyReact = require("aws-amplify-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var defaultState = {
  isLoggedIn: false,
  username: '',
  email: '',
  email_verified: false,
  claimed: false,
  ethereumAddress: ''
};

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this));
    _this.state = defaultState;
    _this.loginSuccess = _this.loginSuccess.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleLogout = _this.handleLogout.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var userData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _CognitoApiWrapper.default.checkSession(true);

              case 2:
                userData = _context.sent;

                if (!!userData) {
                  this.onAuthorization(userData);
                } else {
                  this.setState({
                    isLoggedIn: false
                  });
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "handleLogout",
    value: function handleLogout() {
      console.log('in handle logout', _CognitoApiWrapper.default);

      _CognitoApiWrapper.default.logout();

      this.setState({
        isLoggedIn: false
      });
    }
  }, {
    key: "loginSuccess",
    value: function loginSuccess(data) {
      this.onAuthorization(data);
    }
  }, {
    key: "loginFailure",
    value: function loginFailure() {
      this.setState({
        isLoggedIn: false
      }); // send error message
    }
  }, {
    key: "onAuthorization",
    value: function onAuthorization(data) {
      var _this2 = this;

      this.setState({
        isLoggedIn: true
      });
      this.setState(_objectSpread({}, data), function () {
        _this2.props.appContext.changeAppState('username', data.username);

        _this2.props.appContext.changeAppState('emailAddress', data.email);

        _this2.props.appContext.changeAppState('isWalletClaimed', !!data.claimed);

        _this2.props.appContext.changeAppState('ethereumAddress', data.ethereumAddress); // this could be a new loginContext


        _this2.props.appContext.changeAppState('logout', _this2.handleLogout);
      });
    }
  }, {
    key: "onAuthStateChange",
    value: function onAuthStateChange(state, data) {
      console.log('state', state);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var state = this.state;
      return _react.default.createElement(_awsAmplifyReact.Authenticator, {
        theme: {
          Container: {}
        },
        onStateChange: function onStateChange(state, data) {
          return _this3.onAuthStateChange(state, data);
        },
        hide: [_awsAmplifyReact.Greetings, _awsAmplifyReact.SignIn, _awsAmplifyReact.SignOut, _awsAmplifyReact.SignUp, _awsAmplifyReact.ConfirmSignIn, _awsAmplifyReact.RequireNewPassword, _awsAmplifyReact.ConfirmSignUp, _awsAmplifyReact.VerifyContact, _awsAmplifyReact.ForgotPassword, _awsAmplifyReact.TOTPSetup]
      }, _react.default.createElement(_context2.default.Provider, {
        value: {
          loginState: state
        }
      }, this.state.isLoggedIn ? this.props.children : _react.default.createElement(_Login.default, {
        loginSuccess: this.loginSuccess
      })));
    }
  }]);

  return App;
}(_react.Component);

var _default = App;
exports.default = _default;