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
import CustomForm from '../CustomForm';
import dashboardLocation from '../../lib/dashboardLocations';
import Logo from '../../assets/img/logo.svg';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      dashboardSite: '',
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

  async handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { loginSuccess, login, checkSession } = this.props;

    try {
      await login(username, password);
      await this.setState({ password: '' });
			const userData = await checkSession(true);
      loginSuccess(userData);
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { error, dashboardSite } = this.state;

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
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
