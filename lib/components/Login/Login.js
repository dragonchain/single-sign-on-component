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
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      console.log('in handle submit');

      _CognitoApiWrapper.default.checkSession().then(function (res) {
        return console.log(res);
      });

      _CognitoApiWrapper.default.login(this.state.username, this.state.password).then(function () {
        _this2.props.loginSuccess();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var error = this.state.error;
      return _react.default.createElement(_reactstrap.Card, {
        className: "py-4"
      }, _react.default.createElement(_reactstrap.CardBody, null, _react.default.createElement("h1", null, "Login"), _react.default.createElement(_CustomForm.default, {
        encType: "multipart/form-data",
        className: "form-horizontal",
        errormessage: error,
        onFocus: function onFocus() {
          return _this3.setState({
            error: ''
          });
        },
        onSubmit: function onSubmit(e) {
          return _this3.handleSubmit(e);
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
          return _this3.handleInputChange(e, 'username');
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
          return _this3.handleInputChange(e, 'password');
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
          _this3.toggle();
        },
        className: "px-0"
      }, "Forgot password?")), _react.default.createElement(_reactstrap.Col, {
        xs: "12",
        className: "text-right"
      })))));
    }
  }]);

  return Login;
}(_react.Component);

var _default = Login;
exports.default = _default;