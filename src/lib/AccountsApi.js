import { GlobalConfig } from '../globals';

export default class AccountsApi {
  static baseUrl = GlobalConfig.ACCOUNTS_SERVICE_URL;
  static defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  static getUserData = async (token) => {
    const options = { headers: { 'Authorization': token }};
    return await this.get('/api/user', options);
  }

  static get = (path) => {
    return this.makeRequest(path);
  }

  static async makeRequest(path, options) {
    const requestParams = { ...this.defaultOptions, ...options };

    const res = await fetch(`${this.baseUrl}${path}`, requestParams);
    if (!res.ok) {
      throw new Error(jsonResponse);
    }

    const jsonResponse = await res.json();
    return jsonResponse;
  }
}