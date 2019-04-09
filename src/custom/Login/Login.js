import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import TOTPModal from '../TOTPModal'
import CustomForm from '../CustomForm';
import dashboardLocation from '../../lib/dashboardLocations';
import Logo from '../../assets/img/logo.svg';
import { cognitoApi } from '../../lib'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      dashboardSite: '',
      showTotpModal: false,
      session: '',
    };
  }

  componentDidMount() {
    const { env } = this.props || 'local';

    this.setState({
      dashboardSite: dashboardLocation[env].DASHBOARD,
    });
  }

  handleInputChange(e, stateItem) {
    const { value } = e.target;

    this.setState({ [stateItem]: value });
  }

  toggle = () => {
    this.setState({ showTotpModal: !this.state.showTotpModal })
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { loginSuccess } = this.props;

    try {
      const response = await cognitoApi.login(username, password)
      if (response.Session) {
        this.setState({ session: response, modal: true, showTotpModal:true})
      } else {
        const userData = await cognitoApi.checkSession(true);
        loginSuccess(userData);
      }
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  render() {
    const { error, dashboardSite, username, session, showTotpModal, password } = this.state;
    const { loginSuccess } = this.props;

    return (
      <div className="app justify-content-center bg-scale">
        <div className="container">
          <Card className="col-md-8" style={{ margin: 'auto' }}>
            <CardBody>
              <h1>Login</h1>
              <CustomForm
                encType="multipart/form-data"
                className="form-horizontal"
                errormessage={error}
                onFocus={() => this.setState({ error: '' })}
                onSubmit={e => this.handleSubmit(e)}
              >
                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" onChange={e => this.handleInputChange(e, 'username')} placeholder="Username" />
                </InputGroup>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" onChange={e => this.handleInputChange(e, 'password')} placeholder="Password" />
                </InputGroup>
                <Row>
                  <Col xs="6">
                    <Button color="primary" type="submit" className="px-4 ">Login</Button>
                  </Col>
                  <Col xs="6 text-right">
                    <a color="secondary" href={`${dashboardSite}/forgot-password`} className="px-0">Forgot password?</a>
                  </Col>
                  <Col xs="6">
                    <a color="link" href={`${dashboardSite}/register`} className="px-4 btn btn-outline-primary" style={{ marginTop: '1rem' }}>Register & Verify</a>
                  </Col>
                  <Col xs="12" className="text-right">
                    <Logo alt="Dragonchain Logo" className="mt-2" style={{ width: '200px' }} />
                  </Col>
                </Row>
              </CustomForm>
            </CardBody>
            {showTotpModal && <TOTPModal
              toggle={this.toggle}
              username={username}
              password={password}
              handleLoginSuccess={loginSuccess}
              pendingSession={session}
              submitLogin={e => this.handleSubmit(e)}
            />}
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
