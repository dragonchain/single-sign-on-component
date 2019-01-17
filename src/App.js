import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
	}

	componentDidMount() {
		//check if logged in
			// if true
				// call onAuthorization with user data 
			// if false
				// show login component
				// login with cognito
				// call onAuthorization with user
	}
	onAuthorization(){

	}

	render(){
		return(
			<React.Fragment>
				<p>It is up</p>
			</React.Fragment>
		)
	}
}
export default App