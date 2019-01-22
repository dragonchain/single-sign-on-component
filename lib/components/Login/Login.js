"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _CustomForm = _interopRequireDefault(require("../../custom/CustomForm"));

var _CognitoApiWrapper = _interopRequireDefault(require("../../lib/CognitoApiWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import logo from '../../assets/img/logo.svg'
var Login =
/*#__PURE__*/
function (_Component) {
  _inherits(Login, _Component);

  function Login() {
    var _this;

    _classCallCheck(this, Login);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Login).call(this));
    _this.state = {
      username: '',
      password: '',
      error: '',
      session: null,
      modal: false,
      showTotpModal: false
    };
    return _this;
  }

  _createClass(Login, [{
    key: "handleInputChange",
    value: function handleInputChange(e, stateItem) {
      var value = e.target.value;
      this.setState(_defineProperty({}, stateItem, value));
    }
  }, {
    key: "loginFaiure",
    value: function loginFaiure() {// render err modal
      // given state.err
    }
  }, {
    key: "handleSubmit",
    value: function () {
      var _handleSubmit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(e) {
        var userData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                _context.prev = 1;
                _context.next = 4;
                return _CognitoApiWrapper.default.login(this.state.username, this.state.password);

              case 4:
                _context.next = 6;
                return this.setState({
                  password: ''
                });

              case 6:
                _context.next = 8;
                return _CognitoApiWrapper.default.checkSession(true);

              case 8:
                userData = _context.sent;
                this.props.loginSuccess(userData);
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                this.setState({
                  error: _context.t0.message
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 12]]);
      }));

      function handleSubmit(_x) {
        return _handleSubmit.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var error = this.state.error;
      return _react.default.createElement("div", {
        class: "app justify-content-center bg-scale"
      }, _react.default.createElement("div", {
        class: "container"
      }, _react.default.createElement(_reactstrap.Card, {
        className: "col-md-8"
      }, _react.default.createElement(_reactstrap.CardBody, null, _react.default.createElement("h1", null, "Login"), _react.default.createElement(_CustomForm.default, {
        encType: "multipart/form-data",
        className: "form-horizontal",
        errormessage: error,
        onFocus: function onFocus() {
          return _this2.setState({
            error: ''
          });
        },
        onSubmit: function onSubmit(e) {
          return _this2.handleSubmit(e);
        }
      }, _react.default.createElement(_reactstrap.InputGroup, {
        className: "mb-2"
      }, _react.default.createElement(_reactstrap.InputGroupAddon, {
        addonType: "prepend"
      }, _react.default.createElement(_reactstrap.InputGroupText, null, _react.default.createElement("i", {
        className: "icon-user"
      }))), _react.default.createElement(_reactstrap.Input, {
        type: "text",
        onChange: function onChange(e) {
          return _this2.handleInputChange(e, 'username');
        },
        placeholder: "Username"
      })), _react.default.createElement(_reactstrap.InputGroup, {
        className: "mb-4"
      }, _react.default.createElement(_reactstrap.InputGroupAddon, {
        addonType: "prepend"
      }, _react.default.createElement(_reactstrap.InputGroupText, null, _react.default.createElement("i", {
        className: "icon-lock"
      }))), _react.default.createElement(_reactstrap.Input, {
        type: "password",
        onChange: function onChange(e) {
          return _this2.handleInputChange(e, 'password');
        },
        placeholder: "Password"
      })), _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, {
        xs: "6"
      }, _react.default.createElement(_reactstrap.Button, {
        color: "primary",
        type: "submit",
        className: "px-4 "
      }, "Login")), _react.default.createElement(_reactstrap.Col, {
        xs: "6",
        className: "text-right"
      }, _react.default.createElement(_reactstrap.Button, {
        color: "link",
        onClick: function onClick() {
          _this2.toggle();
        },
        className: "px-0"
      }, "Forgot password?")), _react.default.createElement(_reactstrap.Col, {
        xs: "12",
        className: "text-right"
      })))))));
    }
  }]);

  return Login;
}(_react.Component);

var _default = Login;
exports.default = _default;