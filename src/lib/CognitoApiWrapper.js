import 'babel-polyfill'
import CognitoApi from '@dragonchain-dev/cognito-wrapper';

const cognitoApi = new CognitoApi(process.env.REACT_APP_STAGE || 'local', 'org');
console.log('see here', cognitoApi);

export default cognitoApi;
