import CognitoApi from '@dragonchain-dev/cognito-wrapper';
import { env } from '../globals';

class ApiSingletons {
  constructor() {
    this.cognitoApi = new CognitoApi(env);
  }
}

export default new ApiSingletons();
