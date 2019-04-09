import { Errors, HopperConfig } from '../globals';

const { HOPPER_API } = HopperConfig;
const {
  TOKEN_INVALID,
  UNAUTHORIZED,
  NOT_FOUND,
  GENERIC_ERROR,
} = Errors;

export default class HopperApi {
  constructor(cognitoApi) {
    this.cognitoApi = cognitoApi;
    this.baseUrl = HOPPER_API;
    this.apiKeys = {};
    this.defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  getApiKey = async apiKeyId => (this.apiKeys[apiKeyId] || this.generateNewApiKey(apiKeyId));

  generateNewApiKey = async (apiKeyId) => {
    const response = await this.get(`/dragonchain/${apiKeyId}/api-key`);
    this.apiKeys[apiKeyId] = response.apiKey;
    return this.apiKeys[apiKeyId];
  }

  get(path, apiKeyId = null) {
    const options = { method: 'GET' };
    return this.makeRequest(path, options, apiKeyId);
  }

  post(path, body, apiKeyId = null) {
    const options = { method: 'POST', body: JSON.stringify(body) };
    return this.makeRequest(path, options, apiKeyId);
  }

  put(path, body, apiKeyId = null) {
    const options = { method: 'PUT', body: JSON.stringify(body) };
    return this.makeRequest(path, options, apiKeyId);
  }

  delete(path, apiKeyId = null) {
    const options = { method: 'DELETE' };
    return this.makeRequest(path, options, apiKeyId);
  }

  async makeRequest(path, options, apiKeyId) {
    const requestParams = { ...this.defaultOptions, ...options };
    if (apiKeyId !== null) {
      requestParams.headers.Authorization = await this.getApiKey(apiKeyId);
    } else {
      const token = await this.cognitoApi.getIdToken();
      requestParams.headers.Authorization = token.jwtToken;
    }
    try {
      const res = await fetch(`${this.baseUrl}${path}`, requestParams);
      const jsonResponse = await res.json();
      if (res.ok) {
        return jsonResponse;
      } else {
        switch (res.status) {
          case 401:
            throw new UNAUTHORIZED(jsonResponse);
          case 403:
            throw new TOKEN_INVALID(jsonResponse);
          case 404:
            throw new NOT_FOUND(jsonResponse);
          case 400:
            if (jsonResponse.error) return jsonResponse; // Return our custom errors as-is
          // eslint-ignore-no-fallthrough
          default:
            throw new GENERIC_ERROR(jsonResponse);
        }
      }
    } catch (error) {
      throw (error.message || error.code);
    }
  };
}
