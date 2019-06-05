import APIs from './ApiSingletons';

export default class CognitoApiWrapper {
  checkSession = async (isFullObject) => {
    const userData = await APIs.cognitoApi.checkSession(isFullObject);
    if (!userData) return false;
    return userData;
  }

  token = async () => {
    try {
      const response = await APIs.cognitoApi.getIdToken();
      return response.jwtToken;
    } catch (err) {
      throw err;
    }
  }

  data = async () => {
    try {
      const response = await APIs.cognitoApi.getIdToken();
      return response.payload;
    } catch (err) {
      throw err;
    }
  }

  logout = () => APIs.cognitoApi.logout()
}
