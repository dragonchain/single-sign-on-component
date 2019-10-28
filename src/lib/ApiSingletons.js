import CognitoApi from '@dragonchain-dev/cognito-wrapper';
import { domain, env } from '../globals';

class ApiSingletons {
  constructor() {
    this.cognitoApi = new CognitoApi(env, domain);
  }
}

export default new ApiSingletons();
