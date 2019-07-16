import APIs from './ApiSingletons';
import AccountsApi from './AccountsApi';

export default class CognitoApiWrapper {
  static checkSession = async (isFullObject) => {
    const userData = await APIs.cognitoApi.checkSession(isFullObject);
    if (!userData) return false;
    return userData;
  }

  static token = async () => {
    const response = await APIs.cognitoApi.getIdToken();
    return response.jwtToken;
  }

  static user = async () => {
    const token = await this.token();
    return AccountsApi.getUser(token);
  }

  static orgs = async () => {
    const token = await this.token();
    return AccountsApi.getOrgs(token);
  }

  static logout = () => APIs.cognitoApi.logout()
}
