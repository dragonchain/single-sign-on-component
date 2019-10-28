import CognitoApiWrapper from './CognitoApiWrapper';
import ApiSingletons from './ApiSingletons';
import AccountsApi from './AccountsApi';
import parseURLquery from './parseURLquery';

const cognitoApi = new CognitoApiWrapper();

export {
  ApiSingletons, cognitoApi, AccountsApi, parseURLquery,
};
