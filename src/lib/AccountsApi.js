import { GlobalConfig } from '../globals';

export default class AccountsApi {
  static baseUrl = GlobalConfig.ACCOUNTS_SERVICE_URL;

  static defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  static getUser = async (token) => {
    const options = { headers: { Authorization: token } };
    const response = await this.get('/v1/user', options);
    if ('error' in response) { return response; }
    const { user } = response;
    delete user.__orgs__; // remove personal org
    return user;
  }

  static getOrgs = async (token) => {
    const options = { headers: { Authorization: token } };
    const response = await this.get('/v1/org', options);
    if ('error' in response) { return response; }
    const { orgs } = response;
    return orgs;
  }

  static get = (path, options) => this.makeRequest(path, options)

  static makeRequest = async (path, options) => {
    const requestParams = { ...this.defaultOptions, ...options };

    const res = await fetch(`${this.baseUrl}${path}`, requestParams);
    const jsonResponse = await res.json();
    return jsonResponse;
  }
}
