import 'babel-polyfill'
import CognitoApi from '@dragonchain-dev/cognito-wrapper';
import HopperApi from './HopperApi';


class ApiSingletons {
  constructor() {
    this.cognitoApi = new CognitoApi(process.env.REACT_APP_STAGE || 'local');
    this.hopperApi = new HopperApi(this.cognitoApi);
  }
}

export default new ApiSingletons();
