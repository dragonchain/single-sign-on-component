import React, { Component } from 'react';
import cognitoApi from './lib/CognitoApiWrapper';
import LoginContext from './context';
import Login from './components/Login';
import { Authenticator, Greetings, SignIn, SignOut, SignUp, ConfirmSignIn, RequireNewPassword, ConfirmSignUp, VerifyContact, ForgotPassword, TOTPSetup } from 'aws-amplify-react';

const defaultState = {
	isLoggedIn: false,
	username: '',
	email: '',
	email_verified: false,
	claimed: false,
	ethereumAddress: '',
}

class App extends Component {
  constructor() {
		super();
		this.state = defaultState;
		this.loginSuccess = this.loginSuccess.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	async componentDidMount() {
		let userData = await cognitoApi.checkSession(true);
		if(!!userData) {
			this.onAuthorization(userData)
		}else{
			this.setState({isLoggedIn: false});
		}
	}

	handleLogout(){
		console.log('in handle logout', cognitoApi)
		cognitoApi.logout()
		this.setState({isLoggedIn: false})
	}

	loginSuccess(data){
		this.onAuthorization(data);
	}

	loginFailure(){
		this.setState({isLoggedIn: false})
		// send error message
	}
	

	onAuthorization(data){
		this.setState({isLoggedIn: true});
		this.setState({...data}, () => {	
			this.props.appContext.changeAppState('username', data.username)
			this.props.appContext.changeAppState('emailAddress', data.email)
			this.props.appContext.changeAppState('isWalletClaimed', !!data.claimed)
			this.props.appContext.changeAppState('ethereumAddress', data.ethereumAddress)
			// this could be a new loginContext
			this.props.appContext.changeAppState('logout', this.handleLogout)
		})
	}


	onAuthStateChange(state, data){
		console.log('state', state)
	}

	render(){
		const state = this.state;
		return(
			<Authenticator theme={{ Container: {} }} onStateChange={(state, data) => this.onAuthStateChange(state, data)} hide={[Greetings, SignIn, SignOut, SignUp, ConfirmSignIn, RequireNewPassword, ConfirmSignUp, VerifyContact, ForgotPassword, TOTPSetup]}>
				<LoginContext.Provider value={{ loginState: state }}>
					{this.state.isLoggedIn ? 
					this.props.children
					:
					<Login loginSuccess={this.loginSuccess}></Login>
					}
				</LoginContext.Provider>
			</Authenticator>
		)
	}
}
export default App