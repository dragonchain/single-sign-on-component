import CognitoApiWrapper from './CognitoApiWrapper';
import ApiSingletons from './ApiSingletons';
import AccountsApi from './AccountsApi';

const cognitoApi = new CognitoApiWrapper();

export { ApiSingletons, cognitoApi, AccountsApi };
