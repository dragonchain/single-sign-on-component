import APIs from './ApiSingletons';
import AccountsApi from './AccountsApi';
// import { GlobalConfig } from '../globals';

export default class CognitoApiWrapper {
  checkSession = async (isFullObject) => {
    const userData = await APIs.cognitoApi.checkSession(isFullObject);
    if (!userData) return false;
    return userData;
  }

  refreshSession = async () => {
    try {
      await APIs.cognitoApi.refreshSession();
      return true;
    } catch (e) {
      return false;
    }
  }

  token = async () => {
    const response = await APIs.cognitoApi.getIdToken();
    return response.jwtToken;
  }

  groups = async () => {
    const response = await APIs.cognitoApi.getIdToken();
    return response.payload['cognito:groups'] || [];
  }

  loginWithToken = async (refreshToken) => {
    await APIs.cognitoApi.loginWithToken(refreshToken);
  }

  logout = async () => {
    await APIs.cognitoApi.logout();
  }

  // Account calls
  user = async () => {
    const token = await this.token();
    return AccountsApi.getUser(token);
  }

  orgs = async () => {
    const token = await this.token();
    return AccountsApi.getOrgs(token);
  }
}
