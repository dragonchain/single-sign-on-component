import APIs from './ApiSingletons';
import AccountsApi from './AccountsApi';

export default class CognitoApiWrapper {
  checkSession = async (isFullObject) => {
    const userData = await APIs.cognitoApi.checkSession(isFullObject);
    if (!userData) return false;
    return userData;
  }

  token = async () => {
    const response = await APIs.cognitoApi.getIdToken();
    return response.jwtToken;
  }

  user = async () => {
    const token = await this.token();
    return AccountsApi.getUser(token);
  }

  orgs = async () => {
    const token = await this.token();
    return AccountsApi.getOrgs(token);
  }

  logout = () => APIs.cognitoApi.logout()
}
