import APIs from './ApiSingletons';

export default class CognitoApiWrapper {
  constructor() {
    this.changeAppState = () => { };
    this.resetAppState = () => { };
  }

  getIdToken = async () => {
    try {
      const response = await APIs.cognitoApi.getIdToken()
      return response
    } catch (err) {
      throw err;
    }
  }

  login = async (username, password) => {
    const { user, fullUserObject } = await APIs.cognitoApi.login(username, password)
    if (!user.Session && (fullUserObject.preferredMFA && fullUserObject.preferredMFA === 'SOFTWARE_TOKEN_MFA')) {
      this.changeAppState('badTotpState', true);
    }
    if (user) {
      return user;
    } else {
      console.log('login failed')
    }
  }

  logout = () => {
    this.resetAppState();
    return APIs.cognitoApi.logout();
  }

  // returns { username, claimed } if logged in, and false if not.
  checkSession = () => APIs.cognitoApi.checkSession().then(session => session);


  /* 2FA */

  sendMFACode = (challengeAnswer, pendingSession) => {
    return new Promise((res, rej) => {
      APIs.cognitoApi.sendMFACode(challengeAnswer, pendingSession)
        .then(response => res(response))
        .catch(err => {
          if (err.message === 'new password required') {
            this.changeAppState('newPasswordRequired', true);
          }
          rej(err);
        });
    });
  }
}