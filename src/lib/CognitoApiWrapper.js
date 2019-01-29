import 'babel-polyfill';
import CognitoApi from '@dragonchain-dev/cognito-wrapper';

const cognitoApi = new CognitoApi(process.env.REACT_APP_STAGE || 'local', process.env.REACT_APP_EXTENSION || 'com');

export default cognitoApi;
