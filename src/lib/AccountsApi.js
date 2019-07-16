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
    const { user } = await this.get('/v1/user', options);
    delete user.__orgs__; // remove personal org
    return user;
  }

  static getOrgs = async (token) => {
    const options = { headers: { Authorization: token } };
    const { orgs } = await this.get('/v1/org', options);
    return orgs;
  }

  static get = (path, options) => this.makeRequest(path, options)

  static makeRequest = async (path, options) => {
    const requestParams = { ...this.defaultOptions, ...options };

    const res = await fetch(`${this.baseUrl}${path}`, requestParams);
    const jsonResponse = await res.json();

    if (!res.ok) { throw new Error(jsonResponse); }
    return jsonResponse;
  }
}
