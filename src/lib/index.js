import HopperApiWrapper from './HopperApiWrapper';
import CognitoApiWrapper from './CognitoApiWrapper';
import ApiSingletons from './ApiSingletons';


const hopperApi = new HopperApiWrapper();
const cognitoApi = new CognitoApiWrapper();


export { hopperApi, cognitoApi, ApiSingletons};
