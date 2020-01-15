import CognitoApiWrapper from './CognitoApiWrapper';
import ApiSingletons from './ApiSingletons';
import AccountsApi from './AccountsApi';
import parse from './Parse';

const cognitoApi = new CognitoApiWrapper();

export { ApiSingletons, cognitoApi, AccountsApi, parse };
