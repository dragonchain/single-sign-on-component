import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap';
import CustomForm from '../../custom/CustomForm';
import cognitoApi from '../../lib/CognitoApiWrapper';

// import logo from '../../assets/img/logo.svg'
class Login extends Component {
	constructor(){
		super()
		this.state = {
			username: '',
      password: '',
      error: '',
      session: null,
      modal: false,
      showTotpModal: false,
		}
	}

  handleInputChange(e, stateItem){
    const { value } = e.target;
    this.setState({ [stateItem]: value });
	}
	
	handleSubmit(e){
		e.preventDefault();
		console.log('in handle submit')
		cognitoApi.checkSession().then(res => console.log(res))

		cognitoApi.login(this.state.username, this.state.password)
		.then(() => {
			this.props.loginSuccess()
		})
	}

	render(){
		const { error } = this.state;
		return(
			<Card className="py-4">
        <CardBody>
          <h1>Login</h1>
          <CustomForm
            encType="multipart/form-data"
            className="form-horizontal"
            errormessage={error}
            onFocus={() => this.setState({ error: '' })}
            onSubmit={(e)=> this.handleSubmit(e)}>
            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" onChange={e => this.handleInputChange(e, 'username')} placeholder="Username" />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="password" onChange={e => this.handleInputChange(e, 'password')} placeholder="Password" />
            </InputGroup>
            <Row>
              <Col xs="6">
                <Button color="primary" type="submit" className="px-4 ">Login</Button>
              </Col>
              <Col xs="6" className="text-right">
                <Button color="link" onClick={() => { this.toggle(); }} className="px-0">Forgot password?</Button>
              </Col>
              <Col xs="12" className="text-right">
              {/* <img src={logo} alt="Dragonchain Logo" className="mt-2" style={{ width: '200px' }} /> */}
              </Col>
            </Row>
          </CustomForm>
        </CardBody>
      </Card>
		)
	}
}

export default Login;