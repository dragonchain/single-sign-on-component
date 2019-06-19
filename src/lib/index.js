import CognitoApiWrapper from './CognitoApiWrapper';
import ApiSingletons from './ApiSingletons';
import AccountsApi from './AccountsApi';
import AnalyticAction from './AnalyticAction';

const cognitoApi = new CognitoApiWrapper();

export { AnalyticAction, ApiSingletons, cognitoApi, AccountsApi };
