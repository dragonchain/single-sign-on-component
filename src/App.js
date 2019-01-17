import React, { Component } from 'react';

import cognitoApi from './lib/CognitoApiWrapper';
import { Authenticator, Greetings, SignIn, SignOut, SignUp, ConfirmSignIn, RequireNewPassword, ConfirmSignUp, VerifyContact, ForgotPassword, TOTPSetup } from 'aws-amplify-react';
import Login from './components/Login';


class App extends Component {
  constructor() {
		super();
		this.state = {
			isLoggedIn: false
		}
		this.loginSuccess = this.loginSuccess.bind(this)
	}

	componentDidMount() {
		//check if logged in
		// cognitoApi.logout()
		cognitoApi.checkSession()
		.then((res) => {
			if(!!res){
				// if true
				// call onAuthorization with user data
				console.log('is logged in response', res);
				this.onAuthorization()
			}else{
				// if false
				// show login component
				// login with cognito
				// call onAuthorization with user
				console.log('is not logged in response', res);
				this.setState({isLoggedIn: false});
			}
		})
		.catch((err) => {
			console.log('error', err);
		})
	}

	loginSuccess(){
		this.setState({isLoggedIn: true});
		console.log('in login success', this.state)
	}

	onAuthorization(){
		this.setState({isLoggedIn: true});

	}

	onAuthStateChange(state, data){
		console.log('state', state)
	}

	render(){
		return(
			<Authenticator theme={{ Container: {} }} onStateChange={(state, data) => this.onAuthStateChange(state, data)} hide={[Greetings, SignIn, SignOut, SignUp, ConfirmSignIn, RequireNewPassword, ConfirmSignUp, VerifyContact, ForgotPassword, TOTPSetup]}>
				{this.state.isLoggedIn ? 
				this.props.children
				:
				<Login loginSuccess={this.loginSuccess}></Login>
				}
			</Authenticator>
		)
	}
}
export default App